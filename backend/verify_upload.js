const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const API_URL = 'http://localhost:5000/api';

const runTest = async () => {
    try {
        console.log('--- 1. Login ---');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'postman.user@muj.manipal.edu',
            password: 'password123'
        });
        const token = loginRes.data.token;
        console.log('✅ Login Successful.');

        console.log('\n--- 2. Upload Product with Image ---');
        const form = new FormData();
        form.append('title', 'Test Product with Image');
        form.append('description', 'Testing Cloudinary Upload');
        form.append('price', 999);
        form.append('category', 'Electronics');
        form.append('condition', 'New');
        form.append('hostelBlock', 'B2');
        form.append('image', fs.createReadStream('test_image.jpg'));

        const config = {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        };

        const productRes = await axios.post(`${API_URL}/products`, form, config);
        console.log('✅ Product Created Successfully!');
        console.log(`Product ID: ${productRes.data._id}`);
        console.log(`Image URL: ${productRes.data.imageUrl}`);

        if (productRes.data.imageUrl && productRes.data.imageUrl.includes('cloudinary')) {
            console.log('✅ Image URL confirmed to be from Cloudinary.');
        } else {
            console.error('❌ Image URL missing or invalid.');
        }

    } catch (error) {
        console.error('❌ Test Failed:', error.response ? error.response.data : error.message);
    }
};

runTest();
