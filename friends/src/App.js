import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './component/Home'

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import FriendsList from './component/FriendsList';
import Friend from './component/Friend'

import ReactDOM from 'react-dom'


import axios from 'axios';




class App extends Component {
  // add constructor and CDM
  constructor() {
    super();
    this.state = {
      activeFriend: null,
      friends: [],
      error: ""
    };
  }

  componentDidMount() {
    console.log("CDM now running");
    // http://localhost:5000 is the address to the server doorstep
    // /friends is the "endpoint"
    axios
      .get("http://localhost:5000/friends")
      .then(res => {
        console.log(res);
        this.setState({ friends: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });
  }

  // HTTP STEP IV - create an addFriend function for our POST request
  // Pass addFriend to <FriendForm />
  // addFriend takes in an event, and the friend object from the form for the POST
  addFriend = (e, friend) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/friends", friend)
      .then(res => {
        this.setState({
          friends: res.data
        });
        // HTTP STEP V - Clear data form in FreindForm and route to /friend-list
        this.props.history.push("/friend-list");
      })
      .catch(err => {
        console.log(err);
      });
  };

  // HTTP STEP VI - Create a deleteFriend function that takes in an event and an id
  // and makes a DELETE request to delete the friend
  deleteFriend = (e, id) => {
    e.preventDefault();
    console.log("now in deleteFriend in App");
    axios
      .delete(`http://localhost:5000/friends${id}`)
      .then(res => {
        console.log("Data is back, now set state and reroute", res.data);
        this.setState({
          friends: res.data
        });
        this.props.history.push("/friend-list");
      })
      .catch(err => {
        console.log(err);
      });
  };

  // HTTP STEP VIII - create a function called setUpdateForm
  // It will take in an event, and an friend, and set that friend
  // to state, and then route user to the form route
  setUpdateForm = (e, friend) => {
    e.preventDefault();
    this.setState({
      activeFriend: friend
    });
    this.props.history.push("/friend-form");
  };

  // HTTP STEP VII - Create an updateFriend function takes in an event and an friend
  // sets state with the response data, and clears out the activeFriend on state
  updateFriend = (e, friend) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/friends${friend.id}`, friend)
      .then(res => {
        this.setState({
          activeFriend: null,
          friends: res.data
        });
        this.props.history.push("/friend-list");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <nav>
          <h1 className="friend-header">Lambda Friend List</h1>
          <div className="nav-links">
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/friend-list">Friends</NavLink>
          </div>
        </nav>

        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/friend-list"
          render={props => (
            <FriendsList
              {...props} // this is the same as below
              //               match={props.match}
              //               history={props.history}
              //               location={props.location}
              friends={this.state.friends}
            />
          )}
        />
        <Route
          path="/friend-list/:id"
          render={props => <Friend {...props} friends={this.state.friends} />}
        />
     </div>
    );
  }
}


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

export default App;