const config = require('../config.json'); 
import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import { UserModel, User } from '../users/user.model';



interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

interface DB {
  sequelize: Sequelize;
  User: ReturnType<typeof UserModel>;
}

const db: Partial<DB> = {};

initialize();

async function initialize() {
  try {
    // Load database config
    const { host, port, user, password, database }: DatabaseConfig = config.database;

    // Create MySQL connection
    const connection = await mysql.createConnection({ host, port, user, password });

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // Connect to Sequelize
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // Assign Sequelize instance to db
    db.sequelize = sequelize;

    // Initialize models
    db.User = UserModel(sequelize);

    // Sync models
    await sequelize.sync({ alter: true });

    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

export default db;
