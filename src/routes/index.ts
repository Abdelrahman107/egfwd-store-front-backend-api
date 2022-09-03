import orderRoute from './api/order.route';
import express from 'express';
import userRoute from './api/user.route';
import productRoute from './api/product.route';
const routes = express.Router();
routes.use('/orders', orderRoute);
routes.use('/users', userRoute);
routes.use('/products', productRoute);
routes.get('/', (req, res) => {
  res.send('<article> <header><h1>Welcome to StoreFront API. </h1> <p>In order to use it: </p> <p>Read out the documentation in Readme.md and REQUIREMENETS.md </p> </article>');
});
export default routes;
