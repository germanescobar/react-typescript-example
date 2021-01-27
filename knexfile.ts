// Update with your config settings.

const config = {
  development: {
    client: "postgresql",
    connection: {
      database: "arista"
    },
    pool: { min: 2, max: 40 },
    migrations: {
      tableName: "migrations",
      directory: `${__dirname}/db/migrations`,
      extension: 'ts'
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
      extension: 'ts'
    }
  },

  test: {
    client: "postgresql",
    connection: {
      database: "arista_test"
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "migrations",
      directory: `${__dirname}/db/migrations`,
      extension: 'ts'
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
      extension: 'ts'
    }
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: "migrations",
      directory: `${__dirname}/db/migrations`,
      extension: 'ts'
    },
    seeds: {
      directory: `${__dirname}/db/seeds`,
      extension: 'ts'
    },
    ssl: true
  }
}

export = config
