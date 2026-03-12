import { test, chromium } from '@playwright/test';
import fs from 'fs';  // Import the file system module

test('test', async () => {
  let networkRequests = [];
  let networkResponses = [];
  
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

  // Function to write request data to a file
  const writeRequestToFile = (data) => {
    fs.appendFileSync('network-requests-get.log', data + '\n', (err) => {
      if (err) {
        console.error('Error writing request to file:', err);
      }
    });
  };

  // Function to write response data to a file
  const writeResponseToFile = (data) => {
    fs.appendFileSync('network-responses-get.log', data + '\n', (err) => {
      if (err) {
        console.error('Error writing response to file:', err);
      }
    });
  };

  // Intercept network requests
  page.on('request', request => {
    if (request.url().includes('=get')) {  // Check if the URL contains '=get'
      const requestData = {
        method: request.method(),
        url: request.url(),
        headers: request.headers(),
        postData: request.postData(),
        time: new Date().toISOString()
      };
      networkRequests.push(requestData);
      writeRequestToFile(JSON.stringify(requestData, null, 2));  // Write to file if condition is met
    }
  });

  // Intercept network responses
  page.on('response', response => {
    const request = response.request();
    if (request.url().includes('=get')) {  // Check if the corresponding request URL contains '=get'
      const responseData = {
        url: response.url(),
        status: response.status(),
        headers: response.headers(),
        time: new Date().toISOString()
      };
      networkResponses.push(responseData);
      writeResponseToFile(JSON.stringify(responseData, null, 2));  // Write to file if condition is met
    }
  });

  try {
    // Navigate to the page
    await page.goto('https://edgqa.vistaar.cloud/Vistaar/WebUI/Edrington/index.html');
    
    // Click on the login button
    await page.getByLabel('LOGIN').click();
    
    // Wait for some time (adjust if necessary)
    await page.waitForTimeout(10000);

    console.log('Filtered requests and responses saved to respective files.');

  } catch (error) {
    console.error('Error during the test:', error);
  } finally {
    // Close the browser after execution
    await browser.close();
  }
});
