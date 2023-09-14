import React from 'react';
import '../style.css';

const About = () => {
  return (
    <div className="about-blog-container">
      <div className="about-blog-content">
        <h2>About the Blog</h2>
        <p>
          Welcome to the "Around the Globe" blog! Here, we explore the beauty and diversity of our world
          through travel stories, photography, and insightful articles.
        </p>
        <p>
          Our mission is to inspire wanderlust, provide travel tips, and share unique experiences from different
          corners of the globe. Join us on this journey as we discover new cultures, cuisines, and adventures.
        </p>
        <p>
          Author: Uchiha Itachi
        </p>
      </div>
      <div className="author-profile">
        <img
          src="Blog-App-main\Itachi.png"
          alt="Uchiha Itachi"
          className="author-image"
        />
        <p className="author-description">
          Uchiha Itachi is an avid traveler and storyteller. With a passion for exploring new places
          and capturing the essence of each destination, he shares his adventures and travel tips
          to inspire others to embark on their own journeys.
        </p>
      </div>
    </div>
  );
};

export default About;