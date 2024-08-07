import React, { useEffect } from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  Book,
  Dock,
  File,
  Inbox,
  LayoutDashboard,
  LucideIcon,
  MessagesSquare,
  Receipt,
  SaveIcon,
  Send,
  ShoppingCart,
  Trash2,
  User,
  Users2,
} from "lucide-react";

interface Link {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  href: string;
}
const useNavLinks = () => {
  // const [getTopics, { data }] = useLazyGetBlogTopicsQuery();
  // console.log("topics", data);

  // useEffect(() => {
  //   getTopics({ limit: 5 });
  // }, []);

  const primaryNavLinks: Link[] = [
    {
      title: "Dashboard",
      label: "128",
      icon: LayoutDashboard,
      variant: "default",
      href: "/",
    },
    {
      title: "Orders",
      label: "9",
      icon: Book,
      variant: "ghost",
      href: "/orders",
    },
    {
      title: "Customers",
      label: "",
      icon: User,
      variant: "ghost",
      href: "/customers",
    },
    {
      title: "Tables",
      label: "",
      icon: Dock,
      variant: "ghost",
      href: "/tables",
    },
    {
      title: "Posts",
      label: "23",
      icon: ArchiveX,
      variant: "ghost",
      href: "/posts",
    },
    {
      title: "Saved",
      label: "",
      icon: SaveIcon,
      variant: "ghost",
      href: "/saved",
    },
    {
      title: "Billing",
      label: "",
      icon: Receipt,
      variant: "ghost",
      href: "/billings",
    },
  ];
  const secondaryNavLinks: Link[] = [
    {
      title: "Social",
      label: "972",
      icon: Users2,
      variant: "ghost",
      href: "/test",
    },
    {
      title: "Updates",
      label: "342",
      icon: AlertCircle,
      variant: "ghost",
      href: "/test",
    },
    {
      title: "Forums",
      label: "128",
      icon: MessagesSquare,
      variant: "ghost",
      href: "/test",
    },
    {
      title: "Shopping",
      label: "8",
      icon: ShoppingCart,
      variant: "ghost",
      href: "/test",
    },
    {
      title: "Promotions",
      label: "21",
      icon: Archive,
      variant: "ghost",
      href: "/test",
    },
  ];
  return {
    primaryNavLinks,
    secondaryNavLinks,
  };
};

export default useNavLinks;
