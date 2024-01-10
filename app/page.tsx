"use client";

// import seedData from "@/app/data.json";
import CommentHeader from "./components/CommentHeader";
import CommentButtons from "./components/CommentButtons";
import CommentText from "./components/CommentText";
import ReplyCard from "./components/ReplyCard";
import AddCommentCard from "./components/AddCommentCard";
import EditComment from "./components/EditComment";
import DeleteModal from "./components/DeleteModal";
import UpvoteButton from "./components/UpvoteButton";
import CardContainer from "./components/CardContainer";
import { useDataStore } from "../app/hooks/useDataStore";

type Params = {
  modal?: string;
  showReply?: string;
  showEdit?: string;
  reply?: string;
  id: string;
};

export default function Home({ searchParams }: { searchParams: Params }) {
  const currentUser = useDataStore((state) => state.currentUser);
  const comments = useDataStore((state) => state.comments);
  const commentComponents = comments?.map((comment) => {
    const primaryComment = (
      <div
        key={comment.id}
        className="flex items-center justify-between my-2 pt-2 pb-4 px-6 bg-neutral-White rounded-xl "
      >
        <UpvoteButton vote={comment.score} id={comment.id} reply={false} />
        <div className="flex flex-col flex-1">
          <div className="flex flex-row items-center justify-between">
            <CommentHeader
              name={comment.user.username}
              avatar={comment.user.image.png}
              date={comment.createdAt}
            />
            <div>
              <CommentButtons
                username={comment.user.username}
                currentUser={currentUser!.username}
                postId={comment.id}
                reply={false}
              />
            </div>
          </div>
          <CommentText comment={comment.content} />
        </div>
      </div>
    );
    if (comment.replies.length > 0) {
      const replies = comment.replies.map((reply) => {
        return (
          <div key={reply.id} className="flex flex-col ml-8">
            <div className="flex items-center justify-between px-6 pt-2 pb-4 bg-neutral-White rounded-xl">
              <UpvoteButton
                vote={comment.score}
                id={comment.id}
                reply={false}
              />
              <div className="flex flex-col flex-1">
                <div className="flex flex-row items-center justify-between">
                  <CommentHeader
                    name={reply.user.username}
                    avatar={reply.user.image.png}
                    date={reply.createdAt}
                  />
                  <div>
                    {!searchParams.showEdit && (
                      <CommentButtons
                        username={reply.user.username}
                        currentUser={
                          currentUser?.username ? currentUser.username : ""
                        }
                        postId={reply.id}
                        reply={true}
                      />
                    )}
                  </div>
                </div>
                <div>
                  {searchParams.showEdit ? (
                    reply.user.username == currentUser?.username && (
                      <EditComment
                        id={reply.id}
                        comment={reply.content}
                        reply={true}
                      />
                    )
                  ) : (
                    <CommentText
                      comment={reply.content}
                      replyUserName={reply.replyingTo}
                    />
                  )}
                </div>
              </div>
            </div>
            <div>
              {searchParams.showReply &&
                parseInt(searchParams.id) == reply.id && (
                  <ReplyCard
                    username={currentUser?.username ? currentUser.username : ""}
                    postId={reply.id}
                    isReply={true}
                  />
                )}
            </div>
            {searchParams.modal && (
              <DeleteModal postId={reply.id} reply={true} />
            )}
          </div>
        );
      });
      return (
        <div key={comment.id} className="flex flex-col">
          {primaryComment}
          {searchParams.showReply &&
            parseInt(searchParams.id) == comment.id && (
              <ReplyCard
                username={currentUser!.username}
                postId={comment.id}
                isReply={false}
              />
            )}
          <CardContainer>{replies}</CardContainer>
        </div>
      );
    } else {
      return (
        <div key={comment.id}>
          {primaryComment}
          {searchParams.showReply &&
            parseInt(searchParams.id) == comment.id && (
              <ReplyCard
                username={currentUser?.username ? currentUser.username : ""}
                postId={comment.id}
                isReply={false}
              />
            )}
          {searchParams.modal && (
            <DeleteModal postId={comment.id} reply={true} />
          )}
        </div>
      );
    }
  });
  return (
    <div>
      {commentComponents}
      <AddCommentCard
        id={4}
        username={currentUser?.username ? currentUser.username : ""}
      />
    </div>
  );
}
