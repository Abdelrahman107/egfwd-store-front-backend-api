import { Router } from 'express';
import * as controllers from '../../controllers/user.controller';
import authorizationHandler from '../../middlewares/authorization.middleware';
const userRoute = Router();

userRoute.route('/').get(authorizationHandler, controllers.getUsers).post(controllers.createUser).put(authorizationHandler, controllers.updateUser);
userRoute.route('/:id').get(authorizationHandler, controllers.getUserById).delete(authorizationHandler, controllers.deleteUserById);
userRoute.post('/authenticate', controllers.authenticateUser);
export default userRoute;
