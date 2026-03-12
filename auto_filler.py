import calendar
import subprocess
import random
import os
from datetime import datetime, timedelta

EXISTING_SCRIPT = "text11.py"

def get_tasks(bank, target):
    """Ensures exactly 8.0 hours are returned by trying combinations."""
    for _ in range(500): # Increased attempts for better accuracy
        sel = []
        cur = 0.0
        pool = bank[:]
        random.shuffle(pool)
        for t in pool:
            if cur + t['hrs'] <= target:
                sel.append(t)
                cur += t['hrs']
        if abs(cur - target) < 0.01:
            return sel
    # Fallback to a single entry if randomizer fails
    return [{"project": "1", "desc": "Project Documentation and Support", "hrs": 8.0}]

def get_active_weeks(year, month):
    """Calculates Mon-Fri ranges starting from the first Monday of the month."""
    # Find first Monday of the target month
    curr = datetime(year, month, 1)
    while curr.weekday() != 0: # 0 is Monday
        curr += timedelta(days=1)
    start_date = curr

    # Find the Friday of the week containing the last day of the month
    last_day_val = calendar.monthrange(year, month)[1]
    last_day_dt = datetime(year, month, last_day_val)
    end_limit = last_day_dt
    while end_limit.weekday() != 4: # 4 is Friday
        end_limit += timedelta(days=1)

    weeks = []
    temp_mon = start_date
    while temp_mon < end_limit:
        weeks.append((temp_mon, temp_mon + timedelta(days=4)))
        temp_mon += timedelta(days=7)
    
    return weeks

def run():
    try:
        y = int(input("Year (YYYY): "))
        m = int(input("Month (1-12): "))
        
        # Calculate available weeks
        weeks = get_active_weeks(y, m)
        
        print("\nGeneration Options:")
        print(f"0. Entire Month Period ({weeks[0][0].strftime('%Y-%m-%d')} to {weeks[-1][1].strftime('%Y-%m-%d')})")
        for i, (mon, fri) in enumerate(weeks, 1):
            # Display ranges clearly (e.g., Dec 29 - Jan 02)
            print(f"{i}. Week {i} ({mon.strftime('%b %d')} - {fri.strftime('%b %d, %Y' if fri.year != mon.year else '%b %d')})")
        
        # Choice Validation
        while True:
            choice = input(f"\nSelect week option (0-{len(weeks)}): ").strip()
            if choice.isdigit() and 0 <= int(choice) <= len(weeks):
                choice_int = int(choice)
                break
            print(f"Invalid selection. Please enter 0 to {len(weeks)}.")

        print("\nNote: Any day number entered below will be skipped across month boundaries.")
        raw_skip = input("Enter day numbers to SKIP/LEAVE (comma separated e.g. 1,15,25): ").strip()
        skip_days = [int(x.strip()) for x in raw_skip.split(',')] if raw_skip else []

    except ValueError:
        print("Invalid input format. Use numbers only.")
        return
    
    bank = []
    if not os.path.exists('tasks_bank.txt'):
        print("Error: tasks_bank.txt not found!")
        return
        
    with open('tasks_bank.txt', 'r') as f:
        for l in f:
            p = l.strip().split('|')
            if len(p) == 3: bank.append({"project": p[0], "desc": p[1], "hrs": float(p[2])})

    # Determine date range
    if choice_int == 0:
        process_start = weeks[0][0]
        process_end = weeks[-1][1]
    else:
        process_start = weeks[choice_int - 1][0]
        process_end = weeks[choice_int - 1][1]

    curr_date = process_start
    print(f"\n--- Starting Generation from {process_start.strftime('%Y-%m-%d')} ---")

    while curr_date <= process_end:
        if curr_date.weekday() < 5: # Monday to Friday
            date_str = curr_date.strftime('%Y-%m-%d')
            
            # IMPROVED SKIP LOGIC: 
            # We check if the day number is in skip_days, regardless of the month.
            # This ensures Jan 1st is skipped if '1' is in the list during Week 5.
            if curr_date.day in skip_days:
                day_tasks = [{"project": "1", "desc": "Leave/Holiday", "hrs": 8.0}]
                status_label = "LEAVE"
            else:
                day_tasks = get_tasks(bank, 8.0)
                status_label = "WORK"
            
            print(f">> Processing {date_str}...")
            for t in day_tasks:
                t_str = f"{int(t['hrs'])}h" if t['hrs'].is_integer() else f"{int(t['hrs']*60)}m"
                stdin_data = f"N\n{date_str}\n{t['project']}\n{t['desc']}\n{t_str}\n"
                
                # Call text11.py
                proc = subprocess.Popen(['python', EXISTING_SCRIPT], stdin=subprocess.PIPE, text=True)
                proc.communicate(input=stdin_data)
                print(f"   [{status_label}] {t_str}: {t['desc']}")

        curr_date += timedelta(days=1)

    print("\nProcess finished successfully.")

if __name__ == "__main__":
    run()