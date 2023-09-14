import React, { Component } from "react";
import axios from "axios";

class LatestsPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestPosts: [],
    };
  }

  componentDidMount() {
    // Fetch the latest posts data using Axios
    axios.get("http://localhost:5000/latestsPosts").then((response) => {
      this.setState({
        latestPosts: response.data,
      });
    });
  }

  render() {
    const { latestPosts } = this.state;

    return (
      <div id="latest-posts">
        <h1>Latest Posts</h1>
        <ul>
          {latestPosts.map((post) => (
            <li key={post.id}>
               <a href={`#${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default LatestsPosts;
