import ProfileNotificationsContainer from '@/components/profile/ProfileNotificationsContainer';
import ProfileScheduledPostsContainer from '@/components/profile/ProfileScheduledPostsContainer';
import ProfileSettingsContainer from '@/components/profile/ProfileSettingsContainer';
import React from 'react';

const useProfileTabLinks = () => {
  const tabLinks = [
    {
      label: 'Scheduled Posts',
      value: 'scheduled-posts',
      component: ProfileScheduledPostsContainer,
      enabled: true
    },
    {
      label: 'Settings',
      value: 'settings',
      component: ProfileSettingsContainer,
      enabled: true
    },
    {
      label: 'Notifications',
      value: 'notifications',
      component: ProfileNotificationsContainer,
      enabled: true
    }
  ];
  return { tabLinks };
};

export default useProfileTabLinks;
