/**
 * This will be the media card that shows the conda environment information
 * It will show:
 * The Environment Name
 * Docker Build Tags Link
 * Specifications Link
 * A special _jupyter_ name, to link it to the KernelMap
 */

import React from 'react';
import Card from 'react-bootstrap/Card';
import { IEnv } from './interfaces';

const CondaCard = (props: IEnv) => {
	return(
<Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{ props.name }</Card.Title>
	    <Card.Subtitle className="mb-2 text-muted">Build Version: { props.build_id || 'Unknown Build' }</Card.Subtitle>
    <Card.Text>
      { props.conda_desc ||
	'Some quick example text to build on the card title and make up the bulk of the card content.'
      }
    </Card.Text>
    <Card.Link href="#">Build Specifcation</Card.Link>
    <Card.Link href="#">Archive</Card.Link>
    <Card.Link href="#">Docker Image</Card.Link>
  </Card.Body>
</Card>
)};

export default CondaCard
