function AlbumView() {
	var self = Ti.UI.createView({
		backgroundColor:'white'
	});
	
	//some dummy data for our table view
	/*var tableData = [];
	
	var table = Ti.UI.createTableView({
		data:tableData
	});
	
	self.add(table);
	*/
	self.addEventListener('userSelected', function(e) {
		var url = "http://192.168.98.203:8080/catalog/pegasus/get_useridbyemail.jsp?email="+e.name+"&siteCode="+e.sitecode;
		 //url='http://maps.googleapis.com/maps/api/geocode/json?address=tianjin&region=us&sensor=true';
		 
		 var client = Ti.Network.createHTTPClient({
		     // function called when the response data is available
		     onload : function(e) {
		         Ti.API.info("Received text: " + this.responseText);
				 {
				 	Ti.API.info("userid :" + this.responseText);
				 	var userid=this.responseText.replace(/\r\n/g,"").replace(/\n/g,"");
				 	var suburl="http://192.168.98.203:8080/catalog/pegasus/get_album_list.jsp?userid="+userid;
				 	Ti.API.info("suburl: " + suburl);
				 	var clientsub = Ti.Network.createHTTPClient({
						     onload : function(e) {
						     	 var retstr= this.responseText.replace(/\r\n/g,"").replace(/\n/g,"").replace(',	]',']');
						         Ti.API.info("subReceived text: " + retstr);
						         res=JSON.parse(retstr.replace(/CatalogName/g,"title"));
						         Ti.API.info("subReceived text: " + res);
						         if(res)
						         {
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
											albumid:e.rowData.CatalogId
										});
									});
									Ti.API.info("==========OK=============");
						         	// for(i=0;i<res.albums.length;i++)
						         	// {
						         		// Ti.API.info("CatalogId:" + res.albums[i].CatalogId);
						         		// Ti.API.info("CatalogName:" + res.albums[i].CatalogName);
						         	// }
						         }
						     },
						     // function called when an error occurs, including a timeout
						     onerror : function(e) {
						         Ti.API.debug(e.error);
						         alert(suburl+"|"+'error'+e.error);
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
				 
				 
/*		         var res = JSON.parse(this.responseText);
		            if(res) {
		            	if(res.status=="OK")
		            	{
		            		alert("Location: " + res.geometry.location.lat + ', ' + res.geometry.location.lng);
		            	}
		                
		            }
*/
		     },
		     // function called when an error occurs, including a timeout
		     onerror : function(e) {
		         Ti.API.debug(url+"|"+e.error);
		         alert(url+"|"+e.error);
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