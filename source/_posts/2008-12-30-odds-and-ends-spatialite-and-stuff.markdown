---
layout: blog
title: Odds and Ends (SpatiaLite and Stuff)
post_author: bdollins
comments: true
categories:
- arcgis server
- c#
- gis
- open source
- postgis
- sharpmap
- SpatiaLite
- sqlite
---

It has been quite a while since I last blogged. The holidays are always a busy time of year with family a friends and work has been somewhat busy as well. We established a new presence in Colorado Springs (I'll be traveling there at the end of January). Additionally, I've been busy with project work and have recently begun spend part time on a customer site. So, the blog has been squeezed a little.

I am doing more work with <a href="http://www.esri.com/software/arcgis/arcgisserver/">ArcGIS Server 9.3</a> and the Javascript API but probably won't have enough to blog about for a few more weeks. Also, at the urging of <a href="http://geopdf.blogspot.com/">Adam Estrada</a>, I have begun dabbling more with <a href="http://www.gaia-gis.it/spatialite/">SpatiaLite</a>. You may remember my post some time ago about integrating <a href="http://geobabble.wordpress.com/2007/07/31/extending-sharpmap-with-sqlite/">SQLite with SharpMap</a>. SpatiaLite is a spatial extension to SQLite and it seems to be very powerful. I am currently re-working my previous code so that I'll have a SpatiaLite provider for <a href="http://www.codeplex.com/SharpMap">SharpMap</a>. With the use of the <a href="http://sqlite.phxsoftware.com/">SQLite OLEDB provider</a>, this has gone fairly smoothly.

The thing I really like about it is the portability. You can basically drop a couple of DLLs and go. Additionally, SpatiaLite has strong support for many spatial operations so it can be a fairly robust analysis back-end. These two attributes raise a lot of possibilities for mobile applications. I have done some mobile development work with <a href="http://postgis.refractions.net/">PostGIS</a> (okay, the platforms were fairly heavy but they were in vehicles that rolled around) and it worked well but SpatiaLite might ease some of those "in the field" workflows, especially the delivery of relevant basemap information.

With regard to SharpMap, it looks like SpatiaLite provider is under way for 2.0. I am doing my own for 0.9 because it helps me get more comfortable with SpatiaLite. Once I am finished, I'll be happy to share my code but you may want to take a look at what's being implemented with 2.0. It's fairly elegant.

Also of interest, the <a href="http://groups.google.com/group/spatialite-users">SpatiaLite Users Google Group</a>.

Update: the code for SharpMap 2.0 is currently located <a href="http://code.google.com/p/sharpmapv2/">here</a>.