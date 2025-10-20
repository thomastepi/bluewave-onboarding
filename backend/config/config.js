const path = require('path');

const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL_URL;

if (!isVercel) {
  try {
    const dotenv = require('dotenv');
    // Support .env and .env.test via NODE_ENV
    const suffix = process.env.NODE_ENV === 'test' ? '.test' : '';
    const envPath = path.resolve(process.cwd(), `.env${suffix}`);
    const result = dotenv.config({ path: envPath });
    if (result.error) {
      console.warn(`Warning: could not load ${envPath} (${result.error.message}). Using process.env as-is.`);
    }
  } catch (e) {
    console.warn('dotenv not loaded:', e.message);
  }
}

const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  TEST_DB_HOST,
  TEST_DB_NAME,
  TEST_DB_PASSWORD,
  TEST_DB_PORT,
  TEST_DB_USERNAME,
  DATABASE_URL,
} = process.env;

module.exports = {
  defaultTeamName: 'My Organisation',
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_PORT,
    logging: false,
  },
  test: {
    username: TEST_DB_USERNAME,
    password: TEST_DB_PASSWORD,
    database: TEST_DB_NAME,
    host: TEST_DB_HOST,
    dialect: 'postgres',
    port: TEST_DB_PORT,
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: { require: true },
    },
  },
};
