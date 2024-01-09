import React from "react";

const CommentText = ({
  comment,
  replyUserName,
}: {
  comment: string;
  replyUserName?: string;
}) => {
  return (
    <div className="px-4 text-neutral-grayishBlue">
      <p>
        {replyUserName != null && (
          <span className="text-primary-moderateBlue">{`@${replyUserName} `}</span>
        )}
        {comment}
      </p>
    </div>
  );
};

export default CommentText;
