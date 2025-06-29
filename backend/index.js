require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const api_key = process.env.WEATHER_API;

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});