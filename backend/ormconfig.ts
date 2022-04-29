import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
require('dotenv').config();

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'database-service',
  username: 'root',
  password: 'codeclassy',
  database: 'codeclassy',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  logging: 'all',
};

export default config;
