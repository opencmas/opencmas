const primaryColor = '#4834d4'
const warningColor = '#f0932b'
const successColor = '#6ab04c'
const dangerColor = '#eb4d4b'


const body = document.getElementsByTagName('body')[0]
var datepicker_changed = 0;
var datepicker_cpu_ram_changed = 1;
var datepicker_drive_network_changed = 2;

const server = "http://" + location.host;

function websiteLoaded() {
    get_first_use();
    get_server_information_history();
    get_server_information();
}

function get_first_use(){
    var request = new XMLHttpRequest()
    request.open('GET', server + '/get_static_information', true)
    request.onload = function () {
		var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {			
                     
            var rawdate = data[0].firstUse;
            var date = rawdate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
            //console.log(date[0]);
            document.getElementById("date-picker-cpu_ram").min = date[0];
            document.getElementById("date-picker-drive_network").min = date[0];
            
        } else {
            console.log('error')
       	  }
    }
    request.send();
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
        
     //   console.log(hour);
			
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

    try
    {
        var request = new XMLHttpRequest()
        //console.log("LOL");
        //console.log(server + '/get_server_information');
        request.open('GET', server + '/get_server_information', true)
        request.onload = function () {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response)
            //console.log(data);
            
            if (request.status >= 200 && request.status < 400) {

                //console.log(data.unixTime);

                //CPU
                var bufferNumber = 0;
                var buffercpuTitalCPUValue = 0;

                var cpuUsageSys = parseFloat(data.CpuUsageSys);
                var cpuUsageUser = parseFloat(data.CpuUsageUser);
                //console.log(cpuUsageSys);
                //console.log(cpuUsageUser);
                
                var cpuTotal = parseFloat(cpuUsageSys + cpuUsageUser);

                if(cpuTotal == 0 && bufferNumber < 2){
                    //console.log("4 mo 0")
                    cpuTotal = buffercpuTitalCPUValue;
                    bufferNumber++;
                }
                else{
                    buffercpuTitalCPUValue = cpuTotal;
                    bufferNumber == 0;
                    //console.log("nix")
                }
               
                console.log("total:" + cpuTotal);
                if(isNaN(cpuTotal)){
                    cpuTotal = 0;
                    console.log("NAN")
                }
                   

                document.getElementById("display_cpu").innerHTML = cpuTotal.toFixed(0) + "%";
                document.getElementById("progess_cpu").style = "width:" + cpuTotal + "%";

                //RAM
                var ramFree = data.RAMFree;
                var ramUsed = data.RAMUsed;
                var ramTotal = data.RAMTotal;

                var ram = Math.round((100 / ramTotal * ramUsed));

                //console.log(ram);

                document.getElementById("display_ram").innerHTML = ram + "%";
                document.getElementById("progess_ram").style = "width:" + ram + "%";
                

                //Network

                var txtTotal = data.TXTotal;
                var rxtTotal = data.RXTotal;
                //console.log(txtTotal);
                //console.log(rxtTotal);
                
                txtTotal = ((txtTotal / 1024) / 1024).toFixed(2);
                rxtTotal = ((rxtTotal / 1024) / 1024).toFixed(2);

                document.getElementById("network_upload").innerHTML = "UP:" + rxtTotal + "mb";
                document.getElementById("network_download").innerHTML = "Down:" + txtTotal + "mb";


                //document.getElementById("display_drive").innerHTML = data;


                //const regex = /(?<=\s|^)[\d\w.:+-]+(?=\s|$)/gm;

                var processes = [14];
                var process_list = document.getElementById("process_list");
                //console.log("Moin1");
                var i = 0;
             
                const regex = /(?<=\s|^)[\d\w.:+-]+(?=\s|$)/gm;


                removeAllChildNodes(process_list);
                while(i != 4)
                {
                    var str = ""

                    if(i == 0)
                        str = data.PID1;
                    else if(i == 1)
                        str = data.PID2;
                    else if(i == 2)
                        str = data.PID3;
                    else if(i == 3)
                        str = data.PID4;
                    else if(i == 4)
                        str = data.PID5;
                    else if(i == 5)
                        str = data.PID6;
                    else if(i == 6)
                        str = data.PID7;
                    else if(i == 7)
                        str = data.PID8;
                    else if(i == 8)
                        str = data.PID9;
                    else if(i == 9)
                        str = data.PID10;
                    else if(i == 10)
                        str = data.PID11;
                    else if(i == 11)
                        str = data.PID12;
                    else if(i == 12)
                        str = data.PID13;
                    else if(i == 13)
                        str = data.PID14;
                    else if(i == 14)
                        str = data.PID15;
                    


                    let m;
                    var temp_list = [];
                    while ((m = regex.exec(str)) !== null) {
                        if (m.index === regex.lastIndex) {
                            regex.lastIndex++;
                        }
                        
                        m.forEach((match, groupIndex) => {
                            temp_list.push(match);
                            
                        });

                    }
                
                    var single_process = new processObject(temp_list[0], temp_list[1], temp_list[2],
                        temp_list[3], temp_list[4], temp_list[5], temp_list[6],
                        temp_list[7], temp_list[8], temp_list[9], temp_list[10], 
                        temp_list[11]);


                    var process = document.createElement("tr");

                    var process_id = document.createElement("th");
                    var process_user = document.createElement("th");
                    var process_command = document.createElement("th");
                    var process_cpu = document.createElement("th");
                    var process_ram = document.createElement("th");


                    process_id.innerHTML = single_process.pid;
                    process_user.innerHTML = single_process.user;
                    process_command.innerHTML = single_process.command;
                    process_cpu.innerHTML = single_process.cpu;
                    process_ram.innerHTML = single_process.mem;

                    process.appendChild(process_id);
                    process.appendChild(process_user);
                    process.appendChild(process_command);
                    process.appendChild(process_cpu);
                    process.appendChild(process_ram);

                   
                      

                    process_list.appendChild(process);
                    i++;
                }
                i = 0;

                /*
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
                */

            } else {
                console.log('error')
            }
        }

        request.send()

    }
    catch{}

    setTimeout(get_server_information, 1000);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
  
function date_cpu_ram_changed(){

    datepicker_changed = datepicker_cpu_ram_changed;
    get_server_information_history();
}

function date_drive_network_changed(){

    datepicker_changed = datepicker_drive_network_changed;
    get_server_information_history();
}

function get_server_information_history() {

    var date = "a";

    if(datepicker_changed == 0)
    {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear(); 

        if(day < 10)
            day = "0" + day.toString();

        if(month < 10)
            month = "0" + month.toString();

        var today = year.toString() + "-" + month.toString() + "-" + day.toString();

        document.getElementById("date-picker-cpu_ram").value = today;
        document.getElementById("date-picker-cpu_ram").max = today;

        document.getElementById("date-picker-drive_network").value = today;
        document.getElementById("date-picker-drive_network").max = today;

        date = year.toString() + "-" + month.toString() + "-" + day.toString(); 

    }
    else if(datepicker_changed == datepicker_cpu_ram_changed)
    {
       var insertedDate = document.getElementById("date-picker-cpu_ram").value;

       document.getElementById("date-picker-drive_network").value = insertedDate;

       date = insertedDate;

       console.log(date);

    }
    else if(datepicker_changed == datepicker_drive_network_changed)
    {
       var insertedDate = document.getElementById("date-picker-drive_network").value;

       document.getElementById("date-picker-cpu_ram").value = insertedDate;

       date = insertedDate;

       console.log(date);
    }
 
    console.log(date);
    var request = new XMLHttpRequest()
	var server_information_history_data = [23];
    request.open('GET', server + '/get_server_information_history/' + date, true)
    request.onload = function () {

		var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {			
			
            var i;
            for (i = 0; i < data.length; i++) {
				
               
                var hourRaw = data[i].hour;
                var cpu = data[i].cpu;
                var ram = data[i].ram;
                var drive = data[i].drive;
				var network = data[i].network;
                
                //console.log(data);

                var hour = hourRaw.match(/[0-9]{2}:[0-9]{2}/i);

                //console.log(hour);
				
				server_information_history_data[i] = new server_information_history(hour, cpu, ram, drive, network);
                console.log(server_information_history_data[i]);
			
            }

			loadChart_for_CPU_RAM(server_information_history_data);
			loadChart_for_Drive_Network(server_information_history_data);
        } else {
            console.log('error')
       	  }
    }

	request.send();
	
}


function showModal(){
    var modal = document.getElementById("myModal");

    modal.style.display = "block";

    var qrc = new QRCode(document.getElementById("qrcode"), "otpauth://totp/opencmas:admin?digits=6&issuer=opencmas&period=30&secret=KY5E2NZKONJGK4JZ");

}

function hideModal() {
    var modal = document.getElementById("myModal");

    modal.style.display = "none";
}

function requestNewTOTPSecret(){

    var request = new XMLHttpRequest()
	var server_information_history_data = [23];
    request.open('GET', server + '/totp-generate-secret')
    request.onload = function () {

		var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {			
            
            console.log(data);
            //var qrc = new QRCode(document.getElementById("qrcode"), "otpauth://totp/opencmas:admin?digits=6&issuer=opencmas&period=30&secret=KY5E2NZKONJGK4JZ");


        } else {
            console.log('error')
       	  }
    }

    request.send();
    
}

function checkTOTPToken(){
    
    var token = document.getElementById("token");
    console.log(token.value);

    var data = new FormData();
    data.append("token", token.value);
     
    //console.log(data);

    var xhr = new XMLHttpRequest();

    // listen for `load` event
    xhr.onload = () => {
    
        // print JSON response
        if (xhr.status >= 200 && xhr.status < 300) {
            // parse JSON
            const response = JSON.parse(xhr.responseText);
            console.log(response);
        }
    };
    
    // create a JSON object
    const json = {
        "token": token.value
    };

    console.log(json);

    xhr.open('POST', server + '/totp-validate')
     
    xhr.send(JSON.stringify(json));

    // open request
   // xhr.open('POST', server + '/totp-validate')
   // xhr.send(JSON.stringify(json));
   // xhr.send(data);
    
    // set `Content-Type` header
  //  xhr.setRequestHeader('Content-Type', 'application/json');
    
    // send rquest with JSON payload
   // xhr.send(JSON.stringify(json));
   

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

class processObject{
    constructor(pid, user, pr, ni, virt, res, shr, s, cpu, mem, time, command) {
        this.pid = pid;
        this.user = user;
        this.pr = pr;
        this.ni = ni;
        this.virt = virt;
        this.res = res;
        this.shr = shr;
        this.s = s;
        this.cpu = cpu;
        this.mem = mem;
        this.time = time;
        this.command = command;
    }


    pid() {
        return this.pid;
    }
    
    user() {
        return this.user;
    }

    pr() {
        return this.pr;
    }

    ni() {
        return this.ni;
    }

    virt() {
        return this.virt;
    }

    res() {
        return this.res;
    }

    shr() {
        return this.shr;
    }

    s() {
        return this.s;
    }

    cpu() {
        return this.cpu;
    }

    
    mem() {
        return this.mem;
    }

    time() {
        return this.time;
    }

    command() {
        return this.command;
    }    

}


get_server_information();