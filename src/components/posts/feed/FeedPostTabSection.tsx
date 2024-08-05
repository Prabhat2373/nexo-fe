import Tabs, { TabContent, TabLink, TabLinks, TabPane } from '@/components/ui/Tabs';
import FeedPostListCard from './FeedPostListCard';
// import PostsList from './PostsList';

interface ITabContentSection {
  options: any;
  setOptions: any;
  data: any;
  followingPosts: any;
}

const TabContentSection = ({ options, setOptions, data, followingPosts }: ITabContentSection) => (
  <Tabs active="feed" className="">
    <TabLinks className="grid grid-cols-2 w-[400px]">
      <TabLink target="feed">For You</TabLink>
      <span onClick={() => setOptions({ ...options, is_following: true })}>
        <TabLink target="is_following">Following</TabLink>
      </span>
    </TabLinks>

    <TabContent>
      <TabPane id="feed">
        <FeedPostListCard posts={data} />
      </TabPane>
      <TabPane id="is_following">
        <FeedPostListCard posts={followingPosts?.data} />
      </TabPane>
    </TabContent>
  </Tabs>
);

export default TabContentSection;
