var odometer_start, odometer_current;

function init() {
	gm.info.getVehicleData(function(args){
		odometer_start = args.odometer;
	});
	
	// FUNCTION CALLS
	var nextPage = function() {
		self.location="index.html";
	};
	
	/////////////////////////
	// BUTTON AND INPUT WIDGETS	
	/////////////////////////
	
	gm.info.watchVehicleData( 
		function(){
			gm.info.getVehicleData(function(args) {
				document.getElementById("speed").innerHTML = args.average_speed;
				odometer_current = args.odometer;
				document.getElementById("distance").innerHTML = odometer_current-odometer_start + "km";
				
				// if we are speeding, send a text alert.
				if (args.average_speed > 120){
					var callJson = new Object();
					callJson.SEND_TYPE = "SST";
					callJson.numberToDial = "7027699388";
					callJson.msg = "the sky is falling... again!";
					callJson.customerName = "Vin Diesel";
					$.ajax({
					    type: "POST",
					    headers: {"Authorization": "Bearer 64a0f4049d81a96aa5716cbad3e2fb9a"},
					    url: "https://api.att.com/rest/1/Sessions",
					    crossDomain: true,
					    data: callJson,
					    success: function(responseData) {
					    	alert(responseData);
					    },
					    error: function (responseData, textStatus, errorThrown) {
					    	alert("Error" + JSON.stringify(responseData));
					    }
					});
				}
			});
		}, 
		["average_speed", "odometer"]);
	
	nextBtn = new gm.widgets.Button({
		callBack: nextPage,
		label:"Finish",
        parentElement: document.getElementById('nextButton')
	});
	nextBtn.render(); //associated html element
	
	
	
}