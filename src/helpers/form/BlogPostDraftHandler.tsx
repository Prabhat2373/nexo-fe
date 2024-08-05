// // import { useSaveDraftsMutation } from "@/services/rtk/postsApi";
// // import { isSuccess } from "@/utils/utils";
// // import React, { useCallback, useEffect } from "react";
// // import { toast } from "react-toastify";
// // import debounce from "lodash/debounce";
// // import { useFormikContext } from "formik";

// // const BlogPostDraftHandler = ({ content, thumbnail }) => {
// //   const { values } = useFormikContext();
// //   const [saveDraft, { isLoading: savingDrafts }] = useSaveDraftsMutation();

// //   const handleSaveDraft = useCallback(
// //     debounce(async (data) => {
// //       const payload = {
// //         ...data,
// //         content,
// //         thumbnail,
// //       };

// //       const formdata = new FormData();
// //       Object.keys(payload).forEach((key) => {
// //         if (key !== "thumbnail" && key !== "content" && key !== "tags") {
// //           formdata.append(key, payload[key]);
// //         }
// //       });

// //       formdata.append("content", JSON.stringify(payload.content));
// //       formdata.append("tags", JSON.stringify(payload.tags));
// //       if (thumbnail) {
// //         formdata.append("file", thumbnail);
// //       }

// //       const response = await saveDraft(formdata);
// //       if (isSuccess(response)) {
// //         toast.success("Draft saved successfully");
// //       } else {
// //         toast.error("Failed to save draft");
// //       }
// //     }, 1000),
// //     [content, thumbnail, values]
// //   );

// //   useEffect(() => {
// //     handleSaveDraft(values);
// //   }, [content, thumbnail]);

// //   return null;
// // };

// // export default BlogPostDraftHandler;

// import { useSaveDraftsMutation } from "@/services/rtk/postsApi";
// import { isSuccess } from "@/utils/utils";
// import React, { useEffect, useRef } from "react";
// import { toast } from "react-toastify";
// import debounce from "lodash/debounce";
// import { useFormikContext } from "formik";
// import { IconCloud } from "@tabler/icons-react";
// import classNames from "classnames";

// const BlogPostDraftHandler = ({ content, thumbnail }) => {
//   const { values } = useFormikContext();
//   const [saveDraft, { isLoading }] = useSaveDraftsMutation();

//   // Create a ref to store the debounced function
//   const debouncedSaveDraftRef = useRef(
//     debounce(async (data) => {
//       const payload = {
//         ...data,
//         content,
//         thumbnail,
//       };

//       const formdata = new FormData();
//       Object.keys(payload).forEach((key) => {
//         if (key !== "thumbnail" && key !== "content" && key !== "tags") {
//           formdata.append(key, payload[key]);
//         }
//       });

//       formdata.append("content", JSON.stringify(payload.content));
//       formdata.append("tags", JSON.stringify(payload.tags));
//       if (thumbnail) {
//         formdata.append("file", thumbnail);
//       }

//       const response = await saveDraft(formdata);
//       //   if (isSuccess(response)) {
//       //     // toast.success("Draft saved successfully");
//       //   } else {
//       //     toast.error("Failed to save draft");
//       //   }
//     }, 1000)
//   ).current;

//   useEffect(() => {
//     // Call the debounced function when values, content, or thumbnail change
//     debouncedSaveDraftRef(values);
//   }, [values, content, thumbnail, debouncedSaveDraftRef]);

//   return (
//     <>
//       {/* <div
//         className={classNames("flex gap-2", {
//           hidden: !isLoading,
//         })}
//       >
//         <IconCloud /> Saving..
//       </div> */}
//     </>
//   );
// };

// export default BlogPostDraftHandler;
import { useSaveDraftsMutation } from "@/services/rtk/postsApi";
import { isSuccess } from "@/utils/utils";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { useFormikContext } from "formik";

const BlogPostDraftHandler = ({ content, thumbnail }) => {
  const { values } = useFormikContext();
  const [saveDraft, { isLoading: savingDrafts }] = useSaveDraftsMutation();
  const [currentDraftId, setCurrentDraftId] = useState("");

  const debouncedSaveDraftRef = useRef(
    debounce(async (data, draftId) => {
      const payload = {
        ...data,
        content,
        thumbnail,
        draftId,
      };

      const formdata = new FormData();
      Object.keys(payload).forEach((key) => {
        if (key !== "thumbnail" && key !== "content" && key !== "tags") {
          formdata.append(key, payload[key]);
        }
      });

      formdata.append("content", JSON.stringify(payload.content));
      formdata.append("tags", JSON.stringify(payload.tags));
      if (thumbnail) {
        formdata.append("file", thumbnail);
      }

      const response = await saveDraft(formdata);
      if (isSuccess(response)) {
        toast.success("Draft saved successfully");
        if (!draftId) {
          setCurrentDraftId(response?.data?.data?._id); // assuming the response contains the new draft ID
        }
      } else {
        toast.error("Failed to save draft");
      }
    }, 1000)
  ).current;

  useEffect(() => {
    // debouncedSaveDraftRef(values, currentDraftId);
  }, [values, content, thumbnail]);

  return null;
};

export default BlogPostDraftHandler;
