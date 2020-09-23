//import 'bootstrap/dist/css/bootstrap.css';
import { ReactWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import React, { useState } from 'react';
import NavBar from './NavBar';
import { IEnv } from './interfaces';
import CondaCard from './CondaCard';

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const CardGroupComponent = () => {
	const [envdata, setEnvdata] = useState(null);
	const [condaCardData, setcondaCardData] = useState(false); 

  function mapEnvs(data: any) {
	 var env_arr: IEnv[] = [];   
	 data.map(function(val: any)  {
		 env_arr.push({ 
			 name: val.name,
			 build_id: val.build_id,
			 size: val.size,
			 specification: val.spec_sha256,
			 store_path: val.store_path
		 });

	 });
	 return env_arr;
}

  async function getEnvData() {
	const response = await fetch('http://localhost:5001/api/v1/environment/')
	const jsondata = await response.json();
	setEnvdata(jsondata);
  }

 function mapEnvironments() {
	const mapped = mapEnvs((envdata));
	console.log(mapped);
 }

function mapEnvsToCards() {
	setcondaCardData(true);
	}

  return (
    <div>
      <button
        onClick={(): void => {
          getEnvData()
        }}
      >
        Get Data
      </button>
     <button
        onClick={(): void => {
         mapEnvironments() 
        }}
      >
        Set Envs
      </button>
     <button
        onClick={(): void => {
         mapEnvsToCards() 
        }}
      >
        Set Cards
      </button>
	      { condaCardData ? <CondaCard props={envdata[0]}/> : null }
	</div>
  );
};

/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */

const CondaStoreWidget: Widget = ReactWidget.create(<div>
  <NavBar/>
			  <CardGroupComponent />
		  </div>);

export default CondaStoreWidget;
