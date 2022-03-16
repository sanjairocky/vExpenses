import { number, object, string } from "yup";

export default object({
  title: string().required("title is mandatory!"),
  description: string().required("description is mandatory!"),
  authorId: number().required("authorId is mandatory!"),
});
