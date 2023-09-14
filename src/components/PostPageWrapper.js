import React from 'react';
import { useLocation } from 'react-router-dom';
import PostPage from './PostPage'; // Update the import path to match your project structure

function PostPageWrapper() {
  const location = useLocation();
  const { title, text, date, id } = location.state;

  return (
    <PostPage title={title} text={text} date={date} id={id} />
  );
}

export default PostPageWrapper;
