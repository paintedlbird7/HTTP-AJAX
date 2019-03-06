import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
    // http://localhost:3333 is the address to the server doorstep
    // /items is the "endpoint"
    axios
      .get("http://localhost:3333/items")
      .then(res => {
        console.log(res);
        this.setState({ items: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });
  }

  // HTTP STEP IV - create an addItem function for our POST request
  // Pass addItem to <ItemForm />
  // addItem takes in an event, and the item object from the form for the POST
  addFriend = (e, friend) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/friends", friend)
      .then(res => {
        this.setState({
          friends: res.data
        });
        // HTTP STEP V - Clear data form in ItemForm and route to /item-list
        this.props.history.push("/friend-list");
      })
      .catch(err => {
        console.log(err);
      });
  };

  // HTTP STEP VI - Create a deleteItem function that takes in an event and an id
  // and makes a DELETE request to delete the item
  deleteFriend = (e, id) => {
    e.preventDefault();
    console.log("now in deleteItem in App");
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
  // It will take in an event, and an item, and set that item
  // to state, and then route user to the form route
  setUpdateForm = (e, friend) => {
    e.preventDefault();
    this.setState({
      activeItem: friend
    });
    this.props.history.push("/friend-form");
  };

  // HTTP STEP VII - Create an updateItem function takes in an event and an item
  // sets state with the response data, and clears out the activeItem on state
  updateFriend = (e, item) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/friends${friend.id}`, friend)
      .then(res => {
        this.setState({
          activeItem: null,
          items: res.data
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
          <h1 className="store-header">Lambda Friend List</h1>
          <div className="nav-links">
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/friend-list">Shop</NavLink>
          </div>
        </nav>

        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/friend-list"
          render={props => (
            <FriendList
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

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
