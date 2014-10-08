---
layout: post
title: "SpatiaLite and ArcGIS 10.2"
date: 2013-08-07 12:35
comments: true
categories:
- SQLite
- SpatiaLite
- ArcGIS
- Esri
- open source 
---
With the release of ArcGIS 10.2, [Esri](http://www.esri.com) quietly added support for [SQLite](https://sqlite.org/) as a geodatabase container. This is big news as the community has been looking for such support for some time. An open-source RDBMS originally designed for embedded systems, SQLite has a very small footprint and is [arguably the most widely deployed RDBMS](https://www.sqlite.org/mostdeployed.html) in the world. (Thanks, in part, to the fact that it is embedded into Adobe Reader and other commonly used software.) Over the years numerous strategies for storing spatial data in SQLite have been developed, ranging from simply storing [WKT or WKB](https://en.wikipedia.org/wiki/Well-known_text) geometries in a column up to full extensions like [SpatiaLite](http://www.gaia-gis.it/gaia-sins/), which adds OGC-compliant data types and methods. SQLite is also the engine that drives the popular [MBTiles](http://www.mapbox.com/developers/mbtiles/) implementation used by [TileMill](http://www.mapbox.com/tilemill/) and [MapBox](http://www.mapbox.com).

<!--more-->

[According to the documentation](http://resources.arcgis.com/en/help/main/10.2/index.html#//019v0000001w000000), ArcGIS supports the use of either Esri's ST_GEOMETRY or SpatiaLite data types for geometry storage. This is consistent with Esri's approach on other RDBMS platforms such as [PostgreSQL](http://www.postgresql.org) and [Oracle](http://www.oracle.com). While SpatiaLite has been supported by platforms such as [QGIS](http://qgis.org/), I can't say I've seen a huge demand for data in SpatiaLite format. I have been using it for a while in some of [my company's](http://www.zekiah.com) data modeling work as we have a Federal customer that has a documented requirement for generation of physical models in SpatiaLite, among other platforms. We have also taken the step of supporting SQLite as a container for our [platform independent model (PIM) approach](http://www.zekiah.com/index.php?q=blog/topics/pim) for configuration management of logical geospatial data models.

Esri's new support of SpatiaLite, combined with my existing customer requirements, obviously sparked my interest so I was curious to kick the tires. Unfortunately, I also had the situation that my development environment for the PIM tools, due to current customer constraints, must remain at ArcGIS 10.1 for both the desktop software and the underlying ArcObjects libraries. I have not been able to carve out the time to build a 10.2 VM. 

Luckily, others were also interested in the new SpatiaLite support so [Bryan McBride](http://twitter.com/brymcbride), "[Father Sandman](http://twitter.com/fathersandman)," and I were able to crowdsource some very cursory compatibility tests via Twitter. The full tweet stream can be accessed by clicking the date in the tweet below.

{% tweet http://twitter.com/brymcbride/status/365103999671738369 %}


So, using Father Sandman's existing 10.2 install, we were able to verify the following:

1. A SpatiaLite database created in ArcGIS 10.2 can be accessed and viewed in QGIS 1.9.0 and SpatiaLite GUI 1.7.1
2. A SpatiaLite database created in QGIS 1.9.0 can be accessed in ArcGIS 10.2

Obviously, some more rigorous tests need to be performed but the initial results are promising. I'm curious to explore the boundaries, in ArcGIS terms, between a SQLite geodatabase and a file geodatabase. It remains to be seen whether this will put a dent in the use of file geodatabases. If it happens at all, I think it will take time since SQLite is not on the radar of the vast majority of ArcGIS users. I would hope, at a minimum, it puts a final stake through the heart of the personal geodatabase. It could also drive explicit accreditation of SQLite/SpatiaLite tools on government systems, which would be nice.

I'm happy, and somewhat pleasantly surprised, to see Esri take this step and provide another open option for data exchange.

Now, about GeoJSON...