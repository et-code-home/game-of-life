import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Square(props) {
    return (
      <button className="square" onClick={props.onClick} style={{backgroundColor:props.bgColor}} >        
      </button>
    );
  }

  class Rules extends React.Component {
    render() {
        return (
            <div>
            <br/><br/><br/><br/><br/>
            <h3 className="rule-header"> Rules </h3>
            <ul className="rule-list">
                <li>
                    If a cell is <b>alive</b> and it has exactly 2 or 3 live neighbors, it <b>stays alive</b>.
                </li>
                <li>
                    If a cell is <b>alive</b> and it has less than 2 or 4+ live neighbors, it <b>dies</b>.
                </li>
                <li>
                    If a cell is <b>dead</b> and it has exactly 3 live neighbors, it <b>comes to life</b>.
                </li>
            </ul>
            </div>
        );
    }
  }

  class Board extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        size: 10,
        squares: Array(100).fill('white'),
        simulationRunning: false,
        generation: 0,
        interval: 1000,
      };
    }

    buildNextGen() {
        var newSquares = this.state.squares.slice();

        for(var i=0; i<newSquares.length; i++ ) {
            var liveNeighbors = 0;
            var curStatus = this.state.squares[i];

            console.log( this.state.squares );
            // check 8 neighbors in squares, count black (alive)
            if( this.state.squares[i-this.state.size-1] === "black") { liveNeighbors++; } // top left
            if( this.state.squares[i-this.state.size] === "black") { liveNeighbors++; }   // top
            if( this.state.squares[i-this.state.size+1] === "black") { liveNeighbors++; } // top right
            if( this.state.squares[i-1] === "black") { liveNeighbors++; } // left
            if( this.state.squares[i+1] === "black") { liveNeighbors++; } // right
            if( this.state.squares[i+this.state.size-1] === "black") { liveNeighbors++; } // bottom left
            if( this.state.squares[i+this.state.size] === "black") { liveNeighbors++; } // bottom
            if( this.state.squares[i+this.state.size+1] === "black") { liveNeighbors++; } // bottom right
            
            if( curStatus === "black" ) // is alive, will neighbors kill it?
            {
                
                if( liveNeighbors === 2 || liveNeighbors === 3 )
                {
                    newSquares[i] = 'black'; // staying alive!
                }
                else
                {
                    newSquares[i] = 'white'; // death by overcrowding or underpopulation
                }
            }
            else  // is dead, is situation right for birth?
            {
                
                if( liveNeighbors === 3 )
                {
                    newSquares[i] = 'black'; // yes
                }
                else
                {
                    newSquares[i] = 'white'; // no
                }
            }
            
        }
        // set Board's squares to newSquares
        this.setState({
            squares: newSquares,
            generation: this.state.generation + 1,
          });

        // wait [interval] seconds
        this.timeoutHandler = window.setTimeout(() => {
            this.buildNextGen();
          }, this.state.interval);
    }
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (this.state.simulationRunning) {
        return;
      }
      if( squares[i] === 'white') {
          squares[i] = 'black';
      }
      else {
          squares[i] = 'white';
      }
      this.setState({
        squares: squares,
      });
    }

    playSim = () => {
        this.setState({ simulationRunning: true });
        this.buildNextGen();
    }

    stopSim = () => {
        this.setState({ simulationRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
          }
    }

    changeGridSize = (event) => {
        this.setState({ size: event.target.value });
        const cells = event.target.value * event.target.value;
        console.log( cells );
        this.setState({ squares: Array(cells).fill('white')})
      }
      
    changeSimSpeed = (event) => {
        this.setState({ interval: event.target.value });
      }
  
    renderSquare(i) {
      return (
        <Square
          bgColor={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
       );
    }
  
    createRows( num, numRows ) {
        var numbers = [this.state.size];
        for(var i=0; i<this.state.size; i++) {
            numbers[i] = i;
        }
        const aRow = numbers.map((n) => this.renderSquare(n + num*numRows));//{this.renderSquare(n + numRows*num)} );

        return (
            <div className="board-row">
                {aRow}
            </div>
        );
    }

    createGrid( num ){
        var numbers = [this.state.size];
        for(var i=0; i<this.state.size; i++) {
            numbers[i] = i;
        }
        const allRows = numbers.map((n) => this.createRows(n, num));//{this.createRows(n, this.state.size )} );
        return allRows;
    }

    render() {
      let status;
      
      status = 'Generation: ' + this.state.generation;
       
      return (
          <div className="top">
            <h2> Conway's Game of life</h2>
                <div className="status">{status}</div>
                
                <div className="board">
                    {this.createGrid( this.state.size )}
                </div>
                
                <div className="controls">
                    Update every <input defaultValue={this.state.interval} size="8"
                        onChange={this.changeSimSpeed} /> ms
                    <br />

                    Size  of  grid   <input defaultValue={this.state.size} size="8"
                        onChange={this.changeGridSize} /> 
                    <br />

                    {this.state.simulationRunning ?
                        <button className="button"
                            onClick={this.stopSim}>■ Stop</button> :
                        <button className="button"
                            onClick={this.playSim}>▶ Play</button>
                    }
                </div>

            </div>
      );
    }
  }
  
  class Simulation extends React.Component {
    render() {
      return (
        <div className="sim">
          <div className="sim-main">
            <Board /> <Rules />
            
          </div>
          <div className="sim-about">
            <br /><br /><br />
                <h3>About this Algorithm...</h3>
            </div>
          <div className="sim-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Simulation />,
    document.getElementById('root')
  );

  // 3d life...three.js for visualizing
  // hashlife
  // color fading based on time of death
