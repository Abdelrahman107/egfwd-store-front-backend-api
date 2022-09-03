import { NextFunction, Request, Response } from 'express';
import User from '../types/user';
import { UserModel } from '../models/database/user.model';
import { CustomError } from '../models/error/error.model';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();

export const getUsers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const users: User[] = await userModel.getAllUsers();
    response.status(200).json({
      status: 200,
      message: 'Success, Users Fetched Successfully',
      data: users
    });
  } catch (error) {
    next(error);
  }
};
export const getUserById = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user: User = await userModel.getUserById(request.params.id as string);
    response.status(200).json({
      status: 200,
      message: 'Success, User Fetched Successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};
export const createUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user: User = await userModel.createUser(request.body as User);
    response.status(201).json({
      status: 201,
      message: 'Success, User Created Successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user: User = await userModel.updateUser(request.body as User);
    response.status(200).json({
      status: 200,
      message: 'Success, User Updated Successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};
// export const updateUserById = async (request: Request, response: Response, next: NextFunction) => {
//   try {
//     const user: User = await userModel.updateUserById(request.params.id, request.body as User);
//     response.status(200).json({
//       status: 200,
//       message: 'Success, User Updated Successfully',
//       data: user
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteUserById = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user: User = await userModel.deleteUserById(request.params.id as string);
    response.status(200).json({
      status: 200,
      message: 'Success, User Deleted Successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

export const authenticateUser = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user: User | null = await userModel.authenticateUser(request.body.email as string, request.body.password as string);
    const token = jwt.sign({ user }, process.env.JWT_SECRET as string);
    if (!user) {
      throw new CustomError('Invalid Credentials', 401);
    }
    response.status(200).json({
      status: 200,
      message: 'Success, User Authenticated Successfully',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};
