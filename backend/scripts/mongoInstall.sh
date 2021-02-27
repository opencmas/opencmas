#!/bin/bash



npm install mongodb
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc |  apt-key add -

echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" |  tee /etc/apt/sources.list.d/mongodb-org-4.4.list

 apt-get update

 apt-get install -y mongodb-org

systemctl start mongod
systemctl enable mongod

#wget https://github.com/mongodb/mongo-c-driver/releases/download/1.17.4/mongo-c-driver-1.17.4.tar.gz
#tar xzf mongo-c-driver-1.17.4.tar.gz
#cd mongo-c-driver-1.17.4
#mkdir cmake-build
#cd cmake-build
#cmake -DENABLE_AUTOMATIC_INIT_AND_CLEANUP=OFF ..

exit 0