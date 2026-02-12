const connectDB = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const dns = require('dns');

// Force usage of Google DNS
dns.setServers(['8.8.8.8']);

const test = async () => {
    try {
        console.log("Testing DNS resolution for google.com...");
        dns.lookup('google.com', (err, address, family) => {
            if (err) console.error("DNS lookup for google.com failed:", err);
            else console.log("DNS lookup for google.com successful:", address);
        });

        await connectDB();
        console.log("Test Script: Connected Successfully");
        process.exit(0);
    } catch (error) {
        console.error("Test Script: Connection Failed", error);
        console.error("Stack:", error.stack);
        process.exit(1);
    }
};

test();
