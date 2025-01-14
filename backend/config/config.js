require('dotenv').config();

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
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_PORT,
    logging: false,
  },
};
