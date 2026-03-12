import os
import json
import glob
from datetime import datetime

def normalize_date(date_str):
    """Converts various date formats to YYYY-MM-DD"""
    formats = ["%d-%b-%y", "%d-%b-%Y", "%Y-%m-%d"]
    for fmt in formats:
        try:
            return datetime.strptime(date_str, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return date_str  # Return as is if no format matches

def merge_weekly_timesheets():
    source_folder = os.path.join('..', 'weekly_timesheets')
    output_file = 'timesheet_multiplerows.json'
    
    search_path = os.path.join(source_folder, "*.json")
    json_files = glob.glob(search_path)
    
    if not json_files:
        print(f"No JSON files found in {source_folder}")
        return

    combined_list = []

    for file_path in json_files:
        try:
            with open(file_path, 'r') as f:
                data = json.load(f)
                
                # Normalize the selectedDate to YYYY-MM-DD
                if "selectedDate" in data:
                    old_date = data["selectedDate"]
                    new_date = normalize_date(old_date)
                    data["selectedDate"] = new_date
                    print(f"Normalized {os.path.basename(file_path)}: {old_date} -> {new_date}")
                
                combined_list.append(data)
        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    # Sort by date so Playwright processes them in order
    combined_list.sort(key=lambda x: x['selectedDate'])

    final_data = {
        "Data_used": combined_list
    }

    with open(output_file, 'w') as f:
        json.dump(final_data, f, indent=2)
    print(f"\nSuccess! Merged {len(combined_list)} files into {output_file}")

if __name__ == "__main__":
    merge_weekly_timesheets()