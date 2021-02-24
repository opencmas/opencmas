#!/bin/bash

sudo apt update -y
sudo apt install $(cat basePKGList.txt) -y
sudo apt autoclean -y

exit 0
