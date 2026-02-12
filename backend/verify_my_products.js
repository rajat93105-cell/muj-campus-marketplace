const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function runMyProductsTest() {
    let token, product1Id, product2Id;

    // 1. Login
    try {
        console.log("\n--- 1. Login ---");
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
            email: 'postman.user@muj.manipal.edu',
            password: 'password123'
        });
        token = loginRes.data.token;
        console.log("✅ Login Successful");
    } catch (e) { console.error("❌ Login Failed", e.message); return; }

    // 2. Create Active Product
    try {
        console.log("\n--- 2. Create Active Product ---");
        const res = await axios.post(`${BASE_URL}/products`, {
            title: "Active Item",
            description: "Visible in dashboard",
            price: 100,
            category: "Electronics",
            condition: "New",
            hostelBlock: "B1"
        }, { headers: { Authorization: `Bearer ${token}` } });
        product1Id = res.data._id;
        console.log(`✅ Created Active: ${product1Id}`);
    } catch (e) { console.error("❌ Create Failed", e.message); return; }

    // 3. Create Sold Product
    try {
        console.log("\n--- 3. Create Sold Product ---");
        const res = await axios.post(`${BASE_URL}/products`, {
            title: "Sold Item",
            description: "This is sold",
            price: 50,
            category: "Others",
            condition: "Used",
            hostelBlock: "B1"
        }, { headers: { Authorization: `Bearer ${token}` } });
        product2Id = res.data._id;

        // Mark as sold
        await axios.patch(`${BASE_URL}/products/${product2Id}/sold`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`✅ Created & Sold: ${product2Id}`);
    } catch (e) { console.error("❌ Create Sold Failed", e.message); return; }

    // 4. Create and Soft Delete Product
    try {
        console.log("\n--- 4. Create & Delete Product ---");
        const res = await axios.post(`${BASE_URL}/products`, {
            title: "Deleted Item",
            description: "Should appear in My Products",
            price: 10,
            category: "Books",
            condition: "Old",
            hostelBlock: "B1"
        }, { headers: { Authorization: `Bearer ${token}` } });
        const delId = res.data._id;

        await axios.delete(`${BASE_URL}/products/${delId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`✅ Created & Deleted: ${delId}`);
    } catch (e) { console.error("❌ Create Delete Failed", e.message); return; }

    // 5. Verify Get My Products
    try {
        console.log("\n--- 5. GET /my-products ---");
        const res = await axios.get(`${BASE_URL}/products/my-products`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log(`Total My Products: ${res.data.length}`);

        const active = res.data.find(p => p.title === "Active Item");
        const sold = res.data.find(p => p.title === "Sold Item");
        const deleted = res.data.find(p => p.title === "Deleted Item");

        if (active) console.log("✅ Found Active Item");
        else console.error("❌ Missing Active Item");

        if (sold && sold.status === 'sold') console.log("✅ Found Sold Item");
        else console.error("❌ Missing/Incorrect Sold Item");

        if (deleted && deleted.isDeleted) console.log("✅ Found Deleted Item");
        else console.error("❌ Missing/Incorrect Deleted Item");

    } catch (e) {
        console.error("❌ Get My Products Failed", e.response ? e.response.data : e.message);
    }
}

runMyProductsTest();
