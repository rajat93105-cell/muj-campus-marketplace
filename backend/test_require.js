try {
    console.log("Requiring dotenv...");
    require('dotenv').config();
    console.log("dotenv loaded.");

    console.log("Requiring ./config/db...");
    require('./config/db');
    console.log("./config/db loaded.");

    console.log("Requiring ./models/User...");
    require('./models/User');
    console.log("./models/User loaded.");

    console.log("Requiring ./controllers/authController...");
    require('./controllers/authController');
    console.log("./controllers/authController loaded.");

    console.log("Requiring ./routes/authRoutes...");
    require('./routes/authRoutes');
    console.log("./routes/authRoutes loaded.");

    console.log("Requiring ./server...");
    try {
        require('./server');
    } catch (err) {
        console.error("Error asking for server:", err);
    }
    console.log("All requires successful.");
} catch (error) {
    console.error("Error during require:", error);
}
