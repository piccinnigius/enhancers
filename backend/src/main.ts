import express, { Request, Response } from 'express';
import { validateZodSchemaMiddleware } from './utils/validateZodSchemaMiddleware.js';
import { getCityInfoSchema } from './schemas/cities.js';
import { cities } from './mockDB.js';
import { callYelpApi } from './utils/yelpClient.js';
import cors from 'cors';
import { getWeather } from './utils/openWeatherClient.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_: Request, res: Response): Response => {
  return res.json({ message: 'Validation with Zod 👊' });
});

app.get('/cities', (_: Request, res: Response): Response => {
  return res.json({ cities: Object.keys(cities) });
});

app.get(
  '/city/:city',
  validateZodSchemaMiddleware(getCityInfoSchema),
  async (req: Request, res: Response): Promise<Response> => {
    const { city } = req.params;
    const cityDef = cities[city];
    const [weather, business] = await Promise.all([
      getWeather(cityDef),
      callYelpApi(cityDef),
    ]);

    return res.json({
      city: {
        ...cityDef,
        weather,
        business,
      },
    });
  },
);

const start = (): void => {
  try {
    app.listen(3333, () => {
      console.log('Server started on port 3333');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();
