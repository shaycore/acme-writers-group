import React from 'react';


const Users = ({ users, userId, deleteAUser, createAUser })=> {
  return (
    <ul>
      <li className={ !userId ? 'selected': ''}>
        <a href='#'>Users</a>
        <button onClick={ ()=> createAUser()}>Create New</button>
      </li>
      {
        users.map( user => {
          return (
            <li className={ user.id === userId*1 ? 'selected': ''} key={ user.id }>
              <a href={`#${user.id}`}>
                { user.name }
              </a>
              <button onClick={ ()=> deleteAUser(user)}>x</button>
            </li>
          );
        })
      }
    </ul>
  );
}

export default Users;


