require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cron = require('node-cron');
const cors = require('cors');
const app = express();
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Weather Data Schema
const weatherSchema = new mongoose.Schema({
  city: String,
  temp: Number,
  feels_like: Number,
  main: String,
  dt: Number,
  date: { type: Date, default: Date.now }
});

const Weather = mongoose.model('Weather', weatherSchema);

// Function to fetch weather data from OpenWeatherMap API
const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`);
    console.log('Fetched weather data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

// Convert Kelvin to Celsius
const kelvinToCelsius = (kelvin) => kelvin - 273.15;

// Function to save weather data
const saveWeatherData = async (city) => {
  const data = await fetchWeatherData(city);
  if (data) {
    const newWeather = new Weather({
      city: data.name,
      temp: kelvinToCelsius(data.main.temp),
      feels_like: kelvinToCelsius(data.main.feels_like),
      main: data.weather[0].main,
      dt: data.dt
    });
    await newWeather.save();
  }
};

// Rollups and Aggregates
const getDailySummary = async (city) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const weatherData = await Weather.find({ city, date: { $gte: today } });
  
    if (weatherData.length === 0) {
      return { avgTemp: null, maxTemp: null, minTemp: null, dominantWeather: null };
    }
  
    const avgTemp = (weatherData.reduce((sum, item) => sum + item.temp, 0) / weatherData.length).toFixed(2);
    const maxTemp = Math.max(...weatherData.map(item => item.temp));
    const minTemp = Math.min(...weatherData.map(item => item.temp));
  
    const dominantWeather = weatherData.length > 0
      ? weatherData.sort((a, b) =>
        weatherData.filter(v => v.main === a.main).length
        - weatherData.filter(v => v.main === b.main).length
      ).pop().main
      : null;
  
    return { avgTemp, maxTemp, minTemp, dominantWeather };
  };
  

// Log alerts to the console
const sendAlert = (message) => {
  console.log(`ALERT: ${message}`);
};

// Check for alerts
const checkForAlerts = async (city) => {
  const latestWeather = await Weather.find({ city }).sort({ date: -1 }).limit(2);

  if (latestWeather.length >= 2) {
    if (latestWeather[0].temp > 35 && latestWeather[1].temp > 35) {
      sendAlert(`Temperature exceeded 35°C for two consecutive updates in ${city}`);
    }
  }
};

// Schedule task to fetch weather data every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  for (const city of cities) {
    await saveWeatherData(city);
    await checkForAlerts(city);
  }
});

// Endpoint to get daily summary for a city
app.get('/summary/:city', async (req, res) => {
  const summary = await getDailySummary(req.params.city);
  res.json(summary);
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
