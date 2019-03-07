import React from "react";
// STEP VI import <Link /> and route to Item when name is clicked
// Remember that the Item route is dynamic!!!
import { Link } from "react-router-dom";

function FriendsList(props) {
  if (props.items.length === 0) {
    return <h3>Loading items...</h3>;
  }

  return (
    <div className="friends-list-wrapper">
      {props.friends.map(friend => (
        <Link to={`/friend-list/${friend.id}`} key={friend.id}>
        <div className="friend-card">
          <img
            className="friend-friend-image"
            src={friend.imageUrl}
            alt={friend.name}
          />
          <p>{friend.name}</p>
          <p>${friend.age}</p>
          <p>${friend.email}</p>
        </div>
        </Link>
      ))}
    </div>
  );
}

export default FriendsList;
