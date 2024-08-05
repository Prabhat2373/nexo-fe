'use client';
import EmptyState from '@/components/app/EmptyState';
import Container from '@/components/ui/Container';
import CollectionsHeaderContainer from './CollectionsHeaderContainer';

const CollectionsIndexContainer = () => {
  return (
    <div>
      <Container className="my-4">
        <CollectionsHeaderContainer />
        <EmptyState description="No Collections Found" data={[]}></EmptyState>
      </Container>
    </div>
  );
};

export default CollectionsIndexContainer;
