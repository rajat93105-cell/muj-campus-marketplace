const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function runLifecycleTest() {
    let token, productId;

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

    // 2. Create Product
    try {
        console.log("\n--- 2. Create Product (Lifecycle Test Item) ---");
        const res = await axios.post(`${BASE_URL}/products`, {
            title: "Lifecycle Test Item",
            description: "To be sold and deleted",
            price: 50,
            category: "Others",
            condition: "New",
            hostelBlock: "B1"
        }, { headers: { Authorization: `Bearer ${token}` } });
        productId = res.data._id;
        console.log(`✅ Product Created: ${productId} [${res.data.status}]`);
    } catch (e) { console.error("❌ Create Failed", e.message); return; }

    // 3. Mark as Sold
    try {
        console.log("\n--- 3. Mark as Sold ---");
        const res = await axios.patch(`${BASE_URL}/products/${productId}/sold`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`✅ Status Updated: ${res.data.product.status}`);
        if (res.data.product.status !== 'sold') console.error("❌ Status mismatch!");
    } catch (e) {
        console.error("❌ Mark as Sold Failed", e.response ? e.response.data : e.message);
    }

    // 4. Soft Delete
    try {
        console.log("\n--- 4. Soft Delete ---");
        const res = await axios.delete(`${BASE_URL}/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`✅ Delete Response: ${res.data.message}`);
    } catch (e) {
        console.error("❌ Delete Failed", e.response ? e.response.data : e.message);
    }

    // 5. Verify Exclusion from Get All
    try {
        console.log("\n--- 5. Verify Exclusion ---");
        const res = await axios.get(`${BASE_URL}/products`);
        const found = res.data.products.find(p => p._id === productId);
        if (found) {
            console.error("❌ FAILED: Deleted product still visible in list!");
        } else {
            console.log("✅ SUCCESS: Deleted product is hidden from list.");
        }
    } catch (e) {
        console.error("❌ Verification Failed", e.message);
    }
}

runLifecycleTest();
