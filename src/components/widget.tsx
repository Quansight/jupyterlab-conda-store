//import 'bootstrap/dist/css/bootstrap.css';
import { ReactWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { IEnv } from './interfaces';
import CondaCard from './CondaCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const CardGroupComponent = () => {
  const [envdata, setEnvdata] = useState(null);
  const [showCondaCards, setShowCondaCards] = useState(false);
  /*
  function mapEnvs(data: any) {
    var env_arr: IEnv[] = [];
    data.map(function (val: any) {
      env_arr.push({
        name: val.name,
        build_id: val.build_id,
        size: val.size,
        specification: val.spec_sha256,
        store_path: val.store_path,
      });
    });
    return env_arr;
  }
 		 */
  useEffect(() => {
    const renderCondaCards = async () => {
      const response = await fetch('http://localhost:5001/api/v1/environment/');
      const jsondata = await response.json();
      setEnvdata(jsondata);
      setShowCondaCards(true);
    };
    renderCondaCards();
  });

  return (
    <div>
      {showCondaCards
        ? envdata.map((envData: IEnv) => (
            <Row>
              {' '}
              <CondaCard envInfo={envData} />{' '}
            </Row>
          ))
        : null}
    </div>
  );
};

/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */

const CondaStoreWidget: Widget = ReactWidget.create(
  <div>
    <NavBar />
    <Container fluid>
      <Row>
        <Col sm={2}></Col>
        <Col sm={8}>
          <CardGroupComponent />
        </Col>
        <Col sm={2}></Col>
      </Row>
    </Container>
  </div>
);

export default CondaStoreWidget;
