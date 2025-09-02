// api/index.js
const serverless = require('@vendia/serverless-express');
const app = require('../index'); // hoặc '../app' nếu bạn tách app riêng

module.exports = (req, res) => serverless({ app })(req, res);
