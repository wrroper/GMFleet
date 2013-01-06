
var txtUserID, submitBtn;

function init() {
	
	// FUNCTION CALLS
	var nextPage = function() {
		$.ajax({
		    type: 'GET',
		    url: "http://gmfleet.azurewebsites.net/user/" + txtUserID.getValue(),
		    crossDomain: true,
		    success: function(responseData) {
		    	var myObject = JSON.parse(responseData);
		    	self.location="main.html?pin=" + txtUserID.getValue() + "&user_id=" + myObject.user_id;
		    	//document.getElementById("signin").innerHTML = "main.html?pin=" + txtUserID.getValue() + "&user_id=" + myObject.user_id;
		    },
		    error: function (responseData, textStatus, errorThrown) {
		        alert('GET failed.' + responseData);
		    }
		});
		//self.location="main.html?user_id=" + txtUserID.getValue();
	};
	
	// BUTTON AND INPUT WIDGETS
	txtUserID = new gm.widgets.TextField({
		value:"1234",
		parentElement: document.getElementById('user-id')
	});
	txtUserID.render(); // associated html element id=phone-input
	
	var submitBtn = new gm.widgets.Button({
		callBack: nextPage,
		label:"Next",
        parentElement: document.getElementById('submit')
	});
	submitBtn.render(); //associated html element
	
	
}