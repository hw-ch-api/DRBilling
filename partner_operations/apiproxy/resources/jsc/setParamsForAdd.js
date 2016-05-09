
var company_name = context.getVariable("request.formparam.company_name");
var start_date = context.getVariable("request.formparam.start_date");
var end_date = context.getVariable("request.formparam.end_date");
var number_of_units = context.getVariable("request.formparam.number_of_units");
var instal_fee_per_unit = context.getVariable("request.formparam.instal_fee_per_unit");
var fee_per_unit_year = context.getVariable("request.formparam.fee_per_unit_year");
var ee_fee_per_unit = context.getVariable("request.formparam.ee_fee_per_unit");

var sgs_partner = context.getVariable("request.formparam.sgs_partner");
var load_shed_program = context.getVariable("request.formparam.load_shed_program");
var ee_participation = context.getVariable("request.formparam.ee_participation");

var units_billed = context.getVariable("request.formparam.units_billed");

var owner = context.getVariable("request.formparam.owner");

//changes for SGS partner

if(sgs_partner=="true")
{
    number_of_units="";
    instal_fee_per_unit="";
    fee_per_unit_year="";
    ee_fee_per_unit="";
    
    load_shed_program="false";
    ee_participation="false";
    units_billed = "";
    
}


var result = { "owner":owner,"company_name":company_name, "sgs_partner":sgs_partner, "start_date":start_date, "end_date":end_date, "number_of_units":number_of_units, "load_shed_program":load_shed_program, "units_billed":units_billed, "instal_fee_per_unit":instal_fee_per_unit, "fee_per_unit":fee_per_unit_year, "ee_participation":ee_participation, "ee_fee_per_unit":ee_fee_per_unit , "row_state":"1" } 

context.setVariable("result",JSON.stringify(result));            