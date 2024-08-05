// src/components/BlogCard.tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useConfirmModal } from '@/contexts/app/modal-context';
import { Ban, Delete, MoreHorizontal, Rss, Terminal, Trash } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
// import { Blog } from '@/types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface BlogCardProps {
  post: BlogCardProps;
}

const ScheduledPostCard: React.FC<BlogCardProps> = ({ post }) => {
  const [percentage, setPercentage] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  const { openConfirmModal } = useConfirmModal();

  console.log('percentage', percentage);

  useEffect(() => {
    if (post) {
      const interval = setInterval(() => {
        const now = new Date();
        const scheduledAt = new Date(post.scheduledAt);
        const createdAt = new Date(post.createdAt);
        const totalSeconds = (scheduledAt.getTime() - now.getTime()) / 1000;

        if (isNaN(totalSeconds) || totalSeconds < 0) {
          setPercentage(100);
          setTimeLeft('0d 0h 0m 0s');
          return;
        }

        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);

        const totalDuration = (scheduledAt.getTime() - createdAt.getTime()) / 1000;
        const per = Math.max(0, ((totalDuration - totalSeconds) / totalDuration) * 100);

        setPercentage(per);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [post.scheduledAt, post.createdAt]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-2">{post?.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" size="icon" variant="ghost" className="h-8 w-8">
              <MoreHorizontal className="h-3.5 w-3.5" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <Link href={`/posts/edit/${post?._id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link> */}
            <DropdownMenuItem className="flex items-center gap-1 cursor-pointer">
              <Ban className="text-primary" size={20} /> Cancel Schedule
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-1 cursor-pointer">
              <Rss className="text-primary" size={20} /> Publish Now
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className=" text-red-500 hover:text-red-500 cursor-pointer"
              onClick={() => {
                openConfirmModal({
                  onConfirm: async () => {},
                  confirmPrompt: 'delete'
                });
              }}
            >
              <div className="text-red-500 flex items-center gap-1">
                <Trash className="text-red-500" size={20} /> Delete
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{post?.description || 'NA'}</p>
      <p className="text-gray-500 text-sm mt-2">
        Scheduled At: {new Date(post.scheduledAt).toLocaleString()}
      </p>
      <div className="flex items-center mt-4">
        {percentage !== 100 ? (
          <div className="w-16 h-16 mr-4">
            <CircularProgressbar
              value={percentage}
              text={`${Math.round(percentage)}%`}
              styles={buildStyles({
                textColor: '#4a5568',
                pathColor: '#4a5568',
                trailColor: '#e2e8f0'
              })}
            />
          </div>
        ) : (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your Post is Live Now.</AlertDescription>
          </Alert>
        )}
        {percentage !== 100 ? (
          <div>
            <p className="text-gray-700 dark:text-gray-300">Time Left:</p>
            <p className="text-gray-500 text-sm">{timeLeft}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ScheduledPostCard;
