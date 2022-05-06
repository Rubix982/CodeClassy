import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
require('dotenv').config();

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'codeclassy',
  database: 'codeclassy',
  entities: ['dist/**/*.entity.js'],
  logging: 'all',
};

export default config;
