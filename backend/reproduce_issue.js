const http = require('http');

const makeRequest = (path, description) => {
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log(`\n--- ${description} ---`);
            console.log(`Path: ${path}`);
            console.log(`Status: ${res.statusCode}`);
            console.log(`Response: ${data}`);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    // Write data to request body
    req.write(JSON.stringify({
        name: "Test User",
        email: "test@muj.manipal.edu",
        password: "password123",
        hostelBlock: "B1"
    }));
    req.end();
};

// 1. Correct URL
makeRequest('/api/auth/register', 'Correct URL');

// 2. URL with newline (simulating the user's error)
makeRequest('/api/auth/register\n', 'URL with Newline');
