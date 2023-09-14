import React from "react";
import Post from "./Post";
import axios from "axios";

class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      resp: null,
    };
  }

  componentDidMount() {
    const url = "http://localhost:5000/posts";
    axios.get(url).then((res) => {
      this.setState({
        posts: res.data,
        resp: null
      }); 
    });
  }

  render() {
    return (
      <div className="posts">
        {this.state.posts.map((post) => (
          <Post
            key={post.id}
            user_id={post.user_id}
            title={post.title}
            text={post.text}
            date={post.date}
            id={post.id}
            username={post.user_name}
          />
        ))}
      </div>
    );
  }
}

export default PostsList;
