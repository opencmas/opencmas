const primaryColor = '#4834d4'
const warningColor = '#f0932b'
const successColor = '#6ab04c'
const dangerColor = '#eb4d4b'

const themeCookieName = 'theme'
const themeDark = 'dark'
const themeLight = 'light'

const body = document.getElementsByTagName('body')[0]


function websiteLoaded() {
    get_server_information_history();
    get_server_information();
}


function loadChart_for_CPU_RAM(server_information_history_data) {

  //  console.log("Building CPU RAM Chart");

	var lenght = server_information_history_data.length;

	var hour_data = [server_information_history_data.length];
	
	var cpu_data = [server_information_history_data.length];

	var ram_data = [server_information_history_data.length];


	var i;
	for (i = 0; i < server_information_history_data.length; i++) {

		//console.log(server_information_history_data[i]);
		
		var server_data = server_information_history_data[i];

		var cpu = Number(server_data.cpu);
        var ram = Number(server_data.ram);
        var hour = server_data.hour;
        hour_data[i] = hour;
		cpu_data[i] = cpu;
		ram_data[i] = ram;
			
	}

	//console.log(label_data);
	//console.log(cpu_data);

    var ctx = document.getElementById('chart-cpu_ram')
    ctx.height = 500
    ctx.width = 500
    var data = {
        labels: hour_data,
        datasets: [{
            fill: false,
            label: 'CPU',
            borderColor: successColor,
            data: cpu_data,
            borderWidth: 2,
            lineTension: 0,
		}, {
            fill: false,
            label: 'RAM',
            borderColor: dangerColor,
            data: ram_data,
            borderWidth: 2,
            lineTension: 0,
		}]
    }

    var lineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            maintainAspectRatio: false,
            bezierCurve: false,
        }
    })


}

function loadChart_for_Drive_Network (server_information_history_data) {

 //   console.log("Building Drive Network Chart");


	var lenght = server_information_history_data.length;

	//console.log("laenge: " + lenght);

	var hour_data = [server_information_history_data.length];
	
	var drive_data = [server_information_history_data.length];

	var network_data = [server_information_history_data.length];


	var i;
	for (i = 0; i < server_information_history_data.length; i++) {

		//console.log(server_information_history_data[i]);
		
		var server_data = server_information_history_data[i];


		var drive = Number(server_data.drive);
		var network = Number(server_data.network);
        var hour = server_data.hour;
        hour_data[i] = hour;
		drive_data[i] = drive;
		network_data[i] = network;
			
    }
    
    //console.log(network_data);

	//console.log(label_data);
//	console.log(cpu_data);

    var ctx = document.getElementById('chart-drive_network')
    ctx.height = 500
    ctx.width = 500
    var data = {
        labels: hour_data,
        datasets: [{
            fill: false,
            label: 'Drive',
            borderColor: successColor,
            data: drive_data,
            borderWidth: 2,
            lineTension: 0,
		}, {
            fill: false,
            label: 'Network',
            borderColor: warningColor,
            data: network_data,
            borderWidth: 2,
            lineTension: 0,
		}]
    }

    var lineChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            maintainAspectRatio: false,
            bezierCurve: false,
        }
    })


}


function get_server_information() {

    var request = new XMLHttpRequest()

    request.open('GET', 'http://localhost:3000/get_server_information', true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {

            var cpu = data[0].cpu;
            var ram = data[0].ram;
            var drive = data[0].drive;
            var network = data[0].network;

            document.getElementById("display_cpu").innerHTML = cpu + "%";
            document.getElementById("display_ram").innerHTML = ram + "%";
            document.getElementById("display_drive").innerHTML = drive + "%";
            document.getElementById("display_network").innerHTML = network + "%";

            document.getElementById("progess_cpu").style = "width:" + cpu + "%";
            document.getElementById("progess_ram").style = "width:" + ram + "%";
            document.getElementById("progess_drive").style = "width:" + drive + "%";
            document.getElementById("progess_network").style = "width:" + network + "%";


        } else {
            console.log('error')
        }
    }

    request.send()


    setTimeout(get_server_information, 1000);
}

   

function get_server_information_history() {
    var request = new XMLHttpRequest()
	var server_information_history_data = [23];
    request.open('GET', 'http://localhost:3000/get_server_information_history', true)
    request.onload = function () {

		var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {			
			
            var i;
            for (i = 0; i < data.length; i++) {
				
                var date = data[i].date;
                var cpu = data[i].cpu;
                var ram = data[i].ram;
                var drive = data[i].drive;
				var network = data[i].network;
                
                var str = "Visit W3Schools!"; 
                var hour = date.match(/(?<=T)[0-9]{2}:[0-9]{2}/i);

               // console.log("hour" + hour);
				
				server_information_history_data[i] = new server_information_history(hour, cpu, ram, drive, network);
			
            }

			loadChart_for_CPU_RAM(server_information_history_data);
			loadChart_for_Drive_Network(server_information_history_data);
        } else {
            console.log('error')
       	  }
    }

	request.send();
	
	

}

class server_information_history {

    constructor(hour, cpu, ram, drive, network) {
        this.hour = hour;
        this.cpu = cpu;
        this.ram = ram;
        this.drive = drive;
        this.network = network;
    }


    hour() {
        return this.hour;
    }

    cpu() {
        return this.cpu;
    }

    ram() {
        return this.ram;
    }

    drive() {
        return this.drive;
    }

    network() {
        return this.drive;
    }
}


get_server_information();