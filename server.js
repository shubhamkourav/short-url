require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const connectDB = require('./app/config/database');

const app = express();
const port = process.env.PORT || 3000;
const modelsPath = path.join(__dirname, 'app/models');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

fs.readdirSync(modelsPath)
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
        require(path.join(modelsPath, file)); // Load all models
    });

connectDB();

const { get } = require('./app/controllers/shorten');

// Routes
app.use("/api",require('./app/routes/shorten'));
app.get('/:shortCode', get)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});