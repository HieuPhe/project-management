// api/index.js
const app = require('../index'); // app đã được module.exports ở index.js

// Vercel chỉ cần (req, res)
module.exports = (req, res) => {
  return app(req, res);
};
