// Import necessary modules from the installed dependencies
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import logger from 'volleyball';
import expressValidation from 'express-validator';

// Create the express application
const app = express();

// Load .env file into process.env
dotenv.config();

// PORT variable where the application will run
const { PORT } = process.env;
const port = parseInt(PORT, 10) || 5000;

// Log app requests to the console
app.use(logger);

// Parse incoming app requests
app.use(expressValidation());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Show 404 error for unexisting route on the app
app.use((req, res) => res.status(404).send({
  success: false,
  status: 404,
  error: {
    description: 'Error! Not Found'
  }
}));

// Listen to app on port specified above
if (!module.parent) {
  app.listen(port);
}

// Export app module to use in other files
export default app;
