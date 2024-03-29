import React from 'react';

export default function Rules () {
    return (
        <div>
        <h3 className="rule-header"> Rules </h3>
            <ul className="rule-list">
                <li>
                    If a cell is <b>alive</b> and it has exactly 2 or 3 live neighbors, it <b>stays alive</b>.
                </li>
                <li>
                    If a cell is <b>alive</b> and it has less than 2 or more than 4 live neighbors, it <b>dies</b>.
                </li>
                <li>
                    If a cell is <b>dead</b> and it has exactly 3 live neighbors, it <b>comes to life</b>.
                </li>
            </ul>
            <p>These rules define the birth, death, and survival of cells in the grid. The initial configuration of live and dead cells is set by the player or generated randomly. After that, the game evolves based on the rules, with each generation creating a new configuration of live and dead cells.</p>
        </div>
    );
}