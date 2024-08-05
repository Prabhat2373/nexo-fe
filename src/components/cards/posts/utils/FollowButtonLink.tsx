import RenderIf from '@/components/app/RenderIf';
import { Button } from '@/components/ui/button';
import { useFollowUserMutation, useUnfollowUserMutation } from '@/services/rtk/profileApi';
import { RootState } from '@/services/store';
import { isSuccess } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const FollowButtonLink = ({ author }) => {
  const [follow, { isLoading: followLoading }] = useFollowUserMutation();
  const [unfollow, { isLoading: unfollowLoading }] = useUnfollowUserMutation();
  const { user } = useSelector((state: RootState) => state.user);
  console.log('user', user);

  const [isFollowing, setIsFollowing] = useState(false);
  const isCurrentUserPost = user?._id === author?._id;

  const handleToggleFollow = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!isFollowing) {
      const res = await follow(author?._id);

      if (isSuccess(res)) {
        toast.success(res?.data?.message);
        setIsFollowing(true);
      }
    } else {
      const res = await unfollow(author?._id);

      if (isSuccess(res)) {
        toast.success(res?.data?.message);
        setIsFollowing(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setIsFollowing(user?.following?.includes(author?._id));
    }
  }, [user]);
  return (
    <RenderIf when={!isCurrentUserPost && !!author}>
      <Button
        onClick={handleToggleFollow}
        variant={'link'}
        disabled={followLoading || unfollowLoading}
        // onClick={onFollow}
        // className="ml-auto bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
        className="m-0 p-0 h-4 text-primary"
      >
        {isFollowing ? 'Following' : 'Follow'}
      </Button>
    </RenderIf>
  );
};

export default FollowButtonLink;
