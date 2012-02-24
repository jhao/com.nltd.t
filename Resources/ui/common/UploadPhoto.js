function UploadPhoto() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	var activityIndicator = Ti.UI.createActivityIndicator(
	{
		message: ' UpLoading...',
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT];
	var albumid='',userid='';
	var popoverView;
	var arrowDirection;
	var imageView = Ti.UI.createImageView(
	{
		height: 230,
		width: 230,
		top: 30,
		backgroundColor: '#fff'
	});
	
	var label1 = Ti.UI.createLabel(
	{
		color: '#000',
		text: 'Click here to upload photo',
		font: {
			fontSize: 20,
			fontFamily: 'Helvetica Neue'
		},
		textAlign: 'center',
		width: 'auto',
		height:20,
	});
	
	imageView.setBorderColor('#000');
	imageView.setBorderRadius(10);
	imageView.add(label1);
	self.add(imageView);
	var dialog = Ti.UI.createOptionDialog(
	{
		title: 'Choose source',
		options: ['Take a photo', 'Choose from existing', 'Upload from Facebook', 'Upload from Instagram', 'Cancel'],
		cancel: 4
	});
	
	imageView.addEventListener('click', function (e)
	{
		dialog.show();
	});
	self.addEventListener('uploadimage', function (e){
		albumid=e.albumid;
		userid=e.userid;
	});
	dialog.addEventListener('click', function (e)
	{
		var title='test';
		if (e.index == 0) //Use camera
		{
			Ti.Media.showCamera(
			{
				success: function (event)
				{
					var cropRect = event.cropRect;
					var image = event.media;
					if(event.title!=null && event.title!='')
					{
						title = event.title;
					}
					Ti.API.debug('Our type was: ' + event.mediaType);
					if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
					{
						imageView.image = image;
					}
					else
					{
						alert("got the wrong type back =" + event.mediaType);
					}
					imageView.remove(label1);
					self.fireEvent('uploading',{albumid:albumid,userid:userid,title:title});
				},
				cancel: function ()
				{},
				error: function (error)
				{
					// create alert
					var a = Ti.UI.createAlertDialog(
					{
						title: 'Camera'
					});
					// set message
					if (error.code == Ti.Media.NO_CAMERA)
					{
						a.setMessage('Please run this test on device');
					}
					else
					{
						a.setMessage('Unexpected error: ' + error.code);
					}
					// show alert
					a.show();
				},
				saveToPhotoGallery: true,
				allowEditing: true,
				popoverView: popoverView,
				arrowDirection: arrowDirection,
				mediaTypes: [Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO]
			});
		}
		else if (e.index == 1) //show phone photo album
		{
			Ti.Media.openPhotoGallery(
			{
				success: function (event)
				{
					var cropRect = event.cropRect;
					var image = event.media;
					if(event.media.file.name!=null && event.media.file.name!='')
					{
						title = event.media.file.name;
					}
					// set image view
					Ti.API.debug('Our type was: ' + event.mediaType);
					if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
					{
						imageView.image = image;
					}
					else
					{
						// is this necessary?
					}
					Ti.API.info('PHOTO GALLERY SUCCESS cropRect.x ' + cropRect.x + ' cropRect.y ' + cropRect.y + ' cropRect.height ' + cropRect.height + ' cropRect.width ' + cropRect.width);
					imageView.remove(label1);
					self.fireEvent('uploading',{albumId:albumid,userid:userid,title:title});
				},
				cancel: function ()
				{},
				error: function (error)
				{},
				allowEditing: true,
				popoverView: popoverView,
				arrowDirection: arrowDirection,
				mediaTypes: [Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO]
			});
		}
		else if (e.index == 2) //facebook album
		{
			// modal.open(
			// {
				// modal: true
			// });
			// Ti.Facebook.addEventListener('login', function (e)
			// {
				// if (e.success)
				// {
					// getAlbumCovers();
					// return;
				// }
				// else if (e.error || e.cancelled)
				// {
					// return;
				// }
			// });
			// Ti.Facebook.authorize();
			// modal.addEventListener('close', function (e)
			// {
				// Ti.API.info("modal is closed with: " + fbImage);
				// imageView.image = fbImage;
			// })
		}
		else if (e.index == 3) //instagram
		{
			
			// instaModal.open(
			// {
				// modal: true
			// });
			// instaModalWin.add(w);
			// var t1 = Titanium.UI.create2DMatrix().scale(1.2);
			// var a = Titanium.UI.createAnimation();
			// a.transform = t1;
			// a.duration = 300;
			// a.delay = 500;
			// if (accessToken == null) //only show window if there's no access token
			// {
				// w.animate(a);
				// w.url = "https://instagram.com/oauth/authorize/?client_id=b285dedc216f42bb97020c4e5af89063&redirect_uri=http://theoccasionsgroup.com&response_type=token";
			// }
			// // when this animation completes, scale to normal size
			// a.addEventListener('complete', function ()
			// {
				// // we can use the identity transform to take it back to it's real size
				// var t2 = Titanium.UI.create2DMatrix();
				// w.animate(
				// {
					// transform: t2,
					// duration: 200
				// });
			// });
			// var numLoad = 0;
			// w.addEventListener('load', function (e)
			// {
				// numLoad++;
				// accessToken = e.url.split('http://theoccasionsgroup.com/#access_token=').join('');
				// Ti.API.info("e.url is: [" + e.url + "] " + numLoad);
				// if (e.url == requestDenied)
				// {
					// closeAuthenticateWin();
					// instaModal.close();
				// }
				// if (accessToken.length != 48)
				// {
					// accessToken = null;
				// }
				// else
				// {
					// Ti.API.info("url is now: [" + accessToken.length + "]");
					// Ti.API.info("url is now: [" + accessToken + "]");
					// if (e.loading)
					// {
						// Ti.API.info("loading...");
					// }
					// else
					// {
						// Ti.API.info("done loading");
						// if (accessToken != null)
						// {
							// instaToken = accessToken;
							// getInstagramPics();
						// }
					// }
					// instaModal.addEventListener('close', function (e)
					// {
						// Ti.API.info("modal is closed with: " + instaImage);
						// if (instaImage != null)
						// {
							// imageView.remove(label1);
							// imageView.image = instaImage;
						// }
					// });
				 }
		
	})
	self.addEventListener('uploading', function (e){
		activityIndicator.show();
		//var url="http://192.168.98.34/user/album_file_upload.cmd?albumId="+e.albumId +"&form_state=default_state&userid="+e.userid;
		var url="https://multisitemanager.theoccasionsgroup.com/user/album_file_upload.cmd?albumId="+e.albumId +"&form_state=default_state&userid="+e.userid;
		var name ="Filedata";
		var filename = e.title;
		var xhr = Titanium.Network.createHTTPClient();
		var boundary = '----12345568790';  
		var header =  "--" + boundary + "\r\n" + "Content-Disposition: form-data;name=\"albumId\"\r\n\r\n" + e.albumId + "\r\n";  
		header += "--" + boundary + "\r\n" + "Content-Disposition: form-data;name=\"userid\"\r\n\r\n" + e.userid + "\r\n";  
		header += "--" + boundary + "\r\n" + "Content-Disposition: form-data;name=\"form_state\"\r\n\r\n default_state\r\n";  
		header += "--" + boundary + "\r\n" + "Content-Disposition: form-data;name=\"Filename\"\r\n\r\n"+filename+"\r\n";
		header += "--" + boundary + "\r\n";
		header += "Content-Disposition: form-data; name=\"" + name + "\";";  
		header += "filename=\"" + filename + "\"\r\n"; 
		header += "Content-Type: application/octet-stream\r\n\r\n";
		//header += "Content-Transfer-Encoding:Base64\r\n\r\n"
		//Ti.API.info("======\n:imageView.image:"+imageView.image);  
		//var file    = Titanium.Filesystem.getFile(imageView.image.nativePath);
		var tempFile = Titanium.Filesystem.createTempFile();
		
		tempFile.write(imageView.image);
		
		var contents = tempFile.read();
		//var file = Titanium.Filesystem.getFile(tempFile.getNativePath);
		//file.open(Titanium.Filesystem.FILESTREAM_MODE_READ);
		//var contents = file.read();

		//var uploadStream = Titanium.Filesystem.getFileStream(file);  
		//uploadStream.open(Titanium.Filesystem.FILESTREAM_MODE_READ);  
		//var content = uploadStream.read();
		var content = contents.text;
		//uploadStream.close();
		//var content = file.read();//imageView.image.file.write(	);//.read();
		var fullContent = header + content + "\r\n--" + boundary + "--";
		/*
		var fullContent  = {
		  //'albumId' : e.albumId,
		  //'userid'  : e.userid,
		  //'form_state' : 'default_state',
		  'Filedata':imageView.image,
		  'Filename':filename
		};*/
 		
		xhr.open("POST",url);  
   		xhr.setRequestHeader("Content-type", "charset=utf-8;multipart/form-data;boundary=\"" + boundary + "\"");
   		//xhr.setRequestHeader("Content-type","application/octet-stream");  
   		xhr.setRequestHeader("Connection", "keep-Alive");
   		Ti.API.info("======1\n:"+fullContent);
   		Ti.API.info("======2\n:"+url);
   		xhr.send(fullContent);
   		xhr.onreadystatechange = function(){  
		   if (this.readyState == 4){  
		   	  if(this.status==200)
		   	  {
		      	activityIndicator.hide();
		      	alert("successed:"+this.responseText);
		      }else
		      {
		      	alert("failed");
		      }
		   }  
		}
	});
	return self;
}
module.exports = UploadPhoto;