import os
import jinja2
import glootalk
from jupyter_server.extension.application import ExtensionApp, ExtensionAppJinjaMixin
from .handlers import DefaultHandler, AutomergeWsHandler


class condaStoreApp(ExtensionApp):
    # The name of the extension.
    name = "conda-store"

    # The url that your extension will serve its homepage.
    extension_url = '/conda-store/home'

    # Should your extension expose other server extensions when launched directly?
    load_other_extensions = True

    # Dispatchable Backends - so that we can handle multiple servers
    # backends = {'gtws': glootalk.start_server(port=9001, log_fs_path=".")}

    def initialize_settings(self):
        self.log.info(f'{self.name} is enabled.')

    # def initialize_ws_server(self, backend='gtws'):
    #     self.log.info(f'{self.name} - Initializing the { backend } server.')
    #     self.backends[backend]

    # Entry Point Definition


main = launch_new_instance = condaStoreApp.launch_instance
