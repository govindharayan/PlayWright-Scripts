const fs = require('fs');
const { Parser } = require('json2csv');

// Function to flatten nested objects
function flattenObject(obj, parentKey = '', result = {}) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = parentKey ? `${parentKey}_${key}` : key;
            
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                // Recursively flatten nested objects
                flattenObject(obj[key], newKey, result);
            } else if (Array.isArray(obj[key])) {
                // Convert arrays to JSON string
                result[newKey] = JSON.stringify(obj[key]);
            } else {
                // Keep primitive values as is
                result[newKey] = obj[key];
            }
        }
    }
    return result;
}

// Main conversion function
function convertJSONtoCSV() {
    console.log('🚀 Starting JSON to CSV conversion...\n');
    
    try {
        // Step 1: Read JSON file
        console.log('📖 Reading data.json file...');
        const jsonData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
        console.log('✅ JSON file read successfully\n');
        
        // Step 2: Extract all records from nested arrays
        console.log('🔄 Extracting records from nested structure...');
        const allRecords = [];
        
        // Your data is an array of arrays
        if (Array.isArray(jsonData)) {
            for (const communityData of jsonData) {
                if (Array.isArray(communityData)) {
                    allRecords.push(...communityData);
                }
            }
        }
        
        console.log(`📊 Found ${allRecords.length} total records\n`);
        
        // Step 3: Flatten each record
        console.log('🔨 Flattening nested objects...');
        const flattenedRecords = allRecords.map(record => flattenObject(record));
        
        // Step 4: Get all unique field names
        const allFields = new Set();
        flattenedRecords.forEach(record => {
            Object.keys(record).forEach(key => allFields.add(key));
        });
        
        const sortedFields = Array.from(allFields).sort();
        console.log(`📋 Found ${sortedFields.length} unique columns\n`);
        
        // Step 5: Convert to CSV
        console.log('💾 Creating CSV file...');
        const json2csvParser = new Parser({ fields: sortedFields });
        const csv = json2csvParser.parse(flattenedRecords);
        
        // Step 6: Save to file
        fs.writeFileSync('output.csv', csv, 'utf8');
        
        // Step 7: Display summary
        console.log('\n✅ CONVERSION COMPLETE!');
        console.log('======================');
        console.log(`📄 Output file: output.csv`);
        console.log(`📊 Total records: ${flattenedRecords.length}`);
        console.log(`📋 Total columns: ${sortedFields.length}`);
        
        // Show sample columns
        console.log('\n📝 Sample columns (first 20):');
        sortedFields.slice(0, 20).forEach((field, index) => {
            console.log(`  ${index + 1}. ${field}`);
        });
        
        // Show first record sample
        if (flattenedRecords.length > 0) {
            console.log('\n🔍 First record preview:');
            const firstRecord = flattenedRecords[0];
            const sampleKeys = Object.keys(firstRecord).slice(0, 5);
            sampleKeys.forEach(key => {
                let value = firstRecord[key];
                if (typeof value === 'string' && value.length > 50) {
                    value = value.substring(0, 50) + '...';
                }
                console.log(`  ${key}: ${value}`);
            });
        }
        
    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.log('\n💡 TROUBLESHOOTING:');
        console.log('1. Make sure data.json file exists in the same folder');
        console.log('2. Make sure your JSON data is valid');
        console.log('3. Install json2csv: npm install json2csv');
        process.exit(1);
    }
}

// Run the conversion
convertJSONtoCSV();