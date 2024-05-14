const fs = require("node:fs");
const { faker } = require("@faker-js/faker");

const vulnResources = [];
for (let i = 0; i < 54500; i++) {
  const vulnId = faker.string.uuid();
  vulnResources.push({
    finding: {
      id: vulnId,
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
    },
    vulnerability: {
      denialOfService: false,
      description: {
        text: faker.lorem.sentence(),
      },
      exploits: faker.number.int(),
      id: vulnId,
      riskScore: faker.number.int({ max: 9 }),
      severity: "Critical",
      severityScore: 8,
      title: faker.lorem.slug(),
      categories: [],
    },
  });
}

// Convert the data object to JSON format
const jsonData = JSON.stringify(vulnResources); // The second argument specifies the number of spaces for indentation (for pretty printing)

// Write the JSON data to a file
fs.writeFile(
  "vulnResources.js",
  `const vulnResources = ${jsonData}; module.exports = vulnResources;`,
  "utf8",
  (err) => {
    if (err) {
      console.error("An error occurred while writing to the file:", err);
    } else {
      console.log("JSON data has been written to vulnResources.json");
    }
  }
);
