const { Client } = require("@opensearch-project/opensearch");
require("dotenv").config();

const client = new Client({
  node: process.env.OPENSEARCH_NODE,
  requestTimeout: 300 * 1000,
});

module.exports = client;
