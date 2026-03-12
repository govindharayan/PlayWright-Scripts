import pytest
import json
import os
import re
from playwright.sync_api import Page, expect

def test_gate_test_series_scraping(page: Page):
    # Create necessary directories so the script doesn't crash
    os.makedirs("./questionpapers", exist_ok=True)
    os.makedirs("./solutions", exist_ok=True)

    print("\nNavigating to GoClasses...")
    page.goto("https://www.goclasses.in/s/pages/gate-cse-test-series#1699851492489d")
    
    page.wait_for_selector(".t-row", timeout=10000)
    rows = page.locator(".t-row").all()
    print(f"Found {len(rows)} test entries.")

    scraped_data = []
    for row in rows:
        cells = row.locator(".t-info")
        if cells.count() >= 3:
            exam_name = cells.nth(0).inner_text().strip()
            link = cells.nth(1).locator("a").get_attribute("href") if cells.nth(1).locator("a").count() > 0 else "No Link"
            topics = cells.nth(2).inner_text().strip()
            scraped_data.append({"exam_name": exam_name, "link": link, "topics": topics})

    # Save mapping for reference
    with open("test_series.json", "w") as f:
        json.dump(scraped_data, f, indent=4)

    # --- PROCESS EXAMS ---
    for index, entry in enumerate(scraped_data):
        # Create safe filename
        raw_name = f"{index}_{entry['exam_name']}_{entry['topics']}"
        safe_name = re.sub(r'[<>:"/\\|?* \n\t]', '_', raw_name)[:100] # Limit length
        file_name = f"{safe_name}.pdf"

        print(f"\n[{index+1}/{len(scraped_data)}] Processing: {entry['exam_name']}")
        page.goto(entry['link'])
        page.wait_for_load_state("networkidle")

        # --- LOGIN LOGIC (Run only once) ---
        if index == 0:
            # Check if Login button exists (might already be logged in if session persisted)
            login_btn = page.get_by_text("Login", exact=False)
            if login_btn.count() > 0:
                print("🔑 Logging in...")
                with page.context.expect_page() as new_page_info:
                    login_btn.nth(1).click()
                
                # Switch to the login tab
                page = new_page_info.value 
                page.wait_for_selector(".gdev-input.qa-form-tall-text")
                
                page.locator(".gdev-input.qa-form-tall-text").nth(0).fill("harayangovind@gmail.com")
                page.locator(".gdev-input.qa-form-tall-text").nth(1).fill("Govind@2025")
                page.get_by_text("Log In", exact=True).first.click()
                page.wait_for_load_state("networkidle")

        # --- DOWNLOAD QUESTION PAPER ---
        # Target the specific CSS class you found in console
        take_exam_btn = page.locator("a.exam-take")
        
        if take_exam_btn.count() > 0:
            print("✅ Found Exam Button")
            exam_href = take_exam_btn.get_attribute("href")
            page.goto(exam_href)
            
            # Start Exam
            page.get_by_role("button", name="Start").click()
            
            # 1. View Question Paper and Save PDF
            page.locator("#viewQPButton").click()
            
            # Inject CSS to make all content visible for PDF
            page.evaluate("""
                document.querySelectorAll('*').forEach(el => {
                  el.style.overflow = 'visible';
                  el.style.height = 'auto';
                });
                if(document.querySelector('.header2')) document.querySelector('.header2').style.display = 'none';
            """)
            
            print(f"📄 Saving Question Paper: {file_name}")
            page.pdf(path=f"./questionpapers/{file_name}", format="A4", print_background=True)

            # --- SUBMIT TO GET SOLUTIONS ---
            page.locator("#finalSub").click()
            page.locator("input[value='Yes']").click()
            print("📤 Submitted for solutions...")
            
            page.wait_for_load_state("networkidle")
            
            # Inject CSS again for solution page
            page.evaluate("document.querySelectorAll('*').forEach(el => el.style.overflow = 'visible');")
            
            print(f"📄 Saving Solutions: {file_name}")
            page.pdf(path=f"./solutions/{file_name}", format="A4", print_background=True)
            
        else:
            print(f"⚠️ Skip: 'Take Exam' button not found for {entry['exam_name']}")