import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Square from './square.js';
import SpeedDropdown from './speedDropdown.js';
import ConfigurationDropdown from './configurationDropdown.js';

export default function Board () {
    const [size, setSize] = useState(10);
    const [sizeErrMsg, setSizeErrMsg] = useState('');
    const [squares, setSquares] = useState(Array(100).fill('white'));
    const [simulationRunning, setSimulationRunning] = useState(false);
    const [generation, setGeneration] = useState(0);
    const [interval, setInterval] = useState(1000);
        
    const buildNextGen = () => {
        const newSquares = squares.slice();
        let neighbors = [];

        for(let i=0; i<squares.length; i++ ) {
            let liveNeighbors = 0;
            let curStatus = squares[i];

            // check 8 neighbors in squares, count black (alive)
            if(i-size >= 0 && i%size !== 0 && squares[i-size-1] === "black") { liveNeighbors++; } // top left
            if(i-size >= 0 && squares[i-size] === "black") { liveNeighbors++; }   // top
            if(i-size >= 0 && i%size !== size-1 && squares[i-size+1] === "black") { liveNeighbors++; } // top right
            if(i%size !== 0 && squares[i-1] === "black") { liveNeighbors++; } // left
            if(i%size !== size-1 && squares[i+1] === "black") { liveNeighbors++; } // right
            if(i+size < size*size && i%size !== 0 && squares[i+size-1] === "black") { liveNeighbors++; } // bottom left
            if(i+size < size*size && squares[i+size] === "black") { liveNeighbors++; } // bottom
            if(i+size < size*size && i%size !== size-1 && squares[i+size+1] === "black") { liveNeighbors++; } // bottom right
            neighbors.push(liveNeighbors)
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
        setSquares(newSquares);
        setGeneration(generation + 1);
    }

    useEffect(() => {
        window.setTimeout(() => {
            if(simulationRunning) {
                buildNextGen();
            }
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
        setSizeErrMsg("")
        setSimulationRunning(true);
        buildNextGen();
    }

    const stopSim = () => {
        setSimulationRunning(false);
    }

    const resetSim = () => {
        setSizeErrMsg("")
        stopSim();
        setTimeout(() => {    
            setSquares(Array(size*size).fill('white'));
            setGeneration(0);
        }, 1000);
    }

    const changeGridSize = (event) => {
        const length = event.target.value;
        if(length === "" || isNaN(length)) {
            setSizeErrMsg("Size cannot be empty, please enter a number")
        }
        else if(!Number.isInteger(Number(length))) {
            setSizeErrMsg("Decimals are not allowed - please enter an integer");
        }
        else if(length < 5) {
            setSizeErrMsg("Minimum board size is 5 x 5")
        }
        else if(length > 16) {
            setSizeErrMsg("Maximum board size is 16 x 16")
        }
        else {
            setSizeErrMsg("")
            setSize(Number(length));
            const cells = length * length;
            setSquares(Array(cells).fill('white'));
        }
      }
      
    const changeSimSpeed = (event) => {
        if(event.target.value) {
            switch(event.target.value){
                case "slow":
                    setInterval(2000);
                    break;
                case "fast":
                    setInterval(500);
                    break;
                default:
                    setInterval(1000);
            }
        }
    }

    const changeStartGrid = (event) => {
        if(event.target.value) {
            const newSquares = Array(size*size).fill('white');
            switch(event.target.value){
                case "stills":
                    //TODO
                    break;
                case "beacon":
                    //TODO
                    break;
                case "blinker":
                    //TODO
                    let middle;
                    if(size % 2 === 0) {
                        middle = Math.floor(size*size/2) - Math.floor(size/2);
                    }
                    else {
                        middle =  Math.floor(size*size/2);
                    }
                    console.log(middle);
                    newSquares[middle-1] = "black";
                    newSquares[middle] = "black";
                    newSquares[middle+1] = "black";
                    setSquares(newSquares);
                    break;
                case "glider":
                    //TODO
                    break;
                case "random":
                    // random
                    for(let i=0; i<size*size; i++) {
                        newSquares[i] = Math.random() < 0.5 ? "black" : "white";
                    }
                    setSquares(newSquares);
                    break;
                default:
                    setSquares(newSquares);
            }
        }
    }
  
    const renderSquare = (i) => {
      return (
        <Square
          key={i}
          bgColor={squares[i]}
          onClick={() => handleClick(i)}
        />
       );
    }
  
    const createRows = (num, numRows) => {
        const numbers = [size];
        for(let i=0; i<size; i++) {
            numbers[i] = i;
        }
        const aRow = numbers.map((n) => renderSquare(n + num*numRows));
        //{renderSquare(n + numRows*num)} );

        return (
            <div className="board-row" key={num}>
                {aRow}
            </div>
        );
    }

    const createGrid = (num) => {
        const numbers = [size];
        for(let i=0; i<size; i++) {
            numbers[i] = i;
        }
        const allRows = numbers.map((n) => createRows(n, num));
        return allRows;
    }
   
    return (
        <div className="top">
        <h2> Conway's Game of Life</h2>
            <div className="stat-gen">{`Generation: ${generation}`}</div>

            <div className="stat-gen">
                Size of grid <input type="number" size="8" value={size}
                    onChange={changeGridSize} disabled={simulationRunning} min="8" max="16" 
                    /> 
            </div>

            <div id="size-err-msg" className="stat-gen">{sizeErrMsg}</div>

            <br />
            <div className="board">
                {createGrid( size )}
            </div>
            
            <div className="controls">
                Speed 
                <SpeedDropdown onChange={changeSimSpeed}/>
                Configuration 
                <ConfigurationDropdown onChange={changeStartGrid}/>
                <br />
                {simulationRunning ?
                    <Button variant="danger"
                        onClick={stopSim}>■ Stop</Button> :
                    <Button variant="success"
                        onClick={playSim}>▶ Play</Button>
                }
                <Button variant="secondary"
                    onClick={resetSim} style={{marginLeft: "10px"}}>⟲ Reset</Button>
            </div>
        </div>
    );
  }