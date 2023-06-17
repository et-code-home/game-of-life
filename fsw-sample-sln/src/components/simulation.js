import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Board from './board.js';
import Rules from './rules.js';


export default function Simulation () {
    return (
        <Container>
            <Row>
                <Col id='board' lg={12} xl={6}><Board /> </Col>
                <Col id='rules'><Rules /></Col>
            </Row>
            <Row className='about'>
                <Col>
                    <h3>About this Algorithm</h3>
                    <p><b>Conway's Game of Life</b> is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is not a traditional game, but rather a simulation that follows a set of rules. Despite its simplicity, the Game of Life exhibits many complex and fascinating patterns.</p>
                    <p>The simulation is run on a two-dimensional grid, consisting of square cells that can be either <i>alive</i> or <i>dead</i>. Each cell interacts with its eight neighboring cells, which are the cells horizontally, vertically, and diagonally adjacent to it. The simulation progresses in discrete steps, or generations, where the state of each cell is updated based on its current state and the states of its neighbors.</p>
                    <p>The Game of Life has become a popular topic in computer science and mathematics, with researchers studying its properties and exploring its computational capabilities. It can generate many interesting patterns, such as oscillators, gliders, spaceships, and even complex structures like replicators. These patterns emerge as a result of the interaction between cells and can evolve in unpredictable ways.</p>
                </Col>
            </Row>
        
        </Container>
    );
}