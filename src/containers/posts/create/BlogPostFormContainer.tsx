'use client';
import { blogCategories } from '@/__mock__/blogs.categories';
import ScheduleBlogPostLink from '@/components/cards/posts/utils/ScheduleBlogPostLink';
import Asterisk from '@/components/form/Asterisk';
import FileDropableInput from '@/components/form/FileDropableInput';
import InputError from '@/components/form/InputError';
import InputField from '@/components/inputs/InputField';
import ReactSelect from '@/components/select/ReactSelect';
import { Button } from '@/components/ui/button';
import RichTextEditor from '@/components/ui/editor/RichTextEditor';
import { Label } from '@/components/ui/label';
import { BLOG_POST_MODES } from '@/config/app/AppConstants';
import BlogPostDraftHandler from '@/helpers/form/BlogPostDraftHandler';
import {
  useCreatePostMutation,
  useLazyGetPostOverviewQuery,
  useUpdateBlogMutation
} from '@/services/rtk/postsApi';
import { isSuccess } from '@/utils/utils';
import { createPostValidation } from '@/validators/posts/posts.validator';
import { IconBolt, IconDeviceFloppy } from '@tabler/icons-react';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Descendant } from 'slate';

interface ICreateBlogPostFormContainer {
  mode?: BLOG_POST_MODES.CREATE | BLOG_POST_MODES.EDIT;
  post?: any;
}

const CreateBlogPostFormContainer = ({ mode, post }: ICreateBlogPostFormContainer) => {
  console.log('post', post);
  const params = useParams();
  const postId = params?.id;

  const [getBlogPost, { data: postData }] = useLazyGetPostOverviewQuery();
  const [publishPost, { isLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState<Descendant[]>([]);

  const postMeta = post;

  console.log('postData', postData);
  const router = useRouter();
  console.log('content', content);

  const handleSuccess = (response) => {
    if (isSuccess(response)) {
      toast.success(response?.data?.message);
      router.push(`/posts/${response?.data?.data?._id}`);
    }
  };

  const handleSubmit = async (data) => {
    const payload = {
      ...data,
      content
    };
    const formdata = new FormData();
    Object.keys(payload).forEach((key) => {
      if (key !== 'thumbnail' && key !== 'content' && key !== 'tags') {
        formdata.append(key, payload[key]);
      }
    });

    formdata.append('content', JSON.stringify(payload.content));
    formdata.append('tags', JSON.stringify(payload.tags));
    formdata.append('file', thumbnail);

    if (mode === BLOG_POST_MODES.EDIT) {
      const response = await updatePost({
        id: postId,
        body: formdata
      });
      console.log('Blog post updated:', response.data);
      handleSuccess(response);
    } else {
      const response = await publishPost(formdata);
      console.log('Blog post created:', response.data);
      handleSuccess(response);
    }
  };
  const initialValues = useMemo(() => {
    return {
      title: postMeta?.title ?? '',
      content: null,
      tags: postMeta?.tags ?? [],
      mode: mode
    };
  }, [postMeta]);

  const fileTypes = ['JPEG', 'PNG'];

  const handleChange = (file) => {
    setThumbnail(file?.[0]);
  };

  useEffect(() => {
    if (mode === BLOG_POST_MODES.EDIT) {
      getBlogPost(postId);
    }
  }, [mode, postId]);
  useEffect(() => {
    if (postMeta?.content) {
      setContent(postMeta?.content);
    }
  }, [postMeta]);
  return (
    <>
      <div className="my-10">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={createPostValidation}
          enableReinitialize
        >
          {({ setFieldValue, values, errors }) => {
            console.log('values', values);
            console.log('errors', errors);
            return (
              <Form className="mx-10  flex flex-col gap-4">
                <BlogPostDraftHandler content={content} thumbnail={thumbnail} />
                <div>
                  <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter About Your Blog"
                    required
                  />
                </div>
                <div>
                  <Label>
                    Content <Asterisk />
                  </Label>
                  <RichTextEditor
                    value={content}
                    onChange={(value) => {
                      setContent(value);
                      // setFieldValue("content", value);
                    }}
                  />
                  {errors?.content ? <InputError>{errors?.content}</InputError> : null}
                </div>
                <div>
                  <Label>Tags (optional)</Label>
                  <ReactSelect
                    options={blogCategories}
                    // value={/}
                    isMulti
                    onChange={(option) => {
                      setFieldValue(
                        'tags',
                        option?.map((option) => option?.label)
                      );
                    }}
                  />
                </div>
                <div>
                  <Label>Thumbnail</Label>
                  <FileDropableInput
                    multiple={true}
                    onChange={(file) => {
                      setFieldValue('thumbnail', file);
                      handleChange(file);
                    }}
                    name="file"
                    types={fileTypes}
                  />
                  {errors?.thumbnail ? <InputError>{errors?.thumbnail}</InputError> : null}
                </div>
                <div
                  className={classNames({
                    hidden: !postData?.thumbnail
                  })}
                >
                  <img src={postData?.thumbnail} alt="thumbnail" width={200} height={200} />
                </div>
                <div className="flex gap-3 items-center justify-end">
                  <Button variant={'outline'}>
                    <IconDeviceFloppy /> Save as Draft
                  </Button>
                  <ScheduleBlogPostLink />
                  <Button isLoading={isLoading || isUpdating}>
                    <IconBolt /> {mode === BLOG_POST_MODES.EDIT ? 'Update' : 'Publish'}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default CreateBlogPostFormContainer;
