import os
import json

rootDirectory = os.path.abspath(os.path.dirname(__file__))

with open(os.path.join(rootDirectory, 'cslabextension'))
def _jupyter_labextension_paths():
    return [{
        'src': 'cslabextension',
        'dest': data['name']
        }]
