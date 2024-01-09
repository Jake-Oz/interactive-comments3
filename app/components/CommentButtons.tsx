"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Delete from "@/public/icon-delete.svg";
import Edit from "@/public/icon-edit.svg";
import Reply from "@/public/icon-reply.svg";

const CommentButtons = ({
  username,
  currentUser,
  postId,
  reply,
}: {
  username: string;
  currentUser: string;
  postId: number;
  reply: boolean;
}) => {
  const router = useRouter();

  const handleDelete = () => {
    router.push(`/?modal=true&reply=${reply}&id=${postId}`);
  };
  const handleReply = () => {
    router.push(`/?showReply=true&reply=${reply}&id=${postId}`);
  };
  const handleEdit = () => {
    router.push(`/?showEdit=true&reply=${reply}&id=${postId}`);
  };

  return (
    <>
      <div>
        {username != currentUser ? (
          <button
            onClick={handleReply}
            className="flex items-center gap-2 text-primary-moderateBlue hover:text-primary-lightGrayishBlue"
          >
            <Image src={Reply} alt="Reply" />
            <p>Reply</p>
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 text-primary-softRed hover:text-primary-paleRed"
            >
              <Image priority src={Delete} alt="Delete" />
              <p>Delete</p>
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 text-primary-moderateBlue hover:text-primary-lightGrayishBlue"
            >
              <Image src={Edit} alt="Edit" />
              <p className="">Edit</p>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentButtons;
