function ImagesView() {
	var self = Ti.UI.createView({
		backgroundColor:'white',
	});

	self.addEventListener('imageSelected', function(e) {
		self.fireEvent('showprocess', e);
		if( self.children ){
			  while( self.children.length > 0 ) {
			    //Ti.API.info( 'Number of children: ' + possibleTagViewArea.children.length );
			    self.remove( self.children[0] );
			    //wait(10);
			    //Ti.API.info( 'Deleted child at 0' );
		  }
		}
		var albumid=e.albumid;
		var userid=e.userid;
		var sidecode = e.sidecode;
		var useremail = e.useremail;
		//var url = "https://multisitemanager.theoccasionsgroup.com/catalog/pegasus/get_images_album.jsp?albumId="+e.albumid+"&userid="+e.userid;
		var url = Titanium.App.Properties.getString('url')+"/catalog/pegasus/get_images_album.jsp?albumId="+e.albumid+"&userid="+e.userid;
		 //url='http://maps.googleapis.com/maps/api/geocode/json?address=tianjin&region=us&sensor=true';
		 Ti.API.info("url: " + url);
		 var client = Ti.Network.createHTTPClient({
		     // function called when the response data is available
		     onload : function(e) {
		         // get the image list from url
		         Ti.API.info("Received text: " + this.responseText);
		         var retstr= this.responseText.replace(/\r\n/g,"").replace(/\n/g,"").replace('	','').replace(',]',']');
		         Ti.API.info("subReceived text: " + retstr);
		         var res=JSON.parse(retstr.replace(/Name/g,"title"));
		         if(res)
		         {
		         	 var res_images=res.albumImages;
		         	 // create data table
					 var table = Ti.UI.createTableView({top:40});
					 var currentData = [];
					 for (var i=0;i<res_images.length;i++) {
					 	var image = res_images[i];
					 	// create one row
					 	var row = Ti.UI.createTableViewRow(  
				            {  
				                top:40,
				                height: 'auto',  
				                layout: 'absolute',
				                title:image.title,
						        V : image.V,
						        Width:image.Width,
						        Height:image.Height,
						        Dpi:image.Dpi
				            }  
				        );
				        //create a image view for display picture
				        var imageView = Ti.UI.createImageView(  
					        {  
					            image: "http://media.theoccasionsgroup.com/is/image//user-uploads/"+image.V,  
					            width: 48,  
					            height: 48,  
					            top: 5,  
					            left: 5  
					        }  
					    ); 
					    row.add(imageView); 
					    //create a label for store the name of picture
					    var nameLabel = Ti.UI.createLabel(  
				            {  
				                width: 120,  
				                height: 12,  
				                left: 58,  
				                top: 5,  
				                fontSize: 6,  
				                fontWeight: 'bold',  
				                color: '#2b4771'  
				            }  
				        ); 
				        nameLabel.text = image.title; 
						row.add(nameLabel); 
						// add comment for picture
						// var commentLabel = Ti.UI.createLabel(  
				            // {  
				                // width: 257,  
				                // left: 58,  
				                // top: 18,  
				                // height: 100,  
				                // fontSize: 8  
				            // }  
				        // );  
				        // commentLabel.text = image.title;  
				        // row.add(commentLabel);
				        //row.setData()
				        currentData.push(row);
					 }
					 table.setData(currentData);
					 self.add(table);
					 // add button for upload					 
					 var btn= Ti.UI.createButton({
						top:5,
						left:75,
						width:80,
						height:30,
						title:'upload photo'
					 });
					 btn.addEventListener('click', function(e) {
						//Ti.API.info("upload btn click:"+e.albumid+"-"+e.userid);
						self.fireEvent('uploadopen', {albumid:albumid,userid:userid,sidecode:sidecode,useremail:useremail});
					 });
					 self.add(btn);
					 // add a button for return;
					 var btnback= Ti.UI.createButton({
						top:5,
						left:5,
						width:70,
						height:30,
						title:'return'
					 });
					 btnback.addEventListener('click', function(e) {
						//Ti.API.info("upload btn click:"+e.albumid+"-"+e.userid);
						self.fireEvent('back', {name:useremail,sitecode:sidecode});
					 });
					 self.add(btnback);
					 table.addEventListener('click', function(e) {
						Ti.API.info("e.rowData,: " + e.rowData.title +","+e.rowData.V+","+e.rowData.Width);
						self.fireEvent('imagesSelected', {
							Name:e.rowData.title,
							V:e.rowData.V,
							Width:e.rowData.Width,
							Height:e.rowData.Height,
							Dpi:e.rowData.Dpi
						});
					 });
					 table.addEventListener('dispose', function(e) {
						self.remove(table);
					 });
				 }
		     },
		     // function called when an error occurs, including a timeout
		     onerror : function(e) {
		         Ti.API.debug(url+"\n"+e.error);
		         alert(url+"\n"+e.error);
		     },
		     timeout : 5000  /* in milliseconds */
		 });
		 // Prepare the connection.
		 client.open("GET", url);
		 //client.setAutoRedirect=true;
		 //client.setEnableKeepAlive=true;
		 // Send the request.
		 //client.setRequestHeader("Host","dev.invitationsbydawn.com");
		 //client.setRequestHeader("User-Agent","Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3");
		 //client.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
		 client.send();
		
	});
	//add behavior
	
	return self;
};

module.exports = ImagesView;