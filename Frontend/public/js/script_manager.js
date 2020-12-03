const server = "http://" + location.host;
const scripts = [];
function getScripts(){
    var request = new XMLHttpRequest()
    request.open('GET', server + '/get_scripts', true)
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

function get_scripts() {

    var request = new XMLHttpRequest()

    request.open('GET', 'http://localhost:3000/get_scripts', true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {

            data.forEach(element => {
        
                var script_id = element.id;
                var script_title = element.name;
                var script_description = element.description;
                // var script_icon = element.path;
                var script_icon = "public/media/icons/script_icon.png";

                var script_object = new script(script_id, script_title, script_description, script_icon);

                scripts.push(script_object);

                console.log(scripts);

                var root_div = document.getElementById("script_content");

                var script_item_div = document.createElement("div");
                script_item_div.className = "script_item col-4 col-m-4 col-sm-4";

                var script_item_icon = document.createElement("img");
                script_item_icon.className = "script_item_icon";
                script_item_icon.src = script_icon;

                var script_item_box_div = document.createElement("div");
                script_item_box_div.className = "script_item_box";

                var script_item_title_h5 = document.createElement("h5");
                script_item_title_h5.className = "script_item_title";
                script_item_title_h5.innerHTML = script_title;

                var script_item_description_h6 = document.createElement("h6");
                script_item_description_h6.className = "script_item_description";
                script_item_description_h6.innerHTML = script_description;

                var script_buttons_div = document.createElement("div");

                var button_install  = document.createElement("button");
                button_install.className  = "script_item_button_install";
                button_install.innerHTML = "Install";

                var button_remove  = document.createElement("button");
                button_remove.className  = "script_item_button_remove";
                button_remove.innerHTML = "Remove";

                root_div.appendChild(script_item_div);

                script_item_div.appendChild(script_item_icon);
                script_item_div.appendChild(script_item_box_div);
                script_item_box_div.appendChild(script_item_title_h5);
                script_item_box_div.appendChild(script_item_description_h6);
                script_item_box_div.appendChild(script_buttons_div);
                script_buttons_div.appendChild(button_install);
                script_buttons_div.appendChild(button_remove);

            });
        
            
        } else {
            console.log('error')
        }
    }

    request.send()

}

class script {

    constructor(id, title, description, icon_path) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon_path = icon_path;
    }

}
