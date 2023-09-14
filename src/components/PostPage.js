import React, { Component } from 'react';
import axios from 'axios';
import Comment from './Comment';
import AddComment from './AddComment';
import styled from 'styled-components';
import LikeBtn from './LikeBtn';


// Define styled components
const PostContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      text: props.text,
      date: props.date,
      postId: props.id,
      user_id: props.user_id,
      username: props.username,
      comments: [],
    };
  }

  handleThumbUpClick = (e) => {
    const url = "http://localhost:5000/like";
    const data = {
      postId: id,
      cookie: document.cookie
    };

    axios.post(url, data, {withCredentials: true})
      .then((res) => {
        console.log("liked comment");
      })
      .catch((err) => {
        console.log("Error!");
      });
      // Prevent the click event from propagating to the parent div and triggering handleClick
      e.stopPropagation();  
  };

  componentDidMount() {
    const data = {
      postId: this.state.postId,
    };
    const commentsUrl = "http://localhost:5000/postComments";
    axios.post(commentsUrl, data, { withCredentials: true }).then((res) => {
      this.setState({
        comments: res.data,
        resp: null,
      });
    });
  }

  render() {
    return (
      <PostContainer>
        <Title>{this.state.title}</Title>
        <Text>{this.state.text}</Text>
        <p className="post-date">Posted by {this.state.user_id} on {this.state.date}</p>
        <LikeBtn postId={this.state.postId}/>
        <CommentsContainer>
          <h2>Comments</h2>
          <AddComment postId={this.state.postId} />
          {this.state.comments.map((comment) => (
            <Comment
              key={comment.user_id}
              content={comment.content}
              title={comment.title}
              user_id={comment.user_id}
              date={comment.date}
              username={comment.username}
              postId={comment.post_id}
            />
          ))}
        </CommentsContainer>
      </PostContainer>
    );
  }
}

export default PostPage;
