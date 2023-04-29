import { z } from 'zod';
import { cities } from '../mockDB.js';

type CityName = keyof typeof cities;

export type City = (typeof cities)[CityName];
export const citySchema = z.enum([...Object.keys(cities)] as [
  CityName,
  ...CityName[],
]);

export const getCityInfoSchema = z.object({
  params: z.object({
    city: citySchema,
  }),
});
