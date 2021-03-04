
#!/bin/bash
id=$(id | egrep -i 'cmas')
if [ -z "$id" ]
then

echo "please execute these scripts with the user 'cmas'"


else
sudo touch /etc/banner 
sudo echo "Do Not Enter" | sudo tee -a /etc/banner
sudo cp /etc/ssh/sshd_config ./sshd_config_bak


#a=10
#while [ $a == 10 ]
#do
#echo "Do you want to make changes to the default ssh config? (Y/N)"
#read $input

#if [ $input == 'Y' ]
#then
#	a=11
#	nano sshCustomConf.txt
#
#elif [ $input == 'N' ]

	sudo cat sshCustomConf.txt  | sudo tee -a /etc/ssh/sshd_config
	sudo systemctl restart sshd
	echo "your ssh conf has been updated!"
#else

#	a=10

fi

#done

#fi
exit 0

