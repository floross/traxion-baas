#! /bin/bash
echo "Appling prisma migrations"
npx prisma migrate deploy

echo "Starting API"
npx nodemon --watch /apps/api/prisma/schema.prisma --exec "npx prisma generate && npx npx nx serve api"
