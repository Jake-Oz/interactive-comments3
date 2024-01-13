"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDataStore } from "../hooks/useDataStore";

const DeleteModal = ({ postId, reply }: { postId: number; reply: boolean }) => {
  const router = useRouter();
  const dataStore = useDataStore();

  const handleDelete = () => {
    dataStore.deleteComment(postId);
    router.back();
  };

  return (
    <div className="absolute top-0 left-0 h-screen w-screen backdrop-brightness-50 bg-neutral-grayishBlue/30">
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 max-w-[22rem] bg-neutral-White p-7 rounded-lg ">
        <h1 className="text-neutral-grayishBlue font-medium text-lg">
          Delete comment
        </h1>
        <p className="my-2 text-neutral-grayishBlue">
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone.
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={router.back}
            className="bg-neutral-grayishBlue px-6 py-3 rounded-lg text-neutral-White"
          >
            NO, CANCEL
          </button>
          <button
            onClick={handleDelete}
            className="bg-primary-softRed px-6 py-3 rounded-lg text-neutral-White"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
