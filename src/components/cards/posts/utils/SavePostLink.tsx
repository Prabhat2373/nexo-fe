// import WithTooltip from '@/components/ui/WithTooltip';
// import { RootState } from '@/services/store';
// import { Post } from '@/types/posts/posts.types';
// import { IconBookmarkFilled, IconBookmarkPlus } from '@tabler/icons-react';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

// interface ISavePostLink {
//   post: Post;
// }

// const SavePostLink = ({ post }: ISavePostLink) => {
//   const { user } = useSelector((state: RootState) => state.user);

//   const [isSaved, setIsSaved] = useState(false);

//   const toggleSavePost = () => {};
//   return (
//     <WithTooltip description={'Save To Reading List'}>
//       <button
//         onClick={toggleSavePost}
//         className="flex items-center text-gray-500 hover:text-gray-700"
//       >
//         {isSaved ? <IconBookmarkFilled className="text-blue-500" /> : <IconBookmarkPlus />}
//         {/* <span className="ml-1">{isSaved ? "Saved" : "Save"}</span> */}
//       </button>
//     </WithTooltip>
//   );
// };

// export default SavePostLink;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WithTooltip from '@/components/ui/WithTooltip';
import { IconBookmarkFilled, IconBookmarkPlus } from '@tabler/icons-react';
import { RootState } from '@/services/store';
import { useTogglePostSaveMutation } from '@/services/rtk/postsApi';
import { isSuccess } from '@/utils/utils';
import { toast } from 'react-toastify';
// import { savePost, unsavePost } from '@/services/api/posts';

interface ISavePostButtonProps {
  postId: string;
  initiallySaved: boolean;
}

const SavePostButton: React.FC<ISavePostButtonProps> = ({ postId, initiallySaved }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isSaved, setIsSaved] = useState(initiallySaved);
  // const [isLoading, setIsLoading] = useState(false);
  const [toggle, { isLoading }] = useTogglePostSaveMutation();

  const toggleSavePost = async () => {
    if (!user) {
      // Optionally handle the case where the user is not logged in
      return;
    }

    // setIsLoading(true);
    try {
      const res = await toggle({ postId, action: isSaved ? 'unsave' : 'save' });
      if (isSuccess(res)) {
        toast.success(res?.data?.message);
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Failed to save/unsave post:', error);
    }
  };

  return (
    <WithTooltip description={isSaved ? 'Remove from Reading List' : 'Save to Reading List'}>
      <button
        onClick={toggleSavePost}
        className="flex items-center text-gray-500 hover:text-gray-700"
        disabled={isLoading}
      >
        {isSaved ? <IconBookmarkFilled className="text-blue-500" /> : <IconBookmarkPlus />}
      </button>
    </WithTooltip>
  );
};

export default SavePostButton;
