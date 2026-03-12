const fs = require('fs');

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Array of common Indian first names and last names
const firstNames = ["Aarav", "Aanya", "Arjun", "Avni", "Dev", "Dia", "Ishaan", "Jiya", "Kabir", "Myra", "Nikhil", "Neha", "Pranav", "Riya", "Rohan", "Saanvi", "Samaira", "Shaurya", "Tara", "Vivaan", "Zara"];
const lastNames = ["Agarwal", "Bajaj", "Chopra", "Dutta", "Gandhi", "Joshi", "Kapoor", "Malhotra", "Mehra", "Nair", "Patel", "Rao", "Sinha", "Sharma", "Singh", "Thakur", "Verma"];

// Function to generate a random Indian name
function getRandomName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return firstName + "_" + lastName;
}

// Generate random names and ages and export as CSV
let csvContent = "username,Password\n";
for (let i = 0; i < 100; i++) {
  const fullName = getRandomName();
  const age = getRandomInt(18, 70);
  csvContent += fullName + "," + "password@" + age + "\n";
}

// Write CSV content to a file
fs.writeFileSync('random_data1.csv', csvContent);

console.log("Data saved to random_data.csv");
