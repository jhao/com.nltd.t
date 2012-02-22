function UploadPhoto() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	self.addEventListener('openuploadwindow',function(e){
		Titanium.Media.openPhotoGallery({
			    success:function(event)
			    {
			        b1.title = 'Uploading Photo...';

			    },
			    cancel:function()
			    {
			
			    },
			    error:function(error)
			    {
			    },
			    allowEditing:true
		});
	});
	
	return self;
}
module.exports = UploadPhoto;