import React from 'react';
import Board from './board.js';
import Rules from './rules.js';


export default function Simulation () {
    return (
    <div className="sim">
        <div className="sim-main">
        <Board /> <Rules />
        
        </div>
        <div className="sim-about">
        <br /><br /><br />
            <h3>About this Algorithm...</h3>
        </div>
    </div>
    );
}