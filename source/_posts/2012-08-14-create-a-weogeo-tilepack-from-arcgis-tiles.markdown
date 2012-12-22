---
layout: blog
title: Create a WeoGeo Tilepack from ArcGIS Tiles
post_author: bdollins
comments: true
categories:
- no fixed address
---

A couple of months ago, <a href="http://twitter.com/dandye" target="_blank">Dan Dye</a> at WeoGeo <a href="http://www.weogeo.com/blog/Create_WeoGeo_Tilepack_from_MBTiles_SQLite_database_with_mbutil.html" target="_blank">posted about work he had done</a> to facilitate creating <a href="http://www.weogeo.com" target="_blank">WeoGeo</a> tile packs from <a href="http://mapbox.com/developers/mbtiles/" target="_blank">MBTiles</a> databases. Recently, I had the need to do the same with <a href="http://www.esri.com" target="_blank">ArcGIS</a> tiles. As Dan explained, WeoGeo uses a ZYX structure in their tile packs. This matched up nicely with the Level/Row/Column structure <a href="http://blogs.esri.com/esri/arcgis/2010/08/20/checking-your-local-cache-folders/" target="_blank">used by ArcGIS</a>. WeoGeo supports either WGS84 (EPSG:4326) or Spherical Mercator (EPSG:3857) as spatial references for tile packs. In my case, I used the latter. My preferred way of creating tiles from ArcGIS products is to use <a href="http://www.arc2earth.com/" target="_blank">Arc2Earth</a>. While Arc2Earth does directly export to the WeoGeo structure, the tiles are watermarked with a WeoGeo logo, which was not needed in this case. Arc2Earth also exports to the ArcGIS structure, so a simple script to convert to the WeoGeo structure is all that was needed. 

<img alt="Arc2Earth settings to create ArcGIS Tiles" class="aligncenter size-medium wp-image-2815" height="243" src="http://geobabble.files.wordpress.com/2012/08/a2e_ags.png?w=300" title="Arc2Earth settings to create ArcGIS Tiles" width="300" />

<!--more-->

So I wrote a Python script to migrate from the ArcGIS structure to the WeoGeo structure. It primarily uses file system operations with a little bit of logic to unroll the hex-based file naming convention used by Esri. That script can be found <a href="https://github.com/geobabbler/ags2weo" target="_blank">here on GitHub</a>. Be sure to check out the README for the current state of the script. The biggest potential gotcha is that it doesn't current use the ArcGIS conf.xml file so, if your ArcGIS cache contains non-consecutive zoom levels (0-2 and 4, for example), it will throw this script off. This has to do with the peculiarities in how Esri names the levels (Z) in their format. I'll be making this more robust in subsequent versions, along with with some work to provide a more complete workflow.