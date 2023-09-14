import React, { Component } from "react";
import axios from "axios";

class PopularPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularPosts: [],
    };
  }

  componentDidMount() {
    // Fetch the latest posts data using Axios
    axios.get("http://localhost:5000/popularPosts").then((response) => {
      this.setState({
        popularPosts: response.data,
      });
    });
  }

  render() {
    const { popularPosts } = this.state;

    return (
      <div id="popular-posts">
        <h1>Popular Posts</h1>
        <ul>
          {popularPosts.map((post) => (
            <li key={post.id}>
               <a href={`#${post.id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PopularPosts;
