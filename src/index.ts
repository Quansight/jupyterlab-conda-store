import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';
import { IMainMenu } from '@jupyterlab/mainmenu';

import { Menu } from '@lumino/widgets';

import CondaStoreWidget from './components/widget';

import 'bootstrap/dist/css/bootstrap.css';
/**
 * Initialization data for the jupyter-conda-store extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-conda-store',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu
  ) => {
    const { commands, shell } = app;
    //Add menu commands

    const commandRefresh = 'conda-store:refresh';
    // This command adds an option to launch the window
    CondaStoreWidget.id = 'conda-store-jupyterlab';
    CondaStoreWidget.title.label = 'Conda Store';
    CondaStoreWidget.title.closable = true;
    shell.add(CondaStoreWidget, 'left');
    shell.activateById(CondaStoreWidget.id);

    // TODO: Add an option to manually trigger a refresh of the kernel launcher.
    commands.addCommand(commandRefresh, {
      label: 'Refresh Kernels',
      execute: () => {
        console.log(
          'TODO: Add Refresh method to manually see newly added Kernels'
        );
      },
    });

    // Add the command to the palette.
    palette.addItem({ command: commandRefresh, category: 'Conda Store' });

    // Create a menu
    const condastoreMenu: Menu = new Menu({ commands });
    condastoreMenu.title.label = 'Conda Store';
    mainMenu.addMenu(condastoreMenu, { rank: 80 });

    // Add the command to the menu
    condastoreMenu.addItem({ command: commandRefresh });
  },
};

export default plugin;
