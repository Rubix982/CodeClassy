import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
require('dotenv').config();

const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: '10.0.208.76',
  port: 3306,
  username: 'root',
  password: 'codeclassy',
  database: 'codeclassy',
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  logging: 'all',
};

export default config;
