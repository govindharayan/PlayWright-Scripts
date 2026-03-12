import { test, chromium } from '@playwright/test';
import fs from 'fs-extra'; // For file operations
import path from 'path';   // For path operations
 
test.describe('Network Request and Response Capture', () => {
 
  test('Capture Specific GET Request and Response', async () => {
    // Launch browser and create context
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
      acceptDownloads: true,
      httpCredentials: {
        username: "tsmith@vistaar.in",
        password: "Welcome@12345"
      }
    });
    const page = await context.newPage();
 
    // Configuration for the output folder
    const outputFolder = 'output_data';
    fs.ensureDirSync(outputFolder); // Ensure the output directory exists
 
    // Target URL to capture
    const targetUrl = 'https://edgqa.vistaar.cloud/Vistaar/WebUI/Edrington/css/custom-fonts.css';
 
    // Function to save request and response data to a file
    async function saveRequestData(request, response) {
      const requestData = {
        method: request.method(),
        url: request.url(),
        headers: request.headers(),
        postData: request.postData(),
      };
 
      const responseData = {
        status: response.status(),
        url: response.url(),
        headers: response.headers(),
        body: await response.text(), // Get the response body as text
      };
 
      // Create a filename based on the URL and timestamp
      const fileName = `request_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
      const filePath = path.join(outputFolder, fileName);
 
      // Save request and response data to a file
      fs.writeJsonSync(filePath, { request: requestData, response: responseData }, { spaces: 2 });
    }
 
    // Intercept and handle responses
    page.on('response', async response => {
      const requestUrl = response.url();
 
      // console.log('Intercepted URL:', requestUrl.toString());
      // console.log('Target URL:', targetUrl.toString());
 
      if (requestUrl.toString().includes("getConfigByName")) {
        console.log('Response received for target URL:', requestUrl);
        // const request = response.request();
        // await saveRequestData(request, response);
      }
    });
 
    // Navigate to the initial URL and perform actions
    await page.goto('https://edgqa.vistaar.cloud/Vistaar/WebUI/Edrington/index.html');
    await page.getByLabel('LOGIN').click();
    await page.waitForTimeout(10000);
 
    // Close the browser after execution
    await browser.close();
  });
});