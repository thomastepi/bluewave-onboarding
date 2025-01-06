#!/bin/bash

# stop container
docker stop test-postgres

# remove container
docker rm -f test-postgres

# reset NODE_ENV to default
if [[ "$OSTYPE" == "msys" ]]; then
  set NODE_ENV=development
else
  export NODE_ENV=development
fi