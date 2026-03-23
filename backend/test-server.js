const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(`Server responded: ${data}`);
  });
});

req.on('error', (error) => {
  console.error(`Error connecting to server: ${error}`);
});

req.end();
