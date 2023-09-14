import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

const AddComment = ({ postId }) => {
  const [open, setOpen] = React.useState(false);
  const [titleValue, setTitleValue] = React.useState('');
  const [textValue, setTextValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    const data = {
      cookie: document.cookie,
      postId: postId, 
      commentTitle: titleValue,
      commentText: textValue,
    };
    const url = "http://localhost:5000/addComment";
    axios.post(url, data)
      .then((res) => {
        console.log("Comment added successfuly.");
        window.location.replace(`/post/${postId}`);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching comments:", error);
      });
  };

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Comment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Comment</DialogTitle>
        <DialogContent>
          <InputLabel htmlFor="title">Title</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            type="text"
            fullWidth
            variant="standard"
            value={titleValue}
            onChange={handleTitleChange}
          />
          <InputLabel htmlFor="content">Content</InputLabel>
          <TextField
            autoFocus
            multiline
            margin="dense"
            id="content"
            type="text"
            fullWidth
            variant="standard"
            minRows={6}
            value={textValue}
            onChange={handleTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Comment</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddComment;
