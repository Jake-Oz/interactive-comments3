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
        className=" 
         flex flex-col-reverse sm:flex-row items-top my-2 sm:pb-2 bg-neutral-White rounded-xl"
      >
        <div className="flex flex-row justify-between sm:order-1 px-4 sm:pl-4 sm:pr-0 pt-4 pb-4">
          <div className="">
            <UpvoteButton vote={comment.score} id={comment.id} reply={false} />
          </div>
          <div className="sm:hidden">
            <CommentButtons
              username={comment.user.username}
              currentUser={currentUser!.username}
              postId={comment.id}
              reply={false}
            />
          </div>
        </div>
        <div className="flex flex-col order-1 w-full sm:order-2 sm:pr-4 sm:pb-2">
          <div className="flex flex-row justify-between items-center">
            <div>
              <CommentHeader
                name={comment.user.username}
                avatar={comment.user.image.png}
                date={comment.createdAt}
              />
            </div>
            <div className="hidden sm:block">
              <CommentButtons
                username={comment.user.username}
                currentUser={currentUser!.username}
                postId={comment.id}
                reply={false}
              />
            </div>
          </div>
          <div className="">
            <CommentText comment={comment.content} />
          </div>
        </div>
      </div>
    );
    if (comment.replies.length > 0) {
      const replies = comment.replies.map((reply) => {
        return (
          <div>
            <div
              key={reply.id}
              className="
           flex flex-col-reverse sm:flex-row items-top ml-4 sm:ml-8 sm:pb-2 bg-neutral-White rounded-xl"
            >
              <div className="flex flex-row justify-between w-full sm:w-auto sm:order-1 px-4 sm:pl-4 sm:pr-0 pt-4 pb-4">
                <div className="">
                  <UpvoteButton vote={reply.score} id={reply.id} reply={true} />
                </div>
                <div className="sm:hidden">
                  <CommentButtons
                    username={reply.user.username}
                    currentUser={currentUser!.username}
                    postId={reply.id}
                    reply={true}
                  />
                </div>
              </div>
              <div className="flex flex-col order-1 w-full sm:order-2 sm:pr-4 sm:pb-2">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <CommentHeader
                      name={reply.user.username}
                      avatar={reply.user.image.png}
                      date={reply.createdAt}
                    />
                  </div>
                  <div className="hidden sm:block">
                    <CommentButtons
                      username={reply.user.username}
                      currentUser={currentUser!.username}
                      postId={reply.id}
                      reply={true}
                    />
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
            <div className="ml-8 mr-2">
              {searchParams.showReply &&
                parseInt(searchParams.id) == reply.id && (
                  <ReplyCard
                    username={currentUser?.username ? currentUser.username : ""}
                    postId={reply.id}
                    isReply={true}
                  />
                )}
            </div>
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
