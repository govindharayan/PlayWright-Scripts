import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ppm.vistaar.us/vistaarppm/ppmOnVWUF/VistaarPPM/index.html#TS_Entry');
  await page.goto('https://ppm.vistaar.us/vistaarppm/login.php');
  await page.getByRole('row', { name: 'Username:', exact: true }).getByRole('cell').nth(1).click();
  await page.locator('input[name="email_id"]').fill('gharayan');
  await page.locator('input[name="email_id"]').press('Tab');
  await page.locator('input[name="pswd"]').fill('Employee@1102');
  await page.locator('input[name="pswd"]').press('Tab');
  await page.getByRole('button', { name: 'Submit' }).press('Enter');
  await page.getByText('Dashboard').click();
  await page.getByRole('button', { name: 'Timesheet' }).click();
  await page.getByRole('menuitem', { name: 'Timesheet Entry' }).click();
  await page.locator('#fieldSetTSEntrySelectWeek-innerCt').click();
  await page.getByLabel('Week').click();
  await page.getByRole('option', { name: '-Jan-24 to 28-Jan-24 (N)' }).click();
  await page.locator('#tableview-1099-record-423 > tbody > .x-grid-row > td:nth-child(2) > .x-grid-cell-inner').click();
  await page.locator('#TSEntryGrd_cmbProject-trigger-picker').click();
  await page.getByText('Presales Internal (Dept : Pre').click();
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').click();
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').click();
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').click({
    clickCount: 6
  });
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').click();
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').press('Shift+ArrowRight');
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').press('Shift+ArrowRight');
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').press('Shift+ArrowRight');
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').press('Shift+ArrowRight');
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').press('Shift+ArrowRight');
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').press('Shift+ArrowRight');
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').press('Shift+ArrowRight');
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').press('Tab');
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').press('Tab');
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').press('Tab');
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').press('Tab');
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').press('Tab');
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByRole('button').press('Tab');
  await page.getByRole('row', { name: '0 0 0 0 0 0 0 0', exact: true }).getByLabel('').press('Tab');
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').press('Tab');
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').press('Tab');
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').press('Tab');
  await page.locator('td:nth-child(9) > .x-grid-cell-inner').first().click();
  await page.locator('#ext-element-102').press('NumLock');
  await page.locator('td:nth-child(11) > .x-grid-cell-inner').first().click();
  await page.locator('#ext-element-101').click();
  await page.locator('#ext-element-101').click({
  await page.locator('#ext-element-101').click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').fill('');
    clickCount: 3
  });
  await page.locator('#ext-element-85').click();
  await page.locator('#combobox-1395-trigger-picker').click();
  await page.getByRole('option', { name: 'NA - Data Analysis & Loading' }).click();
  await page.locator('#ext-element-89').click();
  await page.locator('#ext-element-85').click();
  await page.locator('#combobox-1395-trigger-picker').click();
  await page.getByRole('option', { name: 'NA - Others' }).click();
  await page.locator('#ext-element-89').click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').click();
  await page.locator('#combobox-1397-trigger-picker').click();
  await page.getByRole('option', { name: 'NA', exact: true }).click();
  await page.locator('#ext-element-93').click();
  await page.locator('#combobox-1399-trigger-picker').click();
  await page.locator('#ext-element-125').click();
  await page.locator('#ext-element-97').click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').fill('08');
  await page.locator('td:nth-child(13) > .x-grid-cell-inner').first().click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').fill('66');
  await page.locator('#ext-element-139').click();
  await page.locator('#tableview-1099').click();

  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').press('NumLock');
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').fill('9');
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').click({
    clickCount: 3
  });
  await page.locator('#ext-element-103').click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').click();
  await page.locator('#ext-element-133').click();
  await page.locator('#ext-element-139').click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').fill('99');
  await page.locator('#ext-element-103').click();
  await page.locator('#ext-element-133').click();
  await page.locator('#ext-element-139').click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').click();
  await page.locator('#ext-element-145').click();
  await page.locator('#ext-element-101').click();
  await page.locator('#ext-element-103').click();
  await page.locator('#ext-element-103').click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').click({
    clickCount: 3
  });
  await page.locator('#ext-element-101').click();
  await page.locator('#ext-element-103').click();
  await page.locator('#ext-element-133').click();
  await page.locator('#ext-element-79').getByText('0').nth(1).click();
  await page.locator('#ext-element-79').getByText('0').nth(2).click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').press('NumLock');
  await page.locator('#ext-element-139').click();
  await page.locator('#ext-element-133').click();
  await page.locator('#ext-element-103').click();
  await page.locator('#ext-element-133').click();
  await page.locator('#ext-element-139').click();
  await page.locator('#ext-element-145').click();
  await page.locator('#ext-element-153').click();
  await page.getByRole('row', { name: 'Presales Internal (Dept : Pre' }).getByLabel('').press('NumLock');
  await page.locator('#numbercolumn-1093-textInnerEl').click();
  await page.getByRole('columnheader', { name: 'Fri' }).press('NumLock');
  await page.locator('#tableview-1099-record-423').getByText('0').first().click();
});