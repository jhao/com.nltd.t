function MasterView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	var sitecode='';
	//some dummy data for our table view
	// var tableData = [
		// {title:'hh@jj.com', sitecode:'IBDB', hasChild:true},
		// {title:'Grapes', sitecode:'1.50', hasChild:true},
		// {title:'Oranges', sitecode:'2.50', hasChild:true},
		// {title:'Bananas', sitecode:'1.50', hasChild:true},
		// {title:'Pears', sitecode:'1.40', hasChild:true},
		// {title:'Kiwis', sitecode:'1.00', hasChild:true}
	// ];
	
	// var table = Ti.UI.createTableView({
		// data:tableData
	// });
	// self.add(table);
	var UserEmailcontainbox=Ti.UI.createView({
		top:5,
		left:5,
		height:50
	});
	var inputlabel = Ti.UI.createLabel({
		left:5,
		width:60,
		height:50,
		text:'UserEmail'
	});
	
	var inputtext = Ti.UI.createTextField(
		{
			left:60,
			width:200,
			height:50
		}
	);
	UserEmailcontainbox.add(inputlabel);
	UserEmailcontainbox.add(inputtext);
	self.add(UserEmailcontainbox);
	
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
	//add behavior
	// table.addEventListener('click', function(e) {
		// self.fireEvent('userSelected', {
			// name:e.rowData.title,
			// sitecode:e.rowData.sitecode
		// });
	// });
	
	// var btn= Ti.UI.createButton({
		// top:60,
		// left:115,
		// width:100,
		// height:30,
		// title:'upload photo'
	// });
	var sitecdbtn= Ti.UI.createButton({
		top:60,
		left:5,
		width:100,
		height:30,
		title:'Choose Site'
	});
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
	
	sitecdbtn.addEventListener('click', function(e) {
		selection.show();
	});
	
	// btn.addEventListener('click', function(e) {
		// Ti.API.info("upload btn click");
		// self.fireEvent('uploadopen', e);
	// });
	self.add(sitecdbtn)
	//self.add(btn);
	self.add(gobtn);
	return self;
};

module.exports = MasterView;