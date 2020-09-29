import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const BuildInformationPanel = (props: any) => {
	return( 
		<div style={{ marginTop: 'rem' }}>
			<Container fluid>
				<Row>
					<h4> Current Build Information </h4>
					<Col>
						<Table>
							</Table>
								<p> hello </p>
					</Col>
						</Row>
							</Container>
		</div>
			)
			};
export default BuildInformationPanel;
