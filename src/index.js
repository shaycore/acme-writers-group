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
    this.createAUser = this.createAUser.bind(this);
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
    const userId = '';
    this.setState({ userId });
  }
  async createAUser(){
    const user = await axios.post(`/api/users`);
    console.log(user);
    const users = [...this.state.users, user];
    this.setState({ users });
  }
  render(){
    const { users, userId } = this.state;
    const { deleteAUser, createAUser } = this;
    return (
      <div>
        <h1>Acme Writers Group ({ users.length })</h1>
        <main>
          <Users users = { users } deleteAUser={ deleteAUser } createAUser={ createAUser } userId={ userId }/>
          {
            userId ? <User userId={ userId } /> : null
          }
        </main>
      </div>
    );
  }
}

const root = document.querySelector('#root');
render(<App />, root);


