import React from 'react';

function FriendEmail(props) {
  return (
    <div>
      <p className="friend-description">{props.friend.email}</p>
    </div>
  );
}

export default FriendEmail;
