import * as dotenv from 'dotenv';
dotenv.config();

module.exports = {
  type: process.env.TYPE_DATABASE,
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  username: process.env.MYSQL_USER_ROOT,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
};
