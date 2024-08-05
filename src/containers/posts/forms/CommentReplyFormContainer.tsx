// import React from 'react'

// const CommentReplyFormContainer = () => {
//   return (
//     <div>CommentReplyFormContainer</div>
//   )
// }

// export default CommentReplyFormContainer

import RichTextEditor from '@/components/ui/editor/RichTextEditor';
import { Button } from '@/components/ui/button';
import { useCommentOnPostMutation, useReplyToCommentMutation } from '@/services/rtk/postsApi';
import { isSuccess } from '@/utils/utils';
import { Form, Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Descendant } from 'slate';

const CommentReplyFormContainer = ({ comment, onSuccess }) => {
  const router = useRouter();
  const params = useParams();
  console.log('params', params);
  const [replay, { isLoading }] = useReplyToCommentMutation();
  const [content, setContent] = useState<Descendant[]>([]);

  const initialValues = {
    content: ''
  };

  const handleReplyComment = async (data: typeof initialValues) => {
    const payload = {
      id: comment?._id,
      body: {
        content
      }
    };
    const res = await replay(payload);
    if (isSuccess(res)) {
      toast.success(res?.data?.message);
      onSuccess();
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleReplyComment}>
      <div className="flex w-full justify-end">
        <div className="flex w-[80%] justify-end">
          <Form>
            <RichTextEditor
              output="html"
              value={content}
              onChange={(value) => {
                setContent(value);
                // setFieldValue("content", value);
              }}
            />
            <Button className="my-3" loadingText="Posting.." isLoading={isLoading}>
              Post Reply
            </Button>
          </Form>
        </div>
      </div>
    </Formik>
  );
};

export default CommentReplyFormContainer;
