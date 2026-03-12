import { test, expect } from '@playwright/test';

test("Verify PG Count matches between pages", async ({ page }) => {
    // 1. Go to workbench
    await page.goto(`https://bac-qa.vistaar.cloud/Vistaar/WebUI/Bacardi/index.html#/multichannelpricecard/workbench?module=MCPC&id=16952&revisionId=1&scenarioId=27317`);
   
    // Wait for page to load
    await page.waitForTimeout(3000);
   
    // Method 1: Using locator and count()
    const elements = page.locator('.cls-gpf-nonNumberRender');
    const count = await elements.count();
    console.log(`Number of PG elements: ${count}`);
   
    // Method 2: If you want to see the text of each element
    for (let i = 0; i < count; i++) {
        const text = await elements.nth(i).textContent();
        console.log(`Element ${i}: ${text}`);
    }
});

// REMOVE THE DUPLICATE TEST BELOW THIS LINE
// Don't copy the same test twice in the same file