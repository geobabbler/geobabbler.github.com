var panels = [];
var displaySidebar = true;
var currentPanel = "";
var isLocal = false;
var isIE = false;


function InitViewer()
{

    isIE=(navigator.appName.indexOf("Microsoft")!=-1)?1:0;
	window.onresize = resizeApp; 
		
	isLocal = (baseUrl.indexOf("http://") == -1);


    var md = document.getElementById('map');
    md.style.position = "relative";
    md.style.width = "100%";
    md.style.height = "100%";

    
    //=================
    //header
    var sidebar = e("sidebar");
    CreatePanels(sidebar);

    var toolbar = e("toolbar");
    CreateHeader(toolbar);
    
    
    resizeApp();



}



function OnToolbarClick(panel)
{
	if (panel == -1) 
	{
		ToggleSidebar(!displaySidebar);
	} else {
		for (var i=0; i<panels.length; i++)
		{
			var ii = panels.length-1-i;
			var p = panels[ii];
			if (ii == panel)
			{
				ChangePanel(p.Name);
				ToggleSidebar(true);
				break;
			}
		}
	}
	
}

function ChangePanel(panelName)
{
	currentPanel = panelName;
	for (var i=0; i<panels.length; i++)
	{
		var p = panels[i];
		if (p.Name == panelName)
		{
			p.style.visibility = "visible";
			var pht = e("PanelHeaderText");
			e.innerHTML = p.Name;
			
		} else {
			p.style.visibility = "hidden";
		}
	}
}

function ToggleSidebar(show)
{
	
	displaySidebar = show;
	var tsb = e("ToggleSidebar");
	if (tsb != null)
	{
		var vs = "visible";
		if (show) 
		{
			ChangePanel(currentPanel);
			tsb.innerHTML = "hide >>";
			vs = "visible";
			
		} else {
		
			tsb.innerHTML = "<< show";
			vs = "hidden";
		}
		
		for (var i=0; i<panels.length; i++)
		{
			var li = e("tb" + i);
			li.style.visibility = vs;
		}
	}
	resizeApp();
}


function CreateHeader(toolbar)
{
	//image
	var spn = document.createElement("div");
	if (imageUrl != "") 
	{
		var img = document.createElement("img");
		img.src = imageUrl;
		spn.appendChild(img);
		toolbar.appendChild(spn);
		
	}
	
	//title
	spn = document.createElement("div");
	var h1 = document.createElement("h1");
	h1.appendChild(document.createTextNode(title));
	spn.appendChild(h1);

	toolbar.appendChild(spn);


	//tools area
	CreateToolbar(toolbar);
}


function CreateToolbar(toolbar)
{
	var ul = e("toolbar-controls");
	ul.style.position = "absolute";
	ul.style.right = "5px";
	ul.style.bottom = "5px";
	
	
	for (var i=0; i<panels.length; i++)
	{
		var p = panels[i];
		
		var html = "<a href='javascript:OnToolbarClick(" + i + ")'>" + p.Name.toLowerCase() + "</a>";
		html += "|";
		var li = document.createElement("li");
		li.id = "tb" + i;
		li.innerHTML = html; 
		ul.appendChild(li);
	}
	
	//hide/show button
	var html = "<a id = 'ToggleSidebar' href='javascript:OnToolbarClick(-1)'>hide >></a>";
	var li = document.createElement("li");
	li.innerHTML = html; 
	ul.appendChild(li);		
	

}


function CreatePanels(sidebar)
{
	sidebar.style.backgroundColor = "white";
	
	
	//Legend
	var panel = CreatePanel("pLegend", "Legend");
	CreateLegendPanel(panel);
	sidebar.appendChild(panel);
	
	//Description
	if (description != "") 
	{
		var panel = CreatePanel("pDescription", "Description");
		CreateDescriptionPanel(panel);
		
		sidebar.appendChild(panel);	
	}
	
	//Tools
	//var panel = CreatePanel("pTools", "Tools");
	//CreateToolsPanel(panel);
	//sidebar.appendChild(panel);	


    	
	//Markers
    if (vt != "OL") {
        var panel = CreatePanel("pMarkers", "Search");
        CreateMarkersPanel(panel);
        sidebar.appendChild(panel);		
    }
	
		
	
	ChangePanel("Legend");
	
	
}

function CreateSidebar(sidebar)
{
	var ph = document.createElement("div");
	ph.id = "SidebarHeader";	
	ph.style.position = "absolute";
	ph.style.left = 0;
	ph.style.top = 0;
	//ph.style.width = "100%";
	ph.style.height = "20px";
	ph.style.marginLeft = "3px";
	ph.style.marginTop = "3px";
	ph.style.marginRight = "3px";
	ph.style.marginBottom = "3px";
	//ph.style.border = "1px";
	ph.stylebackgroundColor = "red";
	//sidebar.appendChild(ph);


	//span
	var pht = document.createElement("span");
	pht.id = "SidebarHeaderText";
	pht.style.position = "absolute";
	pht.style.left = "3px";
	pht.style.top = "3px";
	//ph.appendChild(pht);
		
	
	
	
	var phc = document.createElement("div");
	phc.id = "SidebarContent";	
	phc.style.position = "absolute";
	phc.style.left = 0;
	phc.style.top = "0px";	
	phc.overflow = "auto";
	phc.style.border = "1px";
	phc.style.backgroundColor = "blue";
	sidebar.appendChild(phc);
	
	return phc;
	
}

function CreatePanel(id, name)
{

		
	var p = document.createElement("div");
	p.id = id;
	p.Name = name;
	p.className  = "sidebarPanel";
	p.overflow = "auto";
	p.style.position = "absolute";
	p.style.left = 3;
	p.style.top = 3;
	//p.style.width = "100%";
	//p.style.height = "100%";
	//p.style.visibility = "hidden";
	p.style.marginTop = "4px";
	p.style.marginLeft = "4px";
	p.style.marginRight = "5px";	
	p.innerHMTL = name;
	panels.push(p);
	return p;
}

function CreateLegendPanel(panel)
{
	var html = sbl("Legend", true) + "";

	var url = baseUrl + "/Legend.png"
	if (isLocal) {
		url = baseUrl + "\\Legend.png"
	}
	//alert("legend " + url);
    if (vt != "OL") {
        html += "<input type='button' id='cmdToggleLayer' value='Toggle Layer'></button>";
    }
	html += "<br><br><img src='" + url + "'/>";
	panel.style.backgroundColor = "white";
	panel.innerHTML = html;
}


function CreateToolsPanel(panel)
{

	var html = sbl("Tools", true) + "";
	html += sth("Current Position");
	html += sbl("X:", false) + "<input id='txtX'></input><br>";
	html += sbl("Y:", false) + "<input id='txtY'></input><br>";
	
	
	html += spc();
	html += sth("Measure");
	html += spc();
	html += spc();
	
	html += spc();
	html += sth("Print");
	html += spc();
	html += spc();
	
	panel.innerHTML = html;
	
}


function CreateMarkersPanel(panel)
{
	//var tb = document.createElement("input");
	//tb.id = "txtSearch";
	var html = sbl("Search", true) + "";
	var txt = "Address, Lat/Lng";
	html += sbl(txt, false) + "<br>";
	html += "<input id='txtSearch' ></input><input id='cmdSearch' type='button' value='Go'/>";
	html += "<div id='lblSearchStatus' ></div><br>";
	html += "<div id='markers' style='width:100%;'></div>";
	

	//panel.appendChild(tb);
	panel.innerHTML = html;
	
	//panel.appendChild(document.createTextNode("Find "));
}

function CreateDescriptionPanel(panel)
{

	var html = sbl("Description", true);
	panel.innerHTML = html + "<p>" + description + "</p>";
}

function sbl(text, header)
{
	if (header)
	{
		return "<div class='sidebarHeaderLabel'>" + text + "</div>" + spc();
	} else {
		return "<span class='sidebarLabel'>" + text + "</span>";
	}
}

function spc()
{
	return "<div class='sidebarSpacer'></div>"; 
}

function sth(tool)
{

	return "<div class='sidebarToolHeader'>" + tool + "</div>";

}


function CreateLayerDropdown(header)
{
	cboLayers = document.createElement("select");
	cboLayers.id = "cboLayers";
	cboLayers.style.width = 150;
	//header.appendChild(cboLayers);
	//cboLayers.onchange = OnLayerChanged();
	
	return cboLayers;
}

function OnLayerChanged()
{
	//alert(cboLayers.selectedIndex);
	if (cboLayers.selectIndex > -1)
	{
		map.setMapType(map.mapTypes(cboLayers.selectIndex));
	}
}



function e(id)
{
    return document.getElementById(id);
}


function getWindowHeight() 
{
	// Standard browsers (Mozilla, Safari, etc.)
	if (self.innerHeight)
	return self.innerHeight;
	// IE 6
	if (document.documentElement && document.documentElement.clientHeight)
	return document.documentElement.clientHeight;
	if (document.body)
	return document.body.clientHeight;
	// Just in case.
	return 0;
	
}

function resizeApp() 
{
	var mapWrap = e("map-wrapper");
	var sidebar = e("sidebar");
	var mapDiv = e("map");
	var height = getWindowHeight() - document.getElementById('toolbar').offsetHeight - 30;
	mapDiv.style.height = height + 'px';
	


	
	if (displaySidebar) 
	{
		sidebar.style.height = height + 'px';
		
		sidebar.style.visibility = "visible";
		sidebar.style.width = "250";
		mapWrap.style.marginRight = "260px";
		if (isIE)
		{
			sidebar.style.right = 10;
		} else {
			sidebar.style.right = 0;
		}
		
		
		//panels
		for (var i=0; i<panels.length; i++)
		{
			var p = panels[i];
			p.style.left = "0px";
			p.style.top = "0px";
			p.style.right = "0px";
			p.style.bottom = "0px";
		}
			
	} else {
		
		mapWrap.style.marginRight = "2px";
		
		sidebar.style.visibility = "hidden";
		for (var i=0; i<panels.length; i++)
		{
			var p = panels[i];
			p.style.visibility = "hidden";
		}
	}
    
    
    if (map != null) {
        if (vt == "GM") {
        
            map.checkResize();
        }
        else if (vt == "VE") {
            map.Resize(mapWrap.offsetWidth, height);
        }
        else if (vt == "OL") {
        
        }
    }
	
	
}
