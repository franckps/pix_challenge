module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST | "db",
  "port": process.env.DB_PORT | 5432,
  "username": process.env.DB_USER | "postgres",
  "password": process.env.DB_PASSWORD | "pix-challenge",
  "database": "postgres",
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/infra/db/typeorm-postgres/entity/**/*.ts"
  ],
  "migrations": [
    "src/infra/db/typeorm-postgres/migration/**/*.ts"
  ],
  "subscribers": [
    "src/infra/db/typeorm-postgres/subscriber/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/infra/db/typeorm-postgres/entity/",
    "migrationsDir": "src/infra/db/typeorm-postgres/migration/"
  }
}
