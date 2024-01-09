"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDataStore } from "../hooks/useDataStore";
// import { DeleteReply, DeletePost } from "../actions/getData";

const DeleteModal = ({ postId, reply }: { postId: number; reply: boolean }) => {
  const router = useRouter();
  const dataStore = useDataStore().deleteComment;

  const handleDelete = () => {
    // reply ? DeleteReply(postId) : DeletePost(postId);
    dataStore(postId);
    router.back();
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-neutral-grayishBlue bg-opacity-50">
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 w-80 bg-neutral-White p-5 rounded-lg ">
        <h1 className="text-neutral-grayishBlue font-medium">Delete comment</h1>
        <p className="my-2 text-neutral-grayishBlue text-sm">
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone.
        </p>
        <div className="flex justify-between">
          <button
            onClick={router.back}
            className="bg-neutral-grayishBlue px-7 py-2 rounded-lg text-neutral-White text-xs"
          >
            NO, CANCEL
          </button>
          <button
            onClick={handleDelete}
            className="bg-primary-softRed px-7 py-2 rounded-lg text-neutral-White text-xs"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
