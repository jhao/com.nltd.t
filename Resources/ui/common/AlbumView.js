function AlbumView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});

	self.addEventListener('userSelected', function(e) {
		self.fireEvent('showprocess', e);
		// initialize the window.
		if( self.children ){
			  while( self.children.length > 0 ) {
			    //Ti.API.info( 'Number of children: ' + possibleTagViewArea.children.length );
			    self.remove( self.children[0] );
			    //wait(10);
			    //Ti.API.info( 'Deleted child at 0' );
		  }
		}
		// save the parameter values
		var sidecode=e.sitecode;
		var useremail=e.name;
		
		//var url = "https://multisitemanager.theoccasionsgroup.com/catalog/pegasus/get_useridbyemail.jsp?email="+e.name+"&siteCode="+e.sitecode;
		var url =  Titanium.App.Properties.getString('url')+"/catalog/pegasus/get_useridbyemail.jsp?email="+e.name+"&siteCode="+e.sitecode;
		 //url='http://maps.googleapis.com/maps/api/geocode/json?address=tianjin&region=us&sensor=true';
		 Ti.API.info("get_useridbyemail url :" + url);
		 //create a network object
		 var client = Ti.Network.createHTTPClient({
		     // get the useid from url
		     onload : function(e) {
		         Ti.API.info("Received text: " + this.responseText);
				 {
				 	Ti.API.info("userid :" + this.responseText);
				 	var userid=this.responseText.replace(/\r\n/g,"").replace(/\n/g,"");
				 	if(userid.indexOf('<')>-1)
				 	{
				 		alert('there some wrong with your input \n please goback and check your input');
				 		return;
				 	}
				 	//var suburl="https://multisitemanager.theoccasionsgroup.com/catalog/pegasus/get_album_list.jsp?userid="+userid;
				 	var suburl=Titanium.App.Properties.getString('url')+"/catalog/pegasus/get_album_list.jsp?userid="+userid;
				 	Ti.API.info("suburl: " + suburl);
				 	var clientsub = Ti.Network.createHTTPClient({
						// get the album list from url
						onload : function(e) {
							// delete the unuseful content from the result
					     	 var retstr= this.responseText.replace(/\r\n/g,"").replace(/\n/g,"").replace(',	]',']');
					         if(retstr.indexOf('<')>-1)
							 {
								alert('No User in '+sidecode);
								return;
							 }
					         Ti.API.info("subReceived text: " + retstr);
					         res=JSON.parse(retstr.replace(/CatalogName/g,"title"));
					         Ti.API.info("subReceived text: " + res);
					         if(res)
					         {
					         	// bind the data to table
					         	if (self && self.children && self.children[0]) {
								    self.remove(self.children[0]);
								}
					         	var table = Ti.UI.createTableView({
									data:res.albums
								});
								self.add(table);
								table.addEventListener('click', function(e) {
									self.fireEvent('itemSelected', {
										userid:userid,
										albumid:e.rowData.CatalogId,
										sidecode:sidecode,
										useremail:useremail
									});
								});
								Ti.API.info("==========OK=============");
					         }
					     },
					     // function called when an error occurs, including a timeout
					     onerror : function(e) {
					         Ti.API.debug(e.error);
					         alert(suburl+"\n"+'error'+e.error);
					     },
					     timeout : 5000  /* in milliseconds */
					 });
					 // Prepare the connection.
					 //clientsub.setAutoRedirect=true;
					 //clientsub.setEnableKeepAlive=true;
					 clientsub.open("GET", suburl);
					 // Send the request.
					 //clientsub.setRequestHeader("Host","dev.invitationsbydawn.com");
					 clientsub.send();
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
module.exports = AlbumView;