#!/bin/bash
#id=$(id -G | egrep -i '^([0])$')
#if [ -z "$id" ]
#then

#echo "please execute this script as root"



#else
    chmod +x base.sh
    chmod +x mongoInstall.sh
    chmod +x ssh_conf.sh
    chmod +x upgrade/autoSysUpgrade.sh
    usermod -aG wheel root
    mkdir /opt/opencmas
    cp ../../* /opt/opencmas -Rf
   ./base.sh
   ./mongoInstall.sh
    cp ../daemon/cmasd.service /etc/systemd/system/ -f
     useradd -m cmas -c "openCMAS User" -s /bin/bash 
     usermod -aG sudo cmas
     echo "cmas ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
    echo "Please set a Password for the user cmas; command: passwd cmas"
#fi
exit 0

