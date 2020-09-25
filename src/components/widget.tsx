import { ReactWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import React, { useState } from 'react';
import NavBar from './NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../../style/widget.css';
import BackendSelector from './backendSelector';
import CardGroupComponent from './CardGroup';

/**
 * The main widget. Server Data will be queried from some settings, maybe?
 */
const HomeArea = () => {
  const [serverAddress, setServerAddress] = useState(null); // Server Address String.

  const servers = [
    {
      display_name: 'Localhost',
      url: 'http://localhost:5001/api/v1/environment/',
    },
    {},
  ];

  /*
   * Handles the connection to a server being submitted.
   */
  function handleServerSelect(e: any) {
    e.preventDefault(); //Prevent a reload
    //TODO: Find a way to figure out which index was selected
    //TODO: Write script to check connections - for now, assuming connection
    setServerAddress(servers[0].url);
  }

  /*
   * Handles a click on "Build Specification"
   */

  return (
    <div>
      {serverAddress ? (
        <div>
          <NavBar />
          <Container fluid style={{ height: '100vh' }}>
            <Row className="justify-content-center align-items-center">
              <Col sm={6} md={8} className="my-auto">
                <CardGroupComponent url={serverAddress} />
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <Container fluid style={{ height: '100vh' }}>
          <Row
            className="justify-content-center align-items-center"
            style={{ height: '100vh' }}
          >
            <Col xs={4} sm={6} md={8} className="my-auto">
              <Jumbotron>
                <h1> Welcome to Conda-Store </h1>
                <h3> The one-stop-shop to manage environments! </h3>
                <BackendSelector
                  handleServerSelect={handleServerSelect}
                  serverConnectionData={servers}
                />
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

const CondaStoreWidget: Widget = ReactWidget.create(
  <div>
    <HomeArea />
  </div>
);

export default CondaStoreWidget;
