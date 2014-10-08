---
layout: post
title: "js.geo Day One"
date: 2013-01-14 18:04
comments: true
categories: 
- events
- javascript
- GIS
- geospatial
- Denver
---

Yesterday, I attended the [JS.geo](http://geojs.eventbrite.com/) conference at the Colorado University Denver campus. It looked like about 100 or so came out for the event. I was able to catch up with [Chris Helm](http://twitter.com/cwhelm) and [Brian Timoney](http://twitter.com/briantimoney) the night before and they told me the event took off faster than they had originally expected. I think this speaks to two things: 1) the level of interest in Javascript as a solution for geospatial applications and 2) the fast pace of innovation in the Javascript community that has a lot of people looking for ways to stay abreast of the latest developments.

What follows is an overview based on some of the notes I took. I wasn't always writing as I sometimes just stopped to listen and I'll probably follow up with more details later.

<div style="text-align:center;"><img src="/images/posts/jsgeo13.png" /></div>

Data reduction was strong current running under the day. With the rise of newer libraries that enable more sophisticated capabilities in the browser, there is increased recognition of the need to reduce the amount of data passing over the wire. For geometry, [TopoJSON](https://github.com/mbostock/topojson) is getting a lot of attention here. It delivers topologically correct data which reduces data by removing redundant geometry such coincident arcs between polygons and such. The output reminds me of an old [ARC/INFO coverage](http://www.gdal.org/ogr/drv_avcbin.html) and is providing stunning results in reducing the size of geometries when compared to [GeoJSON](http://geojson.org) or Esri JSON. [Andrew Hill](http://twitter.com/andrewxhill) of [Vizzuality](http://vizzuality.com) mentioned that [CartoDB](http://cartodb.com) currently has support for TopoJSON in staging. He also discussed strategies they use to reduce the size of feature and attribute data. This "data cubing" strategy turns out to similar to approaches that are commonplace in the financial industry. This serves as a reminder to look around and see what others are doing to solve similar problems.

<!--more-->

One a related note, the reduction of application code being delivered to the browser is also a focus. This was probably best illustrated by [Matt Priour's](http://twitter.com/mattpriour) talk on [OpenLayers](http://openlayers.org). The fact that there are now three builds (full, mobile, light) as well as a focus on being more modular in version 3. [Peter Batty](http://twitter.com/pmbatty), in his demo of [Ubisense](http://www.ubisense.net/en/), made a good case for intelligent balance between server-side and client-side processing to achieve good performance.

[WebGL](https://www.khronos.org/webgl/) got a lot of attention from a number of speakers, with [Brendan Kenny](http://twitter.com/brendankenny) of Google showing work he has done, including a Javascript port of GLUTessellation. Jeremy Bartley of Esri gave a lightning talk about [CityEngine](http://www.esri.com/software/cityengine), which is based on WebGL. WebGL is widely seen as the open solution to graphics performance that may finally kill the need for plug-ins. In side discussions, Jeremy talked about how WebGL will figure more into the previously discussed data reduction problem. The reality is that both servers and clients are getting much better at handling large data sets but the same can't necessarily be said for the wires that connect them.

GeoJSON continues to get a lot of love. It continues to be, in my opinion, the motor oil for the engine that is web mapping. It will be interesting see how the separation of concerns between GeoJSON and TopoJSON evolves, but I think GeoJSON will continue to be an important syntax.

While the majority of the discussion focused on browsers, [Node.js](http://nodejs.org/) got significant attention. [Will White](http://twitter.com/willwhitedc) of [MapBox](http://mapbox.com) gave a good talk about the evolution of Node and the advantages of its non-blocking I/O model. One statistic he gave was surprising: he said 6 of the top 12 contributors on GitHub are Node contributors. That speaks loudly to the rapid evolution of Node as well as the interest in Javascript. Will put out a call to the geospatial community to build out the geospatial capabilities of Node. Later in the day, we saw a good lightning talk that showed Node processing real-time data and feeding a number of D3 visualizations.

While Matt Priour and [Aaron Ogle](https://twitter.com/atogle) opened with great talks on OpenLayers and [Leaflet](http://leafletjs.com/), respectively, the clear star of the client-side show was [D3](http://d3js.org/) (although Aaron's walkshed analysis in Leaflet was cool). There were lots of great visualizations (as well as nods to TopoJSON). While the D3's support for projections is getting a lot of attention from geospatial developers, I am more interested in its holistic approach to data visualization. In D3, geo is one way to look at data, but not the central way. Because of this, D3 provides an integrated capability to have multiple data visualizations in an application without overloading with a ton of libraries.

I am already well past tl;dr on this post and I have to catch a plane. Many of the URL talks were great but I'll follow up with some more details. All-in-all, I think the event was quite a success and I'm glad I came.
