---
layout: blog
title: Writing GeoJSON from SharpMap, Part 1
post_author: bdollins
comments: true
categories:
- c#
- geojson
- OpenLayers
- postgis
- sharpmap
---

In between proposals, white papers and the like, I?ve been able to do a little coding to keep myself sane. Recently, I have been playing with <a href="http://www.codeplex.com/sharpmap">SharpMap</a>, <a href="http://wiki.geojson.org/Main_Page">GeoJSON</a> and <a href="http://openlayers.org">OpenLayers</a>. But not necessarily in that order. Originally, I was looking over the GeoJSON spec to get more of a feel for it and decided that it would be fun (I know) to write an exporter for SharpMap. There is already a converter to write SharpMap geometries as WKT so I went ahead and built another one to convert to GeoJSON. In order to test it, I decided to use OpenLayers.<!--more-->

Developing the exporter was pretty straightforward. I used the SharpMap.Converters.WellKnownText.GeometryToWKT class as a template. I created a GeoJson namespace and put a GeometryToGeoJson class in it. I then set about replacing the logic in the WKT with logic that generates GeoJSON. This should result in a class that behaves in the same way as its WKT counterpart but emits GeoJSON instead.

At this point, I am only dealing with geometry and geometry collections. I plan to move on to exporting feature collections in the near future. Also, I still need to persist the CRS information into the GeoJSON output.

<strong>Step 1: Building the GeoJSON Writer</strong>

As I mentioned, building the converter was pretty straightforward. I really just had to modify the logic of the existing WKT writer. I based the output on GeoJSON 1.0 RC1. The writer currently outputs points, linestrings, polygons, the various ?multi? flavors of those and geometry collections. As mentioned above, I haven?t gotten to features or CRS information yet.

<strong>Step 2: Testing the Output</strong>

I used the <a href="http://openlayers.org/dev/examples/vector-formats.html">OpenLayers ?Vector Formats? example</a> as a testbed. I built a simple WinForms GUI in which I could paste a WKT string, convert that to a SharpMap geometry and then write out GeoJSON from that. I then pasted the output into the OpenLayers demo and tried to render it. That process validated the outputs for each of the geometry types pretty quickly.

<div style="text-align: center;"><a href="http://geobabble.files.wordpress.com/2008/09/sharpmap_geojson_bootstarp.png"><img alt="A lovely test GUI..." class="size-medium wp-image-324" height="144" src="http://geobabble.files.wordpress.com/2008/09/sharpmap_geojson_bootstarp.png" title="sharpmap_geojson_bootstarp" width="230" /></a><div style="text-align: center;font-size: 14px;">A lovely test GUI...</div></div>

<strong>Step 3: Generate Output From a Data Set</strong>

Next, I modified the <a href="http://openlayers.org/dev/examples/geojson.html">existing OpenLayers GeoJSON demo </a> to make a call back to a server to retrieve GeoJSON from a SharpMap application. The existing demo has a GeoJSON string hard-coded into the JavaScript. I merely replaced this with an AJAX call that retrieves it from the server.

Next, I built an ASP.NET handler (thanks <a href="http://twitter.com/TheSteve0">@TheSteve0</a>) to receive the call from the client, access the data (PostGIS in this case, served from that data I?ve been using for my ArcSDE work), write the geometries into a GeoJSON geometry collection and return it back to the client. Currently, the client passes a query string to tell the server what data is being requested. I plan to implement that in a RESTful manner in a future iteration but this works for now.

<strong>Step 4: Running the Code and Displaying the Data</strong>

I changed the OpenLayers demo page only minimally to make a call to retrieve the GeoJSON. I implemented an asynchronous call so the basemap would display without waiting for the GeoJSON data to come back. The data set I used contained 408 military installation polygons stored in PostGIS. SharpMap seems to persist the data fairly quickly but it bogged down on the client side on my first run. In both IE and FireFox, the browser would hang and eventually display a message that a script was causing the browser to run slowly. In each case, I had to terminate the script.

<div style="text-align: center;"><a href="http://geobabble.files.wordpress.com/2008/09/sharpmap_geojson_output.png"><img alt="The orange blobs with the outlines are mine." class="size-medium wp-image-324" height="255" src="http://geobabble.files.wordpress.com/2008/09/sharpmap_geojson_output.png?w=300" title="sharpmap_geojson_output" width="300" /></a><div style="text-align: center;font-size: 14px;">The orange blobs with the outlines are mine.</div></div>

On my second pass, I throttled the server-side code back to return only the first ten records. In this case, it returned and displayed almost instantaneously. There were my installation polygons!

On each successive pass, I increased the number of polygons and the client side slowed down down accordingly. Somewhere around 300 polygons, it ground to a halt. I put an alert box in before this call in the client-side javascript:

{% codeblock lang:js %}
vector_layer.addFeatures(geojson_format.read(gj));
{% endcodeblock %}

That alert always displays very quickly so there seems to be something inefficient about the geojson_format.read call. <del datetime="00">I?d dig into that more but I upgraded to FireFox 3, which has my FireBug broken (grrrrr).</del> I?ll look into that more later (I have the additional problem of being javascript-challenged). Anyway, OpenLayers was more of a visualization tool for the SharpMap effort so I?m less concerned with that issue at the moment.

As the title of the post implies, I?ll circle back around and update things as I progress. I need to clean up the code for the writer (all of the comments are still the ones from the WKT writer). Additionally, I need to now look at extending to write features, not just geometry. I also want to make the server-side app RESTful. Eventually, I?ll also deploy the app to a demo location where anyone can hit it. As you can see, I have my work cut out for me.

BTW, here are the versions involved on this pass:
OpenLayers: 2.6
SharpMap: 0.9 build 34320
Visual Studio: 2008
PostGIS: 1.3.3