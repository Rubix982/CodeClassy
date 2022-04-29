import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
require('dotenv').config();

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'database-service.default.svc.cluster.local:3306',
  port: 3306,
  username: 'root',
  password: 'codeclassy',
  database: 'codeclassy',
  entities: ['dist/**/*.entity.js'],
  logging: 'all',
};

export default config;
