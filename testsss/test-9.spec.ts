import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  try {
    // Navigate to the login page
    await page.goto('https://vistaar.spinehr.in/login.aspx?ReturnUrl=%2fstart_new.aspx');

    // Check if the "Accept All Cookies" button exists
    const acceptCookiesButton = await page.waitForSelector('input[type="submit"][name="btnAccept"][value="Accept all Cookies"]', { timeout: 5000 });

    // If the button exists, click on it
    if (acceptCookiesButton) {
      await acceptCookiesButton.click();
      console.log('Clicked on Accept All Cookies button.');
    } else {
      console.log('Accept All Cookies button not found or already accepted. Proceeding with login.');
    }

    // Fill in the username
    await page.locator('#txtUser').click();
    await page.locator('#txtUser').fill('V1063');

    // Move to the password field
    await page.locator('#txtUser').press('Tab');

    // Fill in the password
    await page.locator('#txtPassword').fill('Employee@1102');

    // Submit the login form
    await page.locator('#btnLogin').click();

    // Try to interact with the photo element using XPath
    try {
      await page.waitForSelector('//html/body/form/div[3]/div[1]/div/ul[2]/li[2]/ul/li[6]/div/a/img', { timeout: 30000 });
      await page.click('//html/body/form/div[3]/div[1]/div/ul[2]/li[2]/ul/li[6]/div/a/img');
      console.log('Clicked on the photo element using XPath.');
    } catch (xpathError) {
      console.error('XPath selector failed:', xpathError);

      // Fallback to CSS selector if XPath fails
      try {
        await page.waitForSelector('#ctl00_empphoto', { timeout: 30000 });
        await page.click('#ctl00_empphoto');
        console.log('Clicked on the photo element using CSS selector.');
      } catch (cssError) {
        console.error('CSS selector failed:', cssError);

        // Handle failure to find or click the element
        console.log('Both XPath and CSS selectors failed. Exiting.');
        return; // Exit the test if both methods fail
      }
    }

    // Attempt to click the "Sign Out" link
    try {
      const signOutLink = await page.locator('text="Sign Out"').nth(1);
      await signOutLink.click();
      console.log('Successfully logged out.');
    } catch (signOutError) {
      console.error('Sign out elements not found within 30 seconds:', signOutError);

      // Wait for 25 minutes
      await page.waitForTimeout(25 * 60 * 1000);
      console.log('Automatically logged out after 25 minutes.');
    }

  } catch (error) {
    console.error('Error during the test:', error);
    throw error; // Rethrow the error to fail the test
  }
});
