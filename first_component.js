class Button extends React.Component {
  state = { counter: 0 };

  handleClick = () => {
    // this === component instance

    // setState is asynchronous, just +1 could bring a race condition.
    this.setState((prevState) => {
      return {
        counter: prevState.counter + 1
      };
    })
  };

  render() {
    return(
      <button onClick={this.handleClick}>
        {this.state.counter}
      </button>
    );
  }
}

ReactDOM.render(<Button />, mountNode);
