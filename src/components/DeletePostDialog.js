import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import axios from "axios";

const DeletePostDialog = ({ postId }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    setOpen(false);
    const data = {
      postId: postId, 
    };
    const url = "http://localhost:5000/deleteUserPost";
    axios.post(url, data)
      .then((res) => {
        console.log("Post deleted successfuly.");
        window.location.replace("/MyPosts");
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching comments:", error);
      });
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete Post
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeletePostDialog;
