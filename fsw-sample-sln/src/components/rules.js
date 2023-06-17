import React from 'react';

export default function Rules () {
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