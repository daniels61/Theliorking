import React from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import NewPost from './components/NewPost'
import PostPageWrapper from './components/PostPageWrapper';
import Login from './components/Login'
import SignOut from './components/SignOut';
import './style.css';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './components/SignUp';
import MyPosts from './components/MyPosts';
import SearchPageWrapper from './components/SearchPageWrapper';
import About from './components/About';

function App() {
  return (
    <div>
      <Navigation />
      <div className='app-body'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/post/:id" element={<PostPageWrapper />} />
          <Route path="/search/:searchTerm" element={<SearchPageWrapper />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/MyPosts" element={<MyPosts />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;