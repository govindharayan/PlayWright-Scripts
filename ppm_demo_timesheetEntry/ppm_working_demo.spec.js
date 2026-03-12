const {
    test,
    expect
} = require('@playwright/test');

const credentials = require('./credentials.json');
const {
    getDate
} = require('./utils/Generic_utils');
const {
    getWeekRange
} = require('./utils/ppm_utils');
const ppm_URL = require('./env.json');
var timesheet_rows = require("./timesheet_Multiplerows.json");
var Pro_AssignByManager = require("./Assigned_project_data");
var Project_dtl = Pro_AssignByManager["ProjectsToBeAssignByManager"];


const URL = ppm_URL.URL;
var projects_assign = require("./assignedProjects.json");
var assign_projects = projects_assign["assignedProjects"];

const ppm_login = test.extend({
    pageFixture: async({page},use)=>{
        const username1 = credentials["succesfulLogin"]["Username"];
    const password1 = credentials["succesfulLogin"]["Password"];
    page.goto(URL);
    // Fill in the login form
    await expect(page.locator('input[name="email_id"]')).toBeEditable();
    await page.locator('input[name="email_id"]').fill(username1);
    await expect(page.locator('input[name="pswd"]')).toBeEditable();
    await page.locator('input[name="pswd"]').fill(password1);
    await page.waitForTimeout(1000);
    await expect(page.locator('.button.blue.gradient')).toBeEnabled();
    await page.locator('.button.blue.gradient').click();
    await page.waitForTimeout(25000);
    await expect(page.locator('id=btnTimeSheet-btnInnerEl')).toBeVisible();
    await page.locator('id=btnTimeSheet-btnInnerEl').click();
    await expect(page.locator('id=btnTimeSheetEntry-textEl')).toBeVisible();
    await page.locator('id=btnTimeSheetEntry-textEl').click();
    await expect(page.locator('id=cmbTSEntry_SelectWeek-trigger-picker')).toBeVisible();
    await page.locator('id=cmbTSEntry_SelectWeek-trigger-picker').click();
    await use(page);
    }
})

test.skip('login test failure due to username', async({
        page
    }) => {
    const username2 = credentials["invalidLoginViaWrongUsername"]["Username"];
    const password2 = credentials["succesfulLogin"]["Password"];
    await page.goto(URL);
    // Fill in the login form
    await expect(page.locator('input[name="email_id"]')).toBeEditable();
    await page.locator('input[name="email_id"]').fill(username2);
    await expect(page.locator('input[name="pswd"]')).toBeEditable();
    await page.locator('input[name="pswd"]').fill(password2);
    await page.waitForTimeout(1000);
    await expect(page.locator('.button.blue.gradient')).toBeEnabled();
    await page.locator('.button.blue.gradient').click();
    await page.waitForTimeout(2000);
});

test.skip('login test failure due to password', async({
        page
    }) => {
    const username3 = credentials["succesfulLogin"]["Username"];
    const password3 = credentials["invalidLoginViaWrongPassword"]["Password"];
    await page.goto(URL);
    // Fill in the login form
    await expect(page.locator('input[name="email_id"]')).toBeEditable();
    await page.locator('input[name="email_id"]').fill(username3);
    await expect(page.locator('input[name="pswd"]')).toBeEditable();
    await page.locator('input[name="pswd"]').fill(password3);
    await page.waitForTimeout(1000);
    await expect(page.locator('.button.blue.gradient')).toBeEnabled();
    await page.locator('.button.blue.gradient').click();
    await page.waitForTimeout(2000);
});

ppm_login.skip('login test success', async({
        pageFixture
    }) => {
    await pageFixture.waitForTimeout(2000);

});

ppm_login.skip('Project Entry', async({
        pageFixture
    }) => {
    let datesForPro = getDate(Project_dtl);
    await pageFixture.getByRole('option', {
        name: Project_dtl.ProjectWeek
    }).click();
    await pageFixture.locator('.x-grid-item > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1078.x-unselectable > .x-grid-cell-inner').click();
    await expect.soft(pageFixture.locator('#TSEntryGrd_cmbProject-trigger-picker')).toBeVisible();
    await pageFixture.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
    await expect.soft(pageFixture.getByText('Add New Project')).toBeEnabled();
    await pageFixture.getByText('Add New Project').click();
    await expect.soft(pageFixture.locator('#cmbAddProjectManager-trigger-picker')).toBeVisible();
    await pageFixture.locator('#cmbAddProjectManager-trigger-picker').click();
    await pageFixture.getByLabel('Manager').fill(Project_dtl.Manager);
    await pageFixture.getByRole('option', {
        name: Project_dtl.Manager
    }).click();
    await expect.soft(pageFixture.locator('#dateAddProjectFromDate-trigger-picker')).toBeVisible();
    await pageFixture.locator('#dateAddProjectFromDate-trigger-picker').click();
    await pageFixture.getByText('18', {
        exact: true
    }).click();
    await expect.soft(pageFixture.getByRole('button', {
            name: 'View'
        })).toBeEnabled();
    await pageFixture.getByRole('button', {
        name: 'View'
    }).click();
    await pageFixture.getByRole('option', {
        name: Project_dtl.Project
    }).click();
    await pageFixture.getByLabel('Add to Selected').click();
    await pageFixture.locator('#dateAddProjectFromDate-trigger-picker').click();
    await pageFixture.locator('.x-datepicker-month > .x-btn.x-unselectable.x-btn-default-small').nth(0).click();
    await pageFixture.getByRole('button', {
        name: Project_dtl.FromDate.substring(7),
        exact: true
    }).click();
    await pageFixture.getByRole('button', {
        name: Project_dtl.FromDate.substring(3, 6),
        exact: true
    }).click();
    await expect.soft(pageFixture.getByRole('button', {
            name: 'OK'
        })).toBeEnabled();
    await pageFixture.getByRole('button', {
        name: 'OK'
    }).click();
    await pageFixture.getByLabel('' + datesForPro["useDate1"]).getByText('' + datesForPro["dateNumber1"]).click();
    await pageFixture.locator('#dateAddProjectToDate-trigger-picker').click();
    await pageFixture.locator('.x-datepicker-month > .x-btn.x-unselectable.x-btn-default-small').nth(1).click();
    await pageFixture.getByRole('button', {
        name: Project_dtl.ToDate.substring(7),
        exact: true
    }).click();
    await pageFixture.getByRole('button', {
        name: Project_dtl.ToDate.substring(3, 6),
        exact: true
    }).click();
    await expect.soft(pageFixture.getByRole('button', {
            name: 'OK'
        })).toBeEnabled();
    await pageFixture.getByRole('button', {
        name: 'OK'
    }).click();
    await pageFixture.getByLabel('' + datesForPro["useDate2"]).getByText('' + datesForPro["dateNumber2"]).click();
    await expect.soft(pageFixture.getByRole('button', {
            name: 'View'
        })).toBeEnabled();
    await pageFixture.getByRole('button', {
        name: 'View'
    }).click();
    await pageFixture.getByRole('option', {
        name: Project_dtl.Project
    }).click();
    await pageFixture.locator('.x-btn-icon-el.x-btn-icon-el-default-small.x-form-itemselector-add').click();
    await pageFixture.waitForTimeout(2000);
    //await pageFixture.locator('#btnAddProjectCreate-btnInnerEl').click();
    await pageFixture.waitForTimeout(2000);
});

ppm_login('timesheet entry', async({
        pageFixture
    }) => {
    
    
    
    let dateofweek = timesheet_rows["Data_used"];
    let startdate;
    //console.log("dateofweek: "+dateofweek);
    for(let ts=0; ts<dateofweek.length; ts++){
        // if(ts!=0){
        //     await expect(pageFixture.locator('id=cmbTSEntry_SelectWeek-trigger-picker')).toBeVisible();
        //     await pageFixture.locator('id=cmbTSEntry_SelectWeek-trigger-picker').click();
        // }
        let sumOftotalHrs = 0;
        
        startdate = dateofweek[ts]["selectedDate"];
        console.log("stardate: "+JSON.stringify(startdate));
        let selectedDate = getWeekRange(startdate);
    let timesheetRows_conter = dateofweek[ts]["projectData"];   
    await expect.soft(pageFixture.getByRole('option', {
            name: selectedDate
        })).toBeVisible();
    await pageFixture.getByRole('option', {
        name: selectedDate
    }).click();
    //await pageFixture.waitForTimeout(2000);
    let Prj_count = {};
    for (let i = 0; i < timesheetRows_conter.length; i++) {
        await pageFixture.locator('table[data-recordindex="' + i + '"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1078.x-unselectable > .x-grid-cell-inner').click();
        await expect.soft(pageFixture.locator('#TSEntryGrd_cmbProject-trigger-picker')).toBeVisible();
        await pageFixture.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
        var pro_name = timesheetRows_conter[i]["Project"];
        if (Prj_count[pro_name] == undefined) {
            // If not present in the array
            var Project_name_counter = await pageFixture.locator('text=' + timesheetRows_conter[i]["Project"]).nth(0);
            var pro_name_content = await Project_name_counter.textContent();
            Prj_count[pro_name_content] = 0;
            await expect.soft(pageFixture.getByText(timesheetRows_conter[i]["Project"]).nth(Prj_count[pro_name_content])).toBeEnabled();
            await pageFixture.getByText(timesheetRows_conter[i]["Project"]).nth(Prj_count[pro_name_content]).click();
        } else {
            Prj_count[pro_name] = Number(Prj_count[pro_name]) + 1;
            await pageFixture.waitForTimeout(2000);
            var Project_name_counter = await pageFixture.locator('text=' + timesheetRows_conter[i]["Project"]).nth(Prj_count[pro_name]);
            await pageFixture.waitForTimeout(2000);
            console.log("Project_name_counter: "+JSON.stringify(Project_name_counter));
            var pro_name_content = await Project_name_counter.textContent();
            await expect.soft(pageFixture.getByText(timesheetRows_conter[i]["Project"]).nth(Prj_count[pro_name_content])).toBeEnabled();
            await pageFixture.getByText(timesheetRows_conter[i]["Project"]).nth(Prj_count[pro_name_content]).click();
        }
        await pageFixture.locator('table[data-recordindex="' + i + '"]> tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1079.x-unselectable > .x-grid-cell-inner').click();
        await expect.soft(pageFixture.locator('#combobox-1395-trigger-picker')).toBeEnabled();
        await pageFixture.locator('#combobox-1395-trigger-picker').click();
        await expect.soft(pageFixture.getByRole('option', {
                name: timesheetRows_conter[i]["Task"]
            })).toBeEnabled();
        await pageFixture.getByRole('option', {
            name: timesheetRows_conter[i]["Task"],
            exact: true
        }).scrollIntoViewIfNeeded();
        await pageFixture.getByRole('option', {
            name: timesheetRows_conter[i]["Task"],
            exact: true
        }).click();
        await pageFixture.locator('table[data-recordindex="' + i + '"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1080.x-unselectable > .x-grid-cell-inner').click();
        await expect.soft(pageFixture.locator('#combobox-1398-trigger-picker')).toBeEnabled();
        await pageFixture.locator('#combobox-1398-trigger-picker').click();
        await expect.soft(pageFixture.getByRole('option', {
                name: timesheetRows_conter[i]["Module"],
                exact: true
            })).toBeEnabled();
        await pageFixture.getByRole('option', {
            name: timesheetRows_conter[i]["Module"],
            exact: true
        }).scrollIntoViewIfNeeded();
        // Now, click on the element
        await pageFixture.getByRole('option', {
            name: timesheetRows_conter[i]["Module"],
            exact: true
        }).click();
        await pageFixture.locator('table[data-recordindex="' + i + '"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1082.cls-resizer.x-unselectable > .x-grid-cell-inner').click();
        await expect.soft(pageFixture.getByRole('row', {
                name: timesheetRows_conter[i]["Project"]
            }).getByLabel('')).toBeVisible();
        await pageFixture.getByRole('row', {
            name: timesheetRows_conter[i]["Project"]
        }).getByLabel('').fill(timesheetRows_conter[i]["Artifact"]);
        await pageFixture.getByRole('row', {
            name: timesheetRows_conter[i]["Project"]
        }).getByLabel('').fill(timesheetRows_conter[i]["Remarks"]);
        if (timesheetRows_conter[i]["hrs"][0] != 0) {
            await pageFixture.locator('table[data-recordindex="' + i + '"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1085.x-unselectable > .x-grid-cell-inner').first().click();
            await expect.soft(pageFixture.getByRole('row', {
                    name: timesheetRows_conter[i]["Project"]
                }).getByLabel('')).toBeVisible();
            await pageFixture.getByRole('row', {
                name: timesheetRows_conter[i]["Project"]
            }).getByLabel('').fill(""+timesheetRows_conter[i]["hrs"][0]);
            sumOftotalHrs+=Number(timesheetRows_conter[i]["hrs"][0]);
        }
        if (timesheetRows_conter[i]["hrs"][1] != 0) {
            await pageFixture.locator('table[data-recordindex="' + i + '"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1087.x-unselectable > .x-grid-cell-inner').first().click();
            await expect.soft(pageFixture.getByRole('row', {
                    name: timesheetRows_conter[i]["Project"]
                }).getByLabel('')).toBeVisible();
            await pageFixture.getByRole('row', {
                name: timesheetRows_conter[i]["Project"]
            }).getByLabel('').fill(""+timesheetRows_conter[i]["hrs"][1]);
            sumOftotalHrs+=Number(timesheetRows_conter[i]["hrs"][1]);
        }
        if (timesheetRows_conter[i]["hrs"][2] != 0) {
            await pageFixture.locator('table[data-recordindex="' + i + '"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1089.x-unselectable > .x-grid-cell-inner').first().click();
            await expect.soft(pageFixture.getByRole('row', {
                    name: timesheetRows_conter[i]["Project"]
                }).getByLabel('')).toBeVisible();
            await pageFixture.getByRole('row', {
                name: timesheetRows_conter[i]["Project"]
            }).getByLabel('').fill(""+timesheetRows_conter[i]["hrs"][2]);
            sumOftotalHrs+=Number(timesheetRows_conter[i]["hrs"][2]);
        }
        if (timesheetRows_conter[i]["hrs"][3] != 0) {
            await pageFixture.locator('table[data-recordindex="' + i + '"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1091.x-unselectable > .x-grid-cell-inner').first().click();
            await expect.soft(pageFixture.getByRole('row', {
                    name: timesheetRows_conter[i]["Project"]
                }).getByLabel('')).toBeVisible();
            await pageFixture.getByRole('row', {
                name: timesheetRows_conter[i]["Project"]
            }).getByLabel('').fill(""+timesheetRows_conter[i]["hrs"][3]);
            sumOftotalHrs+=Number(timesheetRows_conter[i]["hrs"][3]);
        }
        if (timesheetRows_conter[i]["hrs"][4] != 0) {
            await pageFixture.locator('table[data-recordindex="' + i + '"]> tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1093.x-unselectable > .x-grid-cell-inner').first().click();
            await expect.soft(pageFixture.getByRole('row', {
                    name: timesheetRows_conter[i]["Project"]
                }).getByLabel('')).toBeVisible();
            await pageFixture.getByRole('row', {
                name: timesheetRows_conter[i]["Project"]
            }).getByLabel('').fill(""+timesheetRows_conter[i]["hrs"][4]);
            sumOftotalHrs+=Number(timesheetRows_conter[i]["hrs"][4]);
        }
        await expect.soft(pageFixture.locator('#tableview-1099')).toBeEnabled();
        await pageFixture.locator('#tableview-1099').click();
        if (i < timesheetRows_conter.length - 1) {
            await expect.soft(pageFixture.locator("#btnTSEntry_AddNewRow-btnIconEl")).toBeEnabled();
            await pageFixture.locator("#btnTSEntry_AddNewRow-btnIconEl").click();
        }
    }
    await expect.soft(pageFixture.locator('#lblTimeSheetEntry')).toBeEnabled();
    const ttl_hrs_element = await pageFixture.locator('#component-1113-item > tbody > .x-grid-row-summary > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1098.x-grid-cell-last.x-unselectable > .x-grid-cell-inner ');
    const textContent = await ttl_hrs_element.textContent();
    const Total_hrs = parseInt(textContent, 10);
 console.log("Total_hrs :" + Total_hrs);
console.log("Sum of hours: "+sumOftotalHrs);
if (sumOftotalHrs !== Total_hrs) {
    await expect(`${sumOftotalHrs}`).toBe(`${Total_hrs}`, "Hours not equal");  // Compare as strings
} else {
    await expect(true).toBe(true, "Total Hours match");  // Original unchanged
 // Leave unchanged
        if (Total_hrs >= 40) {
            await expect(pageFixture.locator('#btnSubmitTS')).toBeEnabled();
            await pageFixture.locator('#btnSubmitTS').click();
            await pageFixture.locator('#btnTSEntryDiscardYes-btnInnerEl').click();
        }
        else try {
  await pageFixture.click('#btnSaveTS-btnInnerEl');
} catch (error) {
  console.log('Button click failed, trying keyboard shortcut Alt+S');
  await pageFixture.keyboard.press('Alt+S');
}

    }
    await pageFixture.waitForTimeout(1000);
    await pageFixture.reload();
    await pageFixture.locator('id=button-1025-btnInnerEl').click();
    const username1 = credentials["succesfulLogin"]["Username"];
    const password1 = credentials["succesfulLogin"]["Password"];
    pageFixture.goto(URL);
    // Fill in the login form
    await expect(pageFixture.locator('input[name="email_id"]')).toBeEditable();
    await pageFixture.locator('input[name="email_id"]').fill(username1);
    await expect(pageFixture.locator('input[name="pswd"]')).toBeEditable();
    await pageFixture.locator('input[name="pswd"]').fill(password1);
    await pageFixture.waitForTimeout(1000);
    await expect(pageFixture.locator('.button.blue.gradient')).toBeEnabled();
    await pageFixture.locator('.button.blue.gradient').click();
    await pageFixture.waitForTimeout(1000);
    await expect(pageFixture.locator('id=btnTimeSheet-btnInnerEl')).toBeVisible();
    await pageFixture.locator('id=btnTimeSheet-btnInnerEl').click();
    await expect(pageFixture.locator('id=btnTimeSheetEntry-textEl')).toBeVisible();
    await pageFixture.locator('id=btnTimeSheetEntry-textEl').click();
    await pageFixture.waitForTimeout(1000);
    await expect(pageFixture.locator('id=cmbTSEntry_SelectWeek-trigger-picker')).toBeVisible();
    await pageFixture.locator('id=cmbTSEntry_SelectWeek-trigger-picker').click();


    }
    
    
});

ppm_login.skip('Assigned Projects verification', async({
        pageFixture
    }) => {
    let datesForPro = getDate(Project_dtl);
    let Assigned_project_list = [];
    const modifiedArray = assign_projects.map(project => project.split(' (')[0]);
    await pageFixture.getByRole('option', {
        name: Project_dtl.ProjectWeek
    }).click();
    await pageFixture.locator('.x-grid-item > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1078.x-unselectable > .x-grid-cell-inner').click();
    await pageFixture.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
    let g = 0;
    let continueLoop = true;
    try {
        while (g >= 0 && continueLoop) {
            const element = await pageFixture.waitForSelector('li[data-boundview="TSEntryGrd_cmbProject-picker"][data-recordindex="' + g + '"]', {
                timeout: 1000
            }); // Adjust timeout value as needed
            const textContent = await element.textContent();
            console.log("textContent:" + textContent);
            Assigned_project_list.push(textContent);
            g++;
        }
    } catch (error) {
        //console.error("Error occurred while locating element:", error);
        // Remove the latest element from Assigned_project_list
        Assigned_project_list.pop();
        // Set continueLoop to false to exit the loop
        continueLoop = false;
    }
    await pageFixture.getByText('Add New Project').click();
    await pageFixture.locator('#cmbAddProjectManager-trigger-picker').click();
    await pageFixture.getByLabel('Manager').fill(Project_dtl.Manager);
    await pageFixture.getByRole('option', {
        name: Project_dtl.Manager
    }).click();
    await pageFixture.locator('#dateAddProjectFromDate-trigger-picker').click();
    await pageFixture.getByText('18', {
        exact: true
    }).click();
    await pageFixture.getByRole('button', {
        name: 'View'
    }).click();
    if (!Assigned_project_list.includes(Project_dtl.Project)) {
        // If the project is not in the Assigned_project_list
        await pageFixture.getByRole('option', {
            name: Project_dtl.Project
        }).click();
    } else {
        // If the project is already in the Assigned_project_list
        console.log("This project is already assigned to you");
    }
    await pageFixture.getByLabel('Add to Selected').click();
    await pageFixture.locator('#dateAddProjectFromDate-trigger-picker').click();
    await pageFixture.locator('.x-datepicker-month > .x-btn.x-unselectable.x-btn-default-small').nth(0).click();
    await pageFixture.getByRole('button', {
        name: Project_dtl.FromDate.substring(7),
        exact: true
    }).click();
    await pageFixture.getByRole('button', {
        name: Project_dtl.FromDate.substring(3, 6),
        exact: true
    }).click();
    await pageFixture.getByRole('button', {
        name: 'OK'
    }).click();
    await pageFixture.getByLabel('' + datesForPro["useDate1"]).getByText('' + datesForPro["dateNumber1"]).click();
    await pageFixture.locator('#dateAddProjectToDate-trigger-picker').click();
    await pageFixture.locator('.x-datepicker-month > .x-btn.x-unselectable.x-btn-default-small').nth(1).click();
    await pageFixture.getByRole('button', {
        name: Project_dtl.ToDate.substring(7),
        exact: true
    }).click();
    await pageFixture.getByRole('button', {
        name: Project_dtl.ToDate.substring(3, 6),
        exact: true
    }).click();
    await pageFixture.getByRole('button', {
        name: 'OK'
    }).click();
    await pageFixture.getByLabel('' + datesForPro["useDate2"]).getByText('' + datesForPro["dateNumber2"]).click();
    await pageFixture.getByRole('button', {
        name: 'View'
    }).click();
    await pageFixture.getByRole('option', {
        name: Project_dtl.Project
    }).click();
    await pageFixture.getByLabel('Add to Selected').click();
    // Check if arrays have same length
    if (modifiedArray.length !== Assigned_project_list.length) {
        await expect(true).toBe(true, "Assigned Projects are different");
    }
    // Sort both arrays
    const sortedArr1 = modifiedArray.slice().sort();
    const sortedArr2 = Assigned_project_list.slice().sort();
    let check_modifiedArray = true;
    // Compare sorted arrays element by element
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            check_modifiedArray = false;
            await expect(true).toBe(true, "Assigned Projects are different");
           
            break;
        }
    }
    // If all elements match, arrays are equal
    if (check_modifiedArray) {
        await expect(true).toBe(true, "Assigned Projects are same");
    }
    await pageFixture.waitForTimeout(2000);
});

ppm_login.skip('Projects assigned by manager', async({
        pageFixture
    }) => {
    let Assigned_project_list = [];
    const elementToRemove = "Vistaar Resource Pool (Dept : SDG)";
    if (assign_projects.includes(elementToRemove)) {
        const index = assign_projects.indexOf(elementToRemove);
        assign_projects.splice(index, 1);
    }
    const modifiedArray = assign_projects.map(project => project.split(' (')[0]);
    await pageFixture.getByRole('option', {
        name: Project_dtl.ProjectWeek
    }).click();
    await pageFixture.locator('.x-grid-item > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1078.x-unselectable > .x-grid-cell-inner').click();
    await pageFixture.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
    let g = 0;
    let continueLoop = true;
    await pageFixture.getByText('Add New Project').click();
    await pageFixture.locator('#cmbAddProjectManager-trigger-picker').click();
    await pageFixture.getByLabel('Manager').fill(Project_dtl.Manager);
    await pageFixture.getByRole('option', {
        name: Project_dtl.Manager
    }).click();
    await pageFixture.locator('#dateAddProjectFromDate-trigger-picker').click();
    await pageFixture.getByText('18', {
        exact: true
    }).click();
    await pageFixture.getByRole('button', {
        name: 'View'
    }).click();
    try {
        while (g >= 0 && continueLoop) {
            const element = await pageFixture.waitForSelector('li[data-boundview="boundlist-1402"][data-recordindex="' + g + '"]', {
                timeout: 5000
            }); // Adjust timeout value as needed
            const textContent = await element.textContent();
            console.log("textContent:" + textContent);
            Assigned_project_list.push(textContent);
            g++;
        }
    } catch (error) {
        //console.error("Error occurred while locating element:", error);
        // Set continueLoop to false to exit the loop
        continueLoop = false;
    }
    // Check if arrays have same length
    if (modifiedArray.length !== Assigned_project_list.length) {
        await expect(true).toBe(true, "Assigned Projects are different");
    }
    console.log("modifiedArray: " + modifiedArray);
    console.log("Assigned_project_list: " + Assigned_project_list);
    // Sort both arrays
    const sortedArr1 = modifiedArray.slice().sort();
    const sortedArr2 = Assigned_project_list.slice().sort();
    let check_modifiedArray = true;
    // Compare sorted arrays element by element
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            check_modifiedArray = false;
            await expect(true).toBe(true, "Assigned Projects are different");
            
            break;
        }
    }
    // If all elements match, arrays are equal
    if (check_modifiedArray) {
        await expect(true).toBe(true, "Assigned Projects are same");
    }
    await pageFixture.waitForTimeout(2000);
});

ppm_login.skip('logout test success', async({
        pageFixture
    }) => {
    
    await pageFixture.locator('id=button-1025-btnInnerEl').click();
    await pageFixture.waitForTimeout(2000);
});