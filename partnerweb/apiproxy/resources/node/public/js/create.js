



  
  function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
  
  
  
  
  
  $(function() {
    $( "#start_date" ).datepicker();
	$( "#end_date" ).datepicker();
  });





function isInt(value) {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  if(x<=0) { return false }
  return (x | 0) === x;
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
         if( document.Partner.company_name.value == "" )
         {
			
            document.getElementById('name').innerHTML="*Please enter a Company name*";
			return false;
         }


		  if( document.Partner.start_date.value == "")
         {
			
            document.getElementById('sdate').innerHTML=" *Please enter Start Date*";
			return false;
         }

         
         if(!DateCheck())
        {
            return false;
        }
		 
		 if( !(document.Partner.is_sgs.checked))
         {
			

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
		 if(!(document.Partner.units_billed[0].checked) && !(document.Partner.units_billed[1].checked))
         {
			
            document.getElementById('bill').innerHTML="*Please enter Unit Billed on*";
			return false;
			}
			
			
			  if( document.Partner.instal_fee_per_unit.value == "")
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
		 
		 
		 if( document.Partner.fee_per_unit_year.value == "")
         {
			
            document.getElementById('fees').innerHTML="*Please Enter Fee per Unit/year*";
			return false;
         }
		 
		  var x =document.getElementById("perunit").value;
		 if(isNaN(x))
         {
			
            document.getElementById('fees').innerHTML="*Only Numeric Value*";
			return false;
         }
		 
		/*  if( !(document.Partner.energy_efficiency.checked))
         {
			
            document.getElementById('energy').innerHTML="*Select Valid Option*";
			return false;
         }*/
         
          if((document.Partner.objee_participation.checked))
          {
		  var x =document.getElementById("text").value;
		 if(isNaN(x))
         {
			
            document.getElementById('EEfee').innerHTML="*Only Numeric Value*";
			return false;
         }
		 
		  if( document.Partner.ee_fee_per_unit.value == "")
         {
			
            document.getElementById('EEfee').innerHTML="*Enter Some Value*";
			return false;
         }
          }
          
         }
         else
         {
             //
         }
         
         // set default data for check boxes
         
          if( !(document.Partner.is_sgs.checked))
         {
            document.getElementById('sgs_partner').value="false";
         }
         else
         {
              document.getElementById('sgs_partner').value="true";
         }
         
          if( !(document.Partner.objload_shed_program.checked))
         {
            document.getElementById('load_shed_program').value="false";
         }
         else
         {
             document.getElementById('load_shed_program').value="true";
         }
         
        if( !(document.Partner.objenergy_efficiency.checked))
         {
            document.getElementById('ee_participation').value="false";
         }         
         else
         {
              document.getElementById('ee_participation').value="true";
         }
         
          if(!(document.Partner.objee_participation.checked))
          {
               document.Partner.ee_fee_per_unit.disabled="false";
               document.Partner.ee_fee_per_unit.value="";
          }
        
         //return( true );
         document.Partner.submit();
      }

	  
	/*  function handleClick(cb) {
	
	var c=document.getElementById("objenergy_efficiency")
	if(c.checked)
		{
		document.getElementById("text").disabled="false";
		}
	if(!(c.checked))
		{
		     document.Partner.ee_fee_per_unit.value="";
	       	 document.getElementById("text").disabled="true";
		
		}
	}*/
	
	function DateCheck()
{
  var StartDate= document.getElementById('start_date').value;
  var EndDate= document.getElementById('end_date').value;
  var eDate = new Date(EndDate);
  var sDate = new Date(StartDate);
  var year1900 = new Date('01/01/1900');
  var year3000 = new Date('01/01/3000');
  

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
//    alert("Please ensure that the End Date is greater than or equal to the Start Date.");
    return false;
    }
    else
    {
        return true;
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
	
	var lastIndex = fileName.lastIndexOf("\\");
	
	var fileName = fileName.substring(lastIndex+1,fileName.length);
	
	document.assets.name.value=fileName;
	
	copyPartnerDataTouploadForm();
	
	document.assets.submit();
	
}

function copyPartnerDataTouploadForm()
{
    document.assets.owner.value=document.Partner.owner.value;
    
    document.assets.company_name.value=document.Partner.company_name.value;
    document.assets.start_date.value=document.Partner.start_date.value;
    document.assets.end_date.value=document.Partner.end_date.value;
    document.assets.number_of_units.value=document.Partner.number_of_units.value;
    document.assets.instal_fee_per_unit.value=document.Partner.instal_fee_per_unit.value;
    document.assets.fee_per_unit_year.value=document.Partner.fee_per_unit_year.value;
    document.assets.ee_fee_per_unit.value=document.Partner.ee_fee_per_unit.value;
    
    if(document.Partner.units_billed[0].checked)
    {
        document.assets.units_billed.value = document.Partner.units_billed[0].value;
    }
    
    if(document.Partner.units_billed[1].checked)
    {
        document.assets.units_billed.value = document.Partner.units_billed[1].value;
    }
    
    

    
    if(document.Partner.objee_participation.checked)
    {
        document.assets.ee_participation.value="true";
    }
    else
    {
        document.assets.ee_participation.value="false";
    }
    
    if(document.Partner.is_sgs.checked)
    {
        document.assets.sgs_partner.value="true";
    }
    else
    {
        document.assets.sgs_partner.value="false";
    }
    
    if(document.Partner.objload_shed_program.checked)
    {
        document.assets.load_shed_program.value="true";
    }
    else
    {
        document.assets.load_shed_program.value="false";
    }
    


}
	
	

function getAssetsForOwner()
{
    var ajaxURL = "/partner/getassets?owner="+document.Partner.owner.value;
    
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

function setAssetsData(jsonData)
{
    clearDIV('mainuploaddiv');
    var mainuploaddiv = document.getElementById("mainuploaddiv");
    
    for (var i=0;i<jsonData.entities.length;i++)
    {
        var asset = jsonData.entities[i];
        var name = asset.name;

        var uploadDiv = document.createElement('div');
        uploadDiv.innerHTML = "<p>"+name+"</p>";	 
        
        mainuploaddiv.appendChild(uploadDiv);
        
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
	
	
function addFile()
{
	 var mainuploaddiv = document.getElementById("mainuploaddiv");
	 
	 var uploadDiv = document.createElement('div');
	 
	 var inputDiv = document.createElement('input');
	 inputDiv.type="file";
	 inputDiv.name="file";
	 
	 var inputDiv2 = document.createElement('input');
	 inputDiv2.type="button";
	 inputDiv2.value="Upload";
	 inputDiv2.onClick="javascript:uploadFiles()";
	 
	 uploadDiv.appendChild(inputDiv);
	 
	 uploadDiv.appendChild(inputDiv2);
	 
	 mainuploaddiv.appendChild(uploadDiv);
	 

}
	
	
