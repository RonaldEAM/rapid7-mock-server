const fs = require("node:fs");
const { faker } = require("@faker-js/faker");

const vulnResources = [];
for (let i = 0; i < 9600; i++) {
  vulnResources.push({
    id: faker.string.uuid(),
    instances: faker.number.int(),
    links: [],
    results: [
      {
        proof: faker.string.uuid(),
        since: faker.date.past().toISOString(),
        status: "open",
      },
    ],
    since: faker.date.past().toISOString(),
    status: "vulnerable",
  });
}

// Convert the data object to JSON format
const jsonData = JSON.stringify(vulnResources, null, 2); // The second argument specifies the number of spaces for indentation (for pretty printing)

// Write the JSON data to a file
fs.writeFile("vulnResources.json", jsonData, "utf8", (err) => {
  if (err) {
    console.error("An error occurred while writing to the file:", err);
  } else {
    console.log("JSON data has been written to vulnResources.json");
  }
});
