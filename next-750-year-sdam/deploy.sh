#!/bin/bash

env_file=$1
echo "$env_file" > .env

docker compose up --build

echo "Done."
