import React from 'react';
import Form from 'react-bootstrap/Form';

export default function ConfigurationDropdown(props) {
  return (
    <Form.Select defaultValue="blank" aria-label="Speed" onChange={props.onChange} style={{width: "100px", display: "inline", fontSize:"12px"}}>
      <option value="blank">Custom</option>
      <option value="random">Random</option>
      <option value="blinker">Blinker</option>
    </Form.Select>
  );
}