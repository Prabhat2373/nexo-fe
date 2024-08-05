import { useLazyGetAllPostsQuery } from '@/services/rtk/postsApi';
import React, { useEffect } from 'react';
import BlogPostCard from '../cards/posts/BlogPostCard';
import ScheduledPostCard from './utils/ScheduledPostCard';
import { Button } from '../ui/button';
import { RefreshCw } from 'lucide-react';
import classNames from 'classnames';

const ProfileScheduledPostsContainer = () => {
  const [getPosts, { data: postData, isFetching }] = useLazyGetAllPostsQuery();

  const fetchPosts = () => {
    if (!isFetching) {
      getPosts({
        status: 'scheduled'
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between mx-4">
        <h1>Scheduled Posts</h1>
        <Button variant={'outline'} type="button">
          <RefreshCw
            onClick={fetchPosts}
            className={classNames('text-primary', {
              'animate-spin': isFetching
            })}
          />
        </Button>
      </div>
      <div className='my-2'>
        {postData?.data?.map((blog) => {
          return <ScheduledPostCard post={blog} />;
        })}
      </div>
    </div>
  );
};

export default ProfileScheduledPostsContainer;
