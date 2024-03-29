import React from "react";
import Image from "next/image";
import { GetCurrentUser } from "@/app/lib/currentUser";

const CommentHeader = ({
  name,
  avatar,
  date,
}: {
  name: string;
  avatar: string;
  date: string;
}) => {
  const currentUser = GetCurrentUser();
  return (
    <div className="flex gap-4 items-center p-4">
      <Image src={avatar} alt="Avatar" width={30} height={30} />
      <div className="font-medium">{name}</div>
      {name == currentUser.username && (
        <div className="flex justify-center items-center rounded-sm px-[0.4rem] h-4 pb-[1px] bg-primary-moderateBlue text-neutral-White text-[0.75rem]">
          <p>you</p>
        </div>
      )}
      <div className="text-neutral-grayishBlue">{date}</div>
    </div>
  );
};

export default CommentHeader;
