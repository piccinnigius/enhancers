import { z } from 'zod';

export const envSchema = z.object({
  OPEN_WEATHER_API_KEY: z.string().length(32),
  YELP_API_KEY: z.string().length(128),
  YELP_CLIENT_ID: z.string().length(22),
});
