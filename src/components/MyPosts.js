import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [resp, setResp] = useState(null);

  useEffect(() => {
    // Set Axios to include credentials with all requests
    axios.defaults.withCredentials = true;

    // Fetch posts and comments
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    const data = {
      cookie: document.cookie,
    };
    const postsUrl = "http://localhost:5000/userPosts";
    axios.post(postsUrl, data)
      .then((res) => {
        setPosts(res.data);
        setResp(null);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching posts:", error);
      });
  };


  return (
    <div className="user-posts">
      {/* Posts Section */}
      <div className="posts">
        <h2>Posts</h2>
        {posts.map((post) => (
          <Post
          key={post.id}
          user_id={post.user_id}
          title={post.title}
          text={post.text}
          date={post.date}
          id={post.id}
          username={post.username}
          showButtons={true}
          />
        ))}
      </div>
    </div>
  );
}

export default MyPosts;
