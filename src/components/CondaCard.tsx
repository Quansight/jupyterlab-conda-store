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
//import { IEnv } from './interfaces';

//TODO: Properly type check
const CondaCard = (props: any) => {
	let sizemb = Math.round(props.envInfo.size * 10**-6) + 'MB'; 
	return(
		<Card style={{ 
			width: '18rem',
				marginTop: '2rem',
				marginBottom: '2rem',
		}}>
  <Card.Body>
    <Card.Title>{ props.envInfo.name }</Card.Title>
	    <Card.Subtitle className="mb-2 text-muted">
		    Build Version: { props.envInfo.build_id || 'Unknown Build' }{"\n"}
	    </Card.Subtitle>
<Card.Subtitle className="mb-2 text-muted">
		    Size: { sizemb || 'N/A' }{"\n"} 
</Card.Subtitle>

    <Card.Text>
      { props.envInfo.conda_desc ||
	'Some quick example text to build on the card title and make up the bulk of the card content.'
      }
    </Card.Text>
    <Card.Link href="#">Build Specifcation</Card.Link>
	    <br/>
	    <Card.Link href="#">Archive</Card.Link>
		    <br/>
    <Card.Link href="#">Docker Image</Card.Link>
  </Card.Body>
</Card>
)};

export default CondaCard
