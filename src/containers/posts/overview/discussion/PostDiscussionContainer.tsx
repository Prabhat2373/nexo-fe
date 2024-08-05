import BlogCommentCard from '@/components/blog/comments/BlogCommentCard';
import WithEmptyData from '@/components/ui/WithEmptyData';
import { Button } from '@/components/ui/button';
import { useLazyGetPostCommentsQuery } from '@/services/rtk/postsApi';
import classNames from 'classnames';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostCommentFormContainer from '../../forms/PostCommentFormContainer';

const PostDiscussionContainer = () => {
  const params = useParams();
  const postId = params?.id;

  const [activeCommentId, setActiveCommentId] = useState('');
  const [getComments, { data }] = useLazyGetPostCommentsQuery();
  const [enableCommentForm, setEnableCommentForm] = useState(false);

  const fetchComments = () => {
    if (postId) {
      getComments(postId);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleOnSuccess = () => {
    fetchComments();
    setEnableCommentForm(false);
  };

  const comments = data?.data;

  console.log('enableCommentForm', enableCommentForm);

  console.log('comments', data);
  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased md:w-2/3">
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussions ({comments?.length})
            </h2>
          </div>
          <div
            className={classNames({
              // hidden: !enableCommentForm,
            })}
          >
            <PostCommentFormContainer onSuccess={handleOnSuccess} />
          </div>
          <WithEmptyData
            isEmpty={enableCommentForm && !comments?.length}
            title={'No Comments Yet!'}
            actionComponent={
              <>
                <Button type="button" onClick={() => setEnableCommentForm(true)}>
                  Post a Comment!
                </Button>
              </>
            }
          >
            {comments?.map((comment) => {
              return (
                <BlogCommentCard
                  data={comment}
                  setActiveCommentId={setActiveCommentId}
                  activeCommentId={activeCommentId}
                />
              );
            })}
          </WithEmptyData>
        </div>
      </section>
    </>
  );
};

export default PostDiscussionContainer;
