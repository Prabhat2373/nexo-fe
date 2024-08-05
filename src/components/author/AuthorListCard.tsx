import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { formatDateTime } from '@/helpers/date.helpers';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import FollowButtonLink from '../cards/posts/utils/FollowButtonLink';

const AuthorListCard = ({ author }) => {
  return (
    <div className="flex items-center space-x-4 justify-between pb-2 border p-2 rounded-md">
      <div className="flex items-start space-x-4">
        <Link href={`/authors/profile/${author?._id}`} className="flex items-center space-x-4">
          <Avatar className="cursor-pointer">
            <AvatarImage src={author?.avatar} alt={author?.name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className="text-gray-900 leading-none font-semibold dark:text-gray-100">
                {author?.name}
              </p>

              <FollowButtonLink author={author} />
            </div>
            <div className="flex gap-2 items-center text-gray-600 text-xs">
              <div className="flex gap-2 items-center text-gray-600 text-xs dark:text-gray-300">
                {author?.following?.length} Following
              </div>
              <div className="flex gap-2 items-center text-gray-600 text-xs dark:text-gray-300">
                {author?.followers?.length} Followers
              </div>
              <div className="flex gap-2 items-center text-gray-600 text-xs dark:text-gray-300">
                {author?.articles?.length} Articles
              </div>
            </div>
          </div>
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="h-8 w-8">
            <MoreHorizontal className="h-3.5 w-3.5" />
            <span className="sr-only">More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <Link href={`/posts/edit/${data?._id}`}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link> */}
          <DropdownMenuItem>Export</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Trash</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthorListCard;
