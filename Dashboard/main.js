var logoutBtn, settingsBtn, startBtn;

function init() {
	
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