'use client';
import CreateCollectionModal from '@/components/modals/collections/CreateCollectionModal';
import { Button } from '@/components/ui/button';
import useModalHandler from '@/hooks/app/useModalHandler';
import React from 'react';

const CollectionsHeaderContainer = () => {
  const [isOpen, toggle, show, hide] = useModalHandler();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1>Collection</h1>
        <Button onClick={show}>+ Create </Button>
      </div>
      <CreateCollectionModal isOpen={isOpen} toggle={toggle} />
    </>
  );
};

export default CollectionsHeaderContainer;
