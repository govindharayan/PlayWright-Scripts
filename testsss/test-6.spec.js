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
  await page.locator('#loadmask-1049').press('NumLock');
  await page.getByRole('button', { name: 'Timesheet' }).click();
  await page.getByRole('menuitem', { name: 'Timesheet Entry' }).click();
  await page.getByLabel('Week').click();
  await page.getByRole('option', { name: '-Jan-24 to 28-Jan-24 (N)' }).click();
  await page.locator('#tableview-1099-record-423 > tbody > .x-grid-row > td:nth-child(2) > .x-grid-cell-inner').click();
  await page.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
  await page.getByRole('option', { name: 'Century Communities - Release' }).locator('div').click();
  await page.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
  await page.getByRole('option', { name: 'Presales Internal (Dept : Pre' }).locator('div').click();
  await page.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
  await page.getByText('Presales Pool (Dept : Pre-').click();
  await page.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
  await page.getByText('Vistaar Resource Pool (Dept').click();
});