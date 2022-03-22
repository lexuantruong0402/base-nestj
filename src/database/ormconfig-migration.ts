// eslint-disable-next-line @typescript-eslint/no-var-requires
const ormconfig = require('ormconfig');

const configMigration = {
  ...ormconfig,
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
export = configMigration;
