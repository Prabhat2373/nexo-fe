import FeaturedListCard from '@/components/cards/posts/featured/FeaturedListCard';
import Container from '@/components/ui/Container';
import { useGetAllPostsQuery } from '@/services/rtk/postsApi';
import React from 'react';

const HomeAsideContainer = ({ blogs }) => {
  const { data } = useGetAllPostsQuery('');
  return (
    <div className="my-3 flex flex-col gap-4">
      <h3 className="text-xl font-semibold tracking-tight">Suggested To Follow</h3>
      <div className="flex flex-col gap-3">
        {blogs?.map((post) => {
          return <FeaturedListCard data={post} />;
        })}
      </div>
    </div>
  );
};

export default HomeAsideContainer;
