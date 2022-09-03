import { Router } from 'express';
import * as controllers from '../../controllers/product.controller';
const productRoute = Router();

productRoute.route('/').get(controllers.getProducts).post(controllers.createProduct).put(controllers.updateProduct);
productRoute.route('/:id').get(controllers.getProductById).delete(controllers.deleteProduct);
export default productRoute;
