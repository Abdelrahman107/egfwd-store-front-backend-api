import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../models/error/error.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authorizationHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw new CustomError('Something is wrong, Access Denied', 401);
    }
    const result = authHeader.split(' ');
    const bearer = (result[0] as string).toLowerCase();
    const token = result[1];
    if (bearer !== 'bearer') {
      throw new CustomError('Something is wrong, Access Denied', 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      throw new CustomError('Something is wrong,Access Denied', 401);
    }
    next();
  } catch (_) {
    next(new CustomError(`Something is Wrong, Access Denied`, 401));
  }
}

export default authorizationHandler;
