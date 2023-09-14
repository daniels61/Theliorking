import '../style.css';
import React from 'react';
import LatestsPosts from './LatestsPost';
import PopularPosts from './PopularPosts';
import PostsList from './PostsList';

class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <header>
                    <h1>Welcome to Around the Globe Blog!</h1>
                </header>
                <div className="main-content">
                    <div className="left-section">
                        <div className="posts">
                            <PostsList />
                        </div>
                    </div>
                </div>
                <div className="down-section">
                    <LatestsPosts latestText="Latest post text goes here" />
                    <PopularPosts popularText="Popular post text goes here" />
                </div>
            </div>
        );
    }
}

export default Home;