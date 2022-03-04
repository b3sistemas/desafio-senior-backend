#!/bin/bash
sudo docker run -d -v $(pwd):/home/node/app -p 8181:8181 --name node-container node-image
sudo docker start node-container
