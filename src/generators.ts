import { faker } from '@faker-js/faker';
import { User, Product, Order } from './types';

export class DataGenerator {
  private usedEmails = new Set<string>();

  generateUniqueEmail(): string {
    let email: string;
    do {
      // Generate a more unique email by combining multiple faker methods
      const username = `${faker.internet.userName()}${faker.number.int({ min: 1000, max: 9999 })}`;
      const domain = faker.internet.domainName();
      email = `${username}@${domain}`.toLowerCase();
    } while (this.usedEmails.has(email));
    
    this.usedEmails.add(email);
    return email;
  }

  generateUser(): User {
    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: this.generateUniqueEmail(),
      avatar: faker.image.avatar(),
      dateOfBirth: faker.date.past({ years: 50 })
    };
  }

  generateProduct(): Product {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      inStock: faker.datatype.boolean()
    };
  }

  generateOrder(users: User[], products: Product[]): Order {
    const numProducts = faker.number.int({ min: 1, max: 5 });
    const orderProducts = Array.from({ length: numProducts }, () => ({
      id: faker.string.uuid(),
      productId: faker.helpers.arrayElement(products).id,
      quantity: faker.number.int({ min: 1, max: 5 })
    }));

    const totalAmount = orderProducts.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    return {
      id: faker.string.uuid(),
      userId: faker.helpers.arrayElement(users).id,
      products: orderProducts,
      orderDate: faker.date.recent(),
      totalAmount
    };
  }

  generateBulkData(userCount: number, productCount: number, orderCount: number) {
    // Clear the used emails set before generating bulk data
    this.usedEmails.clear();
    
    const users = Array.from({ length: userCount }, () => this.generateUser());
    const products = Array.from({ length: productCount }, () => this.generateProduct());
    const orders = Array.from({ length: orderCount }, () => this.generateOrder(users, products));

    return {
      users,
      products,
      orders
    };
  }
} 