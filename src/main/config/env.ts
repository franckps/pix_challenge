const dbHost: string = process.env.DB_HOST || '127.0.0.1'
const dbUser: string = process.env.DB_USER || 'postgres'
const dbName: string = process.env.DB_NAME || 'postgres'
const dbPort: string = process.env.DB_PORT || '5432'
const dbPassword: string = process.env.DB_PASSWORD

export default {
  dbURL: process.env.DB_URL || `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`,
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || 3000
}
