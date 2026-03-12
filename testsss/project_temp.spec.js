const { test, expect } = require('@playwright/test');
const credentials = require('./credentials.json');
const { getDate } = require('./utils');
const ppm_URL = require('./env.json');
var timesheet_rows = require("./timesheet_Multiplerows.json");
var Project_dtl = require("./project_data");
const { log } = require('console');
var selectedDate = timesheet_rows["selectedDate"];
var timesheetRows_conter = timesheet_rows["projectData"];
const URL = ppm_URL.URL;
var assign_projects = require("./assingedProjects.json");

test.use({ preserveOutput: true });

let isrefreshed = false;
let numToSub = 28;








test('Project Entry', async ({ page }) => {
    let temp = 1078;
    const username1 = credentials.rightUsername ;
    const password1 = credentials.rightPassword ;   
    if(isrefreshed == true ) {
        temp =temp-28;
    }

    await page.goto(URL);

    // Fill in the login form
    await expect.soft(page.locator('input[name="email_id"]')).toBeEditable();
    await page.locator('input[name="email_id"]').fill(username1);

    await expect.soft(page.locator('input[name="pswd"]')).toBeEditable();
    await page.locator('input[name="pswd"]').fill(password1);


    await expect.soft(page.locator('.button.blue.gradient')).toBeEnabled();
    await page.locator('.button.blue.gradient').click();
    //timesheet
    await expect.soft(page.locator('id=btnTimeSheet-btnInnerEl')).toBeVisible();
    await page.locator('id=btnTimeSheet-btnInnerEl').click();
    // timesheet entry
    await expect.soft(page.locator('id=btnTimeSheetEntry-textEl')).toBeVisible();
    await page.locator('id=btnTimeSheetEntry-textEl').click();
    //dropdown
    await expect.soft(page.locator('id=cmbTSEntry_SelectWeek-trigger-picker')).toBeVisible();
    await page.locator('id=cmbTSEntry_SelectWeek-trigger-picker').click();

    let datesForPro = getDate(Project_dtl);
    await page.getByRole('option', { name: Project_dtl.ProjectWeek }).click();
 
    await page.locator('.x-grid-item > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-' + temp + '.x-unselectable > .x-grid-cell-inner').click();

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
  isrefreshed=true;
  await page.reload();
  await page.waitForTimeout(2000);
});

test('timesheet entry', async ({ page }) => {
    let temp = 1078
    if(isrefreshed == true ) {
        temp =temp-28;
    }
 await page.locator('id=btnTimeSheet-btnInnerEl').click();
   // timesheet entry
   await expect.soft(page.locator('id=btnTimeSheetEntry-textEl')).toBeVisible();
    await page.locator('id=btnTimeSheetEntry-textEl').click();
    //dropdown
    await expect.soft(page.locator('id=cmbTSEntry_SelectWeek-trigger-picker')).toBeVisible();
    await page.locator('id=cmbTSEntry_SelectWeek-trigger-picker').click();
    
    let obj = {};
    let sumOftotalHrs =0;
    await expect.soft(page.getByRole('option', { name: selectedDate })).toBeVisible();
    await page.getByRole('option', { name: selectedDate}).click();

    for(let i=0 ; i<timesheetRows_conter.length; i++){

    await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-'+temp + '.x-unselectable > .x-grid-cell-inner').click();
    
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
        
     temp++;
    await page.locator('table[data-recordindex="'+i+'"]> tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-'+temp+'.x-unselectable > .x-grid-cell-inner' ).click();
    await page.waitForSelector('#combobox-1395-trigger-picker');

    // Evaluate JavaScript to extract the HTML content until the desired element
    const html = await page.evaluate(() => {
      const element = document.querySelector('#combobox-1395-trigger-picker');
      if (element) {
        // Traverse up the DOM to get the HTML until the desired element
        let html = '';
        let currentElement = element;
        while (currentElement && currentElement.parentElement) {
          html = currentElement.outerHTML + html;
          currentElement = currentElement.parentElement;
        }
        return html;
      } else {
        return 'Element not found';
      }
    });
  
    console.log(html);
    await expect.soft(page.locator('#combobox-1395-trigger-picker')).toBeEnabled();
    await page.locator('#combobox-1395-trigger-picker').click();

    

    await expect.soft(page.getByRole('option', { name: timesheetRows_conter[i]["Task"] })).toBeEnabled();
    await page.getByRole('option', { name: timesheetRows_conter[i]["Task"], exact: true }).scrollIntoViewIfNeeded();
    await page.getByRole('option', { name: timesheetRows_conter[i]["Task"], exact: true }).click();
    temp++;
    await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-'+temp+'.x-unselectable > .x-grid-cell-inner').click();
    
    await expect.soft(page.locator('#combobox-1398-trigger-picker')).toBeEnabled();
    await page.locator('#combobox-1398-trigger-picker').click();

    await expect.soft(page.getByRole('option', { name: timesheetRows_conter[i]["Module"] })).toBeEnabled();
    await page.getByRole('option', { name: timesheetRows_conter[i]["Module"], exact: true }).scrollIntoViewIfNeeded();
 
    // Now, click on the element
    await page.getByRole('option', { name: timesheetRows_conter[i]["Module"], exact: true }).click();
 
    temp+=2;
    await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-gridcolumn-'+temp+'.cls-resizer.x-unselectable > .x-grid-cell-inner').click();
    
    await expect.soft(page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('')).toBeVisible();
    

    await page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('').fill(timesheetRows_conter[i]["Artifact"]);
    await page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('').fill(timesheetRows_conter[i]["Remarks"]);
    temp+=3;
if(timesheetRows_conter[i]["hrs"][0]!="00"){
        await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-'+temp+'.x-unselectable > .x-grid-cell-inner').first().click();
       
        await expect.soft(page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('')).toBeVisible();
        await page.getByRole('row', { name: timesheetRows_conter[i]["Project"] }).getByLabel('').fill(timesheetRows_conter[i]["hrs"][0]);
                                                                     
 
    }
    temp+=2;
    if(timesheetRows_conter[i]["hrs"][1]!="00"){
        await page.locator('table[data-recordindex="'+i+'"] > tbody > .x-grid-row > .x-grid-cell.x-grid-td.x-grid-cell-numbercolumn-'+temp+'.x-unselectable > .x-grid-cell-inner').first().click();
       
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


