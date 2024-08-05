import React from 'react';
import Modal from '../Modal';
import { Form, Formik } from 'formik';

const ReviewAndPublishPostModal = ({ isOpen, toggle }) => {
  const initialValues = {};
  const handleSubmitPost = async () => {};
  return (
    <Modal isOpen={isOpen} setIsOpen={toggle} title={'Publish Post'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmitPost}>
        {({}) => {
          return <Form></Form>;
        }}
      </Formik>
    </Modal>
  );
};

export default ReviewAndPublishPostModal;
