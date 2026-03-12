const { test, expect } = require('@playwright/test');
const credentials = require('./credentials.json');
const {getDate}  = require('./utils');
const ppm_URL = require('./env.json');
var timesheet_rows = require("./timesheet_Multiplerows.json");
var Project_dtl = require("./project_data");
const { log } = require('console');
var selectedDate = timesheet_rows["selectedDate"];
var timesheetRows_conter = timesheet_rows["projectData"];
const URL = ppm_URL.URL;
var assign_projects = require("./assingedProjects.json");


 test.describe('1 page multiple tests', () => {
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        // await page.goto('https://example.com');
    });

    test.afterAll(async ({ browser }) => {
        browser.close;
    });
    test('login test success', async ({ }) => {
        const username1 = credentials.rightUsername ;
        const password1 = credentials.rightPassword ;
        
        
        page.goto(URL);
    
    
        // Fill in the login form
        await expect(page.locator('input[name="email_id"]')).toBeEditable();
        await page.locator('input[name="email_id"]').fill(username1);
    
        await expect(page.locator('input[name="pswd"]')).toBeEditable();
        await page.locator('input[name="pswd"]').fill(password1);
        await page.waitForTimeout(1000);
    
        await expect(page.locator('.button.blue.gradient')).toBeEnabled();
        await page.locator('.button.blue.gradient').click();
    
        await expect(page.locator('id=btnTimeSheet-btnInnerEl')).toBeVisible();
        await page.locator('id=btnTimeSheet-btnInnerEl').click();
    
        await expect(page.locator('id=btnTimeSheetEntry-textEl')).toBeVisible();
        await page.locator('id=btnTimeSheetEntry-textEl').click();
    
        await expect(page.locator('id=cmbTSEntry_SelectWeek-trigger-picker')).toBeVisible();
        await page.locator('id=cmbTSEntry_SelectWeek-trigger-picker').click();
        await page.waitForTimeout(2000);
    
       
        
        
    });
    
    
    test('Project Entry', async ({}) => {
    
        // const username1 = credentials.rightUsername ;
        // const password1 = credentials.rightPassword ;
    
    
        // await page.goto(URL);
    
        // // Fill in the login form
        // await expect.soft(page.locator('input[name="email_id"]')).toBeEditable();
        // await page.locator('input[name="email_id"]').fill(username1);
    
        // await expect.soft(page.locator('input[name="pswd"]')).toBeEditable();
        // await page.locator('input[name="pswd"]').fill(password1);
    
    
        // await expect.soft(page.locator('.button.blue.gradient')).toBeEnabled();
        // await page.locator('.button.blue.gradient').click();
        // //timesheet
        // await expect.soft(page.locator('id=btnTimeSheet-btnInnerEl')).toBeVisible();
        // await page.locator('id=btnTimeSheet-btnInnerEl').click();
        // // timesheet entry
        // await expect.soft(page.locator('id=btnTimeSheetEntry-textEl')).toBeVisible();
        // await page.locator('id=btnTimeSheetEntry-textEl').click();
        // //dropdown
        // await expect.soft(page.locator('id=cmbTSEntry_SelectWeek-trigger-picker')).toBeVisible();
        // await page.locator('id=cmbTSEntry_SelectWeek-trigger-picker').click();
    
        let datesForPro = getDate(Project_dtl);
        await page.getByRole('option', { name: Project_dtl.ProjectWeek }).click();
        await page.locator('.x-grid-item > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1078.x-unselectable > .x-grid-cell-inner').click();
    
        await expect.soft(page.locator('#TSEntryGrd_cmbProject-trigger-picker')).toBeVisible();
        await page.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
    
        await expect.soft(page.getByText('Add New Project')).toBeEnabled();
        await page.getByText('Add New Project').click();
    
      await expect.soft(page.locator('#cmbAddProjectManager-trigger-picker')).toBeVisible();
      await page.locator('#cmbAddProjectManager-trigger-picker').click();
     
      await page.getByLabel('Manager').fill(Project_dtl.Manager);
      await page.getByRole('option', { name: Project_dtl.Manager }).click();
    
      await expect.soft(page.locator('#dateAddProjectFromDate-trigger-picker')).toBeVisible();
      await page.locator('#dateAddProjectFromDate-trigger-picker').click();
    
      await page.getByText('18', { exact: true }).click();
    
      await expect.soft(page.getByRole('button', { name: 'View' })).toBeEnabled();
      await page.getByRole('button', { name: 'View' }).click();
    
      await page.getByRole('option', { name: Project_dtl.Project }).click();
      await page.getByLabel('Add to Selected').click();
    
      await page.locator('#dateAddProjectFromDate-trigger-picker').click();
      await page.locator('.x-datepicker-month > .x-btn.x-unselectable.x-btn-default-small').nth(0).click();
      
      
      await page.getByRole('button', { name: Project_dtl.FromDate.substring(7),exact : true }).click();
     
      await page.getByRole('button', { name: Project_dtl.FromDate.substring(3,6),exact : true }).click();
    
      await expect.soft(page.getByRole('button', { name: 'OK' })).toBeEnabled();
      await page.getByRole('button', { name: 'OK' }).click();
    
      await page.getByLabel(''+ datesForPro["useDate1"]).getByText(''+ datesForPro["dateNumber1"]).click();
    
      await page.locator('#dateAddProjectToDate-trigger-picker').click();
      await page.locator('.x-datepicker-month > .x-btn.x-unselectable.x-btn-default-small').nth(1).click();
      await page.getByRole('button', { name: Project_dtl.ToDate.substring(7),exact : true }).click();
      await page.getByRole('button', { name: Project_dtl.ToDate.substring(3,6),exact : true }).click();
    
      await expect.soft(page.getByRole('button', { name: 'OK' })).toBeEnabled();
      await page.getByRole('button', { name: 'OK' }).click();
    
      await page.getByLabel(''+ datesForPro["useDate2"]).getByText(''+ datesForPro["dateNumber2"]).click();
    
      await expect.soft(page.getByRole('button', { name: 'View' })).toBeEnabled();
      await page.getByRole('button', { name: 'View' }).click();
    
      await page.getByRole('option', { name: Project_dtl.Project }).click();
     // await page.getByLabel('Add to Selected').click();
      await page.locator('.x-btn-icon-el.x-btn-icon-el-default-small.x-form-itemselector-add').click();
     
      await page.waitForTimeout(2000);
      //await page.locator('#btnAddProjectCreate-btnInnerEl').click();
      await page.waitForTimeout(2000);
    });
    
    test('timesheet entry', async ({}) => {
    //     const username1 = credentials.rightUsername ;
    //     const password1 = credentials.rightPassword ;
        
    
    //     await page.goto(URL);
        
    //     await expect.soft(page.locator('input[name="email_id"]')).toBeEditable();
    //     await page.locator('input[name="email_id"]').fill(username1);
    
    //     await expect.soft(page.locator('input[name="pswd"]')).toBeEditable();
    //     await page.locator('input[name="pswd"]').fill(password1);
        
     
    //     await expect.soft(page.locator('.button.blue.gradient')).toBeEnabled();
    //     await page.locator('.button.blue.gradient').click();
    //     //timesheet
    //     //await expect.soft(page.locator('id=btnTimeSheet-btnInnerEl')).toBeVisible();
    //     await page.locator('id=btnTimeSheet-btnInnerEl').click();
    //    // timesheet entry
    //    await expect.soft(page.locator('id=btnTimeSheetEntry-textEl')).toBeVisible();
    //     await page.locator('id=btnTimeSheetEntry-textEl').click();
    //     //dropdown
    //     await expect.soft(page.locator('id=cmbTSEntry_SelectWeek-trigger-picker')).toBeVisible();
    //     await page.locator('id=cmbTSEntry_SelectWeek-trigger-picker').click();
        
        //close button for project tab
        await page.locator('#tool-1407-toolEl').click();

        await page.locator('#fieldSetTSEntrySelectWeek-legendToggle-toolEl').click();
        await page.waitForTimeout(1000);
        await page.locator('#cmbTSEntry_SelectWeek-trigger-picker').click();

        await page.waitForTimeout(1000);

        let obj = {};
        let sumOftotalHrs =0;
        await expect.soft(page.getByRole('option', { name: selectedDate })).toBeVisible();
        await page.getByRole('option', { name: selectedDate}).click();
        await page.waitForTimeout(1000);
        //changes unsaved yes/no button
        await page.locator('#btnTSEntryDiscardYes-btnInnerEl').click();
        await page.waitForTimeout(1000);

        for(let i=0 ; i<timesheetRows_conter.length; i++){
        // await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > td:nth-child(2) > .x-grid-cell-inner').toBeEnabled();

        // await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > td:nth-child(2) > .x-grid-cell-inner').click();
        //td:nth-child(2)

        await page.waitForSelector('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > tr:nth-child(2) > .x-grid-cell-inner');
        await page.click('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > tr:nth-child(2) > .x-grid-cell-inner');

        await expect.soft(page.locator('#TSEntryGrd_cmbProject-trigger-picker')).toBeVisible();
        await page.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
      
            
            var pro_name = timesheetRows_conter[i]["Project"];
           
            if (obj[pro_name] == undefined) {
                // If not present in the array
                var Project_name_counter = await page.locator('text=' + timesheetRows_conter[i]["Project"]).nth(0);
                
                var pro_name_content = await Project_name_counter.textContent();
                obj[pro_name_content] = 0;
                
                await expect.soft(page.getByText(timesheetRows_conter[i]["Project"]).nth(obj[pro_name_content])).toBeEnabled();
                await page.getByText(timesheetRows_conter[i]["Project"]).nth(obj[pro_name_content]).click();
            } else {
                
                obj[pro_name] = Number(obj[pro_name]) + 1;
                
                var Project_name_counter = await page.locator('text=' + timesheetRows_conter[i]["Project"]).nth(obj[pro_name]);
                var pro_name_content = await Project_name_counter.textContent();
    
                await expect.soft(page.getByText(timesheetRows_conter[i]["Project"]).nth(obj[pro_name_content])).toBeEnabled();
                await page.getByText(timesheetRows_conter[i]["Project"]).nth(obj[pro_name_content]).click();
                
            }
            console.log(obj);
            
         
        await page.locator('table[data-recordindex="'+i+'"]> tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1079.x-unselectable > .x-grid-cell-inner' ).click();
        
        await expect.soft(page.locator('#combobox-1395-trigger-picker')).toBeEnabled();
        await page.locator('#combobox-1395-trigger-picker').click();
    
        await expect.soft(page.getByRole('option', { name: timesheetRows_conter[i]["Task"] })).toBeEnabled();
        await page.getByRole('option', { name: timesheetRows_conter[i]["Task"], exact: true }).scrollIntoViewIfNeeded();
        await page.getByRole('option', { name: timesheetRows_conter[i]["Task"], exact: true }).click();
        
        await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1080.x-unselectable > .x-grid-cell-inner').click();
        
        await expect.soft(page.locator('#combobox-1398-trigger-picker')).toBeEnabled();
        await page.locator('#combobox-1398-trigger-picker').click();
    
        await expect.soft(page.getByRole('option', { name: timesheetRows_conter[i]["Module"] })).toBeEnabled();
        await page.getByRole('option', { name: timesheetRows_conter[i]["Module"], exact: true }).scrollIntoViewIfNeeded();
     
        // Now, click on the element
        await page.getByRole('option', { name: timesheetRows_conter[i]["Module"], exact: true }).click();
     
        
        await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1082.cls-resizer.x-unselectable > .x-grid-cell-inner').click();
        
        await expect.soft(page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('')).toBeVisible();
        
    
        await page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('').fill(timesheetRows_conter[i]["Artifact"]);
        await page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('').fill(timesheetRows_conter[i]["Remarks"]);
    if(timesheetRows_conter[i]["hrs"][0]!="00"){
            await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1085.x-unselectable > .x-grid-cell-inner').first().click();
           
            await expect.soft(page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('')).toBeVisible();
            await page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('').fill(timesheetRows_conter[i]["hrs"][0]);
                                                                         
     
        }
        if(timesheetRows_conter[i]["hrs"][1]!="00"){
            await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1087.x-unselectable > .x-grid-cell-inner').first().click();
           
            await expect.soft(page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('')).toBeVisible();
            await page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('').fill(timesheetRows_conter[i]["hrs"][1]);
                                                                         
        }
        if(timesheetRows_conter[i]["hrs"][2]!="00"){
            await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1089.x-unselectable > .x-grid-cell-inner').first().click();
           
            await expect.soft(page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('')).toBeVisible();
            await page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('').fill(timesheetRows_conter[i]["hrs"][2]);
                                 
                                                         
                             
                                                                         
        }
        if(timesheetRows_conter[i]["hrs"][3]!="00"){
            await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1091.x-unselectable > .x-grid-cell-inner').first().click();
           
            await expect.soft(page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('')).toBeVisible();
            await page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('').fill(timesheetRows_conter[i]["hrs"][3]);
                                                                         
        }
        if(timesheetRows_conter[i]["hrs"][4]!="00"){
            await page.locator('table[data-recordindex="'+i+'"]> tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1093.x-unselectable > .x-grid-cell-inner').first().click();
           
            await expect.soft(page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('')).toBeVisible();
            await page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('').fill(timesheetRows_conter[i]["hrs"][4]);
                                                                         
        }
        
        await expect.soft(page.locator('#tableview-1099')).toBeEnabled(); 
        await page.locator('#tableview-1099').click();
        if(i<timesheetRows_conter.length-1){
            await expect.soft(page.locator("#btnTSEntry_AddNewRow-btnIconEl")).toBeEnabled();
            await page.locator("#btnTSEntry_AddNewRow-btnIconEl").click();
        }
        }
        
        await expect.soft(page.locator('#lblTimeSheetEntry')).toBeEnabled();
     
        const ttl_hrs_element = await page.locator('#component-1113-item > tbody > .x-grid-row-summary > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-1098.x-grid-cell-last.x-unselectable > .x-grid-cell-inner ');
        const textContent = await ttl_hrs_element.textContent();
        const Total_hrs = parseInt(textContent, 10);
        console.log("sumOftotalHrs :"+sumOftotalHrs);
        console.log("Total_hrs :"+Total_hrs);
        if(sumOftotalHrs!= Total_hrs){
            console.log("Hours not equal");
        }
        else{
            console.log("Total Hours match");
        }
        if (Total_hrs >= 40) {
            // Your code when the condition is true
            console.log(`The total working hours ${Total_hrs} is greater than or equal to 40 hours`);
        
            await expect.soft(page.locator('#btnSubmitTS')).toBeEnabled();
            await page.locator('#btnSubmitTS').click();
            //await page.locator('#btnTSEntryDiscardYes-btnInnerEl').click();
       
        }
    
        await page.waitForTimeout(1000);
    
    });
    
    
    
    test('Assigned Projects verification', async ({}) => {
     
        // const username1 = credentials.rightUsername ;
        // const password1 = credentials.rightPassword ;
        
         
        // await page.goto(URL);
         
        // // Fill in the login form
        // await page.locator('input[name="email_id"]').fill(username1);
        // await page.locator('input[name="pswd"]').fill(password1);
         
         
         
        // await page.locator('.button.blue.gradient').click();
        // //timesheet
        // await page.locator('id=btnTimeSheet-btnInnerEl').click();
        // // timesheet entry
        // await page.locator('id=btnTimeSheetEntry-textEl').click();
        // //dropdown
        // await page.locator('id=cmbTSEntry_SelectWeek-trigger-picker').click();
         
        let datesForPro = getDate(Project_dtl);
        let Assigned_project_list = [];
        const modifiedArray = assign_projects.map(project => project.split(' (')[0]);
        await page.getByRole('option', { name: Project_dtl.ProjectWeek }).click();
        await page.locator('.x-grid-item > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1078.x-unselectable > .x-grid-cell-inner').click();
        await page.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
        //Assigned_project_list = [];
        let g = 0;
        let continueLoop = true;
        try {
            while (g >= 0 && continueLoop) {
                const element = await page.waitForSelector('li[data-boundview="TSEntryGrd_cmbProject-picker"][data-recordindex="'+g+'"]', { timeout: 1000 }); // Adjust timeout value as needed
                const textContent = await element.textContent();
                console.log("textContent:" + textContent);
                Assigned_project_list.push(textContent);
                //console.log("ass pro : " + Assigned_project_list);
                g++;
            }
        } catch (error) {
            console.error("Error occurred while locating element:", error);
            // Remove the latest element from Assigned_project_list
            Assigned_project_list.pop();
            // Set continueLoop to false to exit the loop
            continueLoop = false;
        }
       
         
         await page.getByText('Add New Project').click();
          await page.locator('#cmbAddProjectManager-trigger-picker').click();
         
          await page.getByLabel('Manager').fill(Project_dtl.Manager);
          await page.getByRole('option', { name: Project_dtl.Manager }).click();
          await page.locator('#dateAddProjectFromDate-trigger-picker').click();
          await page.getByText('18', { exact: true }).click();
          await page.getByRole('button', { name: 'View' }).click();
          if (!Assigned_project_list.includes(Project_dtl.Project)) {
            // If the project is not in the Assigned_project_list
            await page.getByRole('option', { name: Project_dtl.Project }).click();
        } else {
            // If the project is already in the Assigned_project_list
            console.log("This project is already assigned to you");
        }
         
          await page.getByLabel('Add to Selected').click();
         
          await page.locator('#dateAddProjectFromDate-trigger-picker').click();
          await page.locator('.x-datepicker-month > .x-btn.x-unselectable.x-btn-default-small').nth(0).click();
         
         
          await page.getByRole('button', { name: Project_dtl.FromDate.substring(7),exact : true }).click();
         
          await page.getByRole('button', { name: Project_dtl.FromDate.substring(3,6),exact : true }).click();
          await page.getByRole('button', { name: 'OK' }).click();
          await page.getByLabel(''+ datesForPro["useDate1"]).getByText(''+ datesForPro["dateNumber1"]).click();
          await page.locator('#dateAddProjectToDate-trigger-picker').click();
          await page.locator('.x-datepicker-month > .x-btn.x-unselectable.x-btn-default-small').nth(1).click();
          await page.getByRole('button', { name: Project_dtl.ToDate.substring(7),exact : true }).click();
          await page.getByRole('button', { name: Project_dtl.ToDate.substring(3,6),exact : true }).click();
          await page.getByRole('button', { name: 'OK' }).click();
          await page.getByLabel(''+ datesForPro["useDate2"]).getByText(''+ datesForPro["dateNumber2"]).click();
          await page.getByRole('button', { name: 'View' }).click();
        
          await page.getByRole('option', { name: Project_dtl.Project }).click();
          await page.getByLabel('Add to Selected').click();
         
          // Check if arrays have same length
        if (modifiedArray.length !== Assigned_project_list.length) {
            console.log("Assigned Projects are different");
        }
     
        // Sort both arrays
        const sortedArr1 = modifiedArray.slice().sort();
        const sortedArr2 = Assigned_project_list.slice().sort();
        let check_modifiedArray = true;
        // Compare sorted arrays element by element
        for (let i = 0; i < sortedArr1.length; i++) {
            console.log("inside for");
            if (sortedArr1[i] !== sortedArr2[i]) {
                console.log("inside if");
                console.log("Assigned Projects are different");
                check_modifiedArray = false;
                break;
            }
        }
         // If all elements match, arrays are equal
         if(check_modifiedArray){
            console.log("Assigned Projects are same");
         }
        
     
          await page.waitForTimeout(2000);
          //await page.locator('#btnAddProjectCreate-btnInnerEl').click();
          await page.waitForTimeout(2000);
        });
    
    test('Projects assigned by manager', async ({}) => {
     
            // const username1 = credentials.rightUsername ;
            // const password1 = credentials.rightPassword ;
          
            
            
            // await page.goto(URL);
             
            // // Fill in the login form
            // await page.locator('input[name="email_id"]').fill(username1);
            // await page.locator('input[name="pswd"]').fill(password1);
             
             
             
            // await page.locator('.button.blue.gradient').click();
            // //timesheet
            // await page.locator('id=btnTimeSheet-btnInnerEl').click();
            // // timesheet entry
            // await page.locator('id=btnTimeSheetEntry-textEl').click();
            // //dropdown
            // await page.locator('id=cmbTSEntry_SelectWeek-trigger-picker').click();
             
            let Assigned_project_list = [];
          
            const elementToRemove = "Vistaar Resource Pool (Dept : SDG)";
    
            if (assign_projects.includes(elementToRemove)) {
              const index = assign_projects.indexOf(elementToRemove);
              assign_projects.splice(index, 1);
            }
            
            const modifiedArray = assign_projects.map(project => project.split(' (')[0]);
            await page.getByRole('option', { name: Project_dtl.ProjectWeek }).click();
            await page.locator('.x-grid-item > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-1078.x-unselectable > .x-grid-cell-inner').click();
            await page.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
            //Assigned_project_list = [];
            let g = 0;
            let continueLoop = true;
            await page.getByText('Add New Project').click();
            await page.locator('#cmbAddProjectManager-trigger-picker').click();
           
            await page.getByLabel('Manager').fill(Project_dtl.Manager);
            await page.getByRole('option', { name: Project_dtl.Manager }).click();
            await page.locator('#dateAddProjectFromDate-trigger-picker').click();
            await page.getByText('18', { exact: true }).click();
            await page.getByRole('button', { name: 'View' }).click();
            try {
                while (g >= 0 && continueLoop) {
                    const element = await page.waitForSelector('li[data-boundview="boundlist-1402"][data-recordindex="'+g+'"]', { timeout: 5000 }); // Adjust timeout value as needed
                    const textContent = await element.textContent();
                    console.log("textContent:" + textContent);
                    Assigned_project_list.push(textContent);
                    //console.log("ass pro : " + Assigned_project_list);
                    g++;
                }
            } catch (error) {
                console.error("Error occurred while locating element:", error);
                // Remove the latest element from Assigned_project_list
                // Set continueLoop to false to exit the loop
                continueLoop = false;
            }
             
              // Check if arrays have same length
            if (modifiedArray.length !== Assigned_project_list.length) {
                console.log("Assigned Projects are different");
            }
            console.log("modifiedArray: "+modifiedArray);
            console.log("Assigned_project_list: "+Assigned_project_list);
         
            // Sort both arrays
            const sortedArr1 = modifiedArray.slice().sort();
            const sortedArr2 = Assigned_project_list.slice().sort();
            let check_modifiedArray = true;
            // Compare sorted arrays element by element
            for (let i = 0; i < sortedArr1.length; i++) {
                
                if (sortedArr1[i] !== sortedArr2[i]) {
                    console.log("Assigned Projects are different");
                    check_modifiedArray = false;
                    break;
                }
            }
             // If all elements match, arrays are equal
             if(check_modifiedArray){
                console.log("Assigned Projects are same");
             }
            
         
              await page.waitForTimeout(2000);
              //await page.locator('#btnAddProjectCreate-btnInnerEl').click();
              await page.waitForTimeout(2000);
    });
    
});