#!/bin/bash

# set node env to test, if windows use set instead of export
if [[ "$OSTYPE" == "msys" ]]; then
  # For Windows CMD: set "NODE_ENV=test"
  # For PowerShell: $env:NODE_ENV="test"
  set "NODE_ENV=test"
  $env:NODE_ENV="test"
else
  export NODE_ENV=test
fi

# remove test-postgres container if it exists
if [[ "$(docker ps -a -q -f name=test-postgres)" ]]; then
  docker rm -f test-postgres
fi

# run test-postgres container
docker run --name test-postgres --env-file .env.test -p 5432:5432 -d postgres

# wait for postgres to start
npx wait-on tcp:5432

# create test database if it doesn't exist
if ! command -v psql &> /dev/null; then
  # Check if database exists inside Docker container
  if ! docker exec -it test-postgres psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='test_db'" | grep -q 1; then
    npx sequelize-cli db:create --env test
  else
    echo "Database 'test_db' already exists in Docker."
  fi
else
  # Check if database exists locally
  if ! psql -U postgres -lqt | cut -d \| -f 1 | grep -qw test_db; then
    npx sequelize-cli db:create --env test
  else
    echo "Database 'test_db' already exists locally."
  fi
fi

# run migrations
npx sequelize-cli db:migrate --env test
