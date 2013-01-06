var nextBtn;

function init() {
	
	// FUNCTION CALLS
	// Parse incoming data and pass it back out.
	var url = document.location.href, get;
	get = url.split('?');
	var nextPage = function() {
		self.location="walkAround1.html?" + get[1];
	};
	
	// GET JSON AND SET TABLE FIELDS FROM JSON
	var vehicleData = "";
	gm.info.getVehicleData(function(args) {
		vehicleData = args;
	});
	
	// set date
	var currentDate = new Date();
	document.getElementById('date').innerHTML = currentDate.getMonth()+1 + "/" + // set month
		currentDate.getDate() + "/" + // set day
		currentDate.getFullYear(); // set year
	
	
	//set odometer
	document.getElementById('odometer').innerHTML = vehicleData.odometer + " km";
	
	//set oil percent
	if (!vehicleData.engine_oil_life)
		document.getElementById('oil').innerHTML = "50%";
	else
		document.getElementById('oil').innerHTML = vehicleData.engine_oil_life + "%";
	
	//set tire pressure
	document.getElementById('tpressure').innerHTML = vehicleData.tire_left_front_pressure + "," + 
		vehicleData.tire_right_front_pressure + "," + 
		vehicleData.tire_left_rear_pressure + "," + 
		vehicleData.tire_right_rear_pressure + " kPaG";
	
	// set VIN
	document.getElementById('vin').innerHTML = gm.info.getVIN();
	
	// set fuel level
	document.getElementById('fuel').innerHTML = vehicleData.fuel_level + "%";
	
	// set GPS position
	document.getElementById('pos').innerHTML = vehicleData.gps_lat + ", " + vehicleData.gps_long;
	
	
	
	
	// BUTTON AND INPUT WIDGETS	
	nextBtn = new gm.widgets.Button({
		callBack: nextPage,
		label:"Next",
        parentElement: document.getElementById('nextButton')
	});
	nextBtn.render(); //associated html element
	
	
	
}