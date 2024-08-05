import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { formatDateTime } from "@/helpers/date.helpers";
import { useDeleteReplyMutation } from "@/services/rtk/postsApi";
import { isSuccess } from "@/utils/utils";
import { toast } from "react-toastify";

const CommentReplayCard = ({ data, refetch }) => {
  const [deleteReply, { isLoading }] = useDeleteReplyMutation();
  const replyId = data?._id;
  const handleDeleteReply = async () => {
    const res = await deleteReply(replyId);

    if (isSuccess(res)) {
      toast.success(res?.data?.message);
      refetch();
    }
  };
  return (
    <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="Jese Leos"
            />
            @{data?.author?.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time pubdate="" dateTime="2022-02-12" title="February 12th, 2022">
              {formatDateTime(data?.createdAt)}
            </time>
          </p>
        </div>

        {/* Dropdown menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <MoreHorizontal className="h-3.5 w-3.5" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteReply}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Trash</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">
        <div
          dangerouslySetInnerHTML={{
            __html: data?.content,
          }}
        />
      </p>
      {/* <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
        >
          <svg
            className="mr-1.5 w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
          </svg>
          Reply
        </button>
      </div> */}
    </article>
  );
};

export default CommentReplayCard;
