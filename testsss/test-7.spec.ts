import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ppm.vistaar.us/vistaarppm/ppmOnVWUF/VistaarPPM/index.html#TS_Entry');
  await page.goto('https://ppm.vistaar.us/vistaarppm/login.php');
  await page.locator('input[name="email_id"]').click();
  await page.locator('input[name="email_id"]').fill('gharayan');
  await page.locator('input[name="email_id"]').press('Tab');
  await page.locator('input[name="pswd"]').fill('Employee@1102');
  await page.locator('input[name="pswd"]').press('Tab');
  await page.getByRole('button', { name: 'Submit' }).press('Enter');
  await page.getByRole('button', { name: 'Timesheet' }).click();
  await page.getByRole('button', { name: 'Timesheet' }).click();
  await page.getByRole('menuitem', { name: 'Timesheet Entry' }).click();
  await page.getByLabel('Week').click();
  await page.getByRole('option', { name: '-Feb-24 to 11-Feb-24 (N)' }).click();
  await page.locator('#tableview-1099-record-576 > tbody > .x-grid-row > td:nth-child(2) > .x-grid-cell-inner').click();
  await page.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
  await page.getByRole('option', { name: 'Century Communities - Onboarding (Dept : Onboarding)' }).locator('div').click();
  await page.locator('#ext-element-80 > td:nth-child(3) > .x-grid-cell-inner').click();
  await page.locator('#combobox-1395-trigger-picker').click();
  await page.getByRole('option', { name: 'Build / Construction - Administrative Guide' }).click();
});