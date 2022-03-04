#!/bin/bash
sudo docker stop node-container
sudo docker rm node-container
sudo docker rmi node-image
