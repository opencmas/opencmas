#/bin/bash
id=$(id -G | egrep -i '^([0])$')
if [ -z "$id" ]
then

echo "please execute this script as root"



else
    chmod +x base.sh
    chmod +x mongoInstall.sh
    chmod +x ssh_conf.sh
    chmod +x autoSysUpgrade.sh
   ./base.sh
   .npm install mongodb
    cp ../daemon/cmasd.service /etc/systemd/system/
    sudo useradd -m cmas -c "openCMAS User" -s /bin/bash 
    sudo usermod -aG sudo cmas
    sudo echo "cmas ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
    echo "Please set a Password for the user cmas; command: passwd cmas"
fi
exit 0

