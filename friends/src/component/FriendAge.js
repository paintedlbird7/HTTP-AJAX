import React from "react";

function FriendAge(props) {
  return (
    <div>
      <p className="friend-description">{props.friend.age}</p>
    </div>
  );
}

export default FriendAge;
