const server = "http://" + location.host;
const scripts = [];


function get_scripts() {

    var request = new XMLHttpRequest()

    request.open('GET', 'http://localhost:3000/get_scripts', true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {

            var root_div = document.getElementById("script_content");
            while(root_div.firstChild){
                root_div.removeChild(root_div.firstChild);
            }

            data.forEach(element => {
        
                var script_id = element._id;
                var script_title = element.name;
                var script_description = element.description;
                var script_icon = 'uploads/icons/' + element.script_icon;
                //var script_icon = "public/media/icons/script_icon.png";

                var script_object = new script(script_id, script_title, script_description, script_icon);

               // console.log(element)
                scripts.push(script_object);

                console.log(scripts);

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

function save_button(){

   var input = confirm("Are you sure?");

   var scriptname = document.getElementById("input_scriptname");
   var scriptdescription = document.getElementById("input_scriptdescription");
   var script_file = document.getElementById("uploadScript").files[0];
   var script_icon = document.getElementById("uploadIcon").files[0];


    if(scriptname.value != "" && scriptdescription.value != "")
    {
        var script_data = {
            "script_name": scriptname.value,
            "script_description": scriptdescription.value,
            "icon_path": ""
        }

        console.log(script_data);

        if(input == true){
        
            var data = new FormData();
            data.append("script_name", scriptname.value);
            data.append("script_description", scriptdescription.value,);
            data.append("script_file", script_file);
            data.append("icon_path", script_icon);
             
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            
            xhr.addEventListener("readystatechange", function() {
              if(this.readyState === 4) {
                console.log(this.responseText);
              }
            });
            
            xhr.open("POST", "localhost:3000/post_script");
            
            xhr.send(data);
        }
    }
    else{
        alert("Please insert Scriptname and Scriptdescription");
    }
}

class script {

    constructor(id, title, description, icon_path) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon_path = icon_path;
    }

}
