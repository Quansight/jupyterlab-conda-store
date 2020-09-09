import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './jupyter-conda-store';

/**
 * Initialization data for the jupyter-conda-store extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-conda-store',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyter-conda-store is activated!');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The jupyter_conda_store server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default extension;
