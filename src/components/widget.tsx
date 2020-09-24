import { ReactWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { IEnv } from './interfaces';
import CondaCard from './CondaCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../style/widget.css';
import BackendSelector from './backendSelector';

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const CardGroupComponent = (props: any) => {
  const [envdata, setEnvdata] = useState(null);
  const [showCondaCards, setShowCondaCards] = useState(false);

  useEffect(() => {
    const renderCondaCards = async () => {
      const response = await fetch('http://localhost:5001/api/v1/environment/');
      const jsondata = await response.json();
      setEnvdata(jsondata);
      setShowCondaCards(true);
    };
    renderCondaCards();
  }, []);

  return (
    <div>
      {showCondaCards
        ? envdata.map((envData: IEnv) => (
            <Row>
              <CondaCard envInfo={envData} />
            </Row>
          ))
        : null}
    </div>
  );
};

/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */
const HomeArea = () => {
  const [serverAddress, setServerAddress] = useState(null); // Server Address String.
  const servers = [
    {
      url: 'http://localhost:5001/api/v1/environment/',
      name: 'Local',
    },
    {},
  ];

  /*
   * Handles the connection to a server being submitted.
   */
  function handleServerSelect(e: any) {
    e.preventDefault(); //Prevent a reload
    //TODO: Find a way to figure out which index was selected
    //TODO: Write script to check connections
    setServerAddress(servers[0].url);
  }

  return (
    <div>
      <NavBar />
      <Container fluid>
        {serverAddress ? null : <p> jello </p>}
        <BackendSelector
          handleServerSelect={handleServerSelect}
          serverConnectionData={servers}
        />
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <CardGroupComponent serverEnvironments={serverAddress || null} />
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
    </div>
  );
};
const CondaStoreWidget: Widget = ReactWidget.create(
  <div>
    <HomeArea />
  </div>
);

export default CondaStoreWidget;
