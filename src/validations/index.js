import { object, string } from 'yup';

export const chatroomSchema = object({
  title: string().required(),
  description: string(),
});
