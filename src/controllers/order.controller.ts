import { NextFunction, Request, Response } from 'express';
import Product from '../types/product';
import Order from '../types/order';
import OrderProduct from '../types/order-product';
import { OrderModel } from '../models/database/order.model';

const orderModel = new OrderModel();

export const getAllOrders = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const orders: Order[] = await orderModel.getAllOrders();
    response.status(200).json({
      status: 200,
      message: 'Success, Orders Fetched Successfully',
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const order: Order = await orderModel.createOrder(request.body);
    response.status(201).json({
      status: 201,
      message: 'Success, Order Created Successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatusToComplete = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const order: Order = await orderModel.updateOrderStatusToComplete(request.params.id);
    response.status(200).json({
      status: 200,
      message: 'Success, Order Updated Successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProductsByOrderId = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const products: Product[] = await orderModel.getAllProductsByOrderId(request.params.id);
    response.status(200).json({
      status: 200,
      message: 'Success, Products Fetched Successfully',
      data: products,
      inOrderId: request.params.id
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveOrdersForUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const orders: Order[] = await orderModel.getActiveOrdersForUser(request.params.id);
    response.status(200).json({
      status: 200,
      message: 'Success, Orders Fetched Successfully',
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

export const getCompletedOrdersForUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const orders: Order[] = await orderModel.getCompletedOrdersForUser(request.params.id);
    response.status(200).json({
      status: 200,
      message: 'Success, Orders Fetched Successfully',
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

export const addProductIdToOrderId = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const orderProduct: OrderProduct = await orderModel.AddProductIdToOrderId(request.params.order_id as string, request.params.product_id as string, request.body.quantity as number);
    response.status(201).json({
      status: 201,
      message: 'Success, Product Added Successfully',
      data: orderProduct
    });
  } catch (error) {
    next(error);
  }
};
