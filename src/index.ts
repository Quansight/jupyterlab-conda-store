import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyter-conda-store extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-conda-store',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyter-conda-store is activated!');
  }
};

export default extension;
