# Example api prisma

- Run the generation with `npx nx run apps-api:prisma-generate`.
- Start the docker-compose `docker-compose up -d`.
- Push the db schema `npx nx run apps-api:prisma-push`.
- Start the api `npx nx run apps-api:serve`.
- Open the playground `http://localhost:3000/graphql`.
- You can add data in the db with prisma studio:
  `npx nx run apps-api:prisma-studio`.
