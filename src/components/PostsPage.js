import React from 'react';
import axios from 'axios';

export default class PostsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      resp: null
    };
  }

  getAllPosts = (e) => {
    const url = "http://localhost:5000/posts"
    axios.get(url).then((res) =>
    {
      this.setState({
        data: res.data,
        resp: null
      });
    });
  }



  render() {
    const { data } = this.state;
    return (
        <div>
          <button onClick={this.getAllPosts}>Get All Posts</button><br/>         
          <div>
            {this.state.resp?this.state.resp:null}
          </div>
          <div>
          {
            this.state.data.map((item =>
            <div>
              ID: {item.id}, title: {item.title}, text: {item.content}
            </div>
            ))
          }
          </div>
        </div>
    );
  }
}