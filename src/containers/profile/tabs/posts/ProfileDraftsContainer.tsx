import PostListingCard from '@/components/cards/posts/PostListingCard';
import { useLazyGetSavedDraftsQuery } from '@/services/rtk/postsApi';
import React, { useEffect } from 'react';

const ProfileDraftsContainer = () => {
  const [getDrafts, { data }] = useLazyGetSavedDraftsQuery();

  useEffect(() => {
    getDrafts('');
  }, []);
  return (
    <div>
      {data?.data?.map((draft) => {
        return <PostListingCard data={draft} />;
      })}
    </div>
  );
};

export default ProfileDraftsContainer;
