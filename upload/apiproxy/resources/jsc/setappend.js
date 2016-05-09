var partner_assets_baas = context.getVariable("partner_assets_baas");
var hch_baas = context.getVariable("hch_baas");
var uuid = context.getVariable("request.queryparam.uuid");

var name = context.getVariable("request.queryparam.name");
context.setVariable("DownloadFileName",name);

var targetURL = "https://" + hch_baas + '/'+ partner_assets_baas + '/' + uuid  + '/data/';
context.setVariable('target.url', targetURL);