---
layout: blog
title: QGIS 1.8.0 Released
post_author: bdollins
comments: true
categories:
- gis
- open source
- QGIS
---

I caught a tweet by my friend <a href="http://www.paolocorti.net/" target="_blank">Paolo Corti</a> this morning that <a href="http://qgis.org" target="_blank">QGIS</a> 1.8.0 has been released.

{% tweet http://twitter.com/capooti/status/215767511990415360 %}

Upon checking out the full list of new features <a href="http://lists.osgeo.org/pipermail/qgis-developer/2012-June/020685.html" target="_blank">here</a>, a few caught my eye:

<blockquote>
- QGIS Browser - a stand alone app and a new panel in QGIS. The
browser lets you easily navigate your file system and connection based
(PostGIS, WFS etc.) datasets, preview them and drag and drop items
into the canvas.

- DB Manager - the DB manager is now officially part of QGIS core. You
can drag layers from the QGIS Browser into DB Manager and it will
import your layer into your spatial database. Drag and drop tables
between spatial databases and they will get imported. You can use the
DB Manager to execute SQL queries against your spatial database and
then view the spatial output for queries by adding the results to QGIS
as a query layer.

- MSSQL Spatial Support - you can now connect to your Microsoft SQL
Server spatial databases using QGIS.

- Support for PostGIS TopoGeometry datatype

- Terrain Analysis Plugin - a new core plugin was added for doing
terrain analysis - and it can make really good looking coloured relief
maps.

- Heatmap tool - a new core plugin has been added for generating
raster heatmaps from point data. You may need to activate this plugin
using the plugin manager.
</blockquote>

<!--more-->

It looks like a lot of focus has been placed on making it easier to user your data. If you are not familiar with QGIS, it's the best open-source desktop GIS out there and stands toe-to-toe with any commercial equivalent. A few years ago, desktop GIS was considered to be something of an Achilles heel for open-source GIS but that hasn't been true for a long time. I integrated QGIS into my work a while back and it figures more prominently for me with each release.

<img alt="" class="aligncenter size-medium wp-image-2692" height="225" src="http://geobabble.files.wordpress.com/2012/06/smiley-happy-face-yellow.jpg?w=300" title="Smiley-happy-face-yellow" width="300" />

To get a sense of the kind of things you can do with QGIS, check out <a href="http://mapbox.com/blog/binning-alternative-point-maps/" target="_blank">this post</a> on the <a href="http://mapbox.com/" target="_blank">MapBox</a> blog and also check out <a href="http://woostuff.wordpress.com/" target="_blank">Nathan Woodrow's blog</a>. In addition, <a href="http://twitter.com/#!/dmgeo" target="_blank">Caitlyn Dempsey's</a> recent <a href="http://gislounge.com/where-are-the-gis-jobs-a-look-at-the-gis-job-market-in-the-united-states/" target="_blank">map of GIS job availability</a> was built using QGIS. These links are good examples to show that QGIS is excellent, professional GIS tool.

I think my download just finished...