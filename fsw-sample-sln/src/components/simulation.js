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
                    <h3>About this Algorithm...</h3>
                </Col>
            </Row>
        
        </Container>
    );
}