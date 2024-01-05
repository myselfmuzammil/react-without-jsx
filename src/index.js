import React from "react";
import ReactDOM from "react-dom/client";

import {Search} from "@/components";
import {OnlineProvider} from "@/context/provider";

import "./index.css";

const comments = [
  {
    name: "muzammil",
    comment: "hell world",
    replies: [
      {
        name: "akshay saini",
        comment: "good",
        replies: [
          {
            name: "love babar",
            comment: "yes good",
            replies: [
              {
                name: "harry",
                comment: "wow",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "muzammil",
    comment: "hell world",
    replies: [
      {
        name: "akshay saini",
        comment: "good",
        replies: [
          {
            name: "love babar",
            comment: "yes good",
            replies: [
              {
                name: "harry",
                comment: "wow",
              },
            ],
          },
        ],
      },
    ],
  },
];

function Comment({name, comment, replies}) {
  return (
    <div className="py-1 px-5">
      <h2>name: {name}</h2>
      <h2>comment: {comment}</h2>
      {typeof replies === "object" && <CommentList comments={replies} />}
    </div>
  );
}

function CommentList({comments} = {comments: {}}) {
  return comments?.map((comment, i) => <Comment key={i} {...comment} />);
}

ReactDOM.createRoot(root).render(
  <OnlineProvider>
    <Search />
  </OnlineProvider>
);
