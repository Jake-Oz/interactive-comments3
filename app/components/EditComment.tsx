"use client";
import React, { ChangeEvent, KeyboardEvent } from "react";
import { useState } from "react";
//import { UpdateComment } from "../actions/getData";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useDataStore } from "../hooks/useDataStore";

const EditComment = ({
  id,
  comment,
  reply,
}: {
  id: number;
  comment: string;
  reply: boolean;
}) => {
  const [text, setText] = useState(comment);
  const router = useRouter();
  const dataSet = useDataStore();

  const updateText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const escape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      router.push("/");
    }
  };

  const handleSubmit = (formData: FormData) => {
    const newContent = formData.get("comment")?.toString()!;
    dataSet.updateComment(newContent, id);
    router.push("/");
  };
  return (
    <div className="rounded-xl mx-4 mb-2 bg-neutral-White">
      <form
        action={handleSubmit}
        className="flex flex-col justify-between items-end gap-4"
      >
        <textarea
          name="comment"
          placeholder="Add a comment..."
          className="block p-2.5 w-full min-h-[6rem] text-neutral-grayishBlue border rounded-lg border-primary-moderateBlue px-6 py-2 resize-none cursor-pointer"
          value={text}
          onChange={updateText}
          onKeyDown={escape}
        ></textarea>
        <Button label="UPDATE" />
      </form>
    </div>
  );
};

export default EditComment;
