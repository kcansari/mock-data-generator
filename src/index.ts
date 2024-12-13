import { config } from 'dotenv';
import { DataGenerator } from './generators';
import { DataInsertionService } from './services/DataInsertionService';
import pool from './db/connection';

config(); // Load environment variables

async function main() {
  const generator = new DataGenerator();
  const insertionService = new DataInsertionService(pool);

  try {
    // Generate bulk data
    console.log('Generating data...');
    const data = generator.generateBulkData(1000, 2000, 1500);

    // Clear existing data (optional)
    console.log('Clearing existing data...');
    await insertionService.clearAllData();

    // Insert new data
    console.log('Inserting new data...');
    await insertionService.insertBulkData(data);

    // Print summary
    console.log('\n=== Data Generation and Insertion Summary ===');
    console.log(`Generated and inserted ${data.users.length} users`);
    console.log(`Generated and inserted ${data.products.length} products`);
    console.log(`Generated and inserted ${data.orders.length} orders`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

main().catch(console.error); 