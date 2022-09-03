import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../models/error/error.model';

function errorHandler(error: TypeError | CustomError, _req: Request, res: Response, next: NextFunction) {
  let err = error;
  if (!(err instanceof CustomError)) {
    err = new CustomError(`Something is Wrong`);
  }

  res.status((err as CustomError).status).send(err);
}

export default errorHandler;
