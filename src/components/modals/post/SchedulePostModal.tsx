import React from 'react';
import Modal from '../Modal';
import { Button } from '@/components/ui/button';
import { useFocusContext } from 'react-day-picker';
import { Field, useFormikContext } from 'formik';
import { Label } from '@/components/ui/label';
import Asterisk from '@/components/form/Asterisk';
import { Input } from '@/components/ui/input';

const SchedulePostModal = ({ isOpen, toggle }) => {
  const { values, setFieldValue, submitForm } = useFormikContext();
  return (
    <Modal isOpen={isOpen} setIsOpen={toggle} title={'Schedule For Later'} description={'test'}>
      <div>
        <div>
          <Label>
            Pick a date <Asterisk />
          </Label>
          {/* <input type="datetime-local" /> */}
          <Field as={Input} type="datetime-local" name="scheduledAt" />
        </div>
        <div className="flex justify-end">
          <Button type="submit" onClick={() => submitForm()}>
            Shedule
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SchedulePostModal;
