import fetch from 'node-fetch';
import { envConfig } from './loadEnvConfig.js';
import { City } from '../schemas/cities.js';

export const getWeather = async (cityDef: City): Promise<any> => {
  const op = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${cityDef.lat}&lon=${cityDef.lon}&appid=${envConfig.OPEN_WEATHER_API_KEY}`,
  );
  const opJson: Record<string, never> = (await op.json()) as never;
  if (opJson.cod !== 200) throw new Error(opJson.message);
  return opJson;
};
