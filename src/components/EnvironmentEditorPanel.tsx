import React from 'react';
import TextEditor from './TextEdior';
import Row from 'react-bootstrap/Row';
import Jumbotron from 'react-bootstrap/esm/Jumbotron';
import Button from 'react-bootstrap/Button';


const EnvironmentEditorPanel = (props: any) => {
	return (
		<div>
		<Row className="justify-content-left align-items-center">
			<Jumbotron>
			<h4> Environment Packages </h4>
			<TextEditor />
			</Jumbotron>
			<Button onClick={ (e) => props.handleCancelClick(e) } variant='secondary'> Cancel </Button>
		</Row>
		</div>
	); 
};

export default EnvironmentEditorPanel; 
