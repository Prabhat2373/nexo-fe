'use client';
import Asterisk from '@/components/form/Asterisk';
import InputError from '@/components/form/InputError';
import Modal from '@/components/modals/Modal';
import ReactSelect from '@/components/select/ReactSelect';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLazyGetAccountPostsQuery } from '@/services/rtk/postsApi';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useMemo } from 'react';

const CreateCollectionModal = ({ isOpen, toggle }) => {
  const [getAccountPosts, { data: postsData }] = useLazyGetAccountPostsQuery();
  useEffect(() => {
    getAccountPosts('');
  }, []);
  console.log('postsData', postsData);
  const postOptions = useMemo(() => {
    return postsData?.data?.map((post) => ({
      label: post?.title,
      value: post?._id
    }));
  }, [postsData?.data]);
  return (
    <Modal title={'Create Collection'} isOpen={isOpen} setIsOpen={toggle}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {({ setFieldValue }) => {
          return (
            <>
              <Form className="flex flex-col gap-4">
                <div>
                  <Label>
                    Name <Asterisk />
                  </Label>
                  <Field as={Input} name="name" />
                  <ErrorMessage name="name" component={InputError} />
                </div>

                <div>
                  <Label>Description</Label>
                  <Field as={Input} name="description" />
                  <ErrorMessage name="description" component={InputError} />
                </div>
                <div>
                  <Label>Select Posts</Label>
                  <ReactSelect
                    options={postOptions}
                    isMulti
                    onChange={(option) =>
                      setFieldValue(
                        'posts',
                        option?.map((opt) => opt?.value)
                      )
                    }
                    placeholder="Select Posts"
                  />
                  <ErrorMessage name="posts" component={InputError} />
                </div>
                <div className="flex justify-end">
                  <Button>Create</Button>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default CreateCollectionModal;
