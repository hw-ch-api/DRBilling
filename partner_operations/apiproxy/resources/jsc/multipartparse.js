 var body = context.getVariable("request.content"),
    formBoundary = context.getVariable("request.header.Content-Type"),
    result = {
        resultCount: 0,
        results: []
    };

if (formBoundary.indexOf("multipart/form-data") === 0) {
    //per RFC2046:5.1
    formBoundary = '--' + formBoundary.split('=')[1];
    var bodySegments = body.split(formBoundary);

    bodySegments.forEach(function(segment) {
        var lines = segment.split('\r\n'),
            res = {};
        lines.forEach(function(line) {
            if ((line.indexOf('Content-Disposition:') === 0) || (line.indexOf('Content-Type:') === 0)) {
                //handle the nv pairs here
                var pairs = line.split(';');
                pairs.forEach(function(pair) {
                    var nvPair = pair.split('=');
                    if (nvPair.length == 1) nvPair = pair.split(': ');
                    res[nvPair[0].trim()] = nvPair[1].trim();
                });
            } else {
                if (!res.value) res.value = line;
                else res.value += line;
            }
        });
        if (res.value !== '--' && res.name) {
            result.resultCount++;
            result.results.push(res);
        }
    });
}

//
var paramObj = new Object();

var sowContent ;

for (var i=0;i<result.results.length;i++)
{
	var rowrecord = result.results[i];
	
	if(rowrecord.name.indexOf("company_name")!=-1)
	{
	  paramObj.company_name =  rowrecord.value;
	}
	
	else if(rowrecord.name.indexOf("sgs_partner")!=-1)
	{
	  paramObj.sgs_partner =  rowrecord.value;
	}
	
	else if(rowrecord.name.indexOf("start_date")!=-1)
	{
	  paramObj.start_date =  rowrecord.value;
	}
	
	else if(rowrecord.name.indexOf("end_date")!=-1)
	{
	  paramObj.end_date =  rowrecord.value;
	}
	
	else if(rowrecord.name.indexOf("number_of_units")!=-1)
	{
	  paramObj.number_of_units =  rowrecord.value;
	}	
	
	else if(rowrecord.name.indexOf("load_shed_program")!=-1)
	{
	  paramObj.load_shed_program =  rowrecord.value;
	}	
	
	// note dierence
	else if(rowrecord.name.indexOf("unit_billed")!=-1)
	{
	  paramObj.unit_billed_on =  rowrecord.value;
	}	

	// note dierence	
	else if(rowrecord.name.indexOf("instal_fee_per_unit")!=-1)
	{
	  paramObj.install_fee_per_unit =  rowrecord.value;
	}	
	
	// note dierence
	else if(rowrecord.name.indexOf("fee_per_unit_year")!=-1)
	{
	  paramObj.fee_per_unit =  rowrecord.value;
	}		
	
	else if(rowrecord.name.indexOf("ee_participation")!=-1)
	{
	  paramObj.ee_fee_per_unit =  rowrecord.value;
	}	
	else if(rowrecord.name.indexOf("sow")!=-1)
	{
	  sowContent =  rowrecord.value;
	}	
		
	
}


context.setVariable("result",JSON.stringify(paramObj) );
context.setVariable("sowContent",sowContent);


context.setVariable('target.copy.pathsuffix', false);

context.setVariable('target.url', 'https://api.usergrid.com/shridhar.nagaral/sandbox/assets?access_token=YWMtkTKSQgiVEeak6bku0NHOTAAAAVRiZb_VDNlKDGyK8pO7DCA2lcelEamVZBk');


//context.setVariable("result",JSON.stringify(result) );
