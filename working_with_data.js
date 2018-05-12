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

let data = [
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
];

const CardList = props => {
  return (
    <div>
      {props.cards.map(card => <Card {...card} />)}
    </div>
  );
};

ReactDOM.render(<CardList cards={data} />, mountNode);
