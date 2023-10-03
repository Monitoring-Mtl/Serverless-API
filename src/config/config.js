import {config} from 'dotenv';

// Load environment variables from the .env file in the current directory
config();

// Get the API_URL and API_KEY from the environment variables
export const apiUrl = process.env.API_URL;
export const apiKey = process.env.API_KEY;

if (!apiUrl || !apiKey) {
  console.error('API_URL and API_KEY are required in the .env file.');
  process.exit(1);
}
