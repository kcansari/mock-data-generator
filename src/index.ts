import { DataGenerator } from './generators';

const generator = new DataGenerator();

// Generate bulk data
const data = generator.generateBulkData(10, 20, 15);

// Print some example data
console.log('\n=== Sample User ===');
console.log(data.users[0]);

console.log('\n=== Sample Product ===');
console.log(data.products[0]);

console.log('\n=== Sample Order ===');
console.log(data.orders[0]);

// Print summary
console.log('\n=== Data Generation Summary ===');
console.log(`Generated ${data.users.length} users`);
console.log(`Generated ${data.products.length} products`);
console.log(`Generated ${data.orders.length} orders`); 