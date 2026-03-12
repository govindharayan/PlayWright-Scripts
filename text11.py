import os
import json
import re
import subprocess
from datetime import datetime, timedelta

WEEKLY_FOLDER = "weekly_timesheets"
PROJECTS_FILE = "projects.json"
DEFAULT_TASKS = {"Pre-sales": "NA - Others", "SDG": "NA - NA", "Trg": "Training Task", "Unknown": "NA - NA"}

def load_projects():
    if not os.path.exists(PROJECTS_FILE):
        # Create default projects if missing
        default = ["PLM - Electronic Data (Dept : SDG)", "Kohler 1.0 (Dept : SDG)", "Century Communities - Release 1.0 (Dept : SDG)"]
        with open(PROJECTS_FILE, 'w') as f: json.dump(default, f, indent=2)
        return default
    with open(PROJECTS_FILE, 'r') as f: return json.load(f)

def get_monday(date_obj):
    # Returns the Monday of that week
    return date_obj - timedelta(days=date_obj.weekday())

def main():
    projects = load_projects()
    
    # Reading inputs (usually provided by auto_filler)
    try:
        choice = input().strip().upper() 
        if choice == 'Y':
            date_obj = datetime.now()
        else:
            date_obj = datetime.strptime(input().strip(), "%Y-%m-%d")
        
        proj_idx = int(input().strip()) - 1
        project = projects[proj_idx]
        remarks = input().strip()
        time_in = input().strip().lower()
    except EOFError:
        return # End of input

    # Simple Time Parser (e.g., 1h30m or 45m or 2h)
    h = 0
    m = 0
    if 'h' in time_in:
        parts = time_in.split('h')
        h = int(parts[0]) if parts[0] else 0
        if 'm' in parts[1]:
            m = int(parts[1].replace('m', ''))
    elif 'm' in time_in:
        m = int(time_in.replace('m', ''))

    # Setup file paths
    monday_date = get_monday(date_obj)
    monday_str = monday_date.strftime('%Y-%m-%d')
    file_path = os.path.join(WEEKLY_FOLDER, f"{monday_str}.json")
    
    os.makedirs(WEEKLY_FOLDER, exist_ok=True)

    # Load existing weekly data or create new
    if os.path.exists(file_path):
        with open(file_path, 'r') as f: 
            weekly_data = json.load(f)
    else:
        # Consistency: Always YYYY-MM-DD
        weekly_data = {
            "selectedDate": monday_str, 
            "projectData": [], 
            "playwright_triggered": False
        }

    # Prepare project entry
    hrs_array = [0.0] * 5
    day_of_week = date_obj.weekday()
    if 0 <= day_of_week <= 4:
        hrs_array[day_of_week] = float(h + (m/60.0))

    match = re.search(r'\(Dept\s*:\s*([^)]+)\)', project)
    dept = match.group(1).strip() if match else "Unknown"
    
    weekly_data["projectData"].append({
        "Project": project, 
        "Task": DEFAULT_TASKS.get(dept, "NA - NA"),
        "Module": "NA", 
        "Artifact": "NA", 
        "Remarks": remarks, 
        "hrs": hrs_array
    })
    
    # Calculate Total Weekly Hours
    total_decimal_hrs = sum(sum(p["hrs"]) for p in weekly_data["projectData"])
    trigger = False
    
    # 40-hour logic
    if total_decimal_hrs >= 40.0 and not weekly_data.get("playwright_triggered", False):
        weekly_data["playwright_triggered"] = True
        trigger = True
    
    # Save the JSON
    with open(file_path, 'w') as f: 
        json.dump(weekly_data, f, indent=2)

    # Triggering Block (Manual Override)
    if trigger:
        target_file_date = monday_str
        print(f"\n[INFO] 40 Hours reached for week {target_file_date}.")
        
        # PLAYWRIGHT AUTOMATION COMMENTED OUT AS REQUESTED
        """
        try:
            # 1. Prepare JSON for Playwright
            subprocess.run(["python", "copyjson.py", target_file_date, "0"], cwd=r"D:\Scripts\weekly_timesheets", check=True)
            
            # 2. Run Playwright
            playwright_cmd = [
                "cmd", "/c", "npx", "playwright", "test", 
                "ppm_working_demo.spec.js", 
                "--headed", 
                "--project=chromium" 
            ]
            subprocess.run(playwright_cmd, cwd=r"D:\Scripts\ppm_demo_timesheetEntry", check=True)
            
        except Exception as e:
            print(f"Automation Error: {e}")
        """
        print(">>> Manual trigger required for Playwright automation.")

if __name__ == "__main__":
    main()