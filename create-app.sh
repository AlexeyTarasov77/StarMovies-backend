#! /bin/sh

# Launch: ./create-app.sh <app_name>

mkdir src/$1;
cd src/$1;
touch container.ts handlers.ts router.ts repositories.ts services.ts