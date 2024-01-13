"use client";
import React, { ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useDataStore } from "../hooks/useDataStore";
import { convertDateToWords } from "../lib/dateInWords";

const ReplyCard = ({
  username,
  postId,
  isReply,
}: {
  username: string;
  postId: number;
  isReply: boolean;
}) => {
  const [text, setText] = useState("");

  const dataSet = useDataStore((state) => state);

  const router = useRouter();

  const updateText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleSubmit = (formData: FormData) => {
    const replyingTo = dataSet.comments.filter((comment) => {
      if (comment.id == postId) {
        return true;
      } else if (comment.replies.length > 0) {
        // see if id matches reply id and if so, return true
        const replyId = comment.replies.filter((reply) => {
          return reply.id == postId;
        });
        if (replyId.length > 0) {
          return true;
        }
      } else {
        return false;
      }
    });

    const date = convertDateToWords(new Date());
    var replyingToName: string;
    if (isReply) {
      replyingToName = replyingTo[0].replies.filter(
        (reply) => reply.id == postId
      )[0].user.username;
    } else {
      replyingToName = replyingTo[0].user.username;
    }
    const user = replyingTo[0].user;
    const content = formData.get("comment")!.toString();
    const newReply = {
      id: dataSet.nextId,
      content: content,
      createdAt: date,
      score: 1,
      replyingTo: replyingToName,
      user: dataSet.currentUser,
    };
    dataSet.addReply(newReply, replyingTo[0].id);

    setText("");
    router.push("/", { scroll: false });
  };

  const escape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      router.push("/");
    }
    if (event.key === "Enter") {
      // TODO Enter form data
    }
  };

  return (
    <div className={`rounded-xl bg-neutral-White`}>
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
              <Button label="REPLY" />
            </div>
          </div>
          <textarea
            name="comment"
            placeholder="Add a comment..."
            className="block min-h-[6rem] w-full sm:order-2 border border-neutral-lightGray caret-primary-moderateBlue focus:border-primary-moderateBlue rounded-lg px-6 py-2 resize-none outline-none cursor-pointer"
            value={text}
            onChange={updateText}
            onKeyDown={escape}
          ></textarea>
          <div className="hidden sm:block sm:order-3">
            <Button label="REPLY" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyCard;
