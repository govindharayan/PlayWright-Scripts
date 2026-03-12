import os
import json
from datetime import datetime
import subprocess
import tempfile
import sys

# Configuration
OUTPUT_FOLDER = "output"

def get_date_input():
    """Get date input from user with validation"""
    while True:
        choice = input("Is this for today? (N for today/P for past date): ").strip().upper()
        
        if choice == 'N':
            return datetime.now().strftime("%Y-%m-%d")
        elif choice == 'P':
            date_str = input("Enter date (YYYY-MM-DD): ").strip()
            try:
                # Validate date format
                datetime.strptime(date_str, "%Y-%m-%d")
                return date_str
            except ValueError:
                print("Invalid date format. Please use YYYY-MM-DD.")
        else:
            print("Invalid choice. Please enter N or P.")

def load_or_create_daily_data(date_str):
    """Load existing daily data or create new entry for specific date"""
    folder_path = os.path.join(OUTPUT_FOLDER, date_str)
    file_path = os.path.join(folder_path, "tasks.json")
    
    os.makedirs(folder_path, exist_ok=True)
    
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            return json.load(f)
    
    return {
        "date": date_str,
        "tasks": [],
        "email_triggered": False,
        "total_minutes": 0
    }

def save_daily_data(data):
    """Save daily data to JSON file"""
    date_str = data["date"]
    folder_path = os.path.join(OUTPUT_FOLDER, date_str)
    file_path = os.path.join(folder_path, "tasks.json")
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)

def add_task_entry(date_str, task, hours, minutes):
    """Add new task entry to daily data"""
    data = load_or_create_daily_data(date_str)
    data["tasks"].append({
        "task": task,
        "hours": hours,
        "minutes": minutes
    })
    data["total_minutes"] += hours * 60 + minutes
    save_daily_data(data)
    return data

def format_time(total_minutes):
    """Convert total minutes to hours and minutes"""
    return total_minutes // 60, total_minutes % 60

def create_email_content(data):
    """Create professional email content"""
    email_date = datetime.strptime(data["date"], "%Y-%m-%d").strftime("%A, %B %d, %Y")
    total_hours, total_minutes = format_time(data["total_minutes"])
    
    content = f"Subject: Daily Status Update - {data['date']}\n\n"
    content += f"Hello Team,\n\n"
    content += f"Here's a summary of my completed tasks for {email_date}:\n\n"
    
    for i, entry in enumerate(data["tasks"], 1):
        content += f"{i}. {entry['task']} ({entry['hours']}h {entry['minutes']}m)\n"
    
    content += f"\nTotal time: {total_hours}h {total_minutes}m\n"
    content += "\nRegards,\n[Your Name]\n"
    content += "[Your Position]"
    
    return content

def create_and_open_email_file(content):
    """Create a temporary file with email content and open it"""
    try:
        # Create temp file
        with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.txt') as f:
            f.write(content)
            temp_path = f.name
        
        # Open the file with default text editor
        if os.name == 'nt':  # Windows
            os.startfile(temp_path)
        else:  # Mac/Linux
            opener = 'open' if sys.platform == 'darwin' else 'xdg-open'
            subprocess.call([opener, temp_path])
        
        print("\nEmail content has been saved to a temporary file and opened.")
        print("Please copy the content and paste it into your Outlook email.")
        print(f"\nFile location: {temp_path}")
    except Exception as e:
        print(f"\nError creating email file: {e}")
        print("\nHere's your email content to copy manually:\n")
        print(content)

def main():
    """Main application workflow"""
    os.makedirs(OUTPUT_FOLDER, exist_ok=True)
    
    # Get date input
    date_str = get_date_input()
    
    # Get task input
    task = input("What task did you work on? ").strip()
    
    # Get time input
    while True:
        time_input = input("Time spent (e.g., '1h30m', '45m', '2h'): ").strip().lower()
        hours, minutes = 0, 0
        
        try:
            if 'h' in time_input:
                h_part, m_part = time_input.split('h') if 'h' in time_input else ('0', time_input)
                hours = int(h_part) if h_part else 0
                minutes = int(m_part.replace('m', '')) if 'm' in m_part else 0
            elif 'm' in time_input:
                minutes = int(time_input.replace('m', ''))
            
            if hours >= 0 and minutes >= 0:
                break
        except ValueError:
            pass
        
        print("Invalid input. Please use format like '1h30m' or '45m'")
    
    # Add entry and show summary
    data = add_task_entry(date_str, task, hours, minutes)
    total_hours, total_minutes = format_time(data["total_minutes"])
    print(f"\nEntry added. {date_str} total: {total_hours}h {total_minutes}m")
    
    # Trigger email after 8 hours regardless of date
    if data["total_minutes"] >= 480 and not data["email_triggered"]:
        data["email_triggered"] = True
        save_daily_data(data)
        email_content = create_email_content(data)
        create_and_open_email_file(email_content)

if __name__ == "__main__":
    main()