import api from '@/services/ssr/api';
import MainPostsContainer from './posts/index/MainPostsContainer';

const MainPageContainer = async () => {
  const res = await api.get('/blogs');
  const followingPostsRes = await api.get('/blogs/following');
  const blogs = res?.data?.data;
  const followingPosts = followingPostsRes?.data?.data;

  return <MainPostsContainer blogs={blogs} followingPosts={followingPosts} />;
};

export default MainPageContainer;
