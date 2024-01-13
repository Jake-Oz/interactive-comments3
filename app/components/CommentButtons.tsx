"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { PiPencilSimpleFill } from "react-icons/pi";
import { FaReply } from "react-icons/fa";

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
    router.push(`/?showReply=true&reply=${reply}&id=${postId}`, {
      scroll: false,
    });
  };
  const handleEdit = () => {
    router.push(`/?showEdit=true&reply=${reply}&id=${postId}`, {
      scroll: false,
    });
  };

  return (
    <>
      <div>
        {username != currentUser ? (
          <button
            onClick={handleReply}
            className="flex items-center gap-2 text-primary-moderateBlue hover:text-primary-lightGrayishBlue"
          >
            <FaReply />
            <p>Reply</p>
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 text-primary-softRed hover:text-primary-paleRed"
            >
              <MdDelete />
              <p>Delete</p>
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 text-primary-moderateBlue hover:text-primary-lightGrayishBlue"
            >
              <PiPencilSimpleFill />
              <p className="">Edit</p>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentButtons;
