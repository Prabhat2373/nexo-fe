import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CommentReplyFormContainer from "@/containers/posts/forms/CommentReplyFormContainer";
import { formatDateTime } from "@/helpers/date.helpers";
import { useLazyGetCommentRepliesQuery } from "@/services/rtk/postsApi";
import { getAcronym } from "@/utils/utils";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import CommentReplayCard from "./CommentReplayCard";
import classNames from "classnames";

const BlogCommentCard = ({ data, setActiveCommentId, activeCommentId }) => {
  const [getReplies, { isLoading, data: commentReplies }] =
    useLazyGetCommentRepliesQuery();
  const [enableReply, setEnableReply] = useState(false);

  const commentId = data?._id;

  const fetchCommentReplies = useCallback(() => {
    if (commentId) {
      getReplies(commentId);
    }
  }, [commentId]);
  const handleOnSuccess = () => {
    setEnableReply(false);
    setActiveCommentId("");
    fetchCommentReplies();
  };

  useEffect(() => {
    fetchCommentReplies();
  }, [commentId]);

  console.log("commentReplies", commentReplies);
  return (
    <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold gap-2">
            {/* <img
              className="mr-2 w-6 h-6 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Michael Gough"
            /> */}
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{getAcronym(data?.author?.name)}</AvatarFallback>
            </Avatar>
            <p>{data?.author?.name}</p>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time pubdate="" dateTime="2022-02-08" title="February 8th, 2022">
              {formatDateTime(data?.createdAt)}
            </time>
          </p>
        </div>
        {/* dropdown menu  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <MoreHorizontal className="h-3.5 w-3.5" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Trash</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        <div
          dangerouslySetInnerHTML={{
            __html: data?.content,
          }}
        />
      </p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
          onClick={() => {
            setActiveCommentId(data?._id);
            // setEnableReply((prev) => !prev);
            setEnableReply(true);
          }}
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
      </div>
      <div
        className={classNames({
          hidden: !commentReplies?.data?.length,
        })}
      >
        {commentReplies?.data?.map((reply) => {
          return (
            <CommentReplayCard
              data={reply}
              key={reply?._id}
              refetch={fetchCommentReplies}
            />
          );
        })}
      </div>
      {enableReply && activeCommentId === data?._id ? (
        <CommentReplyFormContainer comment={data} onSuccess={handleOnSuccess} />
      ) : null}
    </article>
  );
};

export default BlogCommentCard;
