// import fs from 'fs-extra'; // For file operations

//     // Function to write data (both request and response) to a file
//     function writeDataToFile(item, data) {
//         const filename = `network_data_${item}.json`;  // Create a unique filename for each item
//         const filePath = `./Edrington/network_data/${filename}`;  // Save in 'network_data' directory
//         fs.outputFile(filePath, data, err => {
//           if (err) {
//             //console.error('Error writing network data file:', err);
//           }
//         });
//     }
    
//     module.exports = {
//         writeDataToFile
//     };
    
    
    import fs from 'fs-extra'; // For file operations
import path from 'path'; // For handling file paths

// Function to generate a unique filename if a file already exists
function generateUniqueFilename(basePath, filename) {
    let filePath = path.join(basePath, filename);
    let counter = 0;

    // Check if the file exists and increment the counter until a unique filename is found
    while (fs.existsSync(filePath)) {
        const ext = path.extname(filename);
        const name = path.basename(filename, ext);
        filePath = path.join(basePath, `${name}_${counter}${ext}`);
        counter++;
    }

    return filePath;
}

// Function to write data (both request and response) to a file
function writeDataToFile(item, data) {
    // console.log("item: ",item);
    if(item == 'getLoggedInUserInformation') {
        // console.log("Data: ",data);
    }
    const filename = `${item}.json`;  // Create a unique filename for each item
    const basePath = './Edrington/network_data/';  // Save in 'network_data' directory
    
    // Generate a unique filename if the file already exists
    const uniqueFilePath = generateUniqueFilename(basePath, filename);

    // Write the data to the file
    fs.outputFile(uniqueFilePath, data, err => {
        if (err) {
            //console.error('Error writing network data file:', err);
        } else {
            //console.log(`Network data saved to ${uniqueFilePath}`);
        }
    });
}

module.exports = {
    writeDataToFile
};
