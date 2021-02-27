#!/bin/bash

apt update -y
apt install $(cat basePKGList.txt) -y
apt autoclean -y

exit 0
