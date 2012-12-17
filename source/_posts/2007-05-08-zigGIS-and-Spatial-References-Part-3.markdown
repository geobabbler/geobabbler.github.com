---
layout: blog
title: zigGIS and Spatial References, Part 3
post_author: bdollins
categories:
- arcobjects
- esri
- gis
- postgis
- postgresql
- ziggis
---

This post updates <a href="http://geobabble.wordpress.com/2006/12/29/ziggis-and-spatial-references-part-2/">this post</a> and <a href="http://geobabble.wordpress.com/2006/12/21/ziggis-and-spatial-references/">this one</a>.

One of our beloved 5 users ;-), James, pointed out recently that <a href="http://code.google.com/p/ziggis">zigGIS</a> still has issues with user-defined coordinate systems. Alas, this is true. When we implemented support for on-the-fly "reprojection," we limited it to the standard <a href="http://www.epsg.org">EPSG</a> SRIDs supported by both <a href="http://postgis.refractions.net/">PostGIS</a> and <a href="http://www.esri.com/software/arcgis/">ArcGIS</a>. This was mainly due to the fact that we were trying to fix a number of things at once.

I have begun to look at building in support for user-defined spatial references. The main difference I see is that the prj syntax is slightly different between PostGIS and ArcGIS. For example the prj strings for SRID 4326 (WGS84) are not the same. They seem to behave correctly but this creates a situation where ArcGIS will recognize all standard SRs as custom is I load them using the PostGIS strings. It's not a huge deal, just interesting. However, <a href="http://www.paolocorti.net">Paolo</a> did notice that ESRI and PostGIS data sources with (theoretically) the same SR can have a slight offset when overlaid in ArcMap. So maybe it's more than just interesting.

I plan to leave the current code alone and just put in routines to handle custom SRs but maybe I'll also play with the standard ones to see if it makes a difference.