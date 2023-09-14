import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";

const LikeBtn = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [buttonBgColor, setButtonBgColor] = useState("");

  const handleThumbUpClick = (e) => {
    if (!liked) {
      const url = "http://localhost:5000/like";
      const data = {
        postId,
        cookie: document.cookie
      };

      axios
        .post(url, data, { withCredentials: true })
        .then((res) => {
          console.log("liked comment");
        })
        .catch((err) => {
          console.log("Error!");
        });
    }

    setLiked(!liked);
    setButtonBgColor(liked ? "" : "#778899");

    e.stopPropagation();
  };

  return (
    <button
      className={`thumb-up-button ${liked ? 'liked' : ''}`}
      onClick={handleThumbUpClick}
      style={{ backgroundColor: buttonBgColor }}
    >
      <ThumbUpIcon color="primary" />
    </button>
  );
};

export default LikeBtn;
