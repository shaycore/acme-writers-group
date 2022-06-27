import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Users from './Users';
import User from './User';


class App extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      userId: ''
    };
    this.deleteAUser = this.deleteAUser.bind(this);
    this.deleteAStory = this.deleteAStory.bind(this);

  }
  async componentDidMount(){
    try {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      const response = await axios.get('/api/users');
      this.setState({ users: response.data });
      window.addEventListener('hashchange', ()=> {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      });
    }
    catch(ex){
      console.log(ex);
    }
  }
  async deleteAUser(user) {
    await axios.delete(`/api/users/${user.id}`);
    const users = this.state.users.filter(_user => _user.id !== user.id);
    this.setState({ users });
  }
  async deleteAStory(story) {
    await axios.delete(`/api/stories/${story.id}`);
    const stories = this.state.stories.filter(_story => _story.id !== story.id);
    this.setState({ stories });
  }
  render(){
    const { users, userId } = this.state;
    const { deleteAUser, deleteAStory } = this;
    return (
      <div>
        <h1>Acme Writers Group ({ users.length })</h1>
        <main>
          <Users users = { users } deleteAUser={ deleteAUser } userId={ userId }/>
          {
            userId ? <User userId={ userId } deleteAStory={ deleteAStory } /> : null
          }
        </main>
      </div>
    );
  }
}

const root = document.querySelector('#root');
render(<App />, root);


