import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
require('dotenv').config();

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'database-service',
  port: 3306,
  username: 'root',
  password: 'codeclassy',
  database: 'codeclassy',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  logging: 'all',
};

export default config;
