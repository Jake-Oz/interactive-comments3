"use client";
import React, { ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { useState } from "react";
// import { AddComment } from "../actions/getData";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useDataStore } from "../hooks/useDataStore";
import { convertDateToWords } from "../lib/dateInWords";

const AddCommentCard = ({ id, username }: { id: number; username: string }) => {
  const [text, setText] = useState("");
  const router = useRouter();
  const dataSet = useDataStore();
  //const addCommentWithUser = AddComment.bind(null, id);
  const updateText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleSubmit = (formData: FormData) => {
    //addCommentWithUser(formData);
    const date = convertDateToWords(new Date());
    const content = formData.get("comment")?.toString()!;
    const newComment = {
      id: dataSet.nextId,
      content: content,
      createdAt: date,
      score: 1,
      user: dataSet.currentUser,
      replies: [],
    };
    dataSet.addComment(newComment);
    setText("");
    router.push("/");
  };

  const escape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setText("");
    }
  };

  return (
    <div className=" rounded-xl bg-neutral-White my-2">
      <div className="p-6">
        <form
          action={handleSubmit}
          className="flex justify-between items-start gap-4"
        >
          <Image
            src={`/images/avatars/image-${username}.png`}
            alt="Current User Avatar"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
          <textarea
            name="comment"
            placeholder="Add a comment..."
            className="block p-2.5 w-full min-h-[6rem] border border-primary-moderateBlue rounded-lg px-6 py-2 resize-none cursor-pointer"
            value={text}
            onChange={updateText}
            onKeyDown={escape}
          ></textarea>
          <Button label="SEND" />
        </form>
      </div>
    </div>
  );
};

export default AddCommentCard;
