---
layout: post
title: "Personal Geospatial Workflows, May 2014 Edition"
date: 2014-05-20 08:21
comments: true
categories: 
- GIS
- QGIS
- GDAL
- ArcGIS
- MBTiles
- Arc2Earth
- TileMill
- Python
---
I have been spending the past few weeks dealing more with data and mapping than I have in quite a while. It's given me a chance to regain my footing with map-making, reconnect with some end-user tools like [Arc2Earth](http://www.arc2earth.com), and build a little more proficiency with things like [GDAL](http://www.gdal.org/), [QGIS](http://qgis.org), and [TileMill](https://www.mapbox.com/tilemill/). Of course, I've been able to sneak in some coding as I've identified gaps in my workflow.

In a nutshell, I am building base maps for use on disconnected mobile devices. There are two styles of base maps; imagery (really more of an imagery/vector hybrid) and a high-contrast map for use on the outdoor devices and sourced only from vector data. In both cases, I am building MBTiles databases to support the requirement for disconnected operations and to provide consistency in data size and performance.

For the imagery base maps, I was faced with following a data request process that may or may not have resulted in getting imagery in a timely fashion. Alternatively, I was presented with the option of using a tiled map service to get the imagery. Given that I was just making basemaps, this would have been acceptable but for the spotty speed and reliability of the network connection. The ideal solution would be to get only the tiles I need, store them locally, create a geo-referenced image from them, and build a virtual raster table (VRT) for each level.

<!--more-->

Downloading the tiles was easy, but for the VRT to work, each tile needed to be geo-referenced. It was fairly easy to modify the venerable [globalmaptiles.py](http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/globalmaptiles.py) to include a routine to create world file parameters for a specified tile. With this, I was able to write out an affine transformation world file for each tile I downloaded. I rolled this whole process up into a [Python script that's available here](https://github.com/geobabbler/tile-grab). Please note that my goal was to create a VRT, so the script flattens out the tiling scheme so that all images are under the appropriate "Z" directory. (This particular server was an ArcGIS Server but the script doesn't care as long as you can provide a valide URL template.) 

{% codeblock lang:bat %}
python tile_grab.py -b -158;21;-157;22 -d E:\tiles\oahu_img\a -i false -z 6 -u http://www.someserver.net/arcgis/rest/services/ImagerySvc/MapServer/tile/{z}/{y}/{x}.png
{% endcodeblock %}

With the tiles downloaded and geo-referenced, it was easy to use the gdalbuildvrt utility to generate the VRT, which can be used in QGIS, TileMill, and ArcGIS Desktop as you prefer.

{% codeblock lang:bat %}
gdalbuildvrt 6.vrt 6/*.png
{% endcodeblock %}

It seems a little odd to use tiles to make tiles, but I needed to add some additional data and styling to make the maps do what I needed to do. The downloaded tiles were just a stand-in for what would have been a standard raster data source. The range of useful resolution for a set of tiles is pretty narrow so you'll probably need to grab a few levels and, even then, you'll need to be careful how you use them. In most cases, using local raster/imagery is better but using tiles was fine for my use case and helped mitigate a byzantine data acquisition process. Here's how I set the ranges in ArcGIS (left) and TileMill (right):

-> <img src="/images/posts/vrt_zoom2.png" /> <-

Using this approach, I was able to successfully generate my maps using either of two technology mixes. I succeeded in using both TileMill and ArcGIS/Arc2Earth to generate my maps. I ended up doing most of the work in Arc2Earth due to the availability of command-line tools that helped me optimize performance.

Before attempting this method, it's important to make sure that you are not violating any terms of service, license agreements, or attribution requirements in doing so. I knew this wasn't an issue in my case, but such questions need to be answered before you start grabbing data.
