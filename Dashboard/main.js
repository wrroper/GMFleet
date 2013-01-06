var logoutBtn, settingsBtn, startBtn;

function init() {
	
	var url = document.location.href, get;
	get = url.split('?');
	get = get[1].split('&');
	get = get[0].split('=');
	//document.getElementById('welcome').innerHTML = "Signed in as " + get[1];
	$.ajax({
	    type: 'GET',
	    url: "http://gmfleet.azurewebsites.net/user/" + get[1],
	    crossDomain: true,
	    success: function(responseData) {
	    	//document.getElementById('welcome').innerHTML = responseData;
	    	
	    	var myObject = JSON.parse(responseData);
	    	//self.location="main.html?pin=" + txtUserID.getValue() + "&user_id=" + myObject[0].user_id;
	    	document.getElementById('welcome').innerHTML = "Signed in as " + myObject.first_name + " " + myObject.last_name;
	    },
	    error: function (responseData, textStatus, errorThrown) {
	        alert('Main Page: GET failed.' + responseData);
	        document.getElementById('welcome').innerHTML = "Signed in as Guest";
	    }
	});
	
	
	// FUNCTION CALLS
	var logout = function() {
		self.location="index.html";
	};
	// Parse incoming data and pass it back out.
	var url = document.location.href, get;
	get = url.split('?');
	var vehiclePage = function(){
		self.location="vehiclePage.html?" + get[1];
	};
	
	// BUTTON AND INPUT WIDGETS	
	var logoutBtn = new gm.widgets.Button({
		callBack: logout,
		label:"Logout",
        parentElement: document.getElementById('logout')
	});
	logoutBtn.render(); //associated html element
	
	var settingsBtn = new gm.widgets.Button({
		//callBack: nextPage,
		label:"Settings",
        parentElement: document.getElementById('settings')
	});
	settingsBtn.render(); //associated html element
	
	var startBtn = new gm.widgets.Button({
		callBack: vehiclePage,
		label:"Start",
        parentElement: document.getElementById('start_trip')
	});
	startBtn.render(); //associated html element
	
	
	
}