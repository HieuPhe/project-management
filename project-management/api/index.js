// api/index.js
const serverless = require('@vendia/serverless-express');
const app = require('../index'); // <-- quan trọng: trỏ đúng file export ra "app"

console.log('[api/index] loaded'); // sẽ thấy log này khi function init

module.exports = (req, res) => {
  console.log('[api/index] invoked', req.method, req.url); // sẽ thấy log mỗi request
  return serverless({ app })(req, res);
};
