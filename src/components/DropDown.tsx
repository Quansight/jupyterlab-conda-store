import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

/**
 * React Component that takes in a set of props and
 * renders them into a dropdown.
 */

const DropDownComponent = (props: any) => {
  //	const [selection, setSelection] = useState(0);
  return (
    <div>
      <Dropdown>
        <Button variant="success">Split Button</Button>

        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">{props.theListofVars}</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h1> WHAT UP WRLD: </h1>
    </div>
  );
};

export default DropDownComponent;
