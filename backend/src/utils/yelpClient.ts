
import { City } from '../schemas/cities.js';
import fetch from 'node-fetch';
import { envConfig } from './loadEnvConfig.js';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${envConfig.YELP_API_KEY}`,
  },
};

export const callYelpApi = async (city: City, limit = 10) => {
  return fetch(
    `https://api.yelp.com/v3/businesses/search?latitude=${city.lat}&longitude=${city.lon}&sort_by=best_match&limit=${limit}`,
    options,
  )
    .then((response) => response.json())
    .then((response: any) => response.businesses)
    .catch((err) => console.error(err));
};
