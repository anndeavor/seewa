

//require underscore lib
var _ = require("underscore");



var express = require('express')
var app = express()


/*
app.get('/', function (req, res) {
  res.send('Hello seewa World! dasfadafa')
})
*/





var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
   
})




//mongodb require
var MongoClient = require('mongodb').MongoClient,
	db = MongoClient.db,
	ObjectID = require('mongodb').ObjectID;
	
	



// Connection for Mongodb: URL & DB
var url = 'mongodb://localhost:27017/seewa';


// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
	if(!err){
		console.log("Connected correctly to server");
		}else{
			console.log("Not connected correctly to server");
		}




//Express
//Express 


// //Get list of albums w/cover photo
// app.get('/', function( req, res ){
// 	getAlbums(function (galleryList){
// 		console.log(galleryList);
// 		res.send( 'this is from inside express call' +JSON.stringify( galleryList, '\t' ) );
// 	});
// 	
// })


//Get list of albums w/cover photo
app.get('/', function( req, res ){
	galleryList = old_getAlbums( )
	console.log( galleryList );
	res.send( 'this is from inside express from old_getAlbums ' +JSON.stringify( galleryList, '\t' ) );
	
} )
	
	
	
	
	
	
	




//Express: Get photos and comments for one album 
 /*  app.get('/album/', function( req, res, next,  photoURL ){
	
	var albumID = new ObjectID( albumID );
	
	getOneAlbum( albumID );
// 	var albumID = '554b82315479a4c90f01ed3f';
	
	getComments4one( photoURL );
	res.send( '/album/' );
});	*/


	
	
 
 
	
	// Albums section
	// Albums section

	
	var galleries = db.collection( 'galleries' );
	
	

// 	TODO: Make js return properly to browser.
	//Get a list of all albums with cover photo
	 function getAlbums( callback ){
		
		galleries.find( { }, { name: 1, coverPhoto: 1 } ).toArray( 
			function( err, galleryList ) {
			
				if( ! err  ){
					if( galleryList.count < 1 ){
						console.log( 'Currently there are no albums in the gallery.' );
					}
			
			
					/*galleryList.forEach( function( galleryList ) {
						console.log( galleryList );
						
						return JSON.stringify( galleryList, '\t' );
					})*/
					callback(JSON.stringify( galleryList, '\t' ));
			
				}else{
					console.log( 'Get albums error.' + err );
					callback(false);
				}		
			}
		);
		
	 };
			
	//getAlbums();
	
	
	
// 	TODO: Make js return properly to browser.
	//Get a list of all albums with cover photo
	 function old_getAlbums( ){
	 
		galleries.find( { }, { name: 1, coverPhoto: 1 } ).toArray( function( err, galleryList ) {
			
			if( ! err  ){
				if( galleryList.count < 1 ){
					console.log( 'Currently there are no albums in the gallery.' );
				}
			
				galleryList.forEach( function( galleryItem ) {
					console.log( galleryItem );	
				})
				
			
			}else{
				console.log( 'Get albums error.' );
				return false;
			}
			
		return galleryList ;		
		})
	 };
			
	//getAlbums();
	
	

	
	
	 
	 
	//Function: Get one selected album by ID
	function getOneAlbum ( albumId ){
		
			galleries.findOne( { '_id': albumID }, function( err, album)  {
				
				if( !err ){
					console.log( album );
					return album;
				}else{
					//console.log( 'Error getting selected album' );
					return false;
				}
		});
		
	};
	
	//getOneAlbum( albumID );

		
	
	
	
	
	
	
	//Function: Add a new album to collection w/empty photo array
	var newAlbum = 'No PhotoID Test';
	var c_photo = './images/one_JPG';
	
	function addAlbum ( name ){
		
		galleries.insert( 
			{ name: newAlbum, coverPhoto: c_photo, photos:  [   ]  },	 { w: 1 }, function( err, result ) {
					if( !err ){
						console.log( "addition successful." + result[0]._id );
					}else{
						console.log( newAlbum +' has not been created.' );
					}
			}
		);
	}

//addAlbum( newAlbum );


	
	
	
	
	
	//Function: Remove an album by ID
	var removeAlbum = new ObjectID( '557af832643caba210bbe086' );

		function deleteAlbum ( removeAlbum ){

			galleries.remove( {'_id': removeAlbum },  {w:1 },  function(err, result) {
				if( !err ){
					console.log('Album removed' + result);	
				}else{
					console.log( 'Error removing album.' );
				}
			});	
	}	

// 	deleteAlbum( removeAlbum );
	
	

	
	
	
// Photos Section	
// Photos Section
	
	
	// 	//TODO Set Cover photo - needs js
	var a_id = new ObjectID( '55556823e70002f114c76a45' );
	var coverPhoto =   './images/two_JPG';
	
	 galleries.update( 
	 { '_id': a_id }, 
	 { $set: 
		 { coverPhoto: coverPhoto } },
		 { w:1 }, function( err, result ){	
		console.log('Cover photo set ' + result );
	} );
	
	
	 
	 
	
	// Function: Remove a  photo
	var a_ID = new ObjectID('557afdbadf4d7bd4113a37d7'); 
	var photoToRemove = './images/two_JPG'
	
	function removePhoto ( albumId, photoURL ){
	
		galleries.update( 
			
			{ _id: a_ID },
			{ $pull: { photos: { photoURL: photoToRemove } } },
				{ w: 1 },  function( err, result ){
			if( !err ){
				console.log( 'photo removed' + result );
			}else{
				console.log( "Error, photo was not removed." );
			}
		} );
	}

	
//  	removePhoto( a_ID, photoToRemove );
	
	
	
		
	
	
	//Function: Rename album by album id
	var rename_Album = new ObjectID('55556823e70002f114c76a45');
	var newName = 'New new name';
	
	function renameAlbum( albumID, newName ){	
	
		galleries.update( 
			{ _id: rename_Album },  { $set: { 'name': newName } },   function(err, result){
				if( !err ){
				console.log( 'Album successfully renamed. ' + result );
				}else{ 
					console.log( 'Error renaming album, Please try again later.' );
				}
			}	
		)	
	}

// 	renameAlbum( rename_Album, newName );	

									

	
	
	
	 
	//Function: Update, add new photo
	var  myAlbumID= new ObjectID( '557afdbadf4d7bd4113a37d7' );
	var url =  './images/two_JPG';
	
	function addPhoto( albumID, photoURL ){
	
		galleries.update(  
			{_id: myAlbumID },
			{ 
				$push: 
				{ 
					photos: 
					{	
						url:  url, 
						description: ''
					}	
				}	
			},
			{ w: 1 }, function( err, result ){
				if( !err ){
					console.log( 'Photo successfully added. ' + result );
				}else{
					console.log( 'Photo addition failed.' );
				}
			}
		);
	}

// 	addPhoto( myAlbumID, url );
	


	
	
//Function: Edit photo: description
var  myAlbumID = new ObjectID( '55556823e70002f114c76a45' );
var myURL =  './testFive url.';	
var newDescription = ' dfsaf Added / edited comment.';

function editDescript( albumID, url, text ){

	galleries.update(  
		{ _id:		
	 myAlbumID,  "photos.url": myURL },
		{ $set:  { "photos.$.description": newDescription  } },  { w: 1 }, function( err, result ){
			if( !err ){
				console.log( 'Photo description has been successfully changed. ' + result );
			}else{
				console.log( 'Error changing photo description.' );
			}
		}
	)
}
// editDescript( myAlbumID, myURL, newDescription );
	






/// comment section	
/// comment section




//db.createCollection( 'comments' );
var comments = db.collection( 'comments' );


//get a list of all comments
function getAllComments(){

	comments.find().toArray( function( err, commentList ){ 
		commentList.forEach( function( comment ){
			console.log( comment );
			return comment
		} );
	} );
}

//getAllComments( );






//insert a comment
var photo_url =  './testFive url.' ;
var posTime = Date() ;
var comment = "New new new";

function addComment(photoId, text ){
	comments.insert( { photoURL: photo_url, posted: posTime,  comment: comment } ,  {  w: 1 }, function( err, result ){
		console.log( 'Comment successullly added. ' + result  );
			console.log( "New comment was successfully added."  + result );
		} 
	);
}
// addComment( photo_url, comment );
	
	
	

	
	
	
	
//Remove a comment
var commentID = new ObjectID("55614924a7b2a0662173cd82");

function removeComment( commentID ){

	comments.remove( { _id: commentID }, { w: 1 }, function( err, result ){
		console.log( result );
		} 
	);
}
// removeComment( commentID );
		



		
		
		
		

//Edit comment text
var com_ID = new ObjectID("5561492f12be9d7321bd654f");
var newText = "New edited comment";

function editComment( commentID, newText ){
	comments.update( { "_id": com_ID }, { $set: { "comment": newText } }, { w: 1 }, function( err, result ){
		if( ! err ){
			console.log( result + "text update successful" );
			}
		}
	);
}
// editComment( com_ID, newText );









//get comments for one photo
var photoURL = './testFive url.';


function getComments4one( photoURL ){
	comments.find( { photoURL: photoURL } ).toArray( function( err, photoComments ){
		photoComments.forEach( function( comment ){
			console.log( 'comments for one photo: ' + comment );
		});	
	});
}
// getComments4one( photoURL );






//db.close();
});


	



