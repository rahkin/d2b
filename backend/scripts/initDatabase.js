const { sequelize } = require('../config/database');
const models = require('../models');

async function initDatabase() {
  try {
    console.log('🔄 Initializing database...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    
    // Sync all models (create tables if they don't exist)
    console.log('🔄 Syncing database models...');
    await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate, { alter: true } to update
    
    console.log('✅ Database models synced successfully');
    
    // Initialize default subscription tiers data if needed
    console.log('✅ Database initialization complete!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initDatabase();

