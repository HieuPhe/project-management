// project-management/api/index.js
const serverless = require('@vendia/serverless-express');
const app = require('../index'); // vì bạn export app ở index.js
module.exports = (req, res) => serverless({ app })(req, res);
