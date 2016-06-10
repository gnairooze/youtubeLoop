var origin_domain = "http://localhost:8070/";

var player;
var video_id, video_name;
var start = 0;
var end = 1;

var repeatInterval;
var canResetRange;

canResetRange = true;

function changeVideoCode(){
	if(player){
		player.destroy();
		clearInterval(repeatInterval);
	}

	canResetRange = true;

	onYouTubeIframeAPIReady();
}

function onYouTubeIframeAPIReady() {
	if(video_id == "undefined" || video_id == "" || video_id == null){
		return;
	}

	player = new YT.Player(player_control, {
		width: '100%',
		videoId: video_id,
		playerVars: { 'autoplay': 1, 'controls': 2 },
		origin: origin_domain,
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			'onError': onPlayerError,
			'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
			'onPlaybackRateChange': onPlayerPlaybackRateChange, 
			'onApiChange': onPlayerApiChange
		}
	});
}

function resetVideoRange(){
	if(canResetRange){
		start = 0;
		end = player.getDuration();
		canResetRange = false;
	}
}

function manageInterval(event){
	if (event.data == YT.PlayerState.PLAYING) {
		repeatInterval = setInterval(repeatVideo, 1000);
	}
	else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED)
	{
		clearInterval(repeatInterval);
	}
}

function repeatVideo(){
	if(player.getCurrentTime){
		if(player.getCurrentTime() >= end){
			player.seekTo(start, true);	
		}
	}
}
