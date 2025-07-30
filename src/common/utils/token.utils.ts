import * as jwt from 'jsonwebtoken';
import { JWT_EXPIRY } from 'src/constants/app.constants';

export const generateToken = (
  payload: object,
  secret: string,
  expiresIn: string = JWT_EXPIRY,
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (
  token: string,
  secret: string,
): any => {
  return jwt.verify(token, secret);
};
