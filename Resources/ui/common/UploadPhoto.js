function UploadPhoto() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	Titanium.Media.openPhotoGallery({
    success:function(event)
    {
        b1.title = 'Uploading Photo...';
        Titanium.Facebook.execute('facebook.photos.upload',{}, function(r)
        {
            if (r.success)
            {
                Ti.UI.createAlertDialog({title:'Facebook', message:'Your photo was uploaded'}).show();
            }
            else
            {
                Ti.UI.createAlertDialog({title:'Facebook', message:'Error ' + r.error}).show();

            }
            b1.title = 'Upload Photo';


        }, event.media);

    },
    cancel:function()
    {

    },
    error:function(error)
    {
    },
    allowEditing:true
});
	return self;
}
module.exports = UploadPhoto;