import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [["", "", ""], ["", "", ""], ["", "", ""]],
      didWin: false,
      didTie: false,
      numOfGridsFilled: 0,
      nextChar: "O",
      numXWins: 0,
      numOWins: 0
    };
  }

  didWin = (curPlayer) => {
    // Check if curPlayer won.

    // check each row.
    for (let i = 0; i < 3; ++i) {
      let rowWon = true;
      for (let j = 0; j < 3; ++j) {
        if (this.state.grid[i][j] !== curPlayer) {
          rowWon = false;
        }
      }
      if (rowWon) {
        return true;
      }
    }

    // check each column.
    for (let i = 0; i < 3; ++i) {
      let columnWon = true;
      let j = 0; 
      for (; j < 3; ++j) {
        if (this.state.grid[j][i] !== curPlayer) {
          columnWon = false;
        }
      }
      if (columnWon) {
        return true;
      }
    }

    let grid = this.state.grid;
    if (grid[0][0] === curPlayer && grid[1][1] === curPlayer && grid[2][2] === curPlayer) {
      return true;
    }
    if (grid[0][2] === curPlayer && grid[1][1] === curPlayer && grid[2][0] === curPlayer) {
      return true;
    }
  }

  handleOnclickGrid = (i, j) => {
    let numOfGridsFilled = this.state.numOfGridsFilled;
    numOfGridsFilled += 1;
    this.setState({numOfGridsFilled});

    if (this.state.didWin || this.state.didTie) {
      this.setState({didWin : false, didTie: false, numOfGridsFilled: 0, nextChar : "O"});
      let grid = [["", "", ""], ["", "", ""], ["", "", ""]];
      this.setState({grid});
      return;
    }

    let grid = this.state.grid;
    grid[i][j] = this.state.nextChar;
    let didWin = this.didWin(this.state.nextChar);
    this.setState({didWin});

    if (didWin) {
      if (this.state.nextChar === "X") {
        let numWins = this.state.numXWins;
        numWins += 1;
        this.setState({numXWins : numWins});
      } else {
        let numWins = this.state.numOWins;
        numWins += 1;
        this.setState({numOWins : numWins});
      }
    }

    this.setState({grid});
    if (this.state.nextChar === "X") {
      this.setState({nextChar : "O"});
    } else {
      this.setState({nextChar : "X"});
    }

    if (numOfGridsFilled === 9) {
      this.setState({didTie : true});
      return;
    }
  }

  render() {
    const gridRows = [];
    let value = 1;
    for (let i = 0; i < 3; ++i) {
      for (let j = 0; j < 3; ++j) {
        gridRows.push(<div className="box" key={value} onClick={() => this.handleOnclickGrid(i, j)}>{this.state.grid[i][j]}</div>);
        ++value;
      }
    }

    let winTieDiv = <div></div>;
    if (this.state.didWin) {
      winTieDiv = <div className="alignDiv">{this.state.nextChar === "O" ? "X" : "O"} Won.</div>;
    } else if (this.state.didTie) {
      winTieDiv = <div className="alignDiv">It was a tie!</div>;
    }

    let winCounter = <div className="alignDiv">Num X Wins: {this.state.numXWins}, Num O Wins: {this.state.numOWins}</div>;
    
    return (
      <div>
        <div className="game-board">
          {gridRows}
        </div>
        {winCounter}
        {winTieDiv}
      </div>
    );
  }
}

export default App;
