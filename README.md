# Mock Data Generator

A robust TypeScript application that generates realistic mock data and populates a PostgreSQL database. Built with Faker.js for data generation and node-postgres for database operations.

## Features

- 🎲 Generates realistic mock data for:
  - Users
  - Products
  - Orders
  - Order Items
- 📊 PostgreSQL integration with proper relations
- 🔄 Transaction-based data insertion
- 🛡️ Parameterized queries for SQL injection prevention
- 🎯 Unique constraint handling
- 💪 TypeScript for type safety

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/mock-data-generator.git
cd mock-data-generator
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database
```bash
psql -U postgres
CREATE DATABASE mock_data;
\c mock_data
\i src/db/schema.sql
```

4. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

## Usage

Generate and insert mock data:
```bash
npm run generate
```

This will:
- Generate 1000 users
- Generate 2000 products
- Generate 1500 orders with random items
- Insert all data into the PostgreSQL database

## Database Schema

- `users`: Store user information
- `products`: Store product details
- `orders`: Store order information
- `order_items`: Store order line items with product references

## Tech Stack

- TypeScript
- Faker.js
- node-postgres
- dotenv

## License

ISC

---
Built with ❤️ for developers who need realistic test data
