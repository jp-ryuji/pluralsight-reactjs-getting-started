const possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  let listSize = arr.length, combinationsCount = (1 << listSize)
  for (let i = 1; i < combinationsCount; i++ ) {
    let combinationSum = 0;
    for (let j = 0; j < listSize; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = props => {
  return (
    <div className="col-5">
      {_.range(props.numberOfStars).map(i =>
        <i key={i} className="fa fa-star"></i>
      )}
    </div>
  )
};

const Button = props => {
  let button;
  switch(props.answerIsCorrect) {
    case true:
      button =
        <button className="btn btn-success" onClick={props.acceptAnswer}>
          <i className="fa fa-check"></i>
        </button>;
      break;
    case false:
      button =
        <button className="btn btn-danger">
          <i className="fa fa-times"></i>
        </button>;
      break;
    default:
      button =
        <button className="btn"
                onClick={props.checkAnswer}
                disabled={props.selectedNumbers.length === 0}>
          =
        </button>;
      break;
  }

  return (
    <div className="col-2 text-center">
      {button}
      <br /><br />
      <button className="btn btn-warning btn-sm" onClick={props.redraw}
              disabled={props.redraws === 0} >
        <i className="fa fa-refresh"></i> {props.redraws}
      </button>
    </div>
  )
};

const Answer = props => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) =>
        <span key={i} onClick={() => props.unselectNumber(number)}>
          {number}
        </span>
      )}
    </div>
  )
};

const Numbers = props => {
  const numberClassName = number => {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }

    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
  }

  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) =>
          <span key={i} className={numberClassName(number)}
                onClick={() => props.selectNumber(number)}>
            {number}
          </span>
        )}
      </div>
    </div>
  );
}

// NOTE: Refactor as follows because the variable is shared exactly as is with all instances of the component.
//   And it's not related to the logic inside the component.
Numbers.list = _.range(1, 10);

const DoneFrame = props => {
  return (
    <div clasName="text-center">
      <h2>{props.doneStatus}</h2>
    </div>
  )
};

class Game extends React.Component {
  static randomNumber = () => 1 + Math.floor(Math.random() * 9);

  state = {
    // NOTE: Normally an object should be used because of the fast look up, but an array is ok for a small data structure.
    selectedNumbers: [],
    randomNumberOfStars: Game.randomNumber(),
    usedNumbers: [],
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null
  };

  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }));
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((sum, n) => sum + n, 0)
    }));
  };

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars: Game.randomNumber()
    }), this.updateDoneStatus);
  };

  redraw = () => {
    if (this.state.redraws === 0) { return; }
    this.setState(prevState => ({
      randomNumberOfStars: Game.randomNumber(),
      selectedNumbers: [],
      answerIsCorrect: null,
      redraws: prevState.redraws - 1
    }), this.updateDoneStatus);
  };

  possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
    const possibleNumbers = _.range(1, 10).filter(number =>
      usedNumbers.indexOf(number) === -1
    );

    return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
  };

  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: 'Done. Nice!' };
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'Game Over!' };
      }
    });
  }

  render() {
    const {
      selectedNumbers,
      randomNumberOfStars,
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus
    } = this.state;

    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers}
                  redraws={redraws}
                  checkAnswer={this.checkAnswer}
                  acceptAnswer={this.acceptAnswer}
                  redraw={this.redraw}
                  answerIsCorrect={answerIsCorrect} />
          <Answer selectedNumbers={selectedNumbers}
                  unselectNumber={this.unselectNumber} />
        </div>
        <br />
        {doneStatus ?
          <DoneFrame doneStatus={doneStatus} /> :
          <Numbers selectedNumbers={selectedNumbers}
                   selectNumber={this.selectNumber}
                   usedNumbers={usedNumbers} />
        }
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);


// The following css is added on https://jscomplete.com/repl/
//
// .fa-star {
//   margin: 0.5em;
//   font-size: 24px;
// }

// span {
//   display: inline-block;
//   margin: 0.5em;
//   text-align: center;
//   background-color: #ccc;
//   width: 24px;
//   border-radius: 50%;
//   cursor: pointer;
// }

// .selected {
//   background-color: #eee;
//   color: #ddd;
//   cursor: not-allowed;
// }

// .used {
//   background-color: #aaddaa;
//   color: #99bb99;
//   cursor: not-allowed;
// }
