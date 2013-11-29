---
layout: post
title: "Desktop Not Dead"
date: 2013-10-23 09:42
comments: true
categories:
- GIS
- desktop
- toolbars
- ArcGIS
- QGIS 
---
In 2011, I gave a talk at the NCGIS conference about the continued dominance of the desktop in the world of GIS. In that talk, my main point was that, regardless of the ultimate destination of GIS data or maps (cloud, server, paper, PDF, etc.), most GIS data passes through a desktop GIS at some point. I don't have hard data to back up that claim but I think anyone who has worked in the industry for any length of time will agree that it feels right. If we loosely define "desktop GIS" to include not only GUI analytical tools like [ArcMap](http://www.esri.com) or [QGIS](http://qgis.org), but also command-line tools such as [GDAL/OGR](http://www.gdal.org/) and cartographic tools such as [TileMill](https://www.mapbox.com/tilemill/), I think the statement is even more comfortable.

->{% youtube ljIQo1OHkTI %}<-

Essentially, my claim was that desktop GIS is still the onramp for most of the data we interact with on the web. Over the past few years, geographically tagged live and temporally-sensitive data streams have increased in importance but I think most geospatial data still starts as traditional data sources (rasters, vectors, terrain, etc.) that pass through a desktop for analysis, processing, and styling before moving on to the web. Esri, for example, still features its desktop tools as prominent parts of its web publishing workflow and [Boundless](http://boundlessgeo.com/) is working on a [similar path for QGIS](https://github.com/boundlessgeo/suite-qgis-plugin).

<!--more-->

The announcement of a Google Maps Engine connector for both [ArcGIS](https://github.com/googlemaps/mapsengine-arcgis-connector) and [QGIS](https://github.com/googlemaps/mapsengine-qgis-connector) is yet another example of the continued importance of the desktop in the GIS world. Simply put, the chances of a user choosing your platform increases if you can cut to the front of the line and present yourself in their desktop environment. [Andrew Turner did a nice summary of many such integration efforts](http://blogs.esri.com/esri/arcgis/2013/10/22/googles-arcgis-toolbar-for-the-cloud/) involving ArcGIS Desktop, although the post fails to mention [Arc2Earth](http://www.arc2earth.com), which I consider the most comprehensive extension of its kind on the market. His discussion tracks with my personal experience in recent years. My most public activities have been [zigGIS](https://code.google.com/p/ziggis/), the [GeoCommons toolbars](http://blog.dc.esri.com/2010/11/22/toolbars-for-geocommons-and-geoiq/) (thanks for the mention, Andrew), and the [WeoGeo](http://www.weogeo.com) toolbar. I've also built a couple of others for organizations that wanted to get their data products in front of ArcGIS users easily and I am currently working on a live feed extension for a government user. The reality is that I've done more desktop development in the last three years than I had done in the preceding ten.

Andrew's point at the end of his post about Esri's extensibility through various means is quite true. As much as developers love to complain about ArcGIS Desktop and ArcObjects (myself included), I have yet to find a data source that I couldn't integrate using those tools. As I dig into the APIs behind QGIS, I am finding the same to be true there. Despite the tendency to downplay desktop GIS tools these days, I see them continuing to play a significant, if quiet, role in defining how we interact with maps and geospatial data across all platforms for the foreseeable future.