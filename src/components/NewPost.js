import React from 'react';
import axios from 'axios';
import { TextField, TextareaAutosize, Button } from '@mui/material';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxWidth: '400px',
  margin: '0 auto',
};

const textareaStyle = {
  minHeight: '200px', // Adjust the height as needed
  width: '100%',
  resize: 'vertical',
};

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      resp: '',
    };
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  }

  addPost = () => {
    const url = 'http://localhost:5000/newpost';
    const data = {
      title: this.state.title,
      text: this.state.text,
      cookie: document.cookie,
    };
    
    axios.post(url, data)
      .then((res) => {
        this.setState({
          title: '',
          text: '',
          resp: 'Success, great new post added!',
        });
      })
      .catch((err) => {
        this.setState({
          resp: 'Error: you need to be logged in to add a post.',
        });
      });
  }

  render() {
    return (
      <div style={containerStyle}>
        <TextField
          label="Title"
          variant="outlined"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <TextareaAutosize
          rowsMin={4}
          placeholder="Text"
          value={this.state.text}
          onChange={this.handleTextChange}
          style={textareaStyle}
        />
        <Button variant="contained" color="primary" onClick={this.addPost}>
          Add Post
        </Button>
        <div>{this.state.resp}</div>
      </div>
    );
  }
}

export default NewPost;
