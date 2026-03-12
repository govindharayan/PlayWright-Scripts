import pytest
import json
import os
import re
from playwright.sync_api import Page

# Change this to resume from a specific index if needed
START_INDEX = 0 

def test_gate_test_series_scraping(page: Page):
    # 1. SETUP DIRECTORIES
    for folder in ["./questionpapers", "./solutions"]:
        if not os.path.exists(folder):
            os.makedirs(folder)

    # 2. SCRAPE DATA (If file is empty or missing)
    scraped_data = []
    
    # Check if we need to scrape
    if not os.path.exists("test_series.json") or os.stat("test_series.json").st_size == 0:
        print("\n--- SCRAPING DATA FROM SIDEBAR ---")
        page.goto("https://www.goclasses.in/s/pages/gate-cse-test-series")
        page.wait_for_selector(".qd-subject-list", timeout=15000)

        subject_buttons = page.locator("button.qd-subject-btn").all()
        
        for i in range(len(subject_buttons)):
            btn = page.locator("button.qd-subject-btn").nth(i)
            btn_text = btn.inner_text()
            subject_name = re.sub(r'\(\d+\)', '', btn_text).strip()
            
            if "Home" in subject_name: continue

            print(f"Clicking Category: {subject_name}")
            btn.click()
            page.wait_for_timeout(1000) # Wait for cards to load

            cards = page.locator(".qd-quiz-card").all()
            for card in cards:
                quiz_title = card.locator(".qd-quiz-title div").nth(0).inner_text().strip()
                topic_text = card.locator(".qd-quiz-title div").nth(1).inner_text().replace("Topic:", "").strip()
                link = card.locator("a.qd-attempt-btn").get_attribute("href")

                scraped_data.append({
                    "exam_name": f"{subject_name}\n{quiz_title}",
                    "link": link,
                    "topics": topic_text
                })

        # Save to JSON correctly
        with open("test_series.json", "w", encoding='utf-8') as f:
            json.dump(scraped_data, f, indent=4)
        print(f"Scraped {len(scraped_data)} items and saved to test_series.json")
    else:
        # Load existing data
        with open("test_series.json", "r", encoding="utf-8") as f:
            scraped_data = json.load(f)
        print(f"Loaded {len(scraped_data)} items from existing JSON.")

    # 3. PDF EXPORT LOGIC
    is_logged_in = False

    for index, entry in enumerate(scraped_data[START_INDEX:], start=START_INDEX):
        print(f"\n[{index}] Navigating to: {entry['exam_name']}")
        page.goto(entry['link'])
        page.wait_for_load_state("networkidle")

        # Handle Login once
        if not is_logged_in:
            login_btn = page.get_by_text("Login", exact=False)
            if login_btn.count() > 0:
                with page.context.expect_page() as new_page_info:
                    login_btn.nth(1).click()
                page = new_page_info.value
                page.locator(".gdev-input.qa-form-tall-text").nth(0).fill("harayangovind@gmail.com")
                page.locator(".gdev-input.qa-form-tall-text").nth(1).fill("Govind@2025")
                page.get_by_text("Log In", exact=True).nth(0).click()
                page.wait_for_load_state("networkidle")
                is_logged_in = True
                page.goto(entry['link']) # Go back to the exam page after login

        # Check for Take Exam Button
        target = page.get_by_text("Click here to Take Exam", exact=False)
        if target.count() > 0:
            exam_href = target.first.get_attribute("href")
            page.goto(exam_href)
            
            # Navigate through exam UI
            page.get_by_text("Start").click()
            page.wait_for_selector("#viewQPButton")
            
            # File name cleaning
            safe_title = re.sub(r'[<>:"/\\|?*]', '', f"{index}_{entry['exam_name']}_{entry['topics']}").replace("\n", " ").replace(" ", "_")[:120]
            
            # --- SAVE QUESTION PAPER ---
            page.locator("#viewQPButton").click()
            page.evaluate("document.querySelectorAll('*').forEach(el => el.style.overflow = 'visible');")
            page.pdf(path=f"./questionpapers/{safe_title}.pdf", format="A4", print_background=True)

            # --- SAVE SOLUTIONS ---
            page.locator("#finalSub").click()
            page.locator("input[value='Yes']").click()
            page.wait_for_selector("#exam_result_section_choice", timeout=60000)
            page.evaluate("document.querySelectorAll('*').forEach(el => el.style.overflow = 'visible');")
            page.emulate_media(media="screen")
            page.pdf(path=f"./solutions/{safe_title}.pdf", format="A4", print_background=True)
            
            print(f"✅ Saved PDFs for: {safe_title}")
        else:
            print(f"⚠️ 'Take Exam' not found for index {index}")