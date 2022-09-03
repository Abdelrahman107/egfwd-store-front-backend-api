import Product from '../../../types/product';
import { ProductModel } from '../../../models/database/product.model';

const productModel: ProductModel = new ProductModel();

const testProduct: Product = {
  name: 'Test Product',
  price: 12
} as Product;

describe('Suite: Test Product Model', () => {
  describe('Suite: Product Model Function Definition', () => {
    it('should have All CRUD Functions and Authenicate Functions to be Defined', () => {
      expect(productModel.createProduct).toBeDefined();
      expect(productModel.getAllProducts).toBeDefined();
      expect(productModel.getProductById).toBeDefined();
      expect(productModel.updateProduct).toBeDefined();
      expect(productModel.deleteProduct).toBeDefined();
    });
  });
  describe('Suite: Product Model Functionality', () => {
    it('should create a product', async () => {
      const response = await productModel.createProduct(testProduct);
      expect(response.id).toBeTruthy();
      expect(response.name).toEqual(testProduct.name);
      expect(response.price).toEqual(testProduct.price);
      testProduct.id = response.id;
    });
    it('should get all products', async () => {
      const response = await productModel.getAllProducts();
      expect(response.length).toBeGreaterThan(0);
      expect(response[0].id).toBeTruthy();
      expect(response[0].name).toEqual(testProduct.name);
      expect(response[0].price).toEqual(testProduct.price);
    });
    it('should get a product by id', async () => {
      const response = await productModel.getProductById(testProduct.id as string);
      expect(response.id).toBeTruthy();
      expect(response.name).toEqual(testProduct.name);
      expect(response.price).toEqual(testProduct.price);
    });
    it('should update a product', async () => {
      const body = {
        id: testProduct.id,
        name: 'Updated Product',
        price: 24
      } as Product;
      const response = await productModel.updateProduct(body);
      expect(response.id).toBeTruthy();
      expect(response.name).toEqual(body.name);
      expect(response.price).toEqual(body.price);
    });
    it('should delete a product', async () => {
      const response = await productModel.deleteProduct(testProduct.id as string);
      expect(response).toBeTruthy();
    });
  });
});
