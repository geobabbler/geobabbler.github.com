---
layout: blog
title: zigGIS and Spatial References
post_author: bdollins
categories:
- arcobjects
- postgis
- postgresql
- ziggis
---

I'm still playing around with zigGIS and I have noticed that it doesn't seem to play well when I define the spatial reference of a data set in PostGIS. Any data set that has a defined spatial reference fails to draw in ArcMap. In addition, the layer properties always indicate that the coordinate system is undefined, whether on exists or not. This leads me to belienve that zigGIS is not handling the spatial references well.

<a href="http://geobabble.files.wordpress.com/2006/12/where_are_my_states.png"><img src="http://geobabble.files.wordpress.com/2006/12/where_are_my_states.thumbnail.png" /></a> 

As you can see, the dtl_st layer does not draw in ArcMap. I imported it into PostGIS using shp2pgsql with an SRID of 4326 (WGS84). The others layers were loaded with an SRID of -1.

<a href="http://geobabble.files.wordpress.com/2006/12/there_they_are.png"><img src="http://geobabble.files.wordpress.com/2006/12/there_they_are.thumbnail.png" /></a>

As shown, the layer draws fine in QGIS. I will need to dig into the zigGIS code a little more to see about this one.