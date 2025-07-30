import * as bcrypt from 'bcrypt';
import { PASSWORD_SALT_ROUNDS } from 'src/constants/app.constants';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
};

export const comparePassword = async (
  plainPassword: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hash);
};
