# Faker Data Producer

A TypeScript-based fake data generator using Faker.js to produce realistic test data for development and testing purposes.

## Features

- 🎯 Generates realistic fake data for common entities:
  - Users (with personal information)
  - Products (with commerce details)
  - Orders (with relationships between users and products)
- 🔧 Built with TypeScript for type safety
- 🚀 Easy to extend and customize
- 📦 Bulk data generation capabilities
- 💪 Strong typing with TypeScript interfaces

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kcansari/mock-data-generator.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the script:
```bash
npm run start
```

## Usage

### Generate Sample Data

Run the default data generation script:

```bash
npm run generate
```

This will generate:
- 10 sample users
- 20 sample products
- 15 sample orders

### Using in Your Code

```typescript
import { DataGenerator } from './src/generators';

// Create a new generator instance
const generator = new DataGenerator();

// Generate a single user
const user = generator.generateUser();

// Generate a single product
const product = generator.generateProduct();

// Generate bulk data
const data = generator.generateBulkData(
  userCount: number,
  productCount: number,
  orderCount: number
);
```

## Available Scripts

- `npm start` - Run the application
- `npm run build` - Build the TypeScript code
- `npm run generate` - Generate sample data

## Customization

### Modifying Data Generation

You can customize the data generation by modifying the generator methods in `src/generators.ts`. Each method uses various Faker.js functions that can be adjusted to your needs.

Example of customizing user generation:

```typescript
generateUser(): User {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    dateOfBirth: faker.date.past({ years: 50 }),
    // Add more fields as needed
  };
}
```

### Adding New Entity Types

1. Define a new interface in `src/types.ts`
2. Create a new generator method in `src/generators.ts`
3. Update the `generateBulkData` method if needed

## Dependencies

- TypeScript
- @faker-js/faker
- ts-node (dev dependency)
- @types/node (dev dependency)


## License

This project is licensed under the ISC License.

## Future Improvements

- Add data export functionality (JSON, CSV)
- Add API endpoints to serve fake data
- Add more entity types
- Add data validation
- Add more complex relationships between entities
- Add customizable data generation rules
