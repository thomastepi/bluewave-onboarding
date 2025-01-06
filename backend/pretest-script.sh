#!/bin/bash

# set node env to test, if windows use set instead of export
if [[ "$OSTYPE" == "msys" ]]; then
  set NODE_ENV=test
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
if [[ ! "$(psql -U postgres -lqt | cut -d \| -f 1 | grep -w test_db)" ]]; then
  npx sequelize-cli db:create --env test
fi

# run migrations
npx sequelize-cli db:migrate --env test
