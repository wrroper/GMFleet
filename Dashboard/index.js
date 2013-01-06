
var txtUserID, submitBtn;

function init() {
	
	// FUNCTION CALLS
	var nextPage = function() {
		self.location="main.html?user_id=" + txtUserID.getValue();
	};
	
	// BUTTON AND INPUT WIDGETS
	txtUserID = new gm.widgets.TextField({
		value:"1",
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