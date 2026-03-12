import { test, expect } from '@playwright/test';
import fs from 'fs';

test('test', async ({ page }) => {
  await page.goto('https://ppm.vistaar.us/vistaarppm/ppmOnVWUF/VistaarPPM/index.html#TS_Entry');
  await page.goto('https://ppm.vistaar.us/vistaarppm/login.php');
  await page.locator('input[name="email_id"]').click();
  await page.locator('input[name="email_id"]').fill('gharayan');
  await page.locator('input[name="email_id"]').press('Tab');
  await page.locator('input[name="pswd"]').fill('Employee@1102');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Timesheet' }).click();
  await page.getByRole('menuitem', { name: 'Timesheet Entry' }).click();
  await page.getByLabel('Week').click();
  await page.getByRole('option', { name: '-Feb-24 to 11-Feb-24 (N)' }).click();
  await page.locator('#tableview-1099-record-576 > tbody > .x-grid-row > td:nth-child(2) > .x-grid-cell-inner').click();
  await page.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
  await page.getByRole('option', { name: 'Century Communities - Onboarding (Dept : Onboarding)' }).locator('div').click();
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').press('Tab');

  // Wait for the element with ID combobox-1395-trigger-picker to appear
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

  console.log(html); // Print or handle the extracted HTML content as needed

  fs.writeFileSync('output.html', html);
});


