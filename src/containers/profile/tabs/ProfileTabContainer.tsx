import Tabs, { TabContent, TabLink, TabLinks, TabPane } from '@/components/ui/Tabs';
import ProfileDraftsContainer from './posts/ProfileDraftsContainer';
import useProfileTabLinks from '@/hooks/profile/useProfileTabLinks';
import React from 'react';

const ProfileTabContainer = () => {
  const { tabLinks } = useProfileTabLinks();
  return (
    <div>
      <Tabs active={tabLinks?.[0]?.value} vertical fill>
        <TabLinks className="min-w-[200px]">
          {/* <TabLink target="posts">All Post</TabLink>
          <TabLink target="drafts">Drafts</TabLink> */}
          {tabLinks?.map((tab) => {
            return <TabLink target={tab?.value}>{tab.label}</TabLink>;
          })}
        </TabLinks>
        <TabContent>
          {tabLinks?.map((tab) => {
            return <TabPane id={tab?.value}>{React.createElement(tab?.component)}</TabPane>;
          })}
        </TabContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabContainer;
