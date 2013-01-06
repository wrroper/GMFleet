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
					$.ajax({
					    type: "GET",
					    url: "http://vegasappdevelopers.com/app1/index.php?message=Vin%20Diesel%20is%20speeding!&address=702-769-9388&sendSms=1",
					    crossDomain: true,
					    success: function(responseData) {
					    },
					    error: function (responseData, textStatus, errorThrown) {
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