import React, { useEffect, useState } from 'react';
import TextEditor from './TextEdior';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import yaml from 'js-yaml';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../../style/enveditpanel.css';

const EnvironmentEditorPanel = (props: any) => {
  const [environmentData, setEnvironmentData] = useState(null);
  const [environmentYaml, setEnvironmentYaml] = useState(null);

  useEffect(() => {
    const getEnvironmentEditorData = async () => {
      const response = await fetch(props.url + props.hash);
      const jsondata = await response.json();
      setEnvironmentData(jsondata);
      setEnvironmentYaml(yaml.safeLoad(JSON.stringify(jsondata.spec)));
    };
    getEnvironmentEditorData();
  }, []);

  useEffect(() => {
    console.log(environmentData);
  }, [environmentData]);
  return (
    <div style={{ marginTop: '2rem' }}>
      <Container fluid className="my-auto">
        {environmentData ? (
          <Jumbotron>
            <h3>
              {' '}
              {environmentData.name}
              <small className="text-muted">
                Build Number: {environmentData.num_builds}
              </small>
            </h3>
            <h6> Created On: {environmentData.created_on} </h6>
            <h6> Filepath: {environmentData.filename} </h6>
          </Jumbotron>
        ) : null}
        <Row className="justify-content-center align-items-center">
          <Col xs={9}>
            {environmentData ? (
              <TextEditor yaml_spec={yaml.safeDump(environmentYaml)} />
            ) : (
              <TextEditor />
            )}
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
        <div style={{ marginTop: '1rem' }}>
          <Row className="justify-content-center align-items-center">
            <Button
              onClick={(e) => props.handleCancelClick(e)}
              variant="primary"
            >
              {' '}
              Validate{' '}
            </Button>
            <Button
              onClick={(e) => props.handleCancelClick(e)}
              variant="secondary"
            >
              {' '}
              Submit{' '}
            </Button>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default EnvironmentEditorPanel;
