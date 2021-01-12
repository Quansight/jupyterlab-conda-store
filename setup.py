import os
from setuptools import setup
from jupyter_packaging import create_cmdclass

VERSION = '0.0.1'

setup_args = dict(
    name='jupygloo',
    version=VERSION,
    description='Jupyter Server Extension for glootalk',
    python_requires='>=3.8',
    install_requires=[
        'jupyter_server',
        'glootalk',
    ],
    entry_points={
        'console_scripts': [
            'jupygloo=jupygloo.app:main'
        ]
    },
    include_package_data=True,
)

if __name__ == "__main__":
    setup(**setup_args)
