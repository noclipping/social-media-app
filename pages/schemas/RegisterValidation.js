import { object, string, number, date, InferType } from "yup";

export const userSchema = object({
  username: string().min(3).max(24).required(),
  password: string().min(3).max(50).required(),
  email: string().email().required(),
});
