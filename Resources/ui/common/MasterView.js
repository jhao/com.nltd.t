function MasterView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	//some dummy data for our table view
	var tableData = [
		{title:'hh@jj.com', sitecode:'IBDB', hasChild:true},
		{title:'Grapes', sitecode:'1.50', hasChild:true},
		{title:'Oranges', sitecode:'2.50', hasChild:true},
		{title:'Bananas', sitecode:'1.50', hasChild:true},
		{title:'Pears', sitecode:'1.40', hasChild:true},
		{title:'Kiwis', sitecode:'1.00', hasChild:true}
	];
	
	var table = Ti.UI.createTableView({
		data:tableData
	});
	self.add(table);
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('userSelected', {
			name:e.rowData.title,
			sitecode:e.rowData.sitecode
		});
	});
	var btn= Ti.UI.createButton({
		width:100,
		text:'upload photo'
	});
	btn.addEventListener('click', function(e) {
		self.fireEvent('uploadopen', {
		});
	});
	return self;
};

module.exports = MasterView;