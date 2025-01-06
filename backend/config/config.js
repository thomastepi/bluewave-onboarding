const dotenv = require('dotenv');
const envSuffix = process.env.NODE_ENV && process.env.NODE_ENV !== 'development' ? `.${process.env.NODE_ENV}` : '';
const env = `.env${envSuffix}`;

dotenv.config({ path: `./${env}` });

const {
  DEV_DB_HOST,
  DEV_DB_NAME,
  DEV_DB_PASSWORD,
  DEV_DB_PORT,
  DEV_DB_USERNAME,
  TEST_DB_HOST,
  TEST_DB_NAME,
  TEST_DB_PASSWORD,
  TEST_DB_PORT,
  TEST_DB_USERNAME,
  PROD_DB_HOST,
  PROD_DB_NAME,
  PROD_DB_PASSWORD,
  PROD_DB_PORT,
  PROD_DB_USERNAME,
} = process.env;

module.exports = {
  defaultTeamName: 'My Organisation',
  development: {
    username: DEV_DB_USERNAME,
    password: DEV_DB_PASSWORD,
    database: DEV_DB_NAME,
    host: DEV_DB_HOST,
    dialect: 'postgres',
    port: DEV_DB_PORT,
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
    username: PROD_DB_USERNAME,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_NAME,
    host: PROD_DB_HOST,
    dialect: 'postgres',
    port: PROD_DB_PORT,
    logging: false,
  },
};
