import Tabs, { TabContent, TabLink, TabLinks, TabPane } from '@/components/ui/Tabs';
import { useLazyGetAuthorPostsQuery } from '@/services/rtk/authorApi';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const AuthorProfileTabContainer = () => {
  const params = useParams();
  const authorId = params?.id;
  const [getAuthorPosts, { data }] = useLazyGetAuthorPostsQuery();
  const posts = data?.data;

  useEffect(() => {
    if (authorId) {
      getAuthorPosts(authorId);
    }
  }, [authorId]);
  return (
    <Tabs active={'posts'}>
      <TabLinks>
        <TabLink target="posts">All Post</TabLink>
        <TabLink target="drafts">Drafts</TabLink>
      </TabLinks>
      <TabContent>
        <TabPane id="posts">All Posts</TabPane>
        <TabPane id="drafts">
          {/* <ProfileDraftsContainer /> */}
          tst
        </TabPane>
      </TabContent>
    </Tabs>
  );
};

export default AuthorProfileTabContainer;
