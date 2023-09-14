import React from "react";
import { useNavigate } from "react-router-dom";
import DeletePostDialog from "./DeletePostDialog";
import EditPostDialog from "./EditPostDialog";
import LikeBtn from "./LikeBtn";

const Post = ({ user_id, title, text, date, id, username, showButtons, showFullPost }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!showButtons) {
      navigate(`/post/${id}`, { state: { user_id, title, text, date, id, username } });
    }
  };

  return (
    <div className={`post ${showButtons ? "disabled" : ""}`} onClick={handleClick}>
      <a id={id}></a>
      <h2>{title}</h2>
      {showFullPost ? <p>{text}</p> : <p>{text.substring(0, 500)}...</p>}
      <p className="post-date">Posted by {username} on {date}</p>
      {showButtons && (
        <div className="button-container">
          <DeletePostDialog postId={id} />
          <EditPostDialog postId={id} postTitle={title} postText={text} />
        </div>
      )}
      {!showButtons && (
        <div>
          <LikeBtn postId={id}/>
        </div>
      )}
      
    </div>
  );
};

export default Post;
