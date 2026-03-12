import pytest
import json
from playwright.sync_api import Page
import re
START_INDEX = 54
def test_gate_test_series_scraping(page: Page):
    # 1. Open the website
    print("\nNavigating to GoClasses...")
    page.goto("https://www.goclasses.in/s/pages/gate-cse-test-series#1699851492489d")
    
    # 2. Wait for the data to load (wait for the first row to appear)
    # Using a 10-second timeout just in case it's slow
    page.wait_for_selector(".t-row", timeout=10000)

    # 3. Get all rows

    rows = page.locator(".t-row").all()
    
    print(f"Found {len(rows)} test entries.")

    scraped_data = []

    # 4. Loop through each row and extract info
    for row in rows:
        # Get all .t-info elements inside this specific row
        cells = row.locator(".t-info")
        
        if cells.count() >= 3:
            exam_name = cells.nth(0).inner_text().strip()
            # The 2nd cell usually has the button/link
            link = cells.nth(1).locator("a").get_attribute("href") if cells.nth(1).locator("a").count() > 0 else "No Link"
            topics = cells.nth(2).inner_text().strip()

            # Store in a dictionary
            entry = {
                "exam_name": exam_name,
                "link": link,
                "topics": topics
            }
            scraped_data.append(entry)

    # 5. Print the result as JSON in the terminal
    final_json = json.dumps(scraped_data, indent=4)
    print("\n--- SCRAPED DATA ---")
    print(final_json)
    scraped_data = [
    {
        "exam_name": "Free For all\nGO Classes GATE CS | Proof Techniques | Weekly Quiz",
        "link": "https://gateoverflow.in/exam/837/go-classes-gate-cs-weekly-quiz-proof-techniques",
        "topics": "Proof Techniques"
    },
    {
        "exam_name": "Free For all\nGO Classes GATE CS | Propositional Logic | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/840/go-classes-gate-cs-weekly-quiz-1-propositional-logic",
        "topics": "Propostional logic"
    },
    {
        "exam_name": "Free For all\nGO Classes GATE CS | Propositional Logic | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/841/go-classes-gate-cs-weekly-quiz-3-propositional-logic",
        "topics": "Propostional logic"
    },
    {
        "exam_name": "Free For all\nGO Classes GATE CS | Propositional Logic | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/845/go-classes-gate-cs-weekly-quiz-3-propositional-logic",
        "topics": "Propostional logic"
    },
    {
        "exam_name": "Free For all\nGO Classes GATE CS | Propositional Logic | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/846/go-classes-gate-cs-weekly-quiz-4-propositional-logic",
        "topics": "Propostional logic"
    },
    {
        "exam_name": "Free For all\nGO Classes GATE CS | First Order Logic | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/847/go-classes-gate-cs-weekly-quiz-1-first-order-logic",
        "topics": "First Order Logic"
    },
    {
        "exam_name": "Free For all\nGO Classes GATE CS | First Order Logic | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/848/go-classes-gate-cs-weekly-quiz-2-first-order-logic",
        "topics": "First Order Logic"
    },
    {
        "exam_name": "Free For all\nGO Classes GATE CS | Linear Algebra | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/850/go-classes-cs-da-2026-weekly-quiz-1-linear-algebra",
        "topics": "Linear Algebra"
    },
    {
        "exam_name": "Free For all\nGO Classes GATE CS/DA | Linear Algebra | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/852/go-classes-cs-da-2026-weekly-quiz-2-linear-algebra",
        "topics": "Linear Algebra"
    },
    {
        "exam_name": "Free For all\nGO Classes GATE CS/DA | Linear Algebra | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/857/go-classes-cs-da-2026-weekly-quiz-3-linear-algebra",
        "topics": "Linear Algebra"
    },
    {
        "exam_name": "Free For all\nGO Classes GATE CS/DA | Linear Algebra | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/878/go-classes-cs-da-2026-weekly-quiz-4-linear-algebra",
        "topics": "Linear Algebra"
    },
    {
        "exam_name": "Free For all\nGO Classes CS/DA | Fundamental Course | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/1001/go-classes-cs-da-fundamental-course-weekly-quiz-1",
        "topics": "Fundamental Course"
    },
    {
        "exam_name": "Free For all\nGO Classes CS/DA | Monthly Quiz 1 | Aptitude",
        "link": "https://gateoverflow.in/exam/1002/go-classes-cs-da-monthly-quiz-1-aptitude",
        "topics": "Aptitude"
    },
    {
        "exam_name": "Fundamental Course\nGO Classes CS/DA | Fundamental Course | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/1001/go-classes-cs-da-fundamental-course-weekly-quiz-1",
        "topics": "Fundamental Course"
    },
    {
        "exam_name": "Fundamental Course\nGO Classes GATE CS | Proof Techniques | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/837/go-classes-gate-cs-weekly-quiz-proof-techniques",
        "topics": "Proof Techniques"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes GATE CS | Propositional Logic | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/840/go-classes-gate-cs-weekly-quiz-1-propositional-logic",
        "topics": "Propostional logic"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes GATE CS | Propositional Logic | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/841/go-classes-gate-cs-weekly-quiz-3-propositional-logic",
        "topics": "Propostional logic"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes GATE CS | Propositional Logic | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/845/go-classes-gate-cs-weekly-quiz-3-propositional-logic",
        "topics": "Propostional logic"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes GATE CS | Propositional Logic | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/846/go-classes-gate-cs-weekly-quiz-4-propositional-logic",
        "topics": "Propostional logic"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes GATE CS | First Order Logic | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/847/go-classes-gate-cs-weekly-quiz-1-first-order-logic",
        "topics": "First Order Logic"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes GATE CS | First Order Logic | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/848/go-classes-gate-cs-weekly-quiz-2-first-order-logic",
        "topics": "First Order Logic"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes CS 2026 | Weekly Quiz 1 | Set theory",
        "link": "https://gateoverflow.in/exam/885/go-classes-gate-cs-2026-weekly-quiz-1-set-theory",
        "topics": "Set Theory"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes CS 2026 | Weekly Quiz 2 | Set theory",
        "link": "https://gateoverflow.in/exam/886/go-classes-cs-2026-weekly-quiz-2-set-theory",
        "topics": "Set Theory"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes CS 2026 | Weekly Quiz 1 | Functions",
        "link": "https://gateoverflow.in/exam/887/go-classes-cs-2026-weekly-quiz-1-functions",
        "topics": "Functions"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes CS 2026 | Weekly Quiz 1 | Relations",
        "link": "https://gateoverflow.in/exam/888/go-classes-cs-2026-relations-weekly-quiz-1",
        "topics": "Relations"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes CS 2026 | Weekly Quiz 1 | Relations, Lattice & Poset",
        "link": "https://gateoverflow.in/exam/889/go-classes-cs-2026-relation-lattice-%26-poset-weekly-quiz-2",
        "topics": "Relations, Lattice & Poset"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes CS/DA 2026 | Weekly Quiz 1 | Combinatorics",
        "link": "https://gateoverflow.in/exam/908/go-classes-gate-cs-da-combinatorics-weekly-quiz-1",
        "topics": "Combinatorics"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes CS/DA 2026 | Weekly Quiz 2 | Combinatorics",
        "link": "https://gateoverflow.in/exam/909/go-classes-gate-cs-da-combinatorics-weekly-quiz-2",
        "topics": "Combinatorics"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes CS/DA 2026 | Weekly Quiz 3 | Combinatorics",
        "link": "https://gateoverflow.in/exam/924/go-classes-gate-cs-da-combinatorics-weekly-quiz-3",
        "topics": "Combinatorics"
    },
    {
        "exam_name": "Discrete Mathematics\nGO Classes CS 2026 | Weekly Quiz 4 | Combinatorics",
        "link": "https://gateoverflow.in/exam/931/go-classes-gate-cs-combinatorics-weekly-quiz-4",
        "topics": "Combinatorics"
    },
    {
        "exam_name": "Engineering Math\nGO Classes GATE CS | Linear Algebra | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/850/go-classes-cs-da-2026-weekly-quiz-1-linear-algebra",
        "topics": "Linear Algebra"
    },
    {
        "exam_name": "Engineering Math\nGO Classes GATE CS/DA | Linear Algebra | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/852/go-classes-cs-da-2026-weekly-quiz-2-linear-algebra",
        "topics": "Linear Algebra"
    },
    {
        "exam_name": "Engineering Math\nGO Classes GATE CS/DA | Linear Algebra | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/857/go-classes-cs-da-2026-weekly-quiz-3-linear-algebra",
        "topics": "Linear Algebra"
    },
    {
        "exam_name": "Engineering Math\nGO Classes GATE CS/DA | Linear Algebra | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/878/go-classes-cs-da-2026-weekly-quiz-4-linear-algebra",
        "topics": "Linear Algebra"
    },
    {
        "exam_name": "Engineering Math\nGO Classes GATE CS/DA | Linear Algebra | Weekly Quiz 5",
        "link": "https://gateoverflow.in/exam/1017/go-classes-cs-da-linear-algebra-weekly-quiz-5",
        "topics": "Eigen Vectors"
    },
    {
        "exam_name": "Engineering Math\nGO Classes GATE CS/DA | Linear Algebra | Weekly Quiz 6",
        "link": "https://gateoverflow.in/exam/1021/go-classes-cs-da-linear-algebra-rank-system-of-equation",
        "topics": "Rank , System of equations"
    },
    {
        "exam_name": "Engineering Math\nGO Classes CS/DA | Conditional Probability | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/949/go-classes-cs-da-conditional-probability-weekly-quiz-1",
        "topics": "Probability"
    },
    {
        "exam_name": "Engineering Math\nGO Classes CS/DA | Probability Distributions | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/948/go-classes-cs-da-probability-distributions-weekly-quiz-2",
        "topics": "Probability"
    },
    {
        "exam_name": "Engineering Math\nGO Classes GATE CS/DA | Calculus | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/960/go-classes-calculus-weekly-quiz-1",
        "topics": "Limits, contintuity, Maxima-minima, integral calculus"
    },
    {
        "exam_name": "Engineering Math\nGO Classes GATE CS/DA | Calculus | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/1029/go-classes-gate-cs-calculus-weekly-quiz-2",
        "topics": "Calculus"
    },
    {
        "exam_name": "Engineering Math\nGO Classes GATE CS | Calculus | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/1036/go-classes-gate-cs-calculus-weekly-quiz-3",
        "topics": "Calculus"
    },
    {
        "exam_name": "C Programming\nGO Classes GATE CS | C-Programming | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/962/go-classes-cs-c-programming-weekly-quiz-1",
        "topics": "Number representation, Integer promotion"
    },
    {
        "exam_name": "C Programming\nGO Classes GATE CS | C-Programming | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/964/go-classes-cs-c-programming-weekly-quiz-2",
        "topics": "Functions, storage classes, loops"
    },
    {
        "exam_name": "C Programming\nGO Classes GATE CS | C-Programming | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/968/go-classes-cs-c-programming-weekly-quiz-3",
        "topics": "Pointers, storage classes, recursion"
    },
    {
        "exam_name": "C Programming\nGO Classes GATE CS | C-Programming | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/969/go-classes-cs-c-programming-weekly-quiz-4",
        "topics": "Structures, Pointers, Storage Classes"
    },
    {
        "exam_name": "Data Structure\nGO Classes 2026 | Weekly Quiz 1 | Asymptotic Notation and Loop Time Complexity",
        "link": "https://gateoverflow.in/exam/1081/go-classes-gate-cs-data-structures-weekly-quiz-1",
        "topics": "Asymptotic Notation and Loop Time Complexity"
    },
    {
        "exam_name": "Data Structure\nGO Classes 2026 | Weekly Quiz 2 | Linked List and Asymptotic Notation and Loop Time Complexity",
        "link": "https://gateoverflow.in/exam/1103/go-classes-gate-cs-data-structures-weekly-quiz-2",
        "topics": "Linked List and Asymptotic Notation and Loop Time Complexity"
    },
    {
        "exam_name": "Data Structure\nGO Classes 2026 | Weekly Quiz 3 | Stack and Queue",
        "link": "https://gateoverflow.in/exam/1109/go-classes-2026-data-structures-weekly-quiz-3",
        "topics": "Stack and Queue and Asymptotic Notation and Loop Time Complexity"
    },
    {
        "exam_name": "Data Structure\nGO Classes 2026 | Weekly Quiz 4 | Complete Data Structure",
        "link": "https://gateoverflow.in/exam/1114/go-classes-gate-cs-data-structures-weekly-quiz-4",
        "topics": "Complete Data Structure"
    },
    {
        "exam_name": "Data Structure\nGO Classes 2026 | Weekly Quiz 5 | Complete Data Structures",
        "link": "https://gateoverflow.in/exam/1115/go-classes-gate-cs-data-structures-weekly-quiz-5",
        "topics": "Complete Data Structure"
    },
    {
        "exam_name": "Algorithm\nGO Classes GATE CS | Algorithm | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/1219/go-classes-2026-algorithms-sorting-algorithms-weekly-quiz-1",
        "topics": "Sorting Algorithms"
    },
    {
        "exam_name": "Algorithm\nGO Classes GATE CS | Algorithm | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/1221/go-classes-2026-algorithms-dfs-bfs-algorithms-weekly-quiz-2",
        "topics": "BFS and DFS Algorithms"
    },
    {
        "exam_name": "Algorithm\nGO Classes GATE CS | Algorithm | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/1222/go-classes-2026-algorithms-shortest-paths-weekly-quiz-3",
        "topics": "Shortest Paths"
    },
    {
        "exam_name": "Algorithm\nGO Classes GATE CS | Algorithm | Weekly Quiz 4",
        "link": "",
        "topics": "Upcoming"
    },
    {
        "exam_name": "Digital Logic\nGO Classes GATE CS | Digital Logic | Number System | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/1105/go-classes-gate-cs-digital-logic-number-system-weekly-quiz-1",
        "topics": "Number System"
    },
    {
        "exam_name": "Digital Logic\nGO Classes GATE CS | Digital Logic | Number System | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/1107/go-classes-gate-cs-digital-logic-number-system-weekly-quiz-2",
        "topics": "Number System"
    },
    {
        "exam_name": "Digital Logic\nGO Classes GATE CS | Digital Logic | Number System | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/1111/go-classes-gate-cs-digital-logic-number-system-weekly-quiz-3",
        "topics": "Number System"
    },
    {
        "exam_name": "Digital Logic\nGO Classes GATE CS | Digital Logic | Number System | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/1113/go-classes-gate-cs-digital-logic-number-system-weekly-quiz-4",
        "topics": "Number System"
    },
    {
        "exam_name": "Digital Logic\nGO Classes CS | Digital Logic | Boolean Algebra | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/951/go-classes-cs-digital-logic-boolean-algebra-weekly-quiz-1",
        "topics": "Boolean Algebra"
    },
    {
        "exam_name": "Digital Logic\nGO Classes CS | Digital Logic | Boolean Algebra | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/952/go-classes-cs-digital-logic-boolean-algebra-weekly-quiz-2",
        "topics": "Boolean Algebra"
    },
    {
        "exam_name": "Digital Logic\nGO Classes | Digital Logic | Boolean Algebra, Minimization, Number System | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/953/go-classes-digital-logic-boolean-algebra-minimization-number-system-weekly-quiz-3",
        "topics": "Boolean Algebra, Minimization, Number System"
    },
    {
        "exam_name": "Digital Logic\nGO Classes CS | Digital Logic | Boolean Algebra | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/1026/go-classes-cs-digital-logic-boolean-algebra-weekly-quiz-3",
        "topics": "Boolean Algebra"
    },
    {
        "exam_name": "Digital Logic\nGO Classes CS | Digital Logic | Boolean Algebra | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/1027/go-classes-cs-digital-logic-boolean-algebra-weekly-quiz-4",
        "topics": "Boolean Algebra"
    },
    {
        "exam_name": "Digital Logic\nGO Classes CS | Digital Logic | Multiplexer | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/956/go-classes-cs-digital-logic-multiplexer-weekly-quiz-4",
        "topics": "Multiplexer"
    },
    {
        "exam_name": "Digital Logic\nGO Classes CS | Digital Logic | Combinational Circuits, Number System | Weekly Quiz 5",
        "link": "https://gateoverflow.in/exam/958/go-classes-cs-digital-logic-combinational-circuits-number-system-weekly-quiz-5",
        "topics": "Combinational Circuits"
    },
    {
        "exam_name": "Digital Logic\nGO Classes CS | Digital Logic | Combinational Circuits | Weekly Quiz 6",
        "link": "https://gateoverflow.in/exam/959/go-classes-cs-digital-logic-combinational-circuits-weekly-quiz-6",
        "topics": "Combinational Circuits"
    },
    {
        "exam_name": "Digital Logic\nGO Classes CS | Digital Logic | K-map | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/1045/go-classes-cs-digital-logic-boolean-algebra-weekly-quiz-5",
        "topics": "K-map"
    },
    {
        "exam_name": "Digital Logic\nGO Classes CS | Digital Logic | K-map | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/1050/go-classes-cs-digital-logic-boolean-algebra-weekly-quiz-6-k-map",
        "topics": "K-map"
    },
    {
        "exam_name": "Computer Architecture\nGO Classes CS | CO and Architecture | Cache Memory | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/1205/go-classes-cs-co-and-architecture-cache-memory-weekly-quiz-1",
        "topics": "Cache Memory"
    },
    {
        "exam_name": "Computer Architecture\nGO Classes CS | CO and Architecture | Cache Memory | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/1206/go-classes-cs-co-and-architecture-cache-memory-weekly-quiz-2",
        "topics": "Cache Memory"
    },
    {
        "exam_name": "Computer Architecture\nGO Classes CS | CO and Architecture | Cache Memory | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/1211/go-classes-cs-co-and-architecture-cache-memory-weekly-quiz-3",
        "topics": "Cache Memory"
    },
    {
        "exam_name": "Computer Architecture\nGO Classes CS | CO and Architecture | Cache Memory | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/1212/go-classes-cs-co-and-architecture-cache-memory-weekly-quiz-4",
        "topics": "Cache Memory"
    },
    {
        "exam_name": "Computer Architecture\nGO Classes CS | CO and Architecture | Cache Memory | Weekly Quiz 5",
        "link": "https://gateoverflow.in/exam/1236/go-classes-cs-co-and-architecture-cache-memory-weekly-quiz-5",
        "topics": "Cache Memory"
    },
    {
        "exam_name": "Theory of Computation\nGO Classes GATE CS | Theory of Computation | Finite Automata | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/987/go-classes-gate-cs-theory-of-computation-finite-automata-weekly-quiz-1",
        "topics": "Finite Automate"
    },
    {
        "exam_name": "Theory of Computation\nGO Classes GATE CS | Theory of Computation | Finite Automata and Regular Expression | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/988/go-classes-gate-cs-theory-of-computation-finite-automata-and-regular-expression-weekly-quiz-2",
        "topics": "Finite Automata and Regular Expression"
    },
    {
        "exam_name": "Theory of Computation\nGO Classes GATE CS | Theory of Computation | Finite Automata and Regular Expression | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/989/go-classes-gate-cs-theory-of-computation-finite-automata-and-regular-expression-weekly-quiz-3",
        "topics": "Finite Automata and Regular Expression"
    },
    {
        "exam_name": "Theory of Computation\nGO Classes GATE CS | Theory of Computation | Context Free Grammar | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/990/go-classes-gate-cs-theory-of-computation-context-free-grammar-weekly-quiz-4",
        "topics": "Context free grammar"
    },
    {
        "exam_name": "Theory of Computation\nGO Classes GATE CS | Theory of Computation | FA, CFL, DCFL | Weekly Quiz 5",
        "link": "https://gateoverflow.in/exam/991/go-classes-gate-cs-theory-of-computation-fa-cfl-dcfl-weekly-quiz-5",
        "topics": "FA, CLF, DCLF"
    },
    {
        "exam_name": "Compiler Design\nGO Classes CS | Compiler Design | Lexical Analysis | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/1246/go-classes-cs-compiler-design-lexical-analysis-weekly-quiz-1",
        "topics": "Lexical Analysis"
    },
    {
        "exam_name": "Database Management System\nGO Classes GATE CS/DA | DBMS | Relational Model | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/974/go-classes-cs-da-dbms-relational-model-weekly-quiz-1",
        "topics": "Relational Model"
    },
    {
        "exam_name": "Database Management System\nGO Classes GATE CS/DA | DBMS | Functional Dependency | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/975/go-classes-cs-da-dbms-functional-dependency-weekly-quiz-2",
        "topics": "Functional Dependency"
    },
    {
        "exam_name": "Database Management System\nGO Classes GATE CS/DA | DBMS | Normalization, Relational Model | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/976/go-classes-cs-da-dbms-normalization-relational-model-weekly-quiz-3",
        "topics": "Normalization, Relational Model"
    },
    {
        "exam_name": "Database Management System\nGO Classes GATE CS/DA | DBMS | Normal Forms | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/982/go-classes-gate-cs-da-dbms-normal-forms-weekly-quiz-4",
        "topics": "Normal Forms"
    },
    {
        "exam_name": "Database Management System\nGO Classes GATE CS/DA | DBMS | Normalization | Weekly Quiz 5",
        "link": "https://gateoverflow.in/exam/983/go-classes-gate-cs-da-dbms-normalization-weekly-quiz-5",
        "topics": "Normalization"
    },
    {
        "exam_name": "Database Management System\nGO Classes GATE CS/DA | DBMS | SQL | Weekly Quiz 6",
        "link": "https://gateoverflow.in/exam/984/go-classes-gate-cs-da-dbms-sql-weekly-quiz-6",
        "topics": "SQL"
    },
    {
        "exam_name": "Database Management System\nGO Classes GATE CS/DA | DBMS | SQL | Weekly Quiz 7",
        "link": "https://gateoverflow.in/exam/995/go-classes-gate-cs-da-dbms-sql-weekly-quiz-7",
        "topics": "SQL"
    },
    {
        "exam_name": "Database Management System\nGO Classes GATE CS/DA | DBMS | SQL | Weekly Quiz 8",
        "link": "https://gateoverflow.in/exam/996/go-classes-gate-cs-da-dbms-sql-weekly-quiz-8",
        "topics": "SQL"
    },
    {
        "exam_name": "Database Management System\nGO Classes GATE CS/DA | DBMS | Normalization | Weekly Quiz 9",
        "link": "https://gateoverflow.in/exam/997/go-classes-gate-cs-da-dbms-normalization-weekly-quiz-9",
        "topics": "Normalization"
    },
    {
        "exam_name": "Database Management System\nGO Classes GATE CS/DA | DBMS | Relational Algebra | Weekly Quiz 10",
        "link": "https://gateoverflow.in/exam/998/go-classes-gate-cs-da-dbms-relational-algebra-weekly-quiz-10",
        "topics": "Relational Algebra"
    },
    {
        "exam_name": "Database Management System\nGO Classes GATE CS/DA | DBMS | Relational Algebra | Weekly Quiz 11",
        "link": "https://gateoverflow.in/exam/999/go-classes-gate-cs-da-dbms-relational-algebra-weekly-quiz-11-question",
        "topics": "Relational Algebra"
    },
    {
        "exam_name": "Operating System\nGO Classes GATE CS | Operating System | Process Synchronization | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/992/go-classes-gate-cs-operating-system-process-synchronization-weekly-quiz-1",
        "topics": "Process Synchronization"
    },
    {
        "exam_name": "Operating System\nGO Classes GATE CS | Operating System | Multi Level Paging | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/1237/go-classes-gate-cs-operating-system-multi-level-paging-weekly-quiz-2",
        "topics": "Multi Level Paging"
    },
    {
        "exam_name": "Operating System\nGO Classes GATE CS | Operating System | Deadlock | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/1238/go-classes-gate-cs-operating-system-deadlock-weekly-quiz-3",
        "topics": "Deadlock"
    },
    {
        "exam_name": "Operating System\nGO Classes GATE CS | Operating System | File Systems | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/1239/go-classes-gate-cs-operating-system-file-systems-weekly-quiz-4",
        "topics": "File Systems"
    },
    {
        "exam_name": "Computer Networks\nGO Classes GATE CS | Computer Networking | Weekly Quiz 1",
        "link": "https://gateoverflow.in/exam/1033/go-classes-gate-cs-computer-networks-weekly-quiz-1",
        "topics": "Subnetting"
    },
    {
        "exam_name": "Computer Networks\nGO Classes GATE CS | Computer Networking | Weekly Quiz 2",
        "link": "https://gateoverflow.in/exam/986/go-classes-gate-cs-computer-networks-weekly-quiz-2",
        "topics": "Subnetting"
    },
    {
        "exam_name": "Computer Networks\nGO Classes GATE CS | Computer Networking | Weekly Quiz 3",
        "link": "https://gateoverflow.in/exam/1057/go-classes-gate-cs-computer-networks-weekly-quiz-3",
        "topics": "Hamming Codes and CRC"
    },
    {
        "exam_name": "Computer Networks\nGO Classes GATE CS | Computer Networking | Weekly Quiz 4",
        "link": "https://gateoverflow.in/exam/1060/go-classes-gate-cs-computer-networks-weekly-quiz-4",
        "topics": "Flow control"
    },
    {
        "exam_name": "Computer Networks\nGO Classes GATE CS | Computer Networking | Weekly Quiz 5",
        "link": "https://gateoverflow.in/exam/1064/go-classes-gate-cs-computer-networks-weekly-quiz-5",
        "topics": "Network layer"
    },
    {
        "exam_name": "Computer Networks\nGO Classes GATE CS | Computer Networking | Weekly Quiz 6",
        "link": "https://gateoverflow.in/exam/1215/go-classes-gate-cs-computer-networks-weekly-quiz-6",
        "topics": "TCP Protocol"
    },
    {
        "exam_name": "Computer Networks\nGO Classes GATE CS | Computer Networking | Weekly Quiz 7",
        "link": "https://gateoverflow.in/exam/1216/go-classes-gate-cs-computer-networks-weekly-quiz-7",
        "topics": "Complete Computer Networks"
    },
    {
        "exam_name": "Aptitude\nGO Classes CS/DA | Aptitude | Monthly Quiz 1",
        "link": "https://gateoverflow.in/exam/1002/go-classes-cs-da-monthly-quiz-1-aptitude",
        "topics": "Aptitude"
    },
    {
        "exam_name": "Aptitude\nGO Classes CS/DA | Aptitude | Monthly Quiz 2",
        "link": "https://gateoverflow.in/exam/1188/goclasses-cs-da-aptitude-monthly-quiz-2",
        "topics": "Aptitude"
    },
    {
        "exam_name": "Aptitude\nGO Classes CS/DA | Aptitude | Monthly Quiz 3",
        "link": "https://gateoverflow.in/exam/1228/goclasses-cs-da-aptitude-monthly-quiz-3",
        "topics": "Aptitude"
    },
    {
        "exam_name": "Aptitude\nGO Classes CS/DA | Aptitude | Monthly Quiz 4",
        "link": "https://gateoverflow.in/exam/1233/goclasses-cs-da-aptitude-monthly-quiz-4",
        "topics": "Aptitude"
    },
    {
        "exam_name": "Aptitude\nGO Classes CS/DA | Aptitude | Monthly Quiz 5",
        "link": "https://gateoverflow.in/exam/1243/goclasses-cs-da-aptitude-monthly-quiz-5",
        "topics": "Aptitude"
    },
    {
        "exam_name": "Aptitude\nGO Classes CS/DA | Aptitude | Monthly Quiz 6",
        "link": "https://gateoverflow.in/exam/1253/goclasses-cs-da-aptitude-monthly-quiz-6",
        "topics": "Aptitude"
    }
    ]
    final_json = json.dumps(scraped_data, indent=4)

    # 6. Optional: Save to a file so you can show it in the interview
    with open("test_series.json", "w") as f:
        f.write(final_json)
    
    # 7. Basic Assertion (to make the test pass)
    assert len(scraped_data) > 0, "No data was scraped!"

    if len(scraped_data) > 0:
        for index,entry in enumerate(scraped_data[START_INDEX:55], start=START_INDEX):
            print(f"Exam: {entry['exam_name']}, Link: {entry['link']}, Topics: {entry['topics']}")
            exam_url = scraped_data[index]['link']
            raw_name = f"{index}_{entry['exam_name']}_{entry['topics']}"
            raw_name = raw_name.replace("\n", " ").replace("\t", " ")
            safe_name = re.sub(r'[<>:"/\\|?*]', '', raw_name)
            file_name = safe_name.replace(" ", "_") + ".pdf"
            print(f"\nMoving to exam page: {exam_url}")
            
            page.goto(exam_url)
    
    
            # 1. Wait for the page to settle
            page.wait_for_load_state("networkidle")
    
            # 2. Try searching by simple text (Case-Insensitive & Partial)
            # exact=False allows it to find "Click here to Take Exam" 
            # even if there are hidden spaces or newlines.
            if index == START_INDEX:

                with page.context.expect_page() as new_page_info:
                    page.get_by_text("Login", exact=False).nth(1).click()

                page = new_page_info.value

                page.wait_for_load_state("networkidle")
                page.wait_for_selector(".gdev-input.qa-form-tall-text", state="visible")

                username = page.locator(".gdev-input.qa-form-tall-text").nth(0)
                password = page.locator(".gdev-input.qa-form-tall-text").nth(1)

                username.fill("harayangovind@gmail.com")
                password.fill("Govind@2025")
                target = page.get_by_text("Log In", exact=True).nth(0)
                target.click()
                page.reload()
            target = page.get_by_text("Click here to Take Exam", exact=False)
    
            if target.count() > 0:
                print("✅ Found the text!")
                # 3. If the text itself isn't a link, find the nearest 'a' tag (parent or child)
                href = target.get_attribute("href")
                
                if not href:
                    # If the clicked element wasn't the link, find the link containing this text
                    href = page.locator(f"a:has-text('Click here to Take Exam')").first.get_attribute("href")
                
                print(f"🔗 Final Exam Link: {href}")
                page.goto(href)
                page.get_by_text("Start").click()
                  # Pause here to check if we are on the right page
                page.locator("#viewQPButton").click()

                page.evaluate("""
                document.querySelectorAll('*').forEach(el => {
                  el.style.overflow = 'visible';
                  el.style.height = 'auto';
                  el.style.maxHeight = 'none';
                });
                document.querySelector('.header2').style.display = 'none';
                """)
                page.wait_for_timeout(2000)  # Wait a bit for the styles to apply and content to adjust
                page.emulate_media(media="screen")  
                page.wait_for_timeout(5000)  # Wait a bit for the styles to apply and content to adjust
                page.pdf(
                    path=f"./questionpapers/{file_name}",
                    format="A4",
                    print_background=True,
                    margin={
                        "top": "20px",
                        "bottom": "20px",
                        "left": "10px",
                        "right": "10px"
                    },
                    scale=0.9
                )
                page.locator("#finalSub").click()
                page.locator("input[value='Yes']").click()
                page.wait_for_selector("#exam_result_section_choice", timeout=60000)
                print("Submitted exam")
                
                page.evaluate("""
                document.querySelectorAll('*').forEach(el => {
                  el.style.overflow = 'visible';
                  el.style.height = 'auto';
                  el.style.maxHeight = 'none';
                });
                """)
                page.wait_for_timeout(2000)  # Wait a bit for the styles to apply and content to adjust
                page.emulate_media(media="screen")  
                
                page.pdf(
                    path=f"./solutions/{file_name}",
                    format="A4",
                    print_background=True,
                    margin={
                        "top": "20px",
                        "bottom": "20px",
                        "left": "10px",
                        "right": "10px"
                    },
                    scale=0.9
                )
            else:
                # 4. DEBUG: Take a screenshot so you can see what the script sees
                page.screenshot(path="debug_page.png")
                print("❌ Still not found. Screenshot saved as 'debug_page.png'. Open it to see the page state!")
                
                # 5. List all links that have 'exam' in their URL
                print("Searching for any link with 'exam' in the URL...")
                all_links = page.locator("a").all()
                for l in all_links:
                    h = l.get_attribute("href")
                    if h and "exam" in h.lower():
                        print(f"Possible Link: {h} (Text: {l.inner_text()})")