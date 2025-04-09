const http = require('http');

const server = http.createServer((req, res) => {
  res.end('✅ This is a test response from raw Node.js server');
});

server.listen(3000, () => {
  console.log('Test server running on http://localhost:3000/');
});
