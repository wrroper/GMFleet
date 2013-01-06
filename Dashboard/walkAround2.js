var nextBtn, tireCondition;

function init() {
	
	// FUNCTION CALLS
	
	// Parse incoming data and pass it back out.
	var url = document.location.href, get;
	get = url.split('?');
	var nextPage = function() {
		self.location="walkAround3.html?" + get[1] +
			"&glass_condition=" + String(new_rb01.getValue()) +
			"&glass_comment=" + String(commentBox.getValue());
	};
	
	/////////////////////////
	// BUTTON AND INPUT WIDGETS	
	/////////////////////////
	
	var new_rb01 = new gm.widgets.RadioButton({
		"label":"Windshield & Glass Condition",
		"groupName":"TestRadioButtonGroup",
		"parentElement":document.getElementById("radiobuttonDiv"),
		"choices":[
			{"label":"75%-100% : Perfect", "value":"75","checked":"checked"},
			{"label":"50%-75% : Good", "value":"50"},
			{"label":"25%-50% : Poor","value":"25"},
			{"label":"0%-25% : Bad","value":"0"}
		]
	});
	new_rb01.render();
	
	var commentBox = new gm.widgets.TextField({
		
		label:"Comments : ",
        parentElement: document.getElementById('comments')
	});
	commentBox.render();
	
	nextBtn = new gm.widgets.Button({
		callBack: nextPage,
		label:"Next",
        parentElement: document.getElementById('nextButton')
	});
	nextBtn.render(); //associated html element
	
	
	
}