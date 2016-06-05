function getParameter(url, name)
{
	name = name.replace(/[\[\]]/g, "\\$&"); 
	code = null; 
	
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url); 
	
	if (!results) 
	{
		code = null; 
	} 
	else if (!results[2]) 
	{
		code = '';
	} 
	else 
	{ 
		code = decodeURIComponent(results[2].replace(/\+/g, " ")); 
	} 
	
	return code;
}