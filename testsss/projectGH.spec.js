const { test, expect, beforeEach, beforeAll, afterAll } = require('@playwright/test');
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
// Your login function
async function login(page) {
  // Perform login steps
  const username2 = credentials.WrongUsername ;
  const password2 = credentials.rightPassword ;

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

}

beforeAll(async ({ browser }) => {
  // Create a browser context for the login session
  const context = await browser.newContext();
  const page = await context.newPage();

  // Perform login once
  await login(page);

  // Store the page in the context for later use
  context.loginPage = page;
});

afterAll(async ({ browser }) => {
  // Close the browser when all tests are done
  await browser.close();
});

// Parent test case with login
test.describe('Login Tests', () => {
  // Child test case
  test('Test 1', async ({ context }) => {
    // Access the stored login page from the parent context
    const page = context.loginPage;

    // Your test steps go here
    await expect(page.locator('id=btnTimeSheet-btnInnerEl')).toBeVisible();
    await page.locator('id=btnTimeSheet-btnInnerEl').click();

    await expect(page.locator('id=btnTimeSheetEntry-textEl')).toBeVisible();
    await page.locator('id=btnTimeSheetEntry-textEl').click();

    await expect(page.locator('id=cmbTSEntry_SelectWeek-trigger-picker')).toBeVisible();
    await page.locator('id=cmbTSEntry_SelectWeek-trigger-picker').click();
    await page.waitForTimeout(2000);
    await page.reload();

    // Perform other actions
  });

  // Child test case
  test('Test 2', async ({ context }) => {
    // Access the stored login page from the parent context

    // Your test steps go here
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
  await page.waitForTimeout(2000);    // Perform other actions
  });

  // You can add more child test cases as needed
});
