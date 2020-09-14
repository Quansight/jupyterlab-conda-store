/**
 * This will be the media card that shows the conda environment information
 * It will show:
 * The Environment Name
 * Docker Build Tags Link
 * Specifications Link
 * A special _jupyter_ name, to link it to the KernelMap
 */

import React from 'react';
import Card from 'react-bootstrap/Card'

/**
 * This interface is a JSON Blob corresponding to the API data
 */

interface IEnv {
	/* The name of the environment */
	name: string,
	/* The size of the environment in bytes */
	size: number,
	/* The sha-256 specification of the build. */
	specification: string,
	/* The path to the store */
	store_path: string,
	/* OPT/TODO: Jupyter Kerenel JSON Parse metadata */
	jupyter_kernel?: string, 
	/* OPT: A string that describes the env*/
	conda_desc?: string, 
	/* OPT: A single string to describe the environment's name in jupyter */
	jupyter_desc?: string
}

const CondaCard = (props: IEnv) => {
<Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{ props.name }</Card.Title>
	    <Card.Subtitle className="mb-2 text-muted">{ props.jupyter_desc || 'A conda environment' }</Card.Subtitle>
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
};

export default CondaCard
