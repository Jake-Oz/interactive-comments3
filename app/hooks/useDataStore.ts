import { create } from "zustand";

export type comments = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: reply[];
};

export type reply = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
};

export type user = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export interface DataState {
  nextId: number;
  currentUser: user;
  comments: comments[];
  addComment: (comment: comments) => void;
  updateComment: (updatedComment: comments, id: number) => void;
  incrementId: () => void;
  addReply: (reply: reply, toCommentId: number) => void;
  deleteComment: (id: number) => void;
}

export const useDataStore = create<DataState>((set) => ({
  nextId: 5,
  currentUser: {
    image: {
      png: "/images/avatars/image-juliusomo.png",
      webp: "/images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "/images/avatars/image-amyrobson.png",
          webp: "/images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "/images/avatars/image-maxblagun.png",
          webp: "/images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "/images/avatars/image-ramsesmiron.png",
              webp: "/images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "/images/avatars/image-juliusomo.png",
              webp: "/images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
  addComment: (comment: comments) =>
    set((state) => {
      state.incrementId();
      return { comments: [...state.comments, comment] };
    }),
  updateComment: (updatedComment: comments, id: number) =>
    set((state) => {
      const newComments = state.comments.map((comment) => {
        if (comment.id == id) {
          return updatedComment;
        } else {
          return comment;
        }
      });
      return { comments: newComments };
    }),

  incrementId: () => set((state) => ({ nextId: state.nextId + 1 })),
  addReply: (reply: reply, toCommentId: number) =>
    set((state) => {
      const indexOfObject = state.comments.findIndex(
        (obj) => obj.id == toCommentId
      );
      let newComment: comments;
      let updateComments: comments[];
      if (indexOfObject !== -1) {
        newComment = {
          ...state.comments[indexOfObject],
          replies: [...state.comments[indexOfObject].replies, reply],
        };
        updateComments = state.comments.map((comment) => {
          if (comment.id == toCommentId) {
            return newComment;
          } else {
            return comment;
          }
        });
        state.incrementId();
      } else {
        return { comments: state.comments };
      }
      return {
        comments: updateComments,
      };
    }),
  deleteComment: (id: number) =>
    set((state) => {
      const updatedReplies = state.comments.map((comment) => {
        if (comment.replies.length > 0) {
          const filteredReplies = comment.replies.filter((reply) => {
            return reply.id !== id;
          });
          return { ...comment, replies: filteredReplies };
        } else {
          return comment;
        }
      });
      const updatedComments = updatedReplies.filter((comment) => {
        return comment.id !== id;
      });
      return { comments: updatedComments };
    }),
}));
