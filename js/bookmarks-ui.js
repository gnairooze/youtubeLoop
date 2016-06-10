
var bookmarks = document.getElementById("bookmarks");

var videos = document.getElementById("videos");
videos.onchange = onSelectedVideoChanged;

var add_bookmark = document.getElementById("add_bookmark");
add_bookmark.onclick = addBookmark;

function addBookmark(){
	var exists = checkBookmark();
	if(exists)
	{
		message.innerHTML = "bookmark (" + video_start.value +","+ video_end.value + ") already exists";
		return;
	}

	var id = video_start.value +"_"+ video_end.value;
	var value = video_start.value +","+ video_end.value;
	
	addMark(video_id, value);

	if(!checkVideoCode(video_id))
	{
		addVideoCode(video_id, video_id, true);	
		onSelectedVideoChanged();
	}
	else
	{
		addBookMarkElements(id, value);
	}
}

function addBookMarkElements(id, value){
	var bookmark = document.createElement("li");
	
	var restoreBookmark = document.createElement("a");
	restoreBookmark.href = "#";
	restoreBookmark.innerHTML = value;
	restoreBookmark.onclick = createBookmark;
	bookmark.appendChild(restoreBookmark);

	var delBookmark = document.createElement("a");
	delBookmark.href = "#";
	delBookmark.innerHTML = "-";
	delBookmark.onclick = removeBookmark;

	bookmark.appendChild(delBookmark);

	bookmark.id = id;

	bookmarks.appendChild(bookmark);
}

function checkBookmark(){
	var exists = document.getElementById(video_start.value +"_"+ video_end.value);
	if(exists){
		return true;
	}
	else
	{
		return false;
	}
}

function removeBookmark(event){
	var li = event.target.parentElement;
	var ol = event.target.parentElement.parentElement;

	ol.removeChild(li);

	var markValue = event.target.previousSibling.innerHTML;
	removeMark(video_id, markValue);

	var remainingMarksCount = getMarks(video_id);
	if(remainingMarksCount == 0){
		removeCode(video_id);
	}
}

function createBookmark(event){
	var range = event.target.innerHTML.split(",");
	video_start.value = range[0];
	video_end.value = range[1];
}

function intializeVideoCodes(){
	loadCodes();

	var selectedVideoCode = "";

	if(codes == null)
	{
		return;
	}

	for (var i = 0; i < codes.length; i++) {
		var videoCode = codes[i];
		var isFirst = i == 0;
		
		addVideoCode(videoCode.Name, videoCode.Code, isFirst);

		if(isFirst)
		{
			selectedVideoCode = videoCode.Code;

			video_id = selectedVideoCode;

			videos.options.selectedIndex = 0;

			onSelectedVideoChanged();
		}
	}

	if(selectedVideoCode != "")
	{
		initializeMarks(selectedVideoCode);
	}
}

function initializeMarks(code){
	bookmarks.innerHTML = "";

	var marks = getMarks(code);

	if(marks == null || marks == "undefined")
	{
		return;
	}

	for (var i = marks.length - 1; i >= 0; i--) {
		var mark = marks[i];

		var range = mark.split(",");
		var start = range[0];
		var end = range[1];
		var id = start + "_" + end;

		addBookMarkElements(id, mark);
	}
}

function onSelectedVideoChanged(){
	video_id = videos.options[videos.options.selectedIndex].value;

	video_code.value = video_id;

	initializeMarks(video_id);
}

function addVideoCode(name, code, selected){
	var optionVideo = document.createElement("option");
	optionVideo.value = code;
	optionVideo.innerHTML = name;

	if(selected)
	{
		optionVideo.selected = "selected";
	}

	videos.appendChild(optionVideo);
}

function checkVideoCode(code){
	for (var i = videos.options.length - 1; i >= 0; i--) {
		var videoOption = videos.options[i]

		if(videoOption.value == code){
			return true;
		}
	}

	return false;
}

window.onload = function(){
	intializeVideoCodes();	
}