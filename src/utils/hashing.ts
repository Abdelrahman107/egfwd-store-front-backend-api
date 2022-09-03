import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password + process.env.BCRYPT_PASSWORD, parseInt(process.env.BCRYPT_SALT as string));
};

export const comparePassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, hashedPassword);
};
