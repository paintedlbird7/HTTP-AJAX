import React from 'react';
// HTTP STEP II - Build a form to gather the data we need to make a POST request

// HTTP STEP IX - If we want to update an item, we need to pass "activeFriend" down
// to this component, and set it as this.state.item

class FriendForm extends React.Component {
  state = {
    friend: this.props.activeFriend || {
      name: '',
      age: '',
      imageUrl: '',
      email: ''
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.activeFriend &&
      prevProps.activeFriend !== this.props.activeFriend
    ) {
      this.setState({
        friend: this.props.activeFriend
      });
    }
  }

  changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'price') {
      value = parseInt(value, 10);
    }
    // We have a nested object on state - Here are the steps to update
    // a single property on that nested object

    // Inside setState, we want to update "item" with a new object
    // Spread in the properties from the old "item" object - ...this.state.item
    // update the one field we are trying to update

    // this.setState({
    //   item: {
    //     ...this.state.item,
    //     [ev.target.name]: ev.target.value
    //   }
    // });

    this.setState(prevState => ({
        friend: {
        ...prevState.friend,
        [ev.target.name]: value
      }
    }));
  };

  handleSubmit = e => {
    if (this.props.activeFriend) {
      this.props.updateFriend(e, this.state.friend);
    } else {
      this.props.addFriend(e, this.state.friend);
    }
    this.setState({
        friend: {
        name: '',
        price: '',
        imageUrl: '',
        description: '',
        shipping: ''
      }
    });
  };

  render() {
    return (
      <div>
        <h2>{`${this.props.activeFriend ? 'Update' : 'Add New'} Friend`}</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.changeHandler}
            placeholder="name"
            value={this.state.friend.name}
          />
          <div className="baseline" />

          <input
            type="string"
            name="email"
            onChange={this.changeHandler}
            placeholder="Email"
            value={this.state.friend.email}
          />
          <div className="baseline" />

          <input
            type="string"
            name="imageUrl"
            onChange={this.changeHandler}
            placeholder="Image"
            value={this.state.friend.imageUrl}
          />
          <div className="baseline" />

          <input
            type="string"
            name="age"
            onChange={this.changeHandler}
            placeholder="age"
            value={this.state.friend.age}
          />
          <div className="baseline" />

          <input
            type="string"
            name="shipping"
            onChange={this.changeHandler}
            placeholder="Shipping"
            value={this.state.friend.shipping}
          />
          <div className="baseline" />

          <button className="md-button form-button">{`${
            this.props.activeFriend ? 'Update' : 'Add New'
          } Friend`}</button>
        </form>
      </div>
    );
  }
}

export default FriendForm;
