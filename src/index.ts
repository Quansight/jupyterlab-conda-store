import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { IMainMenu } from '@jupyterlab/mainmenu';
import CondaStoreWidget from './components/widget';

import 'bootstrap/dist/css/bootstrap.css';
import '../style/index.css';
/**
 * Initialization data for the jupyter-conda-store extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-conda-store',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu],
  activate: (app: JupyterFrontEnd) => {
    const { shell } = app;
    //Add menu commands

    // This command adds an option to launch the window
    CondaStoreWidget.id = 'conda-store-jupyterlab';
    CondaStoreWidget.addClass('scrollable');
    CondaStoreWidget.title.label = 'Conda Store';
    CondaStoreWidget.title.closable = true;
    shell.add(CondaStoreWidget, 'left');
    shell.activateById(CondaStoreWidget.id);
  },
};

export default plugin;
