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
    <div className="flex sm:flex-col sm:gap-2 gap-4 py-1 items-center justify-center bg-neutral-veryLightGray px-[0.75rem] rounded-lg">
      <button
        onClick={handleIncrement}
        className="text-primary-lightGrayishBlue hover:text-primary-moderateBlue text-xs sm:mt-2"
      >
        <FaPlus />
      </button>
      <div className="text-primary-moderateBlue font-medium text-sm pt-1">
        {localVote}
      </div>
      <button
        onClick={handleDecrement}
        className=" text-primary-lightGrayishBlue hover:text-primary-moderateBlue text-xs sm:mb-2"
      >
        <FaMinus />
      </button>
    </div>
  );
};

export default UpvoteButton;
