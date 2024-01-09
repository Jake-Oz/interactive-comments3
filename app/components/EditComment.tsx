"use client";
import React, { ChangeEvent, KeyboardEvent } from "react";
import { useState } from "react";
//import { UpdateComment } from "../actions/getData";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useDataStore } from "../hooks/useDataStore";
import { comments } from "../hooks/useDataStore";

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
  //const updateCommentWithUser = UpdateComment.bind(null, id, reply);
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
    // updateCommentWithUser(formData);
    const newContent = formData.get("comment")?.toString()!;
    const latestComments = dataSet.comments;
    const commentToUpdate = latestComments.filter((comment) => {
      if (comment.id == id) {
        return true;
      } else if (comment.replies.length > 0) {
        // see if id matches reply id and if so, return true
        const replyId = comment.replies.filter((reply) => {
          return reply.id == id;
        });
        if (replyId.length > 0) {
          return true;
        }
      } else {
        return false;
      }
    });
    var updatedComment: comments;
    // check if the comment is from a root comment
    if (commentToUpdate[0].id === id) {
      updatedComment = { ...commentToUpdate[0], content: newContent };
    } else {
      // must be a reply so update reply and add to comment
      const newReply = commentToUpdate[0].replies.filter(
        (reply) => reply.id == id
      );
      const updatedReplies = commentToUpdate[0].replies.map((reply) => {
        if (reply.id == id) {
          return { ...newReply[0], content: newContent };
        } else {
          return reply;
        }
      });
      updatedComment = {
        ...commentToUpdate[0],
        replies: updatedReplies,
      };
    }

    dataSet.updateComment(updatedComment, commentToUpdate[0].id);

    router.push("/");
  };
  return (
    <div className="w-full rounded-xl mx-4 mb-2 bg-neutral-White">
      <form
        action={handleSubmit}
        className="flex justify-between items-start gap-4"
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
