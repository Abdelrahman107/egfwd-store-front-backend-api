import { NextFunction, Request, Response } from 'express';
import Product from '../types/product';
import { ProductModel } from '../models/database/product.model';

const productModel = new ProductModel();

export const getProducts = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const products: Product[] = await productModel.getAllProducts();
    response.status(200).json({
      status: 200,
      message: 'Success, Products Fetched Successfully',
      data: products
    });
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const product: Product = await productModel.getProductById(request.params.id as string);
    response.status(200).json({
      status: 200,
      message: 'Success, Product Fetched Successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const product: Product = await productModel.createProduct(request.body as Product);
    response.status(201).json({
      status: 201,
      message: 'Success, Product Created Successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const product: Product = await productModel.updateProduct(request.body as Product);
    response.status(200).json({
      status: 200,
      message: 'Success, Product Updated Successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const product: Product = await productModel.deleteProduct(request.params.id as string);
    response.status(200).json({
      status: 200,
      message: 'Success, Product Deleted Successfully',
      data: product
    });
  } catch (error) {
    next(error);
  }
};
