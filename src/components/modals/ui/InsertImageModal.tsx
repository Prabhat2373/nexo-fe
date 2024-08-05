import React, { useState } from 'react';
import Modal from '../Modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const InsertImageModal = ({ editor, isOpen, toggle }) => {
  const [url, setUrl] = useState('');
  return (
    <Modal isOpen={isOpen} setIsOpen={toggle} title={'Insert URL'}>
      <Input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e?.target?.value)}
      />

      <div className="flex justify-end ">
        <Button
          type="button"
          onClick={() => {
            editor.chain().focus().setImage({ src: url }).run();
            toggle();
          }}
        >
          Insert
        </Button>
      </div>
    </Modal>
  );
};

export default InsertImageModal;
