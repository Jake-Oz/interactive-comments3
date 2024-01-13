"use client";
import React, { ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useDataStore } from "../hooks/useDataStore";
import { convertDateToWords } from "../lib/dateInWords";

const AddCommentCard = ({ id, username }: { id: number; username: string }) => {
  const [text, setText] = useState("");
  const router = useRouter();
  const dataSet = useDataStore();

  const updateText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleSubmit = (formData: FormData) => {
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
    <div className=" rounded-xl bg-neutral-White mt-2">
      <div className="p-4">
        <form
          action={handleSubmit}
          className="flex flex-col-reverse sm:flex-row justify-between items-start gap-4"
        >
          <div className="flex flex-row justify-between items-center w-full sm:w-auto">
            <div className="w-8 sm:w-10 sm:order-1">
              <Image
                src={`/images/avatars/image-${username}.png`}
                alt="Current User Avatar"
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="sm:hidden">
              <Button label="SEND" />
            </div>
          </div>
          <textarea
            name="comment"
            placeholder="Add a comment..."
            className="block w-full min-h-[6rem] sm:order-2 border border-neutral-lightGray rounded-lg px-6 py-2 resize-none cursor-pointer"
            value={text}
            onChange={updateText}
            onKeyDown={escape}
          ></textarea>
          <div className="hidden sm:block sm:order-3">
            <Button label="SEND" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCommentCard;
