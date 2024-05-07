const express = require("express");
const { faker } = require("@faker-js/faker");
const sampleSize = require("lodash/sampleSize");
const vulnResources = require("./vulnResources");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.get("/api/3", (req, res) => {
  res.status(200).json({ links: [] });
});

app.get("/api/3/administration/info", (req, res) => {
  res.status(200).json({
    links: [
      {
        href: "https://host.docker.internal:8080/api/3/administration/info",
        rel: "self",
      },
    ],
    user: "root",
  });
});

app.get("/api/3/sites", (req, res) => {
  const responseData = {
    resources: [
      {
        assets: 1,
        id: faker.string.uuid(),
        importance: "normal",
        lastScanTime: "2024-04-25T19:00:57.619Z",
        links: [],
        name: "host.docker.internal",
        riskScore: 475,
        scanEngine: 3,
        scanTemplate: "full-audit-without-web-spider",
        type: "static",
        vulnerabilities: { critical: 0, moderate: 0, severe: 1, total: 1 },
      },
      {
        assets: 1,
        id: faker.string.uuid(),
        importance: "normal",
        lastScanTime: "2024-04-25T19:07:08.582Z",
        links: [],
        name: "172.18.0.3",
        riskScore: 31294,
        scanEngine: 3,
        scanTemplate: "full-audit-without-web-spider",
        type: "static",
        vulnerabilities: { critical: 10, moderate: 0, severe: 49, total: 59 },
      },
    ],
    page: { number: 0, size: 500, totalResources: 2, totalPages: 1 },
    links: [
      {
        href: "https://host.docker.internal:8080/api/3/sites?page=0&size=500&sort=id,asc",
        rel: "self",
      },
    ],
  };

  res.status(200).json(responseData);
});

app.get("/api/3/assets", (req, res) => {
  const assetsResources = [];
  for (let i = 0; i < 500; i++) {
    assetsResources.push({
      hostName: faker.internet.domainName(),
      id: faker.string.uuid(),
      ip: faker.internet.ip(),
      mac: faker.internet.mac(),
      links: [],
      os: faker.word.words(),
      type: faker.word.words(),
      siteId: faker.string.uuid(),
      riskScore: faker.number.int(),
      vulnerabilities: {
        critical: 5,
        severe: 5,
        moderate: 5,
        exploits: 5,
        malwareKits: 5,
        total: 5,
      },
      osFingerprint: {
        systemName: faker.word.words(),
        version: faker.system.semver(),
        family: faker.word.words(),
        type: faker.word.words(),
      },
      history: [
        {
          date: faker.date.past().toISOString(),
          scanId: faker.string.uuid(),
          type: faker.word.words(),
          version: faker.number.int(),
        },
      ],
    });
  }
  const data = {
    resources: assetsResources,
    page: { totalPages: 100 },
  };
  res.status(200).json(data);
});

app.get("/api/3/scans", (req, res) => {
  res.status(200).json({
    resources: [
      {
        assets: 1,
        duration: "PT1M58.946S",
        endTime: "2024-04-25T19:00:57.619Z",
        engineId: 3,
        engineName: "Local scan engine",
        id: 1,
        links: [],
        scanName: "host scan 1",
        scanType: "Manual",
        siteId: 1,
        siteName: "host.docker.internal",
        startTime: "2024-04-25T18:58:58.673Z",
        startedByUsername: "N/A",
        status: "finished",
        vulnerabilities: { critical: 0, moderate: 0, severe: 1, total: 1 },
      },
      {
        assets: 1,
        duration: "PT4M39.096S",
        endTime: "2024-04-25T19:07:08.582Z",
        engineId: 3,
        engineName: "Local scan engine",
        id: 2,
        links: [],
        scanName: "scan dwa",
        scanType: "Manual",
        siteId: 2,
        siteName: "172.18.0.3",
        startTime: "2024-04-25T19:02:29.486Z",
        startedByUsername: "N/A",
        status: "finished",
        vulnerabilities: { critical: 10, moderate: 0, severe: 49, total: 59 },
      },
    ],
    page: { number: 0, size: 500, totalResources: 2, totalPages: 1 },
    links: [],
  });
});

app.get("/api/3/users", (req, res) => {
  res.status(200).json({
    resources: [
      {
        authentication: {
          external: false,
          id: 1,
          links: [],
          name: "Builtin Administrators",
          type: "admin",
        },
        enabled: true,
        id: 1,
        links: [],
        locale: { default: "en-US", reports: "en-US" },
        locked: false,
        login: "nxadmin",
        name: "nxadmin",
        role: {
          allAssetGroups: true,
          allSites: true,
          id: "global-admin",
          name: "Global Administrator",
          privileges: ["all-permissions"],
          superuser: true,
        },
      },
    ],
    page: { number: 0, size: 500, totalResources: 1, totalPages: 1 },
    links: [],
  });
});

app.get("/api/3/sites/:siteId/assets", (req, res) => {
  const siteId = req.params.siteId;
  res.status(200).json({
    resources: [
      {
        addresses: [{ ip: "192.168.65.254" }],
        assessedForPolicies: false,
        assessedForVulnerabilities: true,
        history: [
          {
            date: "2024-04-25T19:00:03.674Z",
            scanId: 1,
            type: "SCAN",
            version: 1,
          },
        ],
        hostName: "host.docker.internal",
        hostNames: [{ name: "host.docker.internal", source: "user" }],
        id: siteId,
        ip: "192.168.65.254",
        links: [],
        os: "FreeBSD 6.3-RELEASE",
        osCertainty: "0.595",
        osFingerprint: {
          cpe: {
            part: "o",
            product: "freebsd",
            "v2.2": "cpe:/o:freebsd:freebsd:6.3",
            "v2.3": "cpe:2.3:o:freebsd:freebsd:6.3:*:*:*:*:*:*:*",
            vendor: "freebsd",
            version: "6.3",
          },
          description: "FreeBSD 6.3-RELEASE",
          family: "FreeBSD",
          id: faker.string.uuid(),
          product: "FreeBSD",
          systemName: "FreeBSD",
          type: "General",
          vendor: "FreeBSD",
          version: "6.3-RELEASE",
        },
        rawRiskScore: 475,
        riskScore: 475,
        services: [
          {
            links: [],
            name: "HTTP",
            port: 8001,
            protocol: "tcp",
          },
        ],
        vulnerabilities: {
          critical: 0,
          exploits: 2,
          malwareKits: 0,
          moderate: 0,
          severe: 1,
          total: 1,
        },
      },
    ],
    page: { number: 0, size: 500, totalResources: 1, totalPages: 1 },
    links: [],
  });
});

app.get("/api/3/sites/:siteId/users", (req, res) => {
  res.status(200).json({
    resources: [],
    links: [],
  });
});

app.get("/api/3/assets/:assetId/users", (req, res) => {
  res.status(200).json({
    resources: [],
    links: [],
  });
});

app.get("/api/3/assets/:assetId/vulnerabilities", (req, res) => {
  const data = {
    resources: sampleSize(vulnResources, 800),
  };
  res.status(200).json(data);
});

app.get("/api/3/vulnerabilities/:vulnId", (req, res) => {
  const vulnId = req.params.vulnId;
  const data = {
    denialOfService: false,
    description: {
      text: faker.lorem.sentence(),
    },
    exploits: faker.number.int(),
    id: vulnId,
    riskScore: faker.number.int({ max: 9 }),
    severity: "Severe",
    severityScore: 6,
    title: faker.lorem.slug(),
    categories: [],
  };
  res.status(200).json(data);
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
