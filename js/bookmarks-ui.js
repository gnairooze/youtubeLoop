
var bookmarks = document.getElementById("bookmarks");

var add_bookmark = document.getElementById("add_bookmark");
add_bookmark.onclick = addBookmark;

function addBookmark(){
	var exists = checkBookmark();
	if(exists)
	{
		message.innerHTML = "bookmark (" + video_start.value +","+ video_end.value + ") already exists";
		return;
	}

	var bookmark = document.createElement("li");
	
	var restoreBookmark = document.createElement("a");
	restoreBookmark.href = "#";
	restoreBookmark.innerHTML = video_start.value +","+ video_end.value;
	restoreBookmark.onclick = function(event){
		var range = event.target.innerHTML.split(",");
		video_start.value = range[0];
		video_end.value = range[1];
	}
	bookmark.appendChild(restoreBookmark);

	var delBookmark = document.createElement("a");
	delBookmark.href = "#";
	delBookmark.innerHTML = "-";
	delBookmark.onclick = function(event){
		var li = event.target.parentElement;
		var ol = event.target.parentElement.parentElement;

		ol.removeChild(li);
	}
	bookmark.appendChild(delBookmark);

	bookmark.id = video_start.value +"_"+ video_end.value;

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
