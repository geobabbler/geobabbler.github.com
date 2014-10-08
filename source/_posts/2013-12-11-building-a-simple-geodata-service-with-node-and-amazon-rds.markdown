---
layout: post
title: "Building a Simple Geodata Service with Node, PostGIS, and Amazon"
date: 2013-12-11 15:18
comments: true
categories: 
- PostGIS
- open-source
- cloud
- Amazon
- RDS
- PostgreSQL
- GeoJSON
---

**tl;dr**

This post describes the construction of a simple, lightweight geospatial data service using Node.JS, PostGIS and Amazon RDS. It is somewhat lengthy and includes a number of code snippets. The post is primarily targeted at users who may be interested in alternative strategies for publishing geospatial data but may not be familiar with the tools discussed here. This effort is ongoing and follow-up posts can be expected.

**Rationale**

I'm always looking for opportunities to experiment with new tools and the announcement of PostgreSQL/PostGIS support on Amazon RDS piqued my curiosity. Over the past six months, I have run into the repeated need on a couple of projects to be able to get the bounding box of various polygon features in order to drive dynamic mapping displays. Additionally, the required spatial references of these projects have varied beyond WGS84 and Web Mercator.

With that, the seeds of a geodata service were born. I decided to build one that would, via a simple HTTP call, return the bounding box of a polygon or the polygon itself, in the spatial reference of my choice as a single GeoJSON feature.

I knew I wanted to use PostGIS hosted on Amazon RDS to store my data. Here are the rest of the building blocks for this particular application:

  1.	[Node.js](http://nodejs.org)
  2.	Express web application framework for Node
  3.	PG module for accessing PostgreSQL with Node
  4.	Natural Earth 1:10M country boundaries
  
<!--more-->

**Setting up PostGIS on Amazon RDS**

Setting up the PostgreSQL instance on RDS was very easy. I simply [followed the instructions here](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreatePorstgreSQLInstance.html) for doing it in the AWS Management Console. I also got a lot of use out of [this post by Josh Berkus](http://www.databasesoup.com/2013/11/first-look-at-postgresql-rds-on-amazon.html). Don't forget to also set up your security group to govern access to your database instance [as described here](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithSecurityGroups.html). I prefer to grant access to specific IP addresses.

Now that the Amazon configuration is done, your RDS instance essentially behaves the same as if you had set it up on a server in your server room. You can now access the instance using all of the standard PostgreSQL tools with which you are familiar. This is good because we need to do at least one more thing before we load our spatial data: we have to enable the PostGIS extension. I find that it is easiest to accomplish this at the command line:

*psql -U {username} -h {really long amazon instance host name} {database name}*


Once you've connected, issue the command to enable PostGIS in your database:

*CREATE EXTENSION postgis;*

You may also want to enable topology while you're here:

*CREATE EXTENSION postgis_topology;*

This should complete your setup. Now you are ready to load data.

**Loading Spatial Data**

As I mentioned above, we are now dealing with a standard PostgreSQL server that happens to be running on Amazon RDS. You can use whatever workflow you prefer to load your spatial data.

-><img src="/images/posts/pgadmin_rds.png" /><-

I downloaded the [Natural Earth 1:10M country polygons](http://www.naturalearthdata.com/downloads/10m-cultural-vectors/) for this effort. Once downloaded, I used the DB Manager extension to [QGIS](http://qgis.org) to import the data to PostgreSQL. I also did a test import with [OGR](http://www.gdal.org/ogr/). Both worked fine so it's really a matter of preference.

**Building the Application**

I chose to use Node.js because it is very lightweight and ideal for building targeted web applications. I decided to use the [Express web framework for Node](http://expressjs.com/), mainly because it makes things very easy. To access PostgreSQL, I used the [node-postgres module](https://github.com/brianc/node-postgres). I was planning to deploy the application in an Ubuntu instance on Amazon EC2, so I chose to do the development on Ubuntu. Theoretically, that shouldn't matter with Node but the node-postgres module builds a native library when it is installed so it was a factor here.

After building the package.json file and using that to install the Express, node-postgres, and their dependencies, I build a quick server script to act as the web interface for the application. This is where Express really excels in that it makes it easy to define resource paths in an application.

{% codeblock server.js %}
var express = require('express'),
    geo = require('./routes/geo');
 
var app = express();
 
app.get('/countries/:id/bbox', geo.bbox);
app.get('/countries/:id/bbox/:srid', geo.bboxSrid);
app.get('/countries/:id/polygon', geo.polygon);
app.get('/countries/:id/polygon/:srid', geo.polygonSrid);
 
app.listen(3000);
console.log('Listening on port 3000...');
{% endcodeblock %}

The four "app.get" statements above define calls to get either the bounding box or the actual polygon for a country. When the ":srid" parameter is not specified, the resulting feature is returned in the default spatial reference of WGS84. If a valid EPSG spatial reference code is supplied, then the resulting feature is transformed to that spatial reference. The ":id" parameter in all of the calls represents the ISO Alpha-3 code for a country. You will notice that the application listens on port 3000. More on that later.

The next step is to define the route handlers. In this application, this where interaction with PostGIS will take place. Note that each of the exports correspond to the callback functions in the app.get statements above.

{% codeblock geo.js %}
var pg = require('pg');
var conString = "postgres://username:password@hostname.rds.amazonaws.com:5432/database"; //TODO: point to RDS instance

exports.bbox = function(req, res) {
    var client = new pg.Client(conString);
    client.connect();
    var crsobj = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG:6.3:4326"}};
    var idformat = "'" + req.params.id + "'";
    idformat = idformat.toUpperCase();  
    var query = client.query("select st_asgeojson(st_envelope(shape)) as geojson from ne_countries where iso_a3 = " + idformat + ";"); 
    var retval = "no data";
    query.on('row', function(result) {
		client.end();
        if (!result) {
          return res.send('No data found');
        } else {
          res.setHeader('Content-Type', 'application/json');
		  //build a GeoJSON feature and return it
          res.send({type: "feature",crs: crsobj, geometry: JSON.parse(result.geojson), properties:{"iso": req.params.id, "representation": "extent"}});
        }
      }); 
    
};

exports.bboxSrid = function(req, res) {
    var client = new pg.Client(conString);
    client.connect();
    var crsobj = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG:6.3:" + req.params.srid}};
    var idformat = "'" + req.params.id + "'";
    idformat = idformat.toUpperCase();  
    var query = client.query("select st_asgeojson(st_envelope(st_transform(shape, " + req.params.srid + "))) as geojson from ne_countries where iso_a3 = " + idformat + ";"); 
    var retval = "no data";
    query.on('row', function(result) {
		client.end();
        if (!result) {
          return res.send('No data found');
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send({type: "feature",crs: crsobj, geometry: JSON.parse(result.geojson), properties:{"iso": req.params.id, "representation": "extent"}});
        }
      }); 
};

exports.polygon = function(req, res) {
    //TODO: Flesh this out. Logic will be similar to bounding box.
    var client = new pg.Client(conString);
    client.connect();
    var crsobj = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG:6.3:4326"}};
    var idformat = "'" + req.params.id + "'";
    idformat = idformat.toUpperCase();  
    var query = client.query("select st_asgeojson(shape) as geojson from ne_countries where iso_a3 = " + idformat + ";"); 
    var retval = "no data";
    query.on('row', function(result) {
 		client.end();
        if (!result) {
          return res.send('No data found');
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send({type: "feature", crs: crsobj, geometry: JSON.parse(result.geojson), properties:{"iso": req.params.id, "representation": "boundary"}});
        }
      }); };

exports.polygonSrid = function(req, res) {
    var client = new pg.Client(conString);
    client.connect();
    var crsobj = {"type": "name","properties": {"name": "urn:ogc:def:crs:EPSG:6.3:" + req.params.srid}};
    var idformat = "'" + req.params.id + "'";
    idformat = idformat.toUpperCase();  
    var query = client.query("select st_asgeojson(st_transform(shape, " + req.params.srid + ")) as geojson from ne_countries where iso_a3 = " + idformat + ";"); 
    var retval = "no data";
    query.on('row', function(result) {
		client.end();   
        if (!result) {
          return res.send('No data found');
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.send({type: "feature",crs: crsobj, geometry: JSON.parse(result.geojson), properties:{"iso": req.params.id, "representation": "boundary"}});
        }
      }); };
{% endcodeblock %}

The PostGIS spatial SQL for each function is shown in the "client.query" calls in the code above. This approach is very similar to constructing SQL calls in a number of other application environments. You will notice that a coordinate reference system object is constructed and attached to each valid response, which is structured as a [GeoJSON](http://geojson.org) feature. The code currently assumes EPSG codes but that may be addressed in a future version.

The above modules do most of the heavy lifting. The full code for this sample [is available here](https://github.com/geobabbler/geo-service).

To test the application, simply issue the following command in a terminal:

*node server.js* (this assumes you are running from the same directory in which server.js resides. The file extension is optional.

Your web application is now listening on port 3000. In a browser, visit the following URL:

*http://localhost:3000/countries/irl/bbox*

This should return a GeoJSON feature representing the bounding box of Ireland in WGS84. You can then test the other three calls with appropriate parameters. To get the bounding box in Web Mercator, go to:

*http://localhost:3000/countries/irl/bbox/3785*

**Deploying the Application**

The application should now be ready to deploy. In my case, I created an Ubuntu EC2 instance (free tier). Using SSH, I made sure Node and git were installed on the machine. Additionally, I installed [Forever](https://github.com/nodejitsu/forever) which allows a Node application to run continuously (similar to a service on Windows). This can also be done using an upstart script but I chose Forever. I may switch to using [PM2](http://devo.ps/blog/2013/06/26/goodbye-node-forever-hello-pm2.html) at some point.

Now, it's simply matter of installing the application code to the instance via git, wget, or the method of your choice. Once installed, be sure to go to the folder containing the code and issue the "npm install" command. This will read the package.json install Express, node-postgres, and other dependencies. Since some native code is built in the process, you may need to issue the command under sudo.

I mentioned above that the application listens on port 3000. The Ubuntu instance, by default, will not allow the application to listen on port 80. This can be mitigated in a number of ways but I issued the following command to redirect traffic from 80 to 3000. Since this instance is single-use, this approach is sufficient.

*sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000*

Once you are ready to go, you'll want to start the application with the following command:

*forever start server* (again assuming you are executing from the directory containing server.js)

A couple of Amazon notes: 1) You may want to assign an elastic IP to your instance for a persistent IP address and 2) you'll want you remember to configure your RDS security group to allow access from your instance's IP address.

**Conclusion**

If everything has gone correctly, you should be able to execute the above URLs (using your instance IP address) and get a response like the following, which you should be able to load directly into QGIS or another GeoJSON-literate client. Altogether, I was able to assemble this in one evening. This small collection of open-source tools, combined with the Amazon infrastructure, seems to provide a straightforward path to a hosted geodata service. This example is intentionally simple but PostGIS provides a robust collection of functions that can be exploited in a similar manner, leading to more advanced processing or analysis. I will continue my experimentation but am encouraged by what I have seen so far.

**Sample Response**

{% codeblock irl_bbox.json %}
{
  "type": "feature",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:EPSG:6.3:4326"
    }
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [
          -10.4781794909999,
          51.4457054710001
        ],
        [
          -10.4781794909999,
          55.386379299
        ],
        [
          -5.99351966099994,
          55.386379299
        ],
        [
          -5.99351966099994,
          51.4457054710001
        ],
        [
          -10.4781794909999,
          51.4457054710001
        ]
      ]
    ]
  },
  "properties": {
    "iso": "irl",
    "representation": "extent"
  }
}
{% endcodeblock %}