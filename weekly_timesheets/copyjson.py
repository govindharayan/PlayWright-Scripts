import json
import sys
from datetime import datetime, timedelta

DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

def get_monday_date():
    return (datetime.today() - timedelta(days=datetime.today().weekday())).strftime("%Y-%m-%d")

def filter_timesheet_data(day_index=None):
    """Filter timesheet data for a specific day of week (0=Monday to 6=Sunday)"""
    # Handle command-line argument
    if len(sys.argv) > 1:
        try:
            day_index = int(sys.argv[1])
            if not 0 <= day_index <= 6:
                raise ValueError
        except ValueError:
            print("Error: Argument must be integer 0-6 (0=Monday to 6=Sunday)")
            sys.exit(1)
    
    # Interactive prompt if no argument
    while day_index is None or not 0 <= day_index <= 6:
        try:
            day_index = int(input(f"Enter day index (0-6 where {DAY_NAMES}): "))
        except ValueError:
            print("Please enter a number 0-6")

    if day_index >= 5:
        print(f"Weekend ({DAY_NAMES[day_index]}) - no processing needed")
        return

    monday_date = get_monday_date()
    input_path = f"{monday_date}.json"
    output_path = r'D:\Scripts\ppm_demo_timesheetEntry\timesheet_Multiplerows.json'

    try:
        with open(input_path) as f:
            data = json.load(f)
        
        filtered_projects = [p for p in data['projectData'] if p['hrs'][day_index] > 0]
        
        with open(output_path, 'w') as f:
            json.dump({
                "Data_used": [{
                    "selectedDate": data["selectedDate"],
                    "projectData": filtered_projects
                }]
            }, f, indent=2)
        
        print(f"Processed {DAY_NAMES[day_index]}: {len(filtered_projects)} projects saved to {output_path}")
    
    except FileNotFoundError:
        print(f"Error: Input file {input_path} not found")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    filter_timesheet_data()