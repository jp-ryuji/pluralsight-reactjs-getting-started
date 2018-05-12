const Card = props => {
  return (
    <div style={{ margin: '1em' }}>
      <img width="75" src={props.avatar_url} />
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = props => {
  return (
    <div>
      {props.cards.map(card => <Card {...card} />)}
    </div>
  );
};

class Form extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Event: Form Submit', this.userNameInput.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          ref={(input) => this.userNameInput = input}
          placeholder="Github username" required />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: [
      {
        name: 'Lugi',
        avatar_url: 'https://avatars3.githubusercontent.com/u/1908717?v=4',
        company: 'Foo Company'
      },
      {
        name: 'Someone',
        avatar_url: 'https://avatars3.githubusercontent.com/u/1289409?v=4',
        company: 'Bar Company'
      }
    ]
  };

  render() {
    return (
      <div>
        <Form />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
