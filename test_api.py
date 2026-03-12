import pytest
import json
import os
import re
from playwright.sync_api import Page

START_INDEX = 88
JSON_FILE = "test_series.json"

def test_gate_test_series(page: Page):
    # --- STEP 1: LOAD OR SCRAPE DATA ---
    if os.path.exists(JSON_FILE):
        print(f"\n✅ Found {JSON_FILE}. Skipping scraping...")
        with open(JSON_FILE, "r", encoding='utf-8') as f:
            scraped_data = json.load(f)
    else:
        print("\n🔍 JSON not found. Scraping now...")
        page.goto("https://www.goclasses.in/s/pages/gate-cse-test-series#1699851492489d")
        page.wait_for_selector(".t-row", timeout=15000)
        rows = page.locator(".t-row").all()
        scraped_data = []
        for row in rows:
            cells = row.locator(".t-info")
            if cells.count() >= 3:
                scraped_data.append({
                    "exam_name": cells.nth(0).inner_text().strip(),
                    "link": cells.nth(1).locator("a").get_attribute("href") if cells.nth(1).locator("a").count() > 0 else "No Link",
                    "topics": cells.nth(2).inner_text().strip()
                })
        with open(JSON_FILE, "w", encoding='utf-8') as f:
            json.dump(scraped_data, f, indent=4)

    # --- STEP 2: DOWNLOAD PROCESS ---
    is_logged_in = False

    for index, entry in enumerate(scraped_data[START_INDEX:], start=START_INDEX):
        if entry['link'] == "No Link": continue

        # Clean Filename
        raw_name = f"{index}_{entry['exam_name']}_{entry['topics']}"
        safe_name = re.sub(r'[<>:"/\\|?*]', '', raw_name).replace("\n", " ").replace("\t", " ").replace(" ", "_")
        file_name = f"{safe_name}.pdf"

        print(f"\n🚀 Processing [{index}]: {entry['exam_name']}")
        page.goto(entry['link'])
        page.wait_for_load_state("networkidle")

        # --- LOGIN LOGIC (Runs only once) ---
        if not is_logged_in:
            with page.context.expect_page() as new_page_info:
                # Clicks the second login button
                page.get_by_text("Login", exact=False).nth(1).click()
            
            login_popup = new_page_info.value
            login_popup.wait_for_selector(".qa-form-tall-text", state="visible")
            login_popup.locator(".qa-form-tall-text").nth(0).fill("harayangovind@gmail.com")
            login_popup.locator(".qa-form-tall-text").nth(1).fill("Govind@2025")
            login_popup.get_by_text("Log In", exact=True).click()
            
            # Wait for popup to finish processing and close
            login_popup.wait_for_event("close")
            is_logged_in = True
            print("✅ Login Successful")

        # --- EXAM & PDF LOGIC ---
        try:
            # Handle "Take Exam" button
            target = page.get_by_text("Click here to Take Exam", exact=False)
            if target.count() == 0:
                target = page.locator("a:has-text('Click here to Take Exam')").first
            
            exam_link = target.get_attribute("href")
            page.goto(exam_link)

            # Handle possible "Brand New Session" dialog automatically
            page.on("dialog", lambda dialog: dialog.accept())

            # Start Exam
            page.get_by_text("Start", exact=True).click()
            page.locator("#viewQPButton").click()

            # Clean Page for PDF
            page.evaluate("""
                document.querySelectorAll('*').forEach(el => {
                  el.style.overflow = 'visible';
                  el.style.height = 'auto';
                });
                if(document.querySelector('.header2')) document.querySelector('.header2').style.display = 'none';
            """)
            
            # Save Question Paper
            page.pdf(path=f"./questionpapers/{file_name}", format="A4", print_background=True)
            print(f"  ✔ Question Paper Saved")

            # Submit and Save Solution
            page.locator("#finalSub").click()
            page.locator("input[value='Yes']").click()
            page.wait_for_selector("#exam_result_section_choice", timeout=60000)
            
            page.pdf(path=f"./solutions/{file_name}", format="A4", print_background=True)
            print(f"  ✔ Solution Saved")

        except Exception as e:
            print(f"  ❌ Failed at index {index}: {str(e)}")
            page.screenshot(path=f"error_{index}.png")