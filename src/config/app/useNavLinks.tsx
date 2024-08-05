import React, { useEffect } from 'react';
import {
  AlertCircle,
  Archive,
  ArchiveX,
  Book,
  File,
  Inbox,
  LucideIcon,
  MessagesSquare,
  Receipt,
  SaveIcon,
  Send,
  ShoppingCart,
  Trash2,
  User,
  Users2
} from 'lucide-react';
import { useLazyGetBlogTopicsQuery } from '@/services/rtk/postsApi';

interface Link {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: 'default' | 'ghost';
  href: string;
}
const useNavLinks = () => {
  const [getTopics, { data }] = useLazyGetBlogTopicsQuery();
  console.log('topics', data);

  useEffect(() => {
    getTopics({ limit: 5 });
  }, []);

  const primaryNavLinks: Link[] = [
    {
      title: 'Feed',
      label: '128',
      icon: Inbox,
      variant: 'default',
      href: '/'
    },
    {
      title: 'Authors',
      label: '9',
      icon: User,
      variant: 'ghost',
      href: '/authors'
    },
    {
      title: 'Collections',
      label: '',
      icon: Book,
      variant: 'ghost',
      href: '/collections'
    },
    {
      title: 'Posts',
      label: '23',
      icon: ArchiveX,
      variant: 'ghost',
      href: '/posts'
    },
    {
      title: 'Saved',
      label: '',
      icon: SaveIcon,
      variant: 'ghost',
      href: '/saved'
    },
    {
      title: 'Billing',
      label: '',
      icon: Receipt,
      variant: 'ghost',
      href: '/billings'
    }
  ];
  const secondaryNavLinks: Link[] = [
    {
      title: 'Social',
      label: '972',
      icon: Users2,
      variant: 'ghost',
      href: '/test'
    },
    {
      title: 'Updates',
      label: '342',
      icon: AlertCircle,
      variant: 'ghost',
      href: '/test'
    },
    {
      title: 'Forums',
      label: '128',
      icon: MessagesSquare,
      variant: 'ghost',
      href: '/test'
    },
    {
      title: 'Shopping',
      label: '8',
      icon: ShoppingCart,
      variant: 'ghost',
      href: '/test'
    },
    {
      title: 'Promotions',
      label: '21',
      icon: Archive,
      variant: 'ghost',
      href: '/test'
    }
  ];
  return {
    primaryNavLinks,
    secondaryNavLinks
  };
};

export default useNavLinks;
