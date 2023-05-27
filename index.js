'use strict';

require('dotenv').config();
const { db } = require('./src/auth/models/index.js');

const { start } = require('./src/server.js');

const PORT = process.env.PORT || 3000;

db.sync()
  .then(() => {
    start(PORT);
  })
  .catch(console.error);

async function initializeDatabase() {
  try {
    // Synchronize the Regions model with the database table
    await db.sync({ force: true });
    console.log('All models were synchronized successfully');
  } catch (error) {
    console.error('Error occurred while syncing all models.', error);
  }
}

// uncommenting function below will drop the database and recreate it
// initializeDatabase();








