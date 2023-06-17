import React from 'react';
import ReactDOM from 'react-dom';
import Simulation from './components/simulation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

  ReactDOM.render(
    <Simulation />,
    document.getElementById('root')
  );

  // 3d life...three.js for visualizing
  // hashlife
  // color fading based on time of death
