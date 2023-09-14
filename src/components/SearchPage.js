import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import { styled } from 'styled-components';

// Define styled components
const PostContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

class SearchPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchTerm: props.searchTerm,
        posts: [],
        resp: "",
      };
    }

    componentDidMount() {
        const data = {
            searchTerm: this.state.searchTerm,
        };
        const Url = "http://localhost:5000/searchPosts";
        axios.post(Url, data, { withCredentials: true }).then((res) => {
          if (res.data.status === "error") { 
            console.log("No posts found");
          } else {
            this.setState({
                posts: res.data,
                resp: null,
              });
          }
        });
      }

    render() {
        return (
            <PostContainer>
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
            </PostContainer>
        );
    }
}

export default SearchPage;
    