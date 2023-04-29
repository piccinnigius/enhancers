import * as dotenv from 'dotenv';
import { envSchema } from '../schemas/envSchema.js';

const { parsed: envConfig } = dotenv.config();

envSchema.parse(envConfig);

export { envConfig };
