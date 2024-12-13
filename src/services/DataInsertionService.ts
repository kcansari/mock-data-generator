import { Pool } from 'pg';
import { User, Product, Order } from '../types';

export class DataInsertionService {
  constructor(private pool: Pool) {}

  async insertBulkData(data: {
    users: User[];
    products: Product[];
    orders: Order[];
  }) {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      // Insert Users
      const userValues = data.users.map((user, i) => `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6})`).join(',');
      const userParams = data.users.flatMap(user => [user.id, user.firstName, user.lastName, user.email, user.avatar, user.dateOfBirth.toISOString()]);

      await client.query(`
        INSERT INTO users (id, first_name, last_name, email, avatar, date_of_birth)
        VALUES ${userValues}
      `, userParams);

      // Insert Products
      const productValues = data.products.map((product, i) => `($${i * 6 + 1}, $${i * 6 + 2}, $${i * 6 + 3}, $${i * 6 + 4}, $${i * 6 + 5}, $${i * 6 + 6})`).join(',');
      const productParams = data.products.flatMap(product => [product.id, product.name, product.price, product.description, product.category, product.inStock]);

      await client.query(`
        INSERT INTO products (id, name, price, description, category, in_stock)
        VALUES ${productValues}
      `, productParams);

      // Insert Orders and Order Items
      for (const order of data.orders) {
        // Insert order
        await client.query(`
          INSERT INTO orders (id, user_id, total_amount, order_date)
          VALUES ($1, $2, $3, $4)
        `, [order.id, order.userId, order.totalAmount, order.orderDate]);

        if (order.products.length > 0) {
          // First, get all product prices
          const productIds = order.products.map(item => item.productId);
          const priceQuery = await client.query(
            'SELECT id, price FROM products WHERE id = ANY($1)',
            [productIds]
          );
          
          // Create a price lookup map
          const productPrices = new Map(
            priceQuery.rows.map(row => [row.id, row.price])
          );

          // Now insert order items with the looked-up prices
          const orderItemValues = order.products.map((_, i) => {
            const baseIndex = i * 5;
            return `($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5})`;
          }).join(',');

          const orderItemParams = order.products.flatMap(item => [
            item.id,
            order.id,
            item.productId,
            item.quantity,
            productPrices.get(item.productId)
          ]);

          await client.query(`
            INSERT INTO order_items (id, order_id, product_id, quantity, price_at_time)
            VALUES ${orderItemValues}
          `, orderItemParams);
        }
      }

      await client.query('COMMIT');
      console.log('Data inserted successfully');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error inserting data:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async clearAllData() {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM order_items');
      await client.query('DELETE FROM orders');
      await client.query('DELETE FROM products');
      await client.query('DELETE FROM users');
      await client.query('COMMIT');
      console.log('All data cleared successfully');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error clearing data:', error);
      throw error;
    } finally {
      client.release();
    }
  }
} 