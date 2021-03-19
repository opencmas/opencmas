var public_Key;
const server = "http://" + location.host;

function getPublicKey(){
    var request = new XMLHttpRequest()
    request.open('GET', server + '/get_static_information', true)
    request.onload = function () {
		var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {			
            public_Key = data[0].publicKey;
            console.log(server);
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

    console.log(data);

    var request = new XMLHttpRequest()
    request.open('POST', server + '/login', true)
    request.setRequestHeader("Content-type", "application/json");
    //request.withCredentials = true;
    try{
    request.onload = function () {
      
            console.log(this.response);

            if(this.response == 'END')
            {
                document.getElementById("totp-field").style.display = "block";
                document.getElementById("login-field").style.display = "none";
            }
            else{
                var data = JSON.parse(this.response);
                if (request.status >= 200 && request.status < 400) {	
                    var status = data.authentication;
                    console.log(status)
        
                    //var x = document.cookie;
        
                    //console.log(x);
        
                    if(data.authentication == "failed"){
                        document.getElementById("login-failed").style.visibility = "visible";
                        console.log(document.getElementById("login-failed").style.visibility);
                    }
                    else{
                        document.getElementById("login-failed").style.visibility = "collapse";
                        window.location.replace(server + "/dashboard");
                    }
                        
        
                }
        }
       
    }
}
catch(err){
    //console.log(err);
}
    request.send(JSON.stringify(data));


}

function submitToken(){

    var totp_token = document.getElementById("input_totp_token").value;

    var data = {
        "token": totp_token
    }

    console.log(data);

    var request = new XMLHttpRequest()
    request.open('POST', server + '/totp-validate', true)
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function () {

        console.log(this.response);

        if(this.response == 'END'){
            window.location.replace(server + "/dashboard");
        }
        else{        
            var data = JSON.parse(this.response);
            console.log(data);

            if(data.authentication == "failed")
                document.getElementById("totp-failed").style.visibility = "visible";
            else
                document.getElementById("totp-failed").style.visibility = "collapse";



            if (request.status >= 200 && request.status < 400) {	
                var status = data.authentication;
                console.log(status)

                if(status == "failed")
                    document.getElementById("login-failed").style.visibility = "visible";

                    


            }
            else{
                console.log("failed");
            }
        }
    }
    request.send(JSON.stringify(data));

}






