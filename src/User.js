import React, { Component } from 'react';
import axios from 'axios';

class User extends Component{
  constructor(){
    super();
    this.state = {
      user: {},
      stories: [] 
    };
    this.deleteAStory = this.deleteAStory.bind(this);
    this.createAStory = this.createAStory.bind(this);

  }
  async componentDidMount(){
    let response = await axios.get(`/api/users/${this.props.userId}`);
    this.setState({ user: response.data });
    response = await axios.get(`/api/users/${this.props.userId}/stories`);
    this.setState({ stories: response.data });

  }
  async componentDidUpdate(prevProps){
    if(prevProps.userId !== this.props.userId){
      let response = await axios.get(`/api/users/${this.props.userId}`);
      this.setState({ user: response.data });
      response = await axios.get(`/api/users/${this.props.userId}/stories`);
      this.setState({ stories: response.data });
      
    }
  }
  async deleteAStory(story) {
    await axios.delete(`/api/stories/${story.id}`);
    const stories = this.state.stories.filter(_story => _story.id !== story.id);
    this.setState({ stories });
  }
  async createAStory(user) {
    const story = await axios.post(`/api/users/${user.id}/stories`);
    const stories = [...this.state.stories, story];
    this.setState({ stories });
  }
  render(){
    const { user, stories } = this.state;
    const { deleteAStory, createAStory } = this;

    return (
      <div>
        Details for { user.name }
        <p>
          { user.bio }
          <button onClick={ ()=> createAStory(user)}>Create New Story</button>
        </p>
        <ul>
          {
            stories.map( story => {
              return (
                <li key={ story.id }>
                  { story.title }
                  <br />
                  <button onClick={ ()=> deleteAStory(story)}>Delete Story</button>
                  <button onClick={ ()=> deleteAStory(story)}>
                    { story.favorite ? "Remove from Favorites":"Add to Favorites" }
                  </button>
                  <p>
                  { story.body }
                  </p>
                </li>

              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default User;
