import React from 'react';

function Home(props) {
  // ({ match, history, location })
  function navigateToFriend(e) {
    e.preventDefault();
    props.history.push('/friend-list');
  }

  return (
    <div className="home-wrapper">
      <img
        className="home-image"
        alt=""
      />
      <button onClick={navigateToFriend} className="md-button friend-button">
        See Friends list!
      </button>
    </div>
  );
}

export default Home;
