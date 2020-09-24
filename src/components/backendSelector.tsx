import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BackendSelector = (props: any) => {
  return (
    <div>
      <Form.Control as="select">
        <option> {props.serverConnectionData[0].url || null} </option>
      </Form.Control>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => props.handleServerSelect(e)}
      >
        Connect
      </Button>
    </div>
  );
};

export default BackendSelector;
