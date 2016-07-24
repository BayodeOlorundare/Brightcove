/****
	*
	*
	*
	New Brightcove API coding 
	Update the playlistIds with your own
	Change the class names and ids to your personal naming convention
			*
			*
			*
			*/	
var myPlayer,
	playlistIds = ["1234567890123","1234567890124","1234567890125","1234567890126","1234567890127"],
	playlistIdsLength = playlistIds.length,
	tabs = document.getElementsByClassName("brightcove-vidhub-button"),
	currentTab,
	currentTabName,
	currentvideo,
	playlistNames = [];
//Once the player is ready, it will load the first (latest) playlist	
videojs("brightcove-videohub-player").ready(function(){
	myPlayer = this;
	processTab(0);
});
//This loads the selected playlist on the page
function processTab (index) {
	resetTabs();
	loadplaylistentries();
	document.getElementById("tab" + index).setAttribute("style","background:#00AFDB;color: #fff;border-radius: 10px;padding: .5em 1em;border: none;font-family: Arial,Helvetica,sans-serif;font-size: 18px;font-weight: normal;letter-spaing: -1px;line-height: 23.4px; text-align: left; zoom: 1;");
	//Checks if player is paused; will only load new playlist 
	if(myPlayer.paused()) {
		loadPlaylist(playlistIds[index]);
	} else {
		loadPlaylistply();
		console.log('mediainfo', myPlayer.mediainfo);	
	};
};
//This loads the video into player
function loadPlaylist (currentId) {
	myPlayer.catalog.getPlaylist(currentId, function(error, playlist){
		myPlayer.catalog.load(playlist);				
	});
	//video metadata populates
		loadmetadata();	
};
//This loads the playlist on the page; not in player
function loadPlaylistply (currentId) {
	myPlayer.catalog.getPlaylist(currentId, function(error, playlist){
		myPlayer.catalog.load(playlist);
	});
};
//This reloads the tabs
function resetTabs () {
	var i,
		iMax = tabs.length;
	for (i = 0; i < iMax; i++) {
		tabs[i].setAttribute("style", "background: #fff;color: #000;border-radius: 10px;padding: .5em 1em;border: none;font-family: Arial,Helvetica,sans-serif;font-size: 18px;font-weight: normal;letter-spaing: -1px;line-height: 23.4px; text-align: left; zoom: 1;")
	}
	$('#loadMore').show();
};
//This loads all metadata
function loadmetadata() {
	var playerdata = videojs('brightcove-videohub-player').ready(function(){
		var myPlayer = this;
		myPlayer.on('loadstart',function(){
			//video category populates
			$('#brightcove-vidhub-vidcat').html(myPlayer.mediainfo.custom_fields.category);
			//video title populates
			$('#brightcove-vidhub-meta-title').html(myPlayer.mediainfo.name);
			//video description populates
			$('#brightcove-vidhub-meta-desc').html(myPlayer.mediainfo.description);
			//video sponsor populates		
			//$('#video-sponsor').html($(this).closest('.vjs-playlist-item').find('#sponsor').text());
			//if($('#video-sponsor').html() == "") {
				//$('#video-sponsor').hide();
			//};
		});
	});
	//scroll to top after thumbnail is clicked
	$('#vjs-playlist').click(function() {
		$('html, body').animate({
			scrollTop: $('#brightcove-vidhub-top').offset().top
		 }, 2000);
	});
};
//Loads more playlist entries onto screen
function loadplaylistentries() {
	var x = 7,
	y,
	limit_vids = 6,
	load_more_vids = 3;
	y = $('#vjs-playlist li')
	$('#vjs-playlist li:lt(' + x + ')').show();
	jQuery('#vjs-playlist li:gt('+(limit_vids-1)+')').hide();
	jQuery('#loadMore').bind('click', function(event){
		event.preventDefault();
		limit_vids += load_more_vids;
		jQuery('#vjs-playlist li:lt('+(limit_vids)+')').show(1500);
		if (jQuery('#vjs-playlist li').length <= limit_vids) {
			jQuery(this).hide();
		}
	});
};
//Video description show/hide
$(".brightcove-vidhub-arrow-down").hide();
$(".brightcove-vidhub-opthead").click(function(){
	$(".brightcove-vidhub-meta-desc").slideToggle(500);
	$(this).find(".brightcove-vidhub-arrow-down, .brightcove-vidhub-arrow-up").toggle();
});

/****
	*
	*
	*
	Debugger 
			*
			*
			*
			*/
jQuery(document).ready( function(){
	var playerdata = videojs('brightcove-videohub-player').ready(function(){
		var myPlayer = this;
      	myPlayer.on('loadstart',function(){
        	console.log('mediainfo', myPlayer.mediainfo);
      	})
    });
});
