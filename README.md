# OpenAI-Weather

This project is a real-time weather monitoring system that fetches and stores weather data for various cities using the OpenWeatherMap API. It provides a backend server to collect, process, and serve weather data while allowing for aggregation and alerts based on temperature thresholds.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Design Choices](#design-choices)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Weather Monitoring System collects real-time weather data for specified cities and stores this data in a MongoDB database. It performs regular updates (every 5 minutes) to ensure the data is current and provides daily summaries of the weather conditions, including average, maximum, and minimum temperatures. Alerts are also generated when the temperature exceeds certain thresholds.

## Tech Stack

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building APIs and handling requests.
- **MongoDB**: NoSQL database for storing weather data.
- **Mongoose**: ODM library for MongoDB, facilitating data modeling.
- **Axios**: HTTP client for making requests to the OpenWeatherMap API.
- **Node-Cron**: Task scheduler for executing recurring jobs.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.

## Features

- Fetch and store weather data for multiple cities.
- Calculate daily weather summaries, including average, maximum, and minimum temperatures.
- Generate alerts when the temperature exceeds specified thresholds.
- RESTful API for accessing weather summaries for individual cities.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [MongoDB](https://www.mongodb.com/) (or a cloud service like MongoDB Atlas)
- [NPM](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mohanpola17/OpenAI-Weather.git
   cd OpenAI-Weather
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Create a `.env` file in the root directory for the backend and add the following environment variables:**

   ```plaintext
   MONGO_URI="mongodb+srv://mohanpola1703:mohan@cluster0.q7sao.mongodb.net/weatherDB?retryWrites=true&w=majority&appName=Cluster0"
   OPENWEATHERMAP_API_KEY=4d428df7582caa7f253d661940e68032
   PORT=4000  # Optional, defaults to 4000
   ```

4. **Install frontend dependencies:**

   If your frontend is in a separate directory (e.g., `frontend`):

   ```bash
   cd frontend
   npm install
   ```

## Running the Application

1. **Start the backend server:**

   ```bash
   cd backend
   node app.js
   ```

2. **Start the frontend server:**

   ```bash
   cd frontend
   npm start
   ```

3. **Access the application:**
   - The backend server will run on `http://localhost:4000` (or the port specified in the `.env` file).
   - The frontend will typically run on `http://localhost:3000` (or another port if configured differently).
    
4. **Access the API:**
   - The server will run on `http://localhost:4000` (or the port specified in the `.env` file).

  ## API Endpoints

- **Get Daily Summary for a City:**

   ```plaintext
   GET /summary/:city
   ```

   - **Parameters:**
     - `city`: Name of the city to fetch the summary for.

   - **Response:**
     - JSON object containing average, maximum, minimum temperatures, and dominant weather conditions.

## Design Choices

- **MongoDB for Data Storage**: Chosen for its flexibility and ability to handle unstructured data efficiently. Weather data can vary significantly across different cities.

- **Axios for API Requests**: Selected for its promise-based structure, making it easy to handle asynchronous requests to the OpenWeatherMap API.

- **Node-Cron for Scheduling**: Allows for simple scheduling of tasks (like fetching data every 5 minutes) without the complexity of setting up a dedicated job queue.

- **Mongoose for Data Modeling**: Facilitates schema definition and validation for weather data, ensuring data integrity and consistency in the database.

## Environment Variables

Ensure to configure the following environment variables in the `.env` file:

- `MONGO_URI`: Your MongoDB connection string.
- `OPENWEATHERMAP_API_KEY`: Your API key for accessing OpenWeatherMap.
- `PORT`: (Optional) The port on which the server will run (defaults to 4000).

## Dependencies

Here are the key dependencies used in this project:

- **express**: Web framework for Node.js.
- **mongoose**: ODM for MongoDB and Node.js.
- **axios**: Promise-based HTTP client for making requests.
- **node-cron**: Cron jobs for scheduling tasks.
- **cors**: Middleware for enabling CORS.

To install these dependencies, run:

```bash
npm install express mongoose axios node-cron cors
```

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

