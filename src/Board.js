import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';
class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }


  createBoard() {
    let board = [];

    for(let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for(let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);
    }

    return board
  }


  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x); //inicial
    flipCell(y, x - 1); //direita
    flipCell(y, x + 1); //esquerda
    flipCell(y - 1, x); //cima
    flipCell(y + 1, x); //baixo


    let hasWon = board.every(row => row.every(cell => !cell)) // todas as celulas devem estar desativadas

    this.setState({ board: board, hasWon: hasWon});
  }


  render() {
    if(this.state.hasWon) {
      return <h1>You won</h1>;
    }
    
    let tableBoard = [];
    for(let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for(let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`
        row.push(<Cell key={coord} isLit= {this.state.board[y][x]}
        // O ideal seria criar no construtor para nao criar uma 
        // nova funcao toda vez que recarregar, por causa da
        // performance, mas vai ficar assim mesmo.
        flipCellsAroundMe={() => this.flipCellsAround(coord)}/>)
      }
      tableBoard.push(<tr key={y}>{row}</tr>)
    }
    return (
      <div>
        <div>
          <h1>Welcome to Lights Out</h1>
        </div>

        <table className="Board">
          <tbody>
            <tr>
              {tableBoard}
            </tr>
          </tbody>
        </table>

        <button className="ReloadButton" onClick={() => window.location.reload(true)}>
          Reload
        </button>
      </div>
    );
  }
}


export default Board;
