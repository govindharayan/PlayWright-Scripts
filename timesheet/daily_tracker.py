import os
import time
from datetime import datetime, timedelta
import csv
import logging

DAILY_TARGET = 8  # hours
REPORTS_DIR = "daily_reports"

# Configure logging to save events to a log file.
logging.basicConfig(
    filename='daily_tracker.log',
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

def ensure_dir():
    """Create the reports directory structure."""
    os.makedirs(REPORTS_DIR, exist_ok=True)
    now = datetime.now()
    year_month = now.strftime("%Y-%m")
    os.makedirs(os.path.join(REPORTS_DIR, year_month), exist_ok=True)
    logging.info("Directory structure ensured.")

def save_daily_report(entries, date):
    """Save the report (both email template and CSV) for a specific date."""
    if not entries:
        logging.info("No entries for %s. Skipping save.", date.strftime('%Y-%m-%d'))
        return

    # Create email template
    email_template = f"""Hello,

Please find my daily status update as of {date.strftime('%d/%m/%Y')}

"""
    for entry in entries:
        email_template += f"{entry['Team']}\t{entry['Task']}\t{entry['Time Spent']}\n"
    email_template += "\nThanks!"

    year_month = date.strftime("%Y-%m")
    base_filename = os.path.join(REPORTS_DIR, year_month, date.strftime('%Y-%m-%d'))

    try:
        # Save email template
        with open(f"{base_filename}_email.txt", "w") as f:
            f.write(email_template)
        # Save CSV report
        with open(f"{base_filename}_report.csv", "w", newline='') as f:
            writer = csv.DictWriter(f, fieldnames=["Team", "Task", "Time Spent"])
            writer.writeheader()
            writer.writerows(entries)
        logging.info("Saved daily report for %s.", date.strftime('%Y-%m-%d'))
    except Exception as e:
        logging.error("Error saving report for %s: %s", date.strftime('%Y-%m-%d'), str(e))

def daily_rollover(current_date):
    """Handle day change by saving the previous day's data if not already saved."""
    yesterday = current_date - timedelta(days=1)
    report_path = os.path.join(REPORTS_DIR, yesterday.strftime('%Y-%m'),
                               yesterday.strftime('%Y-%m-%d') + "_report.csv")
    if os.path.exists(report_path):
        return

    try:
        with open("temp_entries.csv", "r", newline='') as f:
            reader = csv.DictReader(f)
            entries = list(reader)
        save_daily_report(entries, yesterday)
        os.remove("temp_entries.csv")
        logging.info("Performed daily rollover for %s.", yesterday.strftime('%Y-%m-%d'))
    except FileNotFoundError:
        logging.info("No temporary entries file found for rollover.")
    except Exception as e:
        logging.error("Error during daily rollover: %s", str(e))

def main_loop():
    """Main loop for tracking entries."""
    ensure_dir()
    current_day = datetime.now().date()
    entries = []
    total_hours = 0

    logging.info("Starting main loop.")
    while True:
        now = datetime.now()

        # Check if the day has changed
        if now.date() != current_day:
            save_daily_report(entries, current_day)
            daily_rollover(now.date())
            current_day = now.date()
            entries = []
            total_hours = 0

        # Check if current time is within the tracking window (10 AM to 1 PM)
        if 10 <= now.hour <= 13:
            print(f"\n{now.strftime('%H:%M')} Entry")
            team = input("Team (e.g., Kohler/Century): ").strip()
            task = input("Task description: ").strip()

            # Time input validation (ensure units are mentioned)
            while True:
                time_spent = input("Time spent (e.g., '1 hour 30 minutes'): ").strip()
                if any(unit in time_spent.lower() for unit in ['hour', 'hr', 'minute', 'min']):
                    break
                print("Please include time units (e.g., '1 hour', '45 minutes')")
            
            entry = {"Team": team, "Task": task, "Time Spent": time_spent}
            entries.append(entry)
            logging.info("New entry added: %s", entry)

            # Save temporary entries (backup in case of unexpected shutdown)
            try:
                with open("temp_entries.csv", "w", newline='') as f:
                    writer = csv.DictWriter(f, fieldnames=["Team", "Task", "Time Spent"])
                    writer.writeheader()
                    writer.writerows(entries)
            except Exception as e:
                logging.error("Error saving temporary entries: %s", str(e))
            
            total_hours += 1

            # If daily target is reached, save the report and reset counters.
            if total_hours >= DAILY_TARGET:
                save_daily_report(entries, current_day)
                entries = []
                total_hours = 0
                logging.info("Daily target reached for %s, report saved.", current_day.strftime('%Y-%m-%d'))

            # Wait for one hour
            time.sleep(3600)
        else:
            # Outside the tracking window: sleep until the next tracking start time (10 AM next day)
            next_day = datetime.now() + timedelta(days=1)
            next_start = next_day.replace(hour=10, minute=0, second=0, microsecond=0)
            sleep_time = (next_start - datetime.now()).total_seconds()
            logging.info("Outside tracking window. Sleeping for %.0f seconds until next tracking window.", sleep_time)
            time.sleep(sleep_time)

if __name__ == "__main__":
    try:
        main_loop()
    except KeyboardInterrupt:
        logging.info("Script interrupted by user.")
        print("Script terminated by user.")
    except Exception as e:
        logging.error("Unhandled exception: %s", str(e))
        raise
