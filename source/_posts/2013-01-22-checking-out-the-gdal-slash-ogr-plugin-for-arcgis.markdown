---
layout: post
title: "Checking out the GDAL/OGR Plugin for ArcGIS"
date: 2013-01-22 13:29
comments: true
categories: 
- BSD
- OGR
- GDAL
- ArcGIS
- open source
- zigGIS
- GeoJSON
- PostGIS
- SpatiaLite
- QGIS
---

A while back, I [blogged](http://blog.geomusings.com/2012/09/18/still-jonesing-for-ziggis-try-this-ogr-plug-in-for-arcgis/) the availability of a [GDAL/OGR](http://www.gdal.org/) [plug-in for ArcGIS](https://github.com/RBURHUM/arcgis-ogr/) desktop by [Ragi Burhum at AmigoCloud](http://www.linkedin.com/profile/view?id=14926439&locale=en_US). At the time, I was hoping to dig into it fairly quickly but that didn't happen and I'm finally getting to it. Anyone who has followed this blog for a while knows that I have had [more](http://blog.geomusings.com/2006/12/17/postgis-and-arcgis-9.1/) than a [passing](http://blog.geomusings.com/2007/07/10/consuming-georss-in-arcmap-with-inmemoryworkspacefactory/) [interest](http://blog.geomusings.com/2012/10/03/cutting-tiles-for-arcgis-server-using-tilemill/) in [integrating](http://blog.geomusings.com/2010/06/02/importing-data-from-geocommons-into-arcmap/) new [data](http://blog.geomusings.com/2011/03/02/announcing-weogeo-tools-for-arcgis/) [sources](http://blog.geomusings.com/2012/08/24/togeojson-and-towkt-for-the-esri-fgdb-api/) [with](http://blog.geomusings.com/2011/08/09/taking-a-look-at-pgmap/) [ArcGIS](http://blog.geomusings.com/2011/11/15/fgeojson/) over the years. This comes from the fact that, as a technology geek, I am fascinated by all forms of technology and enjoy the process of integration and, as a consultant providing services to the Federal Government, most of my customers have standardized on Esri tools. Integrations such as GeoRSS, PostGIS, GeoCommons and GeoJSON have directly benefitted my customers for real-world applications so I continue look for ways to remove the barriers between them and the data they seek.

<div style="text-align:center;"><img src="http://images-mediawiki-sites.thefullwiki.org/07/3/6/0/1583563936968042.png" /></div>

<!--more-->

The GDAL/OGR plug-in caught my attention because it purports to add support for any format supported by GDAL and OGR, similar to the way [QGIS](http://qgis.org) leverages them for a wide variety of format support. To get going with it, I downloaded the source and built it in Visual Studio 2010. I only ran into a couple of minor issues. First, a had previously installed the Windows build of OGR on my machine using the [distribution from GIS Internals](http://www.gisinternals.com/sdk/PackageList.aspx?file=release-1600-gdal-1-9-2-mapserver-6-2-0.zip). The project as it came down from GitHub couldn't find the OGR and OSR bindings for C#, so I had to resolve that trivial issue. Next, the plug-in was built for use in ArcGIS 10.1 but I was using 10.0. Because some new interfaces were introduced, the [current code](https://github.com/RBURHUM/arcgis-ogr/blob/master/src/OGRPlugin/OGRPlugin/ogrplugin_utils.cs) contains a declaration of  type ISpatialReferenceFactory4, which is a 10.1 interface. I needed to change that to ISpatialReferenceFactory3 to make it work with 10.0. That has been the only change I have needed to make so far to account for the version differences. I plan to add a compiler directive in my fork of the project to account for that and submit it back once I can test it.

As I said before, I previously had installed GDAL/OGR so it was already on my machine and my GDAL_DATA environment variable was set. When I built the plug-in and attempted to use it in ArcMap, it threw an error when I tried adding a GeoJSON layer (also with SpatiaLite) that it could not find my gcs.csv file, which is in my GDAL_DATA location. With a little investigation, I found that the code was resetting that variable at runtime to point to the location of the plug-in binary. I copied the files there and it worked well from then on. I'll probably try to add a way to check for the existence of that variable before setting it. None of these issues were major and I think they were reasonable design choices up front so I am not concerned by them.

At that point, I was able to quickly add GeoJSON and SpatiaLite layers to my data frame in ArcMap. This is pretty exciting to me since the ability to support a wide range of data types was a long-standing goal of zigGIS and I'm glad that Ragi has conquered that with this work.

Because the layers are added using a plug-in workspace, they are full read-only citizens inside ArcGIS. For example, I was able to wire up a couple of models using ModelBuilder and execute clips (clipping a GeoJSON layer with a SpatiaLite layer) and buffers and simple tests. I'm really not a huge ModelBuilder user but I thought it would be a good way to test things out.

<div style="text-align:center;">
<img src="/images/posts/buffer.png" />
<div style="text-align:center;font-size: 14px;">Model to test a simple buffer<br/><br/></div></div>

The model above produced a 50-foot buffer around Amtrak rail lines from NTAD 2012 in GeoJSON format. The resultant buffer was written to a file geodatabase. As you can see from the image below, it worked like a charm.

<div style="text-align:center;">
<img src="/images/posts/buffer_result_small.png" />
<div style="text-align:center;font-size: 14px;">Results of the buffer model.<br/><br/></div></div>

I achieved similar success with a clip operation so I'm sufficiently confident in trying to package the plug-in up and put it in the hands of some of the analysts with whom I work. All-in-all, the plug-in is a nice piece of work. It's still not fully baked but it's a very solid start and deserves a closer look if you're looking to expand the reach of your ArcGIS investment.