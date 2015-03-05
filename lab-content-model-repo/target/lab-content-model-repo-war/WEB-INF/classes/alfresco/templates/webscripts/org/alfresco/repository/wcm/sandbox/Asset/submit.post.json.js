/*
 *  Submit the modified items within a sandbox (JSON)
 */  
function main()
{
	var urlElements = url.extension.split("/");
	var shortName = urlElements[0];
	var boxName = urlElements[2];

	
	if(!json.has("label"))
	{
		status.setCode(status.STATUS_BAD_REQUEST, "property 'label' missing when submitting");
		return;
	}
	
	if(!json.has("comment"))
	{
		status.setCode(status.STATUS_BAD_REQUEST, "property 'comment' missing when submitting");
		return;
	}
	
	var webproject = webprojects.getWebProject(shortName);
	if (webproject == null)
	{
		// Web Project cannot be found
		status.setCode(status.STATUS_NOT_FOUND, "The webproject, " + shortName + ", does not exist.");
		return;
	}
	
	var sandbox = webproject.getSandbox(boxName);
	if (sandbox == null)
	{
		// Site cannot be found
		status.setCode(status.STATUS_NOT_FOUND, "The sandbox, " + boxName + ", in webproject, "  +  shortName + ", does not exist.");
		return;
	}
	
	// URL
	var webApp = args["webApp"];
	// Mandatory
	var label = json.get("label");
	var comment = json.get("comment");
	// Optional
	var isAll = false;
	if(json.has("all"))
	{
		isAll = json.getBoolean("all");
	}
	var assets = null;
	if(json.has("assets"))
	{
		assets = json.getJSONArray("assets");
	}
	var paths = null;
	if(json.has("paths"))
	{
		paths = json.getJSONArray("paths");
	}
	
	if(paths == null && assets == null && isAll == false )
	{
		status.setCode(status.STATUS_BAD_REQUEST, "One of 'all', 'assets' or 'paths' must be specified");
		return;
	}
	
	// Now do the submit
	if(isAll)
	{
	    if(webApp != null)
	    {
		    sandbox.submitAllWebApp(webApp, label, comment);
	    }
	    else
	    {
		    sandbox.submitAll(label, comment);
	    }
	}
	else
	{
		var i = 0;
		var input = new Array();
		
		if(assets != null)
		{
			for(var x = 0; x < assets.length(); x++)
			{	
				var jsonObj = assets.getJSONObject(x);
				input[i++] = jsonObj.get("path");				
			}
		}
		
		if(paths != null)
		{
			for(var k = 0; k < paths.length(); k++)
			{
				var path = paths.get(k);
				input[i++] = path;
			}
		}
		
		// submit a list of files and directories
		sandbox.submit(input, label, comment);
	}
	
	// set model properties
	model.sandbox = sandbox;
	model.webproject = webproject;
	
	status.setCode(status.STATUS_OK, "Submitted");
}

main()
	
