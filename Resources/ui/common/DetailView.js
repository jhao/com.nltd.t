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
		lbl.text = e.Name
		imageView.image="http://media.theoccasionsgroup.com/is/image//user-uploads/"+e.V
		imageView.width=e.Width;
		imageView.height=e.Height;
		//lbl.text = e.Name+': '+e.V+':'+e.Width+':'+e.Height+':'+e.Dpi;
		/*
		lbl.text = e.name+': $'+e.price;
		var url = "http://192.168.98.203:8080/catalog/pegasus/get_useridbyemail.jsp?email="+e.name+"&siteCode="+e.price;
		 //url='http://maps.googleapis.com/maps/api/geocode/json?address=tianjin&region=us&sensor=true';
		 var client = Ti.Network.createHTTPClient({
		     // function called when the response data is available
		     onload : function(e) {
		         Ti.API.info("Received text: " + this.responseText);
				 {
				 	var userid=this.responseText.replace(/\r\n/g,"").replace(/\n/g,"");
				 	var suburl="http://192.168.98.203:8080/catalog/pegasus/get_album_list.jsp?userid="+userid;
				 	var clientsub = Ti.Network.createHTTPClient({
						     onload : function(e) {
						     	 var retstr= this.responseText.replace(/\r\n/g,"").replace(/\n/g,"").replace(',	]',']');
						         Ti.API.info("subReceived text: " + retstr);
						         res=JSON.parse(retstr);
						         Ti.API.info("subReceived text: " + res);
						         if(res)
						         {
						         	for(i=0;i<res.albums.length;i++)
						         	{
						         		Ti.API.info("CatalogId:" + res.albums[i].CatalogId);
						         		Ti.API.info("CatalogName:" + res.albums[i].CatalogName);
						         	}
						         }
						     },
						     // function called when an error occurs, including a timeout
						     onerror : function(e) {
						         Ti.API.debug(e.error);
						         alert(suburl+"|"+'error'+e.error);
						     },
						     timeout : 5000  
						 });
						 // Prepare the connection.
					 clientsub.setAutoRedirect=true;
					 clientsub.setEnableKeepAlive=true;
					 clientsub.open("GET", suburl);
					 // Send the request.
					 clientsub.setRequestHeader("Host","dev.invitationsbydawn.com");
					 clientsub.send();
				 }
				 
				 
		     },
		     // function called when an error occurs, including a timeout
		     onerror : function(e) {
		         Ti.API.debug(url+"|"+e.error);
		         alert(url+"|"+e.error);
		     },
		     timeout : 5000  
		 });
		 // Prepare the connection.
		 client.open("GET", url);
		 //client.setAutoRedirect=true;
		 //client.setEnableKeepAlive=true;
		 // Send the request.
		 //client.setRequestHeader("Host","dev.invitationsbydawn.com");
		 //client.setRequestHeader("User-Agent","Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3");
		 
		 client.send();
		 */
	});
	
	return self;
};

module.exports = DetailView;
