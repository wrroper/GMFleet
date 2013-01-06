var nextBtn, tireCondition, commentBox;

function init() {
	// Parse incoming data and store values.
	var url = document.location.href, get;
	get = url.split('?');
	get = get[1].split('&');
	//document.getElementById("text").innerHTML = get;
	var jsonObject = "";
	gm.info.getVehicleData(function(args) {
		jsonObject = args;
	});
	for(var i=0; i < 8; ++i) { 
		var key_val = get[i].split('=');
		switch (i)
		{
		case 0:
			break;
		case 1:
			jsonObject.user_id = parseInt(key_val[1], 10);
			break;
		case 2:
			jsonObject.tire_condition = parseInt(key_val[1], 10);
			break;
		case 3:
			jsonObject.tire_comment = key_val[1];
			break;
		case 4:
			jsonObject.glass_condition = parseInt(key_val[1], 10);
			break;
		case 5:
			jsonObject.glass_comment = key_val[1];
			break;
		case 6:
			jsonObject.body_condition = parseInt(key_val[1],10);
			break;
		case 7:
			jsonObject.body_comment = key_val[1];
			break;
		}
	}
	
	/////////////////////////
	// BUTTON AND INPUT WIDGETS	
	/////////////////////////
	commentBox = new gm.widgets.TextField({
		value:"Title",
        parentElement: document.getElementById('title123')
	});
	commentBox.render();
	
	// FUNCTION CALLS
	var nextPage = function(){
		jsonObject.trip_comment = commentBox.getValue();
		jsonObject.trip_date = "1/6/2013";
		//if (!jsonObject.engine_oil_life)
			jsonObject.engine_oil_life = 50;
		
		$.ajax({
		    type: 'POST',
		    url: "http://gmfleet.azurewebsites.net/posttrip",
		    crossDomain: true,
		    data: jsonObject,
		    dataType: 'json',
		    success: function(responseData, textStatus, jqXHR) {
		    	//self.location="main.html?user_id=" + txtUserID.getValue();
		    },
//		    error: function (responseData, textStatus, errorThrown) {
//		        alert('POST failed.');
//		        document.getElementById("text").innerHTML = JSON.stringify(responseData);
//		    }
		});
//		var xhr = new XMLHttpRequest();
//		
//		xhr.onreadystatechange = function(){
//			if (xhr.readyState == 4 && xhr.status == 200){
//				var res = xhr.responseText;
//				document.getElementById("text").innerHTML = res;
//			}
//		};
//		xhr.open("POST", "gmfleet.azurewebsites.net/posttrip", true);
//		//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
//		xhr.send(jsonObject);
		
	};
	
	nextBtn = new gm.widgets.Button({
		callBack: nextPage,
		label:"Start Trip",
        parentElement: document.getElementById('nextButton')
	});
	nextBtn.render(); 
	
	
	
	
	
	
	//document.getElementById("text").innerHTML = JSON.stringify(jsonObject);
	
	
}