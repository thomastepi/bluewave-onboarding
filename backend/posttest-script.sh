#!/bin/bash

# stop container, if it exists

if [[ "$(docker ps -a -q -f name=test-postgres)" ]]; then
  docker stop test-postgres
fi

# remove container
if [[ "$(docker ps -a -q -f name=test-postgres)" ]]; then
  docker rm -f test-postgres
fi

# reset NODE_ENV to default
if [[ "$OSTYPE" == "msys" ]]; then
  # For Windows CMD: set "NODE_ENV=development"
  # For PowerShell: $env:NODE_ENV="development"
  set "NODE_ENV=development"
  $env:NODE_ENV="development"
else
  export NODE_ENV=development
fi