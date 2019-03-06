import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import FriendEmail from '../component/FriendEmail';

function Friend(props) {
  const friend = props.items.find(
    thing => `${thing.id}` === props.match.params.id
  );

  if (!props.friends.length || !friend) {
    return <h2>Loading friend data...</h2>;
  }

  return (
    <div className="friend-wrapper">
      <div className="friend-header">
        <div className="friend-wrapper">
          <img src={friend.imageUrl} alt={friend.name} />
        </div>
        <div className="friend-title-wrapper">
          <h2>{friend.name}</h2>
          <h4>${friend.email}</h4>
        </div>
      </div>
      <nav className="friend-sub-nav">
        <NavLink exact to={`/friend-list/${friend.id}`}>
          the story
        </NavLink>
        <NavLink to={`/friend-list/${friend.id}/email`}>email</NavLink>
      </nav>
      <Route
        exact
        path="/friend-list/:id"
        render={props => <FriendDescription {...props} friend={friend} />}
      />
      <Route
        path="/friend-list/:id/email"
        render={props => <FriendShipping {...props} friend={friend} />}
      />
    </div>
  );
}

export default Friend;
