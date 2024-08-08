import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import React from "react";

const RestaurantListCard = ({ data }) => {
  return (
    <div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>NN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <Link href={`/restaurants/${data?._id}`}>
            <p className="text-sm font-medium leading-none">{data?.name}</p>
          </Link>
          <p className="text-sm text-muted-foreground">{data?.email}</p>
        </div>
        <div className="ml-auto font-medium">+$1,999.00</div>
      </div>
    </div>
  );
};

export default RestaurantListCard;
