from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import re
import time
import base64
import os

# --- INITIAL SETTINGS ---
START_INDEX = 0
JSON_FILE = "test_series.json"

# Setup browser with auto-alert acceptance (for "Brand New Session" alerts)
options = webdriver.ChromeOptions()
options.set_capability("unhandledPromptBehavior", "accept")
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
wait = WebDriverWait(driver, 20)

# Create folders
for folder in ["questionpapers", "solutions", "errors"]:
    if not os.path.exists(folder): os.makedirs(folder)

# --- STEP 1: SCRAPING FLOW ---
scraped_data = []

if os.path.exists(JSON_FILE):
    print(f"✅ Loading existing {JSON_FILE}...")
    with open(JSON_FILE, "r", encoding='utf-8') as f:
        scraped_data = json.load(f)
else:
    print("🔍 Navigating to GoClasses for scraping...")
    driver.get("https://www.goclasses.in/s/pages/gate-cse-test-series#1699851492489d")
    
    # Equivalent to page.wait_for_selector(".t-row")
    wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "t-row")))
    
    rows = driver.find_elements(By.CLASS_NAME, "t-row")
    print(f"Found {len(rows)} test entries.")

    for row in rows:
        cells = row.find_elements(By.CLASS_NAME, "t-info")
        if len(cells) >= 3:
            exam_name = cells[0].text.strip()
            # Try to find link inside 2nd cell
            links = cells[1].find_elements(By.TAG_NAME, "a")
            link_href = links[0].get_attribute("href") if links else "No Link"
            topics = cells[2].text.strip()

            scraped_data.append({
                "exam_name": exam_name,
                "link": link_href,
                "topics": topics
            })

    with open(JSON_FILE, "w", encoding='utf-8') as f:
        json.dump(scraped_data, f, indent=4)

# --- STEP 2: DOWNLOAD FLOW ---
is_logged_in = False

for index, entry in enumerate(scraped_data[START_INDEX:], start=START_INDEX):
    exam_url = entry['link']
    if exam_url == "No Link": continue
    
    # Filename cleanup (Same as your Playwright logic)
    raw_name = f"{index}_{entry['exam_name']}_{entry['topics']}"
    safe_name = re.sub(r'[<>:"/\\|?*]', '', raw_name).replace("\n", " ").replace("\t", " ").replace(" ", "_")
    file_name = f"{safe_name}.pdf"

    print(f"\n[{index}] Navigating to: {exam_url}")
    driver.get(exam_url)

    # --- LOGIN LOGIC (Equivalent to your 'new_page_info' logic) ---
    if index == START_INDEX and not is_logged_in:
        main_window = driver.current_window_handle
        
        # Click Login (Playwright's .nth(1).click())
        login_btns = wait.until(EC.presence_of_all_elements_located((By.XPATH, "//*[contains(text(),'Login')]")))
        login_btns[1].click()
        
        # Switch to new popup window
        wait.until(lambda d: len(d.window_handles) > 1)
        for handle in driver.window_handles:
            if handle != main_window:
                driver.switch_to.window(handle)
                break
        
        # Wait for inputs and fill
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".gdev-input.qa-form-tall-text")))
        inputs = driver.find_elements(By.CSS_SELECTOR, ".gdev-input.qa-form-tall-text")
        inputs[0].send_keys("harayangovind@gmail.com")
        inputs[1].send_keys("Govind@2025")
        
        # Click Log In
        driver.find_element(By.XPATH, "//*[text()='Log In']").click()
        
        # Wait for window to close and switch back
        wait.until(lambda d: len(d.window_handles) == 1)
        driver.switch_to.window(main_window)
        is_logged_in = True
        print("✅ Login Successful")

    # --- EXAM PROCESS (Translating Playwright 'target' logic) ---
    try:
        # fuzzy text search for "Click here to Take Exam"
        target_xpath = "//*[contains(text(), 'Click here to Take Exam')]"
        target_el = wait.until(EC.element_to_be_clickable((By.XPATH, target_xpath)))
        
        href = target_el.get_attribute("href")
        if not href:
            # Nearest 'a' tag logic
            href = driver.find_element(By.XPATH, f"//a[contains(., 'Click here to Take Exam')]").get_attribute("href")
        
        driver.get(href)
        
        # Start & View QP
        wait.until(EC.element_to_be_clickable((By.XPATH, "//*[text()='Start']"))).click()
        wait.until(EC.element_to_be_clickable((By.ID, "viewQPButton"))).click()

        # JS styling for PDF (Same as your evaluate script)
        driver.execute_script("""
            document.querySelectorAll('*').forEach(el => {
                el.style.overflow = 'visible';
                el.style.height = 'auto';
                el.style.maxHeight = 'none';
            });
            if(document.querySelector('.header2')) document.querySelector('.header2').style.display = 'none';
        """)
        time.sleep(5)

        # CDP PDF Generation (Equivalent to page.pdf)
        pdf_params = {
            "printBackground": True,
            "paperWidth": 8.27, "paperHeight": 11.69, # A4
            "marginTop": 0.8, "marginBottom": 0.8, "marginLeft": 0.4, "marginRight": 0.4,
            "scale": 0.9
        }
        
        # Print Question Paper
        pdf_qp = driver.execute_cdp_cmd("Page.printToPDF", pdf_params)
        with open(f"./questionpapers/{file_name}", "wb") as f:
            f.write(base64.b64decode(pdf_qp['data']))

        # Submit Exam
        driver.find_element(By.ID, "finalSub").click()
        # Confirming via button (Playwright's locator("input[value='Yes']"))
        wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[value='Yes']"))).click()
        
        # Wait for solution page
        wait.until(EC.presence_of_element_located((By.ID, "exam_result_section_choice")))
        print(f"Submitted exam index {index}")

        # Print Solutions
        pdf_sol = driver.execute_cdp_cmd("Page.printToPDF", pdf_params)
        with open(f"./solutions/{file_name}", "wb") as f:
            f.write(base64.b64decode(pdf_sol['data']))

    except Exception as e:
        print(f"❌ Error at {index}: {str(e)}")
        driver.save_screenshot(f"./errors/error_{index}.png")

driver.quit()