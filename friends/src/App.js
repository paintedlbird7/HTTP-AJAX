import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// Import Components here - (Usually these will be for Routes)
import Home from './component/Home'
import FriendsList from './component/FriendsList';
import Friend from './component/Friend'

import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
// STEP I Import and wrap App in <Router />
// STEP II import <Route /> - Build component for your route
// STEP IV import <Link /> - use Links to navigate inside our app
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  withRouter
} from 'react-router-dom';

// HTTP STEP III - Build a route for our Form
import FriendForm from '../src/component/'
// HTTP STEP I - remove data import, use axios to GET data from local server

// import './styles.css';


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
              {/* STEP IX - Use NavLink to add styling attributes to our nav links */}
        <nav>
          <h1 className="friend-header">Lambda Friend List</h1>
          <div className="nav-links">
          <NavLink to="/friend-form">{`${
              this.state.activeFriend ? 'Update' : 'Add'
            } Friend`}</NavLink>
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/friend-list">Friends</NavLink>
          </div>
        </nav>


        {/* STEP III - Add Routes for our App */}
        <Route exact path="/" component={Home} />
        
        {/* STEP VII - pass props to component being rendered with <Route /> */}
        {/* Do not do inline rendering with the component prop - use the render prop! */}
        <Route 
        path="/friend-list"
          exact
          render={
            props => <FriendList {...props} friends={this.state.friends} />      
             // same as
            //   <ItemList
            //     history={props.history}
            //     items={this.state.items}
            //     location={props.location}
            //     match={props.match}
            //   />
          }
   />

{/* STEP V - Use dynamic params to route to Item */}
        {/* the ":" signifies that id is a dynamic parameter - is a banana name */
        <Route 
        path="/friend-list/:id"
          render={props => (
            <Friend
              {...props}
              deleteFriend={this.deleteFriend}
              friends={this.state.friends}
              setUpdateForm={this.setUpdateForm}
              />
              )}
            />

        <Route 
          path="/friend-form"
          render={props => (
            <FriendForm
              {...props}
              activeFriend={this.state.activeFriend}
              addFriend={this.addFriend}
              updateFriend={this.updateFriend}
            />
          )}
        />
      </div>
    );
  }
}


{/* Use withRouter (HOC) to create a NEW component, pass in App, then render */} */}
{/* // the NEW component in the ReactDOM.render function */}

const AppWithRouter = withRouter(App);
{/* // export default withRouter(Component); */}

ReactDOM.render(
  <Router>
    <AppwithRouter />
  </Router>,
  rootElement
);
