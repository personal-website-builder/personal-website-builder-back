import { config } from 'dotenv';
import * as joi from 'joi';

const envFile =
  process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development';
config({ path: envFile, override: true });

console.log('DATABASE_URL', process.env.DATABASE_URL);

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  jwtSecret: envVars.JWT_SECRET,
};

console.log('envs', envs);
