"use client";

import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const UpvoteButton = ({
  vote,
  id,
  reply,
}: {
  vote: number;
  id: number;
  reply: boolean;
}) => {
  const [localVote, setLocalVote] = useState(vote);

  const handleIncrement = () => {
    // await IncrementVote(id, reply);
    setLocalVote(localVote + 1);
  };

  const handleDecrement = () => {
    if (localVote > 0) {
      //await DecrementVote(id, reply);
      setLocalVote(localVote - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2 py-1 text-center bg-neutral-veryLightGray px-[0.75rem] rounded-lg">
      <button
        onClick={handleIncrement}
        className=" text-primary-lightGrayishBlue hover:text-primary-moderateBlue py-2"
      >
        <FaPlus />
      </button>
      <div className="text-primary-moderateBlue leading-2">{localVote}</div>
      <button
        onClick={handleDecrement}
        className=" text-primary-lightGrayishBlue hover:text-primary-moderateBlue pb-2"
      >
        <FaMinus />
      </button>
    </div>
  );
};

export default UpvoteButton;
