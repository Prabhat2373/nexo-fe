import { BLOG_POST_MODES } from "@/config/app/AppConstants";
import * as Yup from "yup";
export const createPostValidation = Yup.object({
  title: Yup.string().required("Title is required"),
  mode: Yup.string().nullable(),
  thumbnail: Yup.mixed().when(["mode"], {
    is: (mode) => mode !== BLOG_POST_MODES.EDIT,
    then: () => Yup.mixed().required("Thumbnail is required"),
  }),

  //   content: Yup.object().required("Content is required"),
});
