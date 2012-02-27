function DetailView() {
	var self = Ti.UI.createView({
		width:'auto',
		height:'auto'
	});
	var lbl = Ti.UI.createLabel({
		text:'Please select an item',
		top:1,
		left:1,
		height:'auto',
		width:'auto',
		color:'#000'
	});
	self.add(lbl);
	var imageView = Ti.UI.createImageView(  
	    {  
	        top: 25,  
	        left: 5,
	        width:'auto',
			height:'auto'
	    }  
	); 
	self.add(imageView); 
	self.addEventListener('itemSelected', function(e) {
		self.fireEvent('showprocess', e);
		lbl.text = e.Name
		imageView.image="http://media.theoccasionsgroup.com/is/image//user-uploads/"+e.V
		imageView.width=e.Width;
		imageView.height=e.Height;
	});
	
	return self;
};

module.exports = DetailView;
