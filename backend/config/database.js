const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration
// If DATABASE_URL is provided, use it directly; otherwise construct from individual parts
let sequelize;

if (process.env.DATABASE_URL) {
  // Use full connection string if provided
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: false
    }
  });
} else {
  // Construct connection from individual environment variables
  sequelize = new Sequelize(
    process.env.DB_NAME || 'design2build',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: true,
        underscored: true,
        freezeTableName: false
      }
    }
  );
}

// Test connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    console.log('💡 Make sure PostgreSQL is running and DATABASE_URL is set correctly');
    return false;
  }
}

module.exports = { sequelize, testConnection };

