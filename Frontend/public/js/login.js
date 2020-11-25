var public_Key;
const server = "http://" + location.host;

function getPublicKey(){
    var request = new XMLHttpRequest()
    request.open('GET', server + '/get_static_information', true)
    request.onload = function () {
		var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {			
            public_Key = data[0].publicKey;
        } else {
            console.log('error')
       	}
    }
    request.send();
}

 
function login(){   
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_Key);
    var username = document.getElementById("input_username").value;
    var password = document.getElementById("input_password").value;

    var encryptedUsername = encrypt.encrypt(username);
    var encryptedPassword = encrypt.encrypt(password);


    
    var data = {
        "username": encryptedUsername,
        "password": encryptedPassword
    }

    var request = new XMLHttpRequest()
    request.open('POST', server + '/login', true)
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {	
            var status = data.authentication;
            console.log(status)

            if(status == "Failed")
                document.getElementById("login-failed").style.visibility = "visible";
            else
                document.getElementById("login-failed").style.visibility = "collapse";

        }
    }
    request.send(JSON.stringify(data));


}