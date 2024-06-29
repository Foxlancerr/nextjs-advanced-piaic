import * as bcryptjs from "bcryptjs";

export const hashPassword = async (password: any) => {
  return await bcryptjs.hash(password, 10);
};
export const comparePassword = async (password: any, hashPassword: any) => {
  return await bcryptjs.compare(password, hashPassword);
};
