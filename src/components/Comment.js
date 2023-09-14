import React from "react";

const Comment = ({ content, user_id, title, postId, date, username }) => {

  return (
    <div className="comment">
      <h3>{title}</h3>
      <p>{content}</p>
      <p className="post-date">comment by {username} on {date}</p>
    </div>
  );
};

export default Comment;
