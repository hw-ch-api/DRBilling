
  
function getAssetsForOwner()
{
    var ajaxURL = "/partner/getassets?owner="+document.partner.owner.value;
    
    
    		        // avoid browser cache issue 
		var currentTime = +new Date();
		ajaxURL = ajaxURL + "&t="+currentTime;
    
  	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	//	alert("response="+xmlhttp.responseText);
        var jsonData = JSON.parse(xmlhttp.responseText);
        setAssetsData(jsonData);
     }
 };
xmlhttp.open("GET", ajaxURL, true);
xmlhttp.send();

    
}

function addMainDiv()
{
    
    var maindiv = document.createElement('div');
   	maindiv.className ="Table";
   	maindiv.id="sowmaindiv";
   	
   	var headingDiv = document.createElement('div');
   	headingDiv.className="Heading";
   	
   	var thheadingDiv1 = document.createElement('div');
   	thheadingDiv1.className="Cell";
   	thheadingDiv1.innerHTML = "<p>Document Name</p>";

   	var thheadingDiv2 = document.createElement('div');
   	thheadingDiv2.className="Cell";
   	thheadingDiv2.innerHTML = "<p>Size</p>";
   	
   	headingDiv.appendChild(thheadingDiv1);
   	headingDiv.appendChild(thheadingDiv2);
   	
   	maindiv.appendChild(headingDiv);
   	
   	var rowsDiv = document.getElementById('sowrows');
   	
   		rowsDiv.appendChild(maindiv);

}


function setAssetsData(jsonData)
{
    clearDIV('sowrows');
   
    
    if(jsonData.entities.length>0)
        {
            addMainDiv();
        }
        else
        {
            var rowsDiv = document.getElementById('sowrows');
            //rowsDiv.innerHTML = "<p> No Records Found</p>";
        }
    
    
    for (var i=0;i<jsonData.entities.length;i++)
    {
        var asset = jsonData.entities[i];
        var name = asset.name;

      //  var uploadDiv = document.createElement('div');
     //   uploadDiv.innerHTML = "<p>"+name+"</p>";	 
        
     //   mainuploaddiv.appendChild(uploadDiv);
        
        
        var fileMetaData = new Object;
   
    if(eval(asset['file-metadata']))
    {
        if(asset['file-metadata']['content-type'])
        {
            fileMetaData.content_type= (asset['file-metadata'])['content-type'];
        }
        
        if(asset['file-metadata']['content-length'])
        {
            fileMetaData.content_length= asset['file-metadata']['content-length'];
        }

        if(asset['file-metadata'].checksum)
        {
            fileMetaData.checksum = asset['file-metadata'].checksum;
        }

        if(asset['file-metadata'].etag)
        {
            fileMetaData.etag = asset['file-metadata'].etag;
        }
        
        
    }
    
    var size="";
    
    var inkb = ((fileMetaData.content_length)/1024);
    
    if(!isNaN(inkb))
    {
        size = inkb.toFixed(2) + " KB";
    }

    
    
    var maindiv = document.getElementById('sowmaindiv');
   	
   	var row = document.createElement('div');
   	row.className ="Row";
   	
	var sowpartner = document.createElement('div');
	sowpartner.id = "row"+i;
	sowpartner.className = "Cell";
//	var html = "<p><a href='javascript:downloadFile("+asset.uuid+"\',\'"+asset.name+"\')'>"+asset.name+"</a></p>";

	    var currentTime = +new Date();   
	var html = "<p><a href='/passets/download?uuid="+asset.uuid+"&name="+asset.name+"&t="+currentTime+"'>"+asset.name+"</a></p>";

	sowpartner.innerHTML = html;
	row.appendChild(sowpartner);
	var sowsize = document.createElement('div');
	sowsize.id = "size"+i;
	sowsize.className = "Cell";
	var html = "<p>"+size+"</p>";
	sowsize.innerHTML = html;
	row.appendChild(sowsize);
	
	maindiv.appendChild(row);
	

        
    }
}
	
	
function clearDIV(pDivName)
{
	var lDIV = document.getElementById(pDivName);
	var lCount;
	if (lDIV && lDIV.childNodes != null)
	{
		if (lDIV.childNodes.length > 0)
		{
			for(lCount = lDIV.childNodes.length - 1; lCount >= 0; lCount--)
			{
				lDIV.removeChild(lDIV.childNodes[lCount]);
			}
		}
	}
}
	
  
  


$(document).ready(function(){
 
 showView(); 

   
});


function showView()
{
 
		
		var aurl ="/partner/get?partnerid="+pData;
		
		        // avoid browser cache issue 
		var currentTime = +new Date();
		aurl = aurl + "&t="+currentTime;
		
				
		var xmlhttp2 = new XMLHttpRequest();
		xmlhttp2.onreadystatechange = function() {
    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
//	alert("response="+xmlhttp.responseText);
        var jsonData = JSON.parse(xmlhttp2.responseText);
        myFunction2(jsonData);
     }
 };
xmlhttp2.open("GET", aurl, true);
xmlhttp2.send();
		
 
}

function myFunction2(jsonData) {
    
	for (var i = 0; i < jsonData.entities.length; i++) {
    var counter = jsonData.entities[i];
  //  alert("counter."+counter.company_name);
  
  
  

	var company_namediv = document.getElementById('company_name');
	company_namediv.innerHTML = counter.company_name;
	
	var start_datediv = document.getElementById('start_date');
	start_datediv.innerHTML = counter.start_date;

	var end_datediv = document.getElementById('end_date');
	
	if(counter.end_date)
	{
	    end_datediv.innerHTML = counter.end_date;
	}

    if(counter.number_of_units)
    {
	    var number_of_unitsdiv = document.getElementById('number_of_units');
	    number_of_unitsdiv.innerHTML = counter.number_of_units;
    }

    if(counter.instal_fee_per_unit)
    {
	    var install_fee_per_unitdiv = document.getElementById('instal_fee_per_unit');
	    install_fee_per_unitdiv.innerHTML = counter.instal_fee_per_unit;
    }
	
	if(counter.fee_per_unit)
    {
	    var fee_per_unitdiv = document.getElementById('fee_per_unit_year');
	    fee_per_unitdiv.innerHTML = counter.fee_per_unit;
    }
	
	
	 var ee_fee_per_unitdiv = document.getElementById('ee_fee_per_unit');
    if(counter.ee_fee_per_unit)
	{
	    ee_fee_per_unitdiv.innerHTML = counter.ee_fee_per_unit;
	}
	
	var is_sgsBox = document.getElementById('is_sgs');
	
	if(counter.sgs_partner=="true")
	{
	    document.getElementById('is_sgs').checked="true";
	}
	
	var ee_participationbox = document.getElementById('ee_participation"');
	
	if(counter.ee_participation)
    {	
	if(counter.ee_participation=="true")
	{
	    document.getElementById('ee_participation').checked="true";
	}
    }
	
	var load_shed_programbox = document.getElementById('load_shed_program"');
	
	if(counter.load_shed_program)
    {	
	if(counter.load_shed_program=="true")
	{
	    document.getElementById('load_shed_program').checked="true";
	}
    }
		
    if(counter.units_billed)
    {
    if(counter.units_billed=="number_of_devices")
    {
	   document.partner.units_billed[0].checked=true;
    }
    else
    {
        document.partner.units_billed[1].checked=true;
    }
    }   
   document.partner.owner.value=counter.owner;
   
    

	
}

getAssetsForOwner();
}


function deletePartner()
{
    var result = confirm("Are you sure you want to delete?");
    if (result) 
    {
        var uuid = document.getElementById("uuid");
         window.location="/partner/delete?uuid="+uuid.value;   
    }    

}

function downloadFile(puuid,fname)
{
    var currentTime = +new Date();   
     window.location="/passets/download?uuid="+puuid+"&name="+fname+"&qq="+currentTime; 
}
  
  