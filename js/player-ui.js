var message = document.getElementById("message");

var video_code = document.getElementById("video_code");
var video_title = document.getElementById("video_title");
var extract_video = document.getElementById("extract_video");
extract_video.onclick = extractVideo;

var change_video = document.getElementById("change_video");
change_video.onclick = changeVideo;

var video_start = document.getElementById("start");
var video_end = document.getElementById("end");
var change_range = document.getElementById("change_range");
change_range.onclick = changeRange;

var fullscreen = document.getElementById("fullscreen");
fullscreen.onclick = runVideo;

var iframe;
var player_control = document.getElementById("player");

function onPlayerPlaybackQualityChange(event){
	message.innerHTML = "Playback quality changed to " + event.data;
}

function onPlayerPlaybackRateChange(event){
	message.innerHTML = "Playback rate changed to " + event.data;
}

function onPlayerApiChange(event){
	message.innerHTML = "API changed";
}

function onPlayerReady(event) {
	message.innerHTML = "player is ready.";

	iframe = document.getElementById("player");

	resetVideoRange();

	player.seekTo(start, true);

	displayRangeValues();
}

function runVideo() {
	//player.seekTo(start, true);

	var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
  	if (requestFullScreen) {
    	requestFullScreen.bind(iframe)();
  	}
}

function onPlayerStateChange(event) {
	manageInterval(event);

	if (event.data == YT.PlayerState.PLAYING) 
	{
		message.innerHTML = "Playing";
	}
	else if (event.data == YT.PlayerState.PAUSED)
	{
		message.innerHTML = "Paused";
	}
	else if (event.data == YT.PlayerState.ENDED)
	{
		message.innerHTML = "Ended";
	}
	else if (event.data == YT.PlayerState.BUFFERING)
	{
		message.innerHTML = "Buffering";
	}
	else if (event.data == YT.PlayerState.CUED)
	{
		message.innerHTML = "Cued";
	}
	else
	{
		message.innerHTML = "Player state changed to " + event.data;	
	}
}

function onPlayerError(event){
	if(event.data == "2")
	{
		message.innerHTML = "The request contains an invalid parameter value";
	}
	else if(event.data == "5")
	{
		message.innerHTML = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred";
	}
	else if(event.data == "100")
	{
		message.innerHTML = "The video requested was not found";
	}
	else if(event.data == "101" || event.data == "150")
	{
		message.innerHTML = "The owner of the requested video does not allow it to be played in embedded players";
	}
	else
	{
		message.innerHTML = "Error occurred " + event.data;
	}
}

function resetMessage(){
	message.innerHTML = "";
}

function displayRangeValues(){
	video_start.value = start;
	video_end.value = end;
}

function setRangeValues(){
	start = video_start.value;
	end = video_end.value;
}

function changeRange(){
	setRangeValues();

	player.seekTo(start, true);
}

function changeVideo(){
	resetMessage();
	refeshVideoVariables();

	changeVideoCode();
}

function extractVideo(){
	var video_param = getParameter(video_code.value, "v");

	if(video_param && video_param != "" && video_param != "undefined"){
		video_id = video_param;
		video_code.value = video_id;
	}
}

function refeshVideoVariables(){
	video_id = video_code.value;
	video_name = video_title.value;
}