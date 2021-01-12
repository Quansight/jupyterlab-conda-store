from jupyter_server.base.handlers import JupyterHandler
from jupyter_server.extension.handler import ExtensionHandlerMixin, ExtensionHandlerJinjaMixin
from jupyter_server.base.zmqhandlers import WebSocketMixin

from tornado.websocket import WebSocketHandler, websocket_connect
from tornado.ioloop import IOLoop
import json

import glootalk


class DefaultHandler(ExtensionHandlerMixin, JupyterHandler):
    def get(self):
        # The name of the extension to which this handler is linked.
        self.log.info("Extension Name in {} Default Handler: {}".format(
            self.name, self.name))

        self.write('<h1>Jupygloo Extension</h1>')
        self.write('Config in {} Default Handler: {}'.format(
            self.name, self.config))


shared_automerge_rooms = {}


class AutomergeRoom:

    def __init__(self, doc):

        self.docname = doc
        self.websockets = []
        self.automerge_document = None

    def add_websocket(self, ws):
        self.websockets.append(ws)

    def remove_websocket(self, ws):
        self.websockets.remove(ws)

    def dispatch_message(self, message, sender=None):

        # TODO : forward the message to the automerge document

        for ws in self.websockets:
            if ws != sender:
                ws.write_message(message, binary=True)


class AutomergeWsHandler(WebSocketMixin, WebSocketHandler, ExtensionHandlerMixin, JupyterHandler):

    async def open(self):

        test = glootalk.automerge.init("./test.log")
        print(test)
        print(dir(test))

        doc = self.get_argument('doc', default=None)
        print(f"\nDEBUG {self.request}, {self.request.remote_ip}  \n")

        if doc not in shared_automerge_rooms:
            shared_automerge_rooms[doc] = AutomergeRoom(doc)

        shared_automerge_rooms[doc].add_websocket(self)
        print(
            f"\nDEBUG shared websockets for doc {doc} : {shared_automerge_rooms[doc]}")

        # self.write_message(json.dumps(["TEST"]))

        # Default message to let the client build its internal automerge document.
        # TODO : replace this with the payload for the current document
        default_msg = bytes([
            133, 111, 74, 131, 238, 252, 154, 111, 1, 142, 1, 16, 77, 254, 31, 198, 51,
            153, 72, 94, 144, 91, 62, 9, 75, 31, 110, 189, 1, 1, 224, 174, 215, 255, 5,
            0, 0, 0, 1, 4, 0, 2, 7, 0, 2, 4, 0, 2, 7, 2, 9, 6, 0, 3, 5, 0, 0, 1, 11, 9,
            0, 2, 126, 0, 3, 3, 1, 2, 125, 13, 18, 126, 5, 100, 111, 99, 73, 100, 8,
            116, 101, 120, 116, 65, 114, 101, 97, 0, 7, 28, 4, 2, 5, 1, 1, 34, 8, 126,
            1, 4, 5, 1, 126, 3, 1, 46, 9, 126, 230, 1, 0, 5, 22, 126, 0, 22, 47, 20,
            97, 117, 116, 111, 109, 101, 114, 103, 101, 45, 114, 111, 111, 109, 104,
            101, 108, 108, 111, 72, 56, 5, 7, 0, 126, 1, 0, 57, 2, 127, 0, 59, 2, 127,
            3,
        ])

        self.write_message(default_msg, binary=True)

    def on_message(self, message,  *args, **kwargs):

        doc = self.get_argument('doc', default=None)
        if doc not in shared_automerge_rooms:
            print(
                f"WEIRD : on_message for {doc} not in shared_automerge_rooms")
            return

        print(f"\nDEBUG message : {message}")

        shared_automerge_rooms[doc].dispatch_message(message, sender=self)

    def on_close(self,  *args, **kwargs):
        doc = self.get_argument('doc', default=None)

        print(f"WebSocket on close for {doc}")
        if doc in shared_automerge_rooms:
            shared_automerge_rooms[doc].remove_websocket(self)
