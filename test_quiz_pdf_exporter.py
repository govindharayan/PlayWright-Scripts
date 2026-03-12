import pytest
import json
import re
from playwright.sync_api import Page

# Set this to where you want to start if the script crashes
START_INDEX = 0

def test_gate_test_series_scraping(page: Page):
    """
    Pytest will now find this because it starts with 'test_'
    """
    print("\nNavigating to GoClasses...")
    page.goto("https://www.goclasses.in/s/pages/gate-cse-weekly-quizzes")
    
    # Wait for the sidebar to load
    page.wait_for_selector(".qd-subject-list", timeout=10000)

    scraped_data = []

    # 1. Find all subject buttons in the sidebar
    # We exclude the 'Home' button
    subject_buttons = page.locator("button.qd-subject-btn").all()
    
    print(f"Found {len(subject_buttons)} categories.")

    for i in range(len(subject_buttons)):
        # Re-locate the button in each loop to avoid "stale element" errors
        btn = page.locator("button.qd-subject-btn").nth(i)
        btn_text = btn.inner_text()
        
        # Clean the subject name (remove the count like '(13)')
        subject_name = re.sub(r'\(\d+\)', '', btn_text).strip()
        
        if "Home" in subject_name:
            continue

        print(f"\nProcessing Category: {subject_name}")
        btn.click()
        
        # Small wait for the JS to render the quiz cards for this subject
        page.wait_for_timeout(1000) 

        # 2. Scrape the cards currently visible in the container
        cards = page.locator(".qd-quiz-card").all()
        
        for card in cards:
            # Title is the first div inside the title span
            title_el = card.locator(".qd-quiz-title div").nth(0)
            quiz_title = title_el.inner_text().strip()
            
            # Topic is the second div
            topic_el = card.locator(".qd-quiz-title div").nth(1)
            topic_text = topic_el.inner_text().replace("Topic:", "").strip()
            
            # Link is the 'Attempt Quiz' button
            link = card.locator("a.qd-attempt-btn").get_attribute("href")

            # Store in the format you requested
            entry = {
                "exam_name": f"{subject_name}\n{quiz_title}",
                "link": link,
                "topics": topic_text
            }
            scraped_data.append(entry)

    # 3. Save to JSON
    final_json = json.dumps(scraped_data, indent=4)
    with open("test_series.json", "w", encoding='utf-8') as f:
        f.write(final_json)
    
    print(f"\n--- SCRAPED {len(scraped_data)} ITEMS ---")
    
    # Check if we actually got data
    assert len(scraped_data) > 0, "No data was scraped!"

    # 4. Optional: Process PDF generation logic if needed
    # (You can paste your PDF/Login logic from your original script here)
    # for entry in scraped_data[START_INDEX:]:
    #     ... your PDF logic ...