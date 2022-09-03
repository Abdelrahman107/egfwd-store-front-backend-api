import Order from '../../../types/order';
import OrderProduct from '../../../types/order-product';
import Product from '../../../types/product';
import User from '../../../types/user';
import { OrderModel } from '../../../models/database/order.model';
import { ProductModel } from '../../../models/database/product.model';
import { UserModel } from '../../../models/database/user.model';
import dbPool from '../../../database/database';

const orderModel: OrderModel = new OrderModel();
const productModel: ProductModel = new ProductModel();
const userModel: UserModel = new UserModel();

const testUser: User = {
  first_name: 'Test',
  last_name: 'User',
  email: `TestUser@gmail.com`,
  password: 'TestUser'
} as User;

const testProduct: Product = {
  name: 'Test Product',
  price: 12
} as Product;

const testOrder: Order = {
  status: 'active'
} as Order;

const testOrderProduct: OrderProduct = {
  quantity: 6
} as OrderProduct;

describe('Suite: Test Order Model', () => {
  beforeAll(async () => {
    const user = await userModel.createUser(testUser);
    testUser.id = user.id;
    const product = await productModel.createProduct(testProduct);
    testProduct.id = product.id;
    testOrder.user_id = user.id!;
  });

  afterAll(async () => {
    await userModel.deleteUserById(testUser.id as string);
    await productModel.deleteProduct(testProduct.id as string);
    dbPool.connect().then((conn) => {
      conn.query('DELETE FROM orders WHERE user_id = $1', [testOrder.id as string]);
    });
  });
  describe('Suite: Order Model Function Definition', () => {
    it('should have All CRUD Functions and Authenicate Functions to be Defined', () => {
      expect(orderModel.createOrder).toBeDefined();
      expect(orderModel.getAllOrders).toBeDefined();
      expect(orderModel.getActiveOrdersForUser).toBeDefined();
      expect(orderModel.updateOrderStatusToComplete).toBeDefined();
      expect(orderModel.getAllProductsByOrderId).toBeDefined();
      expect(orderModel.AddProductIdToOrderId).toBeDefined();
      expect(orderModel.getCompletedOrdersForUser).toBeDefined();
    });

    it('should create a new order', async () => {
      const order = await orderModel.createOrder(testOrder);
      expect(order.user_id).toEqual(testUser.id as string);
      expect(order.status).toEqual('active');
      expect(order.id).toBeDefined();
      testOrder.id = order.id;
    });

    it('should get all orders', async () => {
      const orders = await orderModel.getAllOrders();
      expect(orders.length).toBeGreaterThan(0);
      expect(orders[0].id).toBeTruthy();
      expect(orders[0].user_id).toEqual(testUser.id as string);
      expect(orders[0].status).toEqual('active');
    });

    it('should get all active orders for a user', async () => {
      const orders = await orderModel.getActiveOrdersForUser(testUser.id as string);
      expect(orders.length).toBeGreaterThan(0);
      expect(orders[0].id).toBeTruthy();
      expect(orders[0].user_id).toEqual(testUser.id as string);
      expect(orders[0].status).toEqual('active');
      expect(orders[0].status).not.toEqual('complete');
    });

    it('should update order status to complete', async () => {
      const order = await orderModel.updateOrderStatusToComplete(testOrder.id as string);
      expect(order.id).toBeTruthy();
      expect(order.user_id).toEqual(testUser.id as string);
      expect(order.status).toEqual('complete');
    });

    it('should get all completed orders for a user', async () => {
      const orders = await orderModel.getCompletedOrdersForUser(testUser.id as string);
      expect(orders.length).toBeGreaterThan(0);
      expect(orders[0].id).toBeTruthy();
      expect(orders[0].user_id).toEqual(testUser.id as string);
      expect(orders[0].status).toEqual('complete');
      expect(orders[0].status).not.toEqual('active');
    });
    // add product id to order id
    it('should add product id to order id', async () => {
      const orderProduct = await orderModel.AddProductIdToOrderId(testOrder.id as string, testProduct.id as string, testOrderProduct.quantity);
      expect(orderProduct.order_id).toEqual(testOrder.id as string);
      expect(orderProduct.product_id).toEqual(testProduct.id as string);
      expect(orderProduct.quantity).toEqual(testOrderProduct.quantity);
    });

    it('should get all products by order id', async () => {
      const products = await orderModel.getAllProductsByOrderId(testOrder.id as string);
      expect(products.length).toBeGreaterThan(0);
      expect(products[0].name).toEqual(testProduct.name);
      expect(products[0].price).toEqual(testProduct.price);
    });
  });
});
