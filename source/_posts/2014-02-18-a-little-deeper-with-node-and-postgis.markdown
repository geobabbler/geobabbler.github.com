---
layout: post
title: "A Little Deeper with Node and PostGIS"
date: 2014-02-18 13:44
comments: true
categories: 
- GIS
- Node
- PostGIS
- open-source
- GeoJSON
---
What does one do when presented with more snow days than expected? My friends in Colorado would probably do something outrageous like skiing, but I found it to be a great opportunity to catch up on some of my recreational coding. Specifically, I wanted to revisit the [Node/PostGIS work I blogged about earlier](http://blog.geomusings.com/2013/12/11/building-a-simple-geodata-service-with-node-and-amazon-rds/).

As fun as that project was, it was fairly limited in scope and I wanted to spread my wings a little more with Node. So I decided to build a more general-purpose wrapper around [PostGIS](http://postgis.net). Lately, I've become a bit obsessed with the idea that PostGIS may be the only GIS tool you really need in terms of data storage, management, and analytics. That's probably a topic for another post but exploring that concept was a perfect premise for my continued explorations with Node.

I have been circling back to Node over the past few months to continue building my comfort level with it. I tend to eschew frameworks when i have learning something new because I want to get comfortable with the core before I start layering on abstraction. That was my approach with [the tile viewer tool I built a while back](http://blog.geomusings.com/2013/04/25/simple-tile-viewer/). For the recent post centered on Amazon RDS, I added Express into the mix, which has been a big help.

This time around, I wanted to dig a little deeper with the [node-postgres](https://github.com/brianc/node-postgres) module and also make the application more modular. I wanted to build around a few core principles:

1. Keep it RESTful (or as close to it as I could)
2. GeoJSON in/GeoJSON out (so....vector only for now)
3. Let PostGIS do the heavy lifting

<!--more-->

**Getting Started**

This time around, I elected to use my local PostgreSQL/PostGIS instance rather than Amazon RDS. This was mainly so I could keep my development isolated on one machine. I already had the basic infrastructure in place from my last time around, so I was able to quickly dive into the meat of things. I decided to scope my initial effort at the following:

1. Return the contents of an entire table as GeoJSON, with the ability to choose between features (geometries and attributes) in a GeoJSON feature collection or just geometries in a GeoJSON geometry collection. This should support any table in the database.
2. Return those records in a table that intersect a geometry passed in as a parameter. The input geometry would be in GeoJSON format.
3. Return a JSON representation of a table's schema.
4. Return a list of tables from the server. This is necessary in order to support the ability to query any available table.
5. Implement some simple, but application-specific logic to demonstrate extensibility.

With these goals in mind, I decided to first tackle the issue of extensibility. I wanted to make it as painless as possible and [the strategy described in this post](http://timstermatic.github.io/blog/2013/08/17/a-simple-mvc-framework-with-node-and-express/) seemed to fit the bill. I just had to add the following code block to my server.js (straight from the post):

{% codeblock snippet1.js %}
// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});
{% endcodeblock %}

This will load any .js file in the controllers directory into the application. If they are written to the pattern expected by Express, new resource paths are exposed to the application. The post above describes a simple MVC implementation. Astute readers will note that my take is all "C" without "M" or "V." I plan to refactor that later but it it was easier for me to keep track of things on this pass with code in one place.

**Getting Data**

With modularity out of the way, it was time work on the basic structure for getting data from the database. In [core.js](https://github.com/geobabbler/node-gis-server/blob/master/controllers/core.js), I defined a route with a URL template like '/vector/:schema/:table/:geom'. This would translate into something like http://localhost/vector/public/parcels/features, which would fetch a GeoJSON feature collection containing the contents of the parcels table. To do that, I need to know the name of the spatial column in the table, which the following helps me retrieve:

{% codeblock snippet2.js %}
var meta = client.query("select * from geometry_columns where f_table_name = '" + tablename + "' and f_table_schema = '" + schemaname + "';");
{% endcodeblock %}

The next code block shows how I capture the name of the spatial column and structure the main query, depending on the choice of features or geometry:

{% codeblock snippet3.js %}
meta.on('row', function (row) {
	var query;
	var coll;
	spatialcol = row.f_geometry_column;
	if (geom == "features") {
		query = client.query("select st_asgeojson(st_transform(" + spatialcol + ",4326)) as geojson, * from " + fullname + ";");
		coll = {
			type : "FeatureCollection",
			features : []
		};
	} else if (geom == "geometry") {
		query = client.query("select st_asgeojson(st_transform(" + spatialcol + ",4326)) as geojson from " + fullname + ";");
		coll = {
			type : "GeometryCollection",
			geometries : []
		};
	}
//'meta' code block continues
{% endcodeblock %}

As can be seen above, the query will transform the output geometry to WGS84 and convert it to GeoJSON for me. So I'm sticking my third principle by leaning on PostGIS functions here. I plan to stick to GeoJSON's default spatial reference of WGS84 for now. To roll up the query results into the appropriate GeoJSON object and return it, I handled the 'row' and 'end' events.

{% codeblock snippet4.js %}
//roll up the results
query.on('row', function (result) {
	if (!result) {
		return res.send('No data found');
	} else {
		if (geom == "features") {
			coll.features.push(geojson.getFeatureResult(result, spatialcol)); //use helper function
		} else if (geom == "geometry") {
			var shape = JSON.parse(result.geojson);
			coll.geometries.push(shape);
		}
	}
});

//send the results
query.on('end', function (err, result) {
	res.setHeader('Content-Type', 'application/json');
	res.send(coll);
});
{% endcodeblock %}

I wrote a helper function to roll up GeoJSON features:

{% codeblock snippet5.js %}
exports.getFeatureResult = function(result, spatialcol) {
		var props = new Object;
		var crsobj = {
			"type" : "name",
			"properties" : {
				"name" : "urn:ogc:def:crs:EPSG:6.3:4326"
			}
		};
		//builds feature properties from database columns
		for (var k in result) {
			if (result.hasOwnProperty(k)) {
				var nm = "" + k;
				if ((nm != "geojson") && nm != spatialcol) {
					props[nm] = result[k];
				}
			}
		}

		return {
			type : "Feature",
			crs : crsobj,
			geometry : JSON.parse(result.geojson),
			properties : props
		};
	};
{% endcodeblock %}

So that's basic data retrieval. How about that spatial intersect?

**A Simple Spatial Query**

One thing I failed to mention in the above section, is that all of that is exposed through an HTTP GET request. For this next function, I'm going to use a POST. I went back and forth on that but came down on the side of POST due to the potential for a user to send a very verbose input shape. The function is designed to accept JSON as the body of the request, which would be done in curl like this:

{% codeblock snippet6.bat %}
curl -X POST -d "{ \"type\": \"Point\", \"coordinates\": [-98.35, 39.7] }" -H "Content-Type: application/json" http://localhost:3000/vector/public/states_gen/features/intersect
{% endcodeblock %}

The above action returns the state of Kansas (I knew you were wondering). To make this happen, there are only three things that are different. First, the URL is defined a POST and, second, the code needs to capture the input shape. The first few lines are:

{% codeblock snippet7.js %}
	/**
	 * retrieve all features that intersect the input GeoJSON geometry
	 */
	app.post('/vector/:schema/:table/:geom/intersect', function (req, res, next) {
		//console.log(JSON.stringify(req.body));
		var queryshape = JSON.stringify(req.body);
	//continue with the rest of app.post
{% endcodeblock %}

I stringify the JSON since I have to insert it into my SQL. This brings me to the third difference here, the query. This time, I am using ST_INTERSECTS to filter down the response. So, depending on the choice of features or geometry, the query will be similar to:

__"select st_asgeojson(st_transform(" + spatialcol + ",4326)) as geojson, * from " + fullname + " where ST_INTERSECTS(" + spatialcol + ", ST_SetSRID(ST_GeomFromGeoJSON('" + queryshape + "'),4326));"__

The rest of the process is similar to the basic query above. With a well-exercised data access pattern in place, querying table schema and layer lists become trivial. Since GeoJSON doesn't cover these topics, I had to roll my own. I won't detail the output but the queries are below.

{% codeblock snippet8.js %}
//SQL to retrieve schema
//var sql = "SELECT n.nspname as schemaname,c.relname as table_name,a.attname as column_name,format_type(a.atttypid, a.atttypmod) AS //type,col_description(a.attrelid, a.attnum) as comments";
//sql = sql + " FROM pg_class c INNER JOIN pg_namespace n ON c.relnamespace = n.oid LEFT JOIN pg_attribute a ON a.attrelid = c.oid";
//sql = sql + " WHERE a.attnum > 0 and c.relname = '" + tablename + "' and n.nspname = '" + schemaname + "';";

//SQL to retrieve layer list
//sql = "SELECT 'geometry' AS geotype, * FROM geometry_columns UNION SELECT 'geography' as geotype, * FROM geography_columns;";
{% endcodeblock %}

So this gives me everything I need for an all-purpose interface into PostGIS from Node. I could spend the rest of the year similarly wrapping the hundreds of spatial functions in PostGIS but the real power of extensibility is the ability to tailor an application for one's own needs, based upon one's detailed understanding of their own data and logic.

**Adding Some Customization**

To do this, I fell back to the data for [Leonardtown, Maryland](http://leonardtown.somd.com) that have used in a [couple](http://blog.geomusings.com/2013/06/18/geojson-on-github-now-what/) of previous [posts](http://blog.geomusings.com/2011/10/13/cartodb-leaflet-easy/). I am simply going to expose the ability to query residential or commercial buildings from the data set. For this, all of the prep work is done at the top of the function by simply preparing a WHERE clause.

{% codeblock snippet9.js %}
app.get('/leonardtown/buildings/:geom', function (req, res, next) {
	var client = new pg.Client(app.conString);
	var geom = req.params.geom.toLowerCase();
	if ((geom != "features") && (geom != "geometry")) {
		res.status(404).send("Resource '" + geom + "' not found");
		return;
	}
	var tablename = "leonardtown_bldgs";
	var schemaname = "public";
	var fullname = schemaname + "." + tablename;
	var spatialcol = "";
	var proptype = req.query.type;
	var whereclause = ";";
	if (typeof proptype != "undefined") {
		if (proptype.toLowerCase() != "all") {
			whereclause = " where structure_ = '" + proptype + "';";
		}
	}
	var coll;
	var sql = "";
	//logic continues from here
{% endcodeblock %}

The primary difference here are that I am using a GET with a query string since I'm not concerned with data size and that I'm building a WHERE clause on a specific column name. What's not shown is that, farther down, I don't need to query the name of the spatial column so I can cut out that step. I can do this because I understand my own data so I can be more succinct that if I were writing a more generic function. Using this approach I can also write more complex custom logic in my database, call it from Node, and send the response. In other words, standard web application behavior.

In order to expose this application-specific logic, I just needed expose it in a separate leonardtown.js file and drop it into the 'controllers' directory.

**Wrapping Up**

This post was bit longer than usual but there was lot of ground to cover. I feel like I'm getting more comfortable with the Node ecosystem though I'm still a bit wobbly. My next step is probably to dive a little deeper into the MVC side of things with something like [Sails](http://sailsjs.org). Having a familiar face like PostGIS on the back end is helping me as I figure out how to perform more meaningful tasks with Node and its related tools.

If you want to check out the full code for this application, it is here: [https://github.com/geobabbler/node-gis-server](https://github.com/geobabbler/node-gis-server)