export default {
  dbURL: process.env.DB_URL || 'postgresql://postgres:pix-postgres@localhost:5432/postgres',
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || 3000
}
