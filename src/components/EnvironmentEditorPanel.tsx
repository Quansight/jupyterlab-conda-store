import React, { useEffect, useState } from 'react';
import TextEditor from './TextEdior';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const EnvironmentEditorPanel = (props: any) => {
  const [environmentData, setEnvironmentData] = useState(null);
  useEffect(() => {
    const getEnvironmentEditorData = async () => {
      const response = await fetch(props.url + props.hash);
      const jsondata = await response.json();
      console.log(jsondata);
      setEnvironmentData(jsondata);
    };
    console.log(environmentData);
    getEnvironmentEditorData();
  }, []);
  return (
    <div>
      <Container fluid className="my-auto">
      <Row className="justify-content-center align-items-center">
        <Col xs={9}>
          <TextEditor yaml_spec={JSON.stringify(environmentData) || null} />
        </Col>
        <Col xs={3}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Channels</th>
              </tr>
            </thead>
            <tbody>
              {environmentData
                ? environmentData.spec.channels.map((channel: any) => (
                    <tr>
                      <td>{channel}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Installed Packages</th>
              </tr>
            </thead>
            <tbody>
              {environmentData
                ? environmentData.spec.dependencies.map((deps: any) => (
                    <tr>
                      <td>{deps}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Button onClick={(e) => props.handleCancelClick(e)} variant="primary">
        {' '}
        Validate{' '}
      </Button>
      <Button onClick={(e) => props.handleCancelClick(e)} variant="secondary">
        {' '}
        Submit{' '}
      </Button>
	    </Container>
    </div>
  );
};

export default EnvironmentEditorPanel;
