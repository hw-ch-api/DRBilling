  $(function() {
    $( "#start_date" ).datepicker();
	$( "#end_date" ).datepicker();
  });
  


$(document).ready(function(){
 
 showView(); 
   
});

function isInt(value) {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  if(x<=0) { return false }
  return (x | 0) === x;
}

function showView()
{
 
		
		var aurl ="/partner/get?partnerid="+pData;
		
				// avoid browser cache issue 
		var currentTime = +new Date();
		aurl = aurl+ "&t="+currentTime
		
				
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//	alert("response="+xmlhttp.responseText);
        var jsonData = JSON.parse(xmlhttp.responseText);
        myFunction2(jsonData);
     }
 };
xmlhttp.open("GET", aurl, true);
xmlhttp.send();
		
 
}

function myFunction2(jsonData) {
    
	for (var i = 0; i < jsonData.entities.length; i++) {
    var counter = jsonData.entities[i];
  //  alert("counter."+counter.company_name);

	var company_namediv = document.getElementById('company_name');
	company_namediv.value = counter.company_name;
	
	var start_datediv = document.getElementById('start_date');
	start_datediv.value = counter.start_date;

	var end_datediv = document.getElementById('end_date');
	
	if(counter.end_date)
	{
	    end_datediv.value = counter.end_date;
	}
	
	if(counter.number_of_units)
	{	
	var number_of_unitsdiv = document.getElementById('no_unit');
	number_of_unitsdiv.value = counter.number_of_units;	
	}
	if(counter.instal_fee_per_unit)
	{	
	var install_fee_per_unitdiv = document.getElementById('fee');
	install_fee_per_unitdiv.value = counter.instal_fee_per_unit;
	}
	if(counter.fee_per_unit)
	{		
	var fee_per_unitdiv = document.getElementById('fee_per_unit_year');
	fee_per_unitdiv.value = counter.fee_per_unit;
	}
	
	var ee_fee_per_unitdiv = document.getElementById('ee_fee_per_unit');
    if(counter.ee_fee_per_unit)
	{
	    ee_fee_per_unitdiv.value = counter.ee_fee_per_unit;
	}
	
	var is_sgsBox = document.getElementById('is_sgs');
	
	if(counter.sgs_partner=="true")
	{
	    document.getElementById('is_sgs').checked="true";
	    disableNoNSGS();
	}

	var ee_participationbox = document.getElementById('objee_participation"');
	if(counter.ee_participation)
	{		
	if(counter.ee_participation=="true")
	{
	    document.getElementById('objee_participation').checked="true";
	}
	}

	var load_shed_programbox = document.getElementById('objload_shed_program"');
	
	if(counter.load_shed_program)
	{		
	if(counter.load_shed_program=="true")
	{
	    document.getElementById('objload_shed_program').checked="true";
	}
	}

	if(counter.load_shed_program)
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


function getAssetsForOwner()
{
    var ajaxURL = "/partner/getassets?owner="+document.partner.owner.value;
    
        // avoid browser cache issue 
		var currentTime = +new Date();
		ajaxURL = ajaxURL + "&t="+currentTime;
    
  	var xmlhttpassets = new XMLHttpRequest();
	xmlhttpassets.onreadystatechange = function() {
    if (xmlhttpassets.readyState == 4 && xmlhttpassets.status == 200) {
	//	alert("response="+xmlhttp.responseText);
        var jsonData = JSON.parse(xmlhttpassets.responseText);
        setAssetsData(jsonData);
     }
 };
xmlhttpassets.open("GET", ajaxURL, true);
xmlhttpassets.send();

    
}

  
  function clearError()
  {
	   document.getElementById('name').innerHTML="";
	   document.getElementById('sgs').innerHTML="";
	   document.getElementById('sdate').innerHTML="";
	   document.getElementById('units').innerHTML="";
	   document.getElementById('load').innerHTML="";
	   document.getElementById('bill').innerHTML="";
	   document.getElementById('setup').innerHTML="";
	   document.getElementById('fees').innerHTML="";
	   document.getElementById('energy').innerHTML="";
	   document.getElementById('EEfee').innerHTML="";
  }
   
   
      function validate(q,qa)
      {
		  	  
		  
		clearError();
         if( document.partner.company_name.value == "" )
         {
			
            document.getElementById('name').innerHTML="*Please enter a Company name*";
			return false;
         }
         
		 if(!DateCheck())
		 {
		     return false;
		 }         
		 
		  if( !(document.partner.is_sgs.checked))
         {
			

		  if( document.partner.start_date.value == "")
         {
			
            document.getElementById('sdate').innerHTML=" *Please enter Start Date*";
			return false;
         }
		 

		 
		 
		 var x =document.getElementById("no_unit").value;
		 
		 if( x == "")
         {
			document.getElementById('units').innerHTML="* Please enter Number of units*";
			return false;
         }
		if(!isInt(x))
         {
			
            document.getElementById('units').innerHTML="*Only Numeric Value*";
			return false;
         }
         
		 
	/*	 if( !(document.Partner.load_shed_program.checked))
         {
			
            document.getElementById('load').innerHTML="*Select Valid Option*";
			return false;
         }
	*/	 
		 if(!(document.partner.units_billed[0].checked) && !(document.partner.units_billed[1].checked))
         {
			
            document.getElementById('bill').innerHTML="*Please enter Unit Billed on*";
			return false;
			}
			
			
			  if( document.partner.instal_fee_per_unit.value == "")
         {
			
            document.getElementById('setup').innerHTML="*Setup fee per Unit*";
			return false;
         }
		 
		 
		 var x =document.getElementById("fee").value;
		 if(isNaN(x))
         {
			
            document.getElementById('setup').innerHTML="*Only Numeric Value*";
			return false;
         }
		 
		 
		 if( document.partner.fee_per_unit_year.value == "")
         {
			
            document.getElementById('fees').innerHTML="*Please Enter Fee per Unit/year*";
			return false;
         }
		 
		  var y = document.partner.fee_per_unit_year.value;
		 if(isNaN(y))
         {
			
            document.getElementById('fees').innerHTML="*Only Numeric Value*";
			return false;
         }
		 
		/*  if( !(document.Partner.energy_efficiency.checked))
         {
			
            document.getElementById('energy').innerHTML="*Select Valid Option*";
			return false;
         }*/
         
          if((document.partner.objee_participation.checked))
          {
		  var x =document.getElementById("ee_fee_per_unit").value;
		 if(isNaN(x))
         {
			
            document.getElementById('EEfee').innerHTML="*Only Numeric Value*";
			return false;
         }
		 
		  if( document.partner.ee_fee_per_unit.value == "")
         {
			
            document.getElementById('EEfee').innerHTML="*Enter Some Value*";
			return false;
         }
          }
         }// end of SGS 
         
         // set default data for check boxes
         
          if( !(document.partner.is_sgs.checked))
         {
            document.getElementById('sgs_partner').value="false";
         }
         else
         {
              document.getElementById('sgs_partner').value="true";
         }
         
          if( !(document.partner.objload_shed_program.checked))
         {
            document.getElementById('load_shed_program').value="false";
         }
         else
         {
             document.getElementById('load_shed_program').value="true";
         }
         
        if( !(document.partner.objee_participation.checked))
         {
            document.getElementById('ee_participation').value="false";
         }         
         else
         {
              document.getElementById('ee_participation').value="true";
         }
        
        
          if(!(document.partner.objee_participation.checked))
          {
               document.partner.ee_fee_per_unit.disabled="false";
               document.partner.ee_fee_per_unit.value="0";
          }
        
        // return( true );
        document.partner.submit();
      }

	  
	 /* function handleClick(cb) {
	
	var c=document.getElementById("objee_participation");
	if(c.checked)
		{
		document.partner.ee_fee_per_unit.disabled=false;
		}
	if(!(c.checked))
		{
		  document.partner.ee_fee_per_unit.value="";
		  document.partner.ee_fee_per_unit.disabled=true;
		
		}
	}*/
	

function DateCheck()
{
  var StartDate= document.getElementById('start_date').value;
  var EndDate= document.getElementById('end_date').value;
  var eDate = new Date(EndDate);
  var sDate = new Date(StartDate);
  
  
   var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

   if(StartDate != '' && !StartDate.match(re)) 
  {
    document.getElementById("sdate").innerHTML= "Please enter valid date";
    return false;    
  }
  
   if(EndDate != '' && !EndDate.match(re)) 
  {
    document.getElementById("error_end_date").innerHTML= "Please enter valid date";
    return false;    
  }  
  


  
  
  
  if(StartDate!= '' && StartDate!= '' && sDate> eDate)
    {
        document.getElementById("error_end_date").innerHTML= "End Date cannot be greater than Start Date.";        
   // alert("Please ensure that the End Date is greater than or equal to the Start Date.");
    return false;
    }
    else
    {
        return true;
    }
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
   	
   	var thheadingDiv3 = document.createElement('div');
   	thheadingDiv3.className="Cell";
   	thheadingDiv3.innerHTML = "<p></p>";
   	
   	headingDiv.appendChild(thheadingDiv1);
   	headingDiv.appendChild(thheadingDiv2);
   	headingDiv.appendChild(thheadingDiv3);
   	
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
   	row.id = "row"+i;
   	
	var sowpartner = document.createElement('div');
	sowpartner.className = "Cell";
	    var currentTime = +new Date();   
	var html = "<p><a href='/passets/download?uuid="+asset.uuid+"&name="+asset.name+"&t="+currentTime+"'>"+asset.name+"</a></p>";
	//var html = "<p><a href='javascript:downloadFile('"+asset.uuid+"','"+asset.name+"')'>"+asset.name+"</a></p>";	
	sowpartner.innerHTML = html;
	row.appendChild(sowpartner);
	
	var sowsize = document.createElement('div');
	sowsize.id = "size"+i;
	sowsize.className = "Cell";
	var html = "<p>"+size+"</p>";
	sowsize.innerHTML = html
	
	row.appendChild(sowsize);
	
	var sowdelete = document.createElement('div');
	sowdelete.id = asset.uuid;
	sowdelete.className = "Cell";
	var html2 = "<a href=\"javascript:deleteAsset("+i+",'"+asset.uuid+"')\">Delete</a>";
	sowdelete.innerHTML = html2;

    row.appendChild(sowdelete);
	
	maindiv.appendChild(row);
	

        
    }
}
	
	function handleClick()
	{
	    // to be done
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

function uploadFiles()
 {
	var fileName = document.assets.file.value;
	
	if(fileName=="")
	{
	    alert("Please select file to upload ");
	    return false;
	}
	
	var currentTime = +new Date();
	document.assets.path.value="/p1"+ currentTime ;
	document.assets.owner.value=document.partner.owner.value;
	
	var lastIndex = fileName.lastIndexOf("\\");
	
	var fileName = fileName.substring(lastIndex+1,fileName.length);
	
	document.assets.name.value=fileName;
	
//	copyPartnerDataTouploadForm();
	
	document.assets.submit();
	
}	

function deleteAsset(rowid,uuid)
{
    
    
    
    	var aurl ="/partner/deleteasset?uuid="+uuid;
		
		var resultDelete = confirm(" Are you sure , you want to delete document ?");
		
		if(resultDelete)
		{
		    
		
				
	   	    var xmlhttp3 = new XMLHttpRequest();
		    xmlhttp3.onreadystatechange = function() {
            if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
//	alert("response="+xmlhttp.responseText);
            var jsonData = xmlhttp3.responseText;
            processDelete(rowid,jsonData);
          }
         };
 
      xmlhttp3.open("GET", aurl, true);
      xmlhttp3.send();
		
       }
}

function processDelete(rowid,jsonData)
{
    var result = jsonData;
    if(result=="success")
    {
        var sowmaindiv   = document.getElementById("sowmaindiv");
        
        sowmaindiv.removeChild(sowmaindiv.childNodes[rowid+1]); 
        
        
    }
    else 
    {
        alert (" File delete failed");
    }
}


function downloadFile(puuid,fname)
{
    var currentTime = +new Date();   
     window.location="/passets/download?uuid="+puuid+"&name="+fname+"&qq="+currentTime; 
}

function disableNoNSGS()
{
     document.partner.number_of_units.disabled=true;
      document.partner.instal_fee_per_unit.disabled=true;
      document.partner.fee_per_unit_year.disabled=true;
      document.partner.ee_fee_per_unit.disabled=true;
      
      document.partner.objload_shed_program.disabled=true;
      document.partner.units_billed[0].disabled=true;
      document.partner.units_billed[1].disabled=true;
      document.partner.objee_participation.disabled=true;
      
      
      document.partner.number_of_units.value="";
      document.partner.instal_fee_per_unit.value="";
      document.partner.fee_per_unit_year.value="";
      document.partner.ee_fee_per_unit.value="";
      
      document.partner.objload_shed_program.checked=false;
      document.partner.units_billed[0].checked=false;
      document.partner.units_billed[1].checked=false;
      document.partner.objee_participation.checked=false;

}

