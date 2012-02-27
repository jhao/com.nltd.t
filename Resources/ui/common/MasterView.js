function MasterView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	// sitecode 
	var sitecode='';
	// input box container
	var UserEmailcontainbox=Ti.UI.createView({
		top:5,
		left:5,
		height:50
	});
	// the title
	var inputlabel = Ti.UI.createLabel({
		left:5,
		width:60,
		height:50,
		text:'UserEmail'
	});
	// input box
	var inputtext = Ti.UI.createTextField(
		{
			left:60,
			width:170,
			height:50
		}
	);
	UserEmailcontainbox.add(inputlabel);
	UserEmailcontainbox.add(inputtext);
	self.add(UserEmailcontainbox);
	
	// add seletion panal
	var selection=Ti.UI.createOptionDialog({
		options : ['IBD', 'IBDB', 'ANN'],
		cancel:1
	});
	selection.addEventListener('click', function(e) {
		 if(e.index == 0) {
		 	sitecode='IBD';
		 }
		 if(e.index == 1) {
		 	sitecode='IBDB';
		 }
		 if(e.index == 2) {
		 	sitecode='ANN';
		 }
		 gobtn.enabled=true;
	});
	
	// add choose site code button
	var sitecdbtn= Ti.UI.createButton({
		top:60,
		left:5,
		width:100,
		height:30,
		title:'Choose Site'
	});
	sitecdbtn.addEventListener('click', function(e) {
		selection.show();
	});
	
	// add go next button
	var gobtn= Ti.UI.createButton({
		top:100,
		left:5,
		width:100,
		height:30,
		title:'GoTo',
		enabled:false
	});
	gobtn.addEventListener('click', function(e) {
		self.fireEvent('userSelected', {
			name:inputtext.value,
			sitecode:sitecode
		});
	});
	
	self.add(sitecdbtn)
	
	self.add(gobtn);
	return self;
};

module.exports = MasterView;