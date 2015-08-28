var fs = require("fs");
var parser = require("./index");
var Client = require("ftp");
var RSS = require('rss');


	var base = "FBOFeed";
	var dt = formatFBOName();
  var c = new Client();
  c.on('ready', function() {
    c.get(base + dt, function(err, stream) {
      if (err) throw err;
      stream.once('close', function() { c.end(); });
	  var writeStream = fs.createWriteStream(dt + '.xml')
      stream.pipe(writeStream);
	  writeStream.on('finish', function(){
		process(dt + '.xml');
		//fs.writeFileSync('fbo.json', JSON.stringify(fbo));
	  });
    });
  });
  
  c.on('error', function(err){
	console.log(err);
  }
  );
  // connect to localhost:21 as anonymous 
  c.connect({host: "ftp.fbo.gov"});
  
function process(fileName) {

	var archive = JSON.parse(fs.readFileSync('archive.json', 'UTF-8'));
    var a = {entries: []};
	var fbo = parser.parse(fs.readFileSync(fileName, 'UTF-8'));
	//console.log(fbo);
	//console.log(archive.length);
//return;

	fbo.forEach(function(entry) {
		s = JSON.stringify(entry[0]).toLowerCase();
		//console.log(s);
		if ((s.indexOf("geospatial") > -1) || (s.indexOf(" gis ") > -1)){
			//console.log(entry[0]);
			a.entries.push(entry[0]);
			}
	});
	var q = a.entries.filter(function(obj) {
		return (obj.DOCTYPE === 'SRCSGT' || obj.DOCTYPE ==='PRESOL');
	});
	//console.log(q.length);
	q.forEach(function(entry) {
		archive.push(entry);
	});
	fs.writeFileSync('archive.json', JSON.stringify(archive));
	makeRSS(archive);
//fs.writeFileSync('test.json', JSON.stringify(q));
}

function makeRSS(archive){
var today = new Date();
//var dd = today.getDate();
var feed = new RSS({
    title: 'Geospatial Sources Sought and Presolicitation notices',
    description: 'FBO extract of early stage geospatial opportunities',
    feed_url: 'http://example.com/geospatial.xml',
    site_url: 'http://example.com',
    image_url: 'http://example.com/icon.png',
    docs: 'http://example.com/rss/docs.html',
    managingEditor: 'Bill Dollins',
    webMaster: 'Bill Dollins',
    copyright: '2013 Bill Dollins',
    language: 'en',
    categories: ['GIS','geospatial','FBO'],
    pubDate: new Date(),
    ttl: '60'
});
archive.forEach(function(entry){
	feed.item({
		title: entry.DOCTYPE + ' - ' + entry.SUBJECT,
		description: entry.AGENCY + ' - ' + entry.DESC,
		url: entry.URL,
		date: today
	});
});
var xml = feed.xml(true);
fs.writeFileSync('geospatial.xml', xml);
}

function formatFBOName(){
	var dt = new Date();
	var month = dt.getMonth()+1; //zero-based month integers?
	var date = dt.getDate()-1; //need yesterday
	var year = dt.getFullYear();
	return year + paddy(month, 2) + paddy(date, 2);
}

function paddy(n, p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
}
