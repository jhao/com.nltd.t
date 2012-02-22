function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');
		AlbumView = require('ui/common/AlbumView');
		ImagesView = require('ui/common/ImagesView');
		UploadPhoto= require('ui/common/UploadPhoto');
		
	//create object instance
	var self = Ti.UI.createWindow({
		title:'users',
		exitOnClose:true,
		navBarHidden:false,
		backgroundColor:'#ffffff'
	});
	
	//construct UI
	var masterView = new MasterView();
	var	detailView = new DetailView();
	var	albumView = new AlbumView();
	var	imagesView = new ImagesView();
	var	uploadphoto = new UploadPhoto();
		
	//create master view container
	self.add(masterView);

    var friends_left_button = Ti.UI.createButton({
                title : 'Upload'
        });
   	self.leftNavButton = friends_left_button
//     
    // self.add(friends_button_bar)
    
    // friends_button_bar.addEventListener('click',function(e){
    	// uploadphoto.open();
    // });
	var albumContainerWindow = Ti.UI.createWindow({
		title:'Albums',
		navBarHidden:false,
		backgroundColor:'#ffffff'
	});
	albumContainerWindow.add(albumView);
	
	var imageContainerWindow = Ti.UI.createWindow({
		title:'Albums',
		navBarHidden:false,
		backgroundColor:'#ffffff'
	});
	imageContainerWindow.add(imagesView);
	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:'Details',
		navBarHidden:false,
		backgroundColor:'#ffffff'
	});
	detailContainerWindow.add(detailView);
    var uploadphotoContainerWindow = Ti.UI.createWindow({
		title:'uploadphoto',
		navBarHidden:false,
		backgroundColor:'#ffffff'
	});
	uploadphotoContainerWindow.add(uploadphoto);
	//add behavior for master view
	masterView.addEventListener('userSelected', function(e) {
		albumView.fireEvent('userSelected',e);
		albumContainerWindow.open();
	});
	albumView.addEventListener('itemSelected', function(e) {
		imagesView.fireEvent('imageSelected',e);
		imageContainerWindow.open();
	});
	imagesView.addEventListener('imagesSelected', function(e) {
		detailView.fireEvent('itemSelected',e);
		detailContainerWindow.open();
	});
	return self;
};

module.exports = ApplicationWindow;
