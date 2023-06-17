import React, {useEffect, useState} from 'react';
import Square from './square.js';

export default function Board () {
    const [size, setSize] = useState(10);
    const [squares, setSquares] = useState(Array(100).fill('white'));
    const [simulationRunning, setSimulationRunning] = useState(false);
    const [generation, setGeneration] = useState(0);
    const [interval, setInterval] = useState(1000);
    const [timeoutHandler, setTimeoutHandler] = useState(null);
        
    const buildNextGen = () => {
        console.log(generation)
        var newSquares = squares.slice();

        for(var i=0; i<squares.length; i++ ) {
            var liveNeighbors = 0;
            var curStatus = squares[i];

            // check 8 neighbors in squares, count black (alive)
            if(squares[i-size-1] === "black") { liveNeighbors++; } // top left
            if(squares[i-size] === "black") { liveNeighbors++; }   // top
            if(squares[i-size+1] === "black") { liveNeighbors++; } // top right
            if(squares[i-1] === "black") { liveNeighbors++; } // left
            if(squares[i+1] === "black") { liveNeighbors++; } // right
            if(squares[i+size-1] === "black") { liveNeighbors++; } // bottom left
            if(squares[i+size] === "black") { liveNeighbors++; } // bottom
            if(squares[i+size+1] === "black") { liveNeighbors++; } // bottom right
            
            if( curStatus === "black" ) { // is alive, will neighbors kill it?
                if( liveNeighbors === 2 || liveNeighbors === 3 ) {
                    newSquares[i] = 'black'; // staying alive!
                }
                else {
                    newSquares[i] = 'white'; // death by overcrowding or underpopulation
                }
            }
            else {  // is dead, is situation right for birth?
                if( liveNeighbors === 3 ) {
                    newSquares[i] = 'black'; // yes
                }
                else {  
                    newSquares[i] = 'white'; // no
                }
            }
        }
        
        // set Board's squares to newSquares
        console.log(newSquares)
        setSquares(newSquares);
        setGeneration(generation + 1);
    }

    useEffect(() => {
        window.setTimeout(() => {
            if(simulationRunning) buildNextGen();
        }, interval);
    }, [squares, generation]);

  
    const handleClick = (i) => {
      const squaresCopy = squares.slice();
      if (simulationRunning) {
        return;
      }
      if( squaresCopy[i] === 'white') {
        squaresCopy[i] = 'black';
      }
      else {
        squaresCopy[i] = 'white';
      }
      setSquares(squaresCopy);
    }

    const playSim = () => {
        setSimulationRunning(true);
        buildNextGen();
    }

    const stopSim = () => {
        setSimulationRunning(false);
        if (timeoutHandler) {
            window.clearTimeout(timeoutHandler);
            setTimeoutHandler(null);
        }
    }

    const changeGridSize = (event) => {
        const length = event.target.value;
        setSize(length);
        const cells = length * length;
        setSquares(Array(cells).fill('white'));
      }
      
    const changeSimSpeed = (event) => {
    setInterval(event.target.value);
    }
  
    const renderSquare = (i) => {
      return (
        <Square
          bgColor={squares[i]}
          onClick={() => handleClick(i)}
        />
       );
    }
  
    const createRows = (num, numRows) => {
        var numbers = [size];
        for(var i=0; i<size; i++) {
            numbers[i] = i;
        }
        const aRow = numbers.map((n) => renderSquare(n + num*numRows));
        //{renderSquare(n + numRows*num)} );

        return (
            <div className="board-row">
                {aRow}
            </div>
        );
    }

    const createGrid = (num) => {
        var numbers = [size];
        for(var i=0; i<size; i++) {
            numbers[i] = i;
        }
        const allRows = numbers.map((n) => createRows(n, num));
        //{createRows(n, size )} );
        return allRows;
    }
   
    return (
        <div className="top">
        <h2> Conway's Game of life</h2>
            <div className="status">{`Generation: ${generation}`}</div>
            
            <div className="board">
                {createGrid( size )}
            </div>
            
            <div className="controls">
                Update every <input defaultValue={interval} size="8"
                    onChange={changeSimSpeed} /> ms
                <br />

                Size  of  grid   <input defaultValue={size} size="8"
                    onChange={changeGridSize} /> 
                <br />

                {simulationRunning ?
                    <button className="button"
                        onClick={stopSim}>■ Stop</button> :
                    <button className="button"
                        onClick={playSim}>▶ Play</button>
                }
            </div>
        </div>
    );
  }