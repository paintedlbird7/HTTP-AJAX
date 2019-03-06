import React from "react";
import { Link } from "react-router-dom";

function FriendsList(props) {
  function routeToFriend(ev, friend) {
    ev.preventDefault();
    props.history.push(`/friend-list/${friend.id}`);
  }
  return (
    <div className="friends-list-wrapper">
      {props.friends.map(friend => (
        <div
          onClick={ev => routeToFriend(ev, friend)}
          className="friend-card"
          key={friend.id}
        >
          <img
            className="friend-friend-image"
            src={friend.imageUrl}
            alt={friend.name}
          />
          <p>{friend.name}</p>
          <p>${friend.email}</p>
        </div>
      ))}
    </div>
  );
}

export default FriendsList;
