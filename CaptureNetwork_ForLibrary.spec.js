// import { test, chromium } from '@playwright/test';
// import fs from 'fs';
// import path from 'path';

// var EdringtonData = require("./EdringtonData.json");
// const loginRoles = EdringtonData["loginRoles"]["Role1"];
// var URL = require("./Env.json");
// URL = URL["URL"];
// var credentials = require("./credentials.json");
// var loginCredentials = credentials["loginCredentials"];
// var solution = require('./LoginLib');
// solution = solution["solution"];
// const { writeDataToFile } = require("./CaptureNetworkLib");
// var NetWorkData = require("./CaptureNetworkData.json");

// // Ensure the network_data directory exists
// // const networkDataDir = path.join(__dirname, 'network_data');
// // if (!fs.existsSync(networkDataDir)){
// //     fs.mkdirSync(networkDataDir, { recursive: true });
// // }

// // Function to sanitize file names
// function sanitizeFileName(fileName) {
//   return fileName.replace(/[<>:"/\\|?*]+/g, '_'); // Replace invalid characters with an underscore
// }

// // Main test suite
// export default function createTests() {
//   test.describe('Network Request and Response Capture', () => {

//     test('Capture Specific GET Request and Response', async () => {
//       const browser = await chromium.launch({ headless: false });
//       const context = await browser.newContext({
//         acceptDownloads: true,
//         httpCredentials: {
//           username: loginCredentials.Username,
//           password: loginCredentials.Password
//         }
//       });
//       const page = await context.newPage();
//       let networkData = {};  // To store request and response data for each item
//       let targetUrl = NetWorkData.targetUrl;
//       let item_FileName;
//       let foundItems = {};
//       let counter;
//       // Capture requests
//       page.on('request', async (request) => {
//         // let networkData = {};  
//         for (const item of targetUrl) {
//           if (request.url().includes(item)) {
//             let payload = null;
//             if (request.method() === 'POST' || request.method() === 'PUT') {
//               payload = request.postData();
//               ////////console.log("payload: ",payload);
//             }
//             // if (!foundItems[item]) {
//             //   foundItems[item] = 1;
//             // }

//             if (foundItems[item]) {
//               counter = foundItems[item]+1;
//             } else {
//               counter = 1;
//               foundItems[item] = counter;
//             }


//             const requestData = {
//               url: request.url(),
//               method: request.method(),
//               headers: request.headers(),
//               payload: payload,
//               time: new Date().toISOString(),
//               type: "request"
//             };

//             if (!networkData[item]) {
//               networkData[item] = { requests: [], responses: [] };
//             }

//             networkData[item].requests.push(requestData);
//             // await writeDataToFile(`${networkDataDir}\\${sanitizeFileName(item)}_request_${foundItems[item]}.json`, JSON.stringify(networkData[item], null, 2));
//             //////////console.log("ITEM: ",item);
//             //  item_FileName= await sanitizeFileName(item);
//             // await writeDataToFile(item_FileName, JSON.stringify(networkData[item], null, 2));
//             // await writeDataToFile(item, JSON.stringify(networkData[item], null, 2));
//           }
//         }
//       });

//       // Capture responses
//       page.on('response', async (response) => {
//         // let networkData = {};  
//         // let counter;
//         const request = response.request();
//         for (const item of targetUrl) {
//           if (request.url().includes(item)) {
//             if (foundItems[item]) {
//               counter = foundItems[item]+1;
//             } else {
//               counter = 1;
//               foundItems[item] = counter;
//             }

//             // if (foundItems[item]){
//             //   counter=foundItems[item]+1  ;
//             //   }
//             //   else{
//             //   counter=1;
//             //   foundItems[item]=counter;
//             //   }



//             const responseBody = await response.json();
//             const responseData = {
//               url: response.url(),
//               status: response.status(),
//               headers: response.headers(),
//               body: responseBody,
//               time: new Date().toISOString(),
//               type: "response"
//             };

//             if (!networkData[item]) {
//               networkData[item] = { requests: [], responses: [] };
//             }

//             networkData[item].responses.push(responseData);
//             // await writeDataToFile(`${networkDataDir}\\${sanitizeFileName(item)}_response_${counter}.json`, JSON.stringify(networkData[item], null, 2));
//             ////////console.log("after");
//             item_FileName= await sanitizeFileName(item);
//             await writeDataToFile(item_FileName, JSON.stringify(networkData[item], null, 2));
//           }
//         }
//       });

//       await page.goto(URL);
//       await page.getByLabel('Select').click();
//       await page.getByText(loginRoles).click();
//       await page.getByLabel('LOGIN').click();
//       await page.waitForTimeout(10000);
//       await solution.operations.logout(page);
      
//       await browser.close();
//     });
//   });
// };


import { test, chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

var EdringtonData = require("./EdringtonData.json");
const loginRoles = EdringtonData["loginRoles"]["Role1"];
var URL = require("./Env.json");
URL = URL["URL"];
var credentials = require("./credentials.json");
var loginCredentials = credentials["loginCredentials"];
var solution = require('./LoginLib');
solution = solution["solution"];
const { writeDataToFile } = require("./CaptureNetworkLib");
var NetWorkData = require("./CaptureNetworkData.json");

// Function to sanitize file names
function sanitizeFileName(fileName) {
  return fileName.replace(/[<>:"/\\|?*]+/g, '_'); // Replace invalid characters with an underscore
}

// Main test suite
export default function createTests() {
  test.describe('Network Request and Response Capture', () => {

    test('Capture Specific GET Request and Response', async () => {
      const browser = await chromium.launch({ headless: false });
      const context = await browser.newContext({
        acceptDownloads: true,
        httpCredentials: {
          username: loginCredentials.Username,
          password: loginCredentials.Password
        }
      });
      const page = await context.newPage();
      let networkData = {};  // To store request and response data for each item
      let targetUrl = NetWorkData.targetUrl;
      let foundItems = {};  // Track occurrences of each item

      // Capture requests
      page.on('request', async (request) => {
        if (request.method() === 'POST' || request.method() === 'PUT') {
          let payload = request.postData();
          if (payload) {
            // Extract the libraryName in one line
            const libraryName = payload.match(/libraryName=([^&]+)/)?.[1];
            if (libraryName) {
              console.log('Extracted libraryName:', libraryName);
              // You can now store it in a variable or use it as needed
            }
          }
        }
      });










var lib = '';


      page.on('request', async (request) => {
        for (const item of targetUrl) {
          if (request.url().includes(item)) {
            var payload = null;
            if (request.method() === 'POST' || request.method() === 'PUT') {
              payload = request.postData();
              if (payload) {
                // Extract the libraryName in one line
                var libraryName = payload.match(/libraryName=([^&]+)/)?.[1];
                if (libraryName) {
                  console.log('Extracted libraryName:', libraryName);
                  lib = libraryName;
                  console.log("foritem:" ,item);
                  console.log("Lib Inside: ",lib);
                  // You can now store it in a variable or use it as needed
                }
              }
            }
            // Update counter for found items
            foundItems[item] = (foundItems[item] || 0) + 1;

            const requestData = {
              url: request.url(),
              method: request.method(),
              headers: request.headers(),
              payload: payload,
              time: new Date().toISOString(),
              type: "request"
            };

            if (!networkData[item]) {
              networkData[item] = { requests: [], responses: [] };
            }

            networkData[item].requests.push(requestData);
          }
        }
      });

      // Capture responses
      page.on('response', async (response) => {
        const request = response.request();
        for (const item of targetUrl) {
          if (request.url().includes(item)) {
            foundItems[item] = (foundItems[item] || 0) + 1;

            const responseBody = await response.json();
            const responseData = {
              url: response.url(),
              status: response.status(),
              headers: response.headers(),
              body: responseBody,
              time: new Date().toISOString(),
              type: "response"
            };

            if (!networkData[item]) {
              networkData[item] = { requests: [], responses: [] };
            }

            networkData[item].responses.push(responseData);

            // Write both request and response data to a file
            const item_FileName = sanitizeFileName(item);
            console.log("Lib outside: ",lib);
            if(lib === 'CalculationEngine') {
              console.log("network data: ",JSON.stringify(networkData[item]));
              await writeDataToFile(item_FileName, JSON.stringify(networkData[item], null, 2));
            }
            
          }
        }
      });

      // Perform login and interaction
      await page.goto(URL);
      await page.getByLabel('Select').click();
      await page.getByText(loginRoles).click();
      await page.getByLabel('LOGIN').click();
      await page.waitForTimeout(10000);
      await solution.operations.logout(page);

      await browser.close();
    });
  });
}
