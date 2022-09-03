import { Router } from 'express';
import { createOrder, getAllOrders, getAllProductsByOrderId, updateOrderStatusToComplete, addProductIdToOrderId, getActiveOrdersForUser, getCompletedOrdersForUser } from '../../controllers/order.controller';
import authorizationHandler from '../../middlewares/authorization.middleware';
const orderRoute = Router();

orderRoute.route('/').get(authorizationHandler, getAllOrders).post(authorizationHandler, createOrder);

orderRoute.get('/:id/get-products-order', authorizationHandler, getAllProductsByOrderId);
orderRoute.put('/:id/update-status-complete', authorizationHandler, updateOrderStatusToComplete);
orderRoute.get('/:id/get-active-orders', authorizationHandler, getActiveOrdersForUser).get('/:id/get-complete-orders', authorizationHandler, getCompletedOrdersForUser);
orderRoute.post('/:product_id/:order_id/add-product-to-order', authorizationHandler, addProductIdToOrderId);

export default orderRoute;
