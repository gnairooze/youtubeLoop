
var player;
var player_control;
var video_id;
var start, end;
var player_control_height, player_control_width;
var default_video = "";//"hRn6KDtq3W8";

video_id = getParameter(location.href, "v");

start = 60;
end = 65;

player_control = 'player';
player_control_width = 640;
player_control_height = 390;

setDefualtIfEmpty();

var message = document.getElementById("message");

var video_code = document.getElementById("video_code");

var video_width = document.getElementById("width");
var video_height = document.getElementById("height");

var video_start = document.getElementById("start");
var video_end = document.getElementById("end");


var change_video = document.getElementById("change_video");
change_video.onclick = changeVideo;

var change_range = document.getElementById("change_range");
change_range.onclick = changeRange;

var resize = document.getElementById("resize");
resize.onclick = changeSize;

function changeSize(){
	player_control_width = video_width.value;
	player_control_height = video_height.value;

	player.setSize(player_control_width, player_control_height);

	diaplaySizeValues();
}

function displaySizeValues(){
	video_width.value = player_control_width;
	video_height.value = player_control_height;
}

function displayRangeValues(){
	video_start.value = start;
	video_end.value = end;
}

function displayVideoValue(){
	video_code.value = video_id;
}

function changeRange(){
	start = video_start.value;
	end = video_end.value;

	player.seekTo(start, true);

	displayRangeValues();
}

function changeVideo(){
	player.destroy();
	message.value = "";

	video_id = video_code.value;

	setDefualtIfEmpty();

	onYouTubeIframeAPIReady();

	displayVideoValue();
}

function setDefualtIfEmpty()
{
	if(video_id == null || video_id == "undefined" || video_id == ""){
	video_id = default_video;
}

}

function onYouTubeIframeAPIReady() {
	player = new YT.Player(player_control, {
		height: player_control_height,
		width: player_control_width,
		videoId: video_id,
		playerVars: { 'autoplay': 1, 'controls': 2 },
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			'onError': onPlayerError
		}
	});
}

function onPlayerReady(event) {
	event.target.seekTo(start, true);
}

var done = false;

function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(repeatVideo, (end - start)*1000);
		//done = true;
	}
}

function onPlayerError(event){
	if(event.data == "2")
	{
		message.value = "The request contains an invalid parameter value";
	}
	else if(event.data == "5")
	{
		message.value = "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred";
	}
	else if(event.data == "100")
	{
		message.value = "The video requested was not found";
	}
	else if(event.data == "101" || event.data == "150")
	{
		message.value = "The owner of the requested video does not allow it to be played in embedded players";
	}
	else
	{
		message.value = "Error occurred";
	}
}

function stopVideo() {
	player.stopVideo();
}

function repeatVideo(){
	player.seekTo(start, true);
}