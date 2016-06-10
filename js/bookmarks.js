var codes_storage_name = "codes";

var codes = [];

function loadCodes(){
	codes = JSON.parse(localStorage.getItem(codes_storage_name));
}

function saveCodes(){
	localStorage.setItem(codes_storage_name, JSON.stringify(codes));
}

function getVideoCode(code){
	if(codes == null)
	{
		return null;
	}

	for (var i = codes.length - 1; i >= 0; i--) {
		var videoCode = codes[i];

		if(videoCode.Code == code){
			return videoCode;
		}
	}

	return null;
}

function checkVideoCodeExists(code){
	var videoCode = getVideoCode(code)

	if(videoCode == null)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function createCode(name, code){
	var videoCode = getVideoCode(code);

	if(videoCode != null)
	{
		return videoCode;
	}

	var videoCode = {Name: name, Code: code, Marks: []};

	if(codes == null)
	{
		codes = [];
	}
	
	codes.push(videoCode);

	saveCodes();

	return videoCode;
}

function removeCode(code){
	var selectedIndex = -1;

	for (var i = codes.length - 1; i >= 0; i--) {
		var videoCode = codes[i];

		if(videoCode.Code == code){
			selectedIndex = i;
			break;
		}
	}

	if(selectedIndex > -1)
	{
		codes.splice(selectedIndex, 1);	

		saveCodes();
	}
}

function getCodes(){
	return codes;
}

function addMark(code, mark){
	var videoCode = getVideoCode(code);

	if(videoCode == null)
	{
		videoCode = createCode(code, code);
	}

	videoCode.Marks.push(mark);

	saveCodes();

}

function removeMark(code, mark){
	var videoCode = getVideoCode(code);

	if(videoCode != null)
	{
		var selectedIndex = -1;

		for (var i = videoCode.Marks.length - 1; i >= 0; i--) {
			var videoMark = videoCode.Marks[i];

			if(videoMark == mark)
			{
				selectedIndex = i;
				break;
			}
		}

		if(selectedIndex > -1)
		{
			videoCode.Marks.splice(selectedIndex, 1);	

			saveCodes();
		}
	}	
}

function getMarks(code){
	var videoCode = getVideoCode(code);

	if(videoCode != null)
	{
		return videoCode.Marks
	}
	else
	{
		return null;
	}
}
