import { object, string, array } from "yup";

export default object({
  title: string().required("title is mandatory!"),
  description: string().required("description is mandatory!"),
  users: array().min(1).required("users are required!"),
});
