---
layout: blog
title: My Little Open-Source Stack
post_author: bdollins
comments: true
categories:
- geoserver
- gis
- open source
- postgis
- postgresql
- sharpmap
- udig
---

It's been a while since I've posted and things have been busy. Soccer season has ended, the kids have finished school and I've finished up at my client site and moved back to the office. Among the many things I've been working on, I've started building an open-source GIS stack. It's not entirely open-source since it's installed on a Windows server but the purists will have to get over that.

So far, I've got <a href="http://www.postgresql.org/">PostgreSQL</a>/<a href="http://postgis.refractions.net/">PostGIS</a> and <a href="http://docs.codehaus.org/display/GEOS/Home">GeoServer 1.5.1</a> installed. I've got GeoServer running as a Windows service and I've loaded a couple of data sets into PostGIS, serving one out through GeoServer for now. I've been able to successfully connect to the <a href="http://www.opengeospatial.org/standards/wms">WMS</a> and <a href="http://www.opengeospatial.org/standards/wfs">WFS</a> remotely using <a href="http://udig.refractions.net/confluence/display/UDIG/Home">uDig</a> as a client. <a href="http://code.google.com/apis/kml/documentation/">KML</a> seems to work fine for the sample data sets that install with GeoServer but my test layer doesn't work correctly. That's not as much of an issue for us right now because we'll probably focus on <a href="http://worldwind.arc.nasa.gov/">World Wind</a> for the spinny globe component. Basically, I'm at the infrastructure-building stage. My next step is to set up <a href="http://www.codeplex.com/SharpMap">SharpMap</a> and start writing some apps.

The only hiccup I've had so far dealt with getting GeoServer to run as a service. Every time I logged out, the service would stop (not a great feature in a service). It turns out that I had the DLL and JARs for the <a href="http://wrapper.tanukisoftware.org/doc/english/introduction.html">Java Service Wrapper</a> in the wrong place. Now it works fine.

So far, I'm impressed with how smoothly it's going. We'll see how long that keeps up once I start slinging code. ;)

<img alt="The road less traveled?" src="http://geobabble.files.wordpress.com/2007/06/road.jpg" />