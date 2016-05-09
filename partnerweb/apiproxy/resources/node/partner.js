 var express = require('express');
var engine = require('ejs-locals');

var app = express();

app.engine('ejs', engine); // use ejs-locals for all ejs templates
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// Serve up the CSS and static files before sessions are managed.
var path = require('path');
//app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    
    if (req.method.toLowerCase() == 'get') {

        res.render('welcome');
}
    
});




app.get('/display', function(req, res){
        var var1= req.param('partnerid');
        res.render('partner_view',{uuid:var1});
    
    
});


app.get('/update', function(req, res){
    
    if (req.method.toLowerCase() == 'get') {
        
        var var1= req.param('partnerid');
        res.render('partner_edit_file',{uuid:var1});
    }

    
});


app.get('/add', function(req, res){
    
    if (req.method.toLowerCase() == 'get') {
        
        var vcompany_name = req.param('company_name');
        var vstart_date = req.param('start_date');
        var vend_date = req.param('end_date');
        var vnumber_of_units = req.param('number_of_units');
        var vinstal_fee_per_unit = req.param('instal_fee_per_unit');
        var vfee_per_unit_year = req.param('fee_per_unit_year');
        var vee_fee_per_unit = req.param('ee_fee_per_unit');
        var vowner = req.param('owner');
        
        var vsgs_partner = req.param('sgs_partner');
        var vload_shed_program = req.param('load_shed_program');
        var vee_participation = req.param('ee_participation');
        var vunit_billed = req.param('units_billed');
        
        res.render('partner_create_file',{company_name:vcompany_name,start_date:vstart_date,end_date:vend_date,number_of_units:vnumber_of_units,owner:vowner,instal_fee_per_unit:vinstal_fee_per_unit,fee_per_unit_year:vfee_per_unit_year,ee_fee_per_unit:vee_fee_per_unit,sgs_partner:vsgs_partner,load_shed_program:vload_shed_program,ee_participation:vee_participation,units_billed:vunit_billed});
    }

    
});

    
var server = app.listen(3000, function(){
    console.log('listening at 3000')
});