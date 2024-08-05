import SchedulePostModal from '@/components/modals/post/SchedulePostModal';
import { Button } from '@/components/ui/button';
import useModalHandler from '@/hooks/app/useModalHandler';
import { IconClockBolt } from '@tabler/icons-react';
import React from 'react';

const ScheduleBlogPostLink = () => {
  const [isOpen, toggle, show] = useModalHandler();
  return (
    <>
      <Button variant={'outline'} type="button" onClick={show}>
        <IconClockBolt /> Schedule For Later
      </Button>
      <SchedulePostModal isOpen={isOpen} toggle={toggle} />
    </>
  );
};

export default ScheduleBlogPostLink;
