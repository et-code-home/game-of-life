import React from 'react';
import Form from 'react-bootstrap/Form';

export default function SpeedDropdown(props) {
  return (
    <Form.Select defaultValue="normal" aria-label="Speed" onChange={props.onChange} style={{width: "100px", display: "inline", marginRight: "10px", fontSize:"12px"}}>
      <option value="slow">Slow</option>
      <option value="normal">Normal</option>
      <option value="fast">Fast</option>
    </Form.Select>
  );
}