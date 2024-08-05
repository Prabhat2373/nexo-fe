// import { Badge } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import moment from "moment";
import { getRandomColor } from "@/utils/utils";

const PostListingCard = ({ data }) => {

  return (
    <div className=" flex flex-col justify-center gap-5">
      <img
        src="https://images.unsplash.com/photo-1716681864605-e3ac39e9aea4?q=80&w=3028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        // width={400}
        height={400}
        className="rounded-lg"
      />
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-purple-500 font-semibold">
            {data?.author?.name} •{" "}
            {moment(data?.createdAt).format("MM ddd YYYY")}
          </p>
        </div>
        <Link
          href={`/posts/${data?._id}`}
          className="flex justify-between hover:border-black border-b border-transparent"
        >
          <h1 className="font-semibold text-2xl ">{data?.title}</h1>
          <IconArrowUpRight />
        </Link>
        <div>
          <p className="text-gray-500">
            Extend default theme with any amount of additional colors, replace
            shadows, radius, spacing, fonts and many o
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          {/* <Badge color="blue" variant={"outline"}>
            Primary
          </Badge>
          <Badge color="orange">Orange</Badge>
          <Badge color="purple">Purple</Badge> */}
          {data?.tags?.length ? (
            <>
              {data?.tags?.map((tag, index) => {
                return (
                  <Badge key={index} color={getRandomColor()}>
                    {tag}
                  </Badge>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PostListingCard;
