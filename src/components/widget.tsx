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
      const response = await fetch(props.url);
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
 * The main widget. Server Data will be queried from some settings, maybe?
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
    //TODO: Write script to check connections - for now, assuming connection
    setServerAddress(servers[0].url);
  }

  return (
    <div className="overflow-auto">
      <NavBar />
      <Container fluid>
        // If server is not set, redirect to the selector
        {serverAddress ? (
          <Row>
            <Col xs={6} md={4}>
              <CardGroupComponent url={serverAddress} />
            </Col>
          </Row>
        ) : (
          <div>
            <h1> Please Select the appropriate conda-store server </h1>
            <BackendSelector
              handleServerSelect={handleServerSelect}
              serverConnectionData={servers}
            />
          </div>
        )}
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
