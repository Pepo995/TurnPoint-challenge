import { Dialect, Sequelize } from 'sequelize';

const databasePort: unknown = process.env.DB_PORT;

export const connection = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    port: databasePort as number,
    dialect: "mssql",
  },
);