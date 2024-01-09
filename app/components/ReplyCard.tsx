"use client";
import React, { ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import { useState } from "react";
//import { AddNewReply } from "../actions/getData";
import { useRouter } from "next/navigation";
import Button from "./Button";
//import data from "@/app/data.json";
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

  // const addReplyWithUser = AddNewReply.bind(
  //   null,
  //   authorId,
  //   postId,
  //   replyToId,
  //   isReply
  // );

  const dataSet = useDataStore((state) => state);

  const router = useRouter();

  const updateText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleSubmit = (formData: FormData) => {
    //addReplyWithUser(formData);
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
    router.push("/");
  };

  const escape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      router.push("/");
    }
  };

  return (
    <div className={`rounded-xl ${isReply ? "mt-4" : "my-2"} bg-neutral-White`}>
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
          <Button label="REPLY" />
        </form>
      </div>
    </div>
  );
};

export default ReplyCard;
