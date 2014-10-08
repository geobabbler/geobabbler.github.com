---
layout: post
title: "Using Virtual Rasters to Generate Contours in QGIS"
date: 2014-04-17 13:39
comments: true
categories: 
- GIS
- QGIS
- raster
- elevation
- mapping
---
Every now and again, I am asked to make maps. It's not my strongest suit, but it sometimes comes with the territory. My latest task, as mentioned in my previous post, involves building support for [MBTiles](https://www.mapbox.com/developers/mbtiles/) databases into a mobile situational awareness tool. This is done so that the devices can have a persistent local basemap in the field. The need arose to ensure that the basemaps were high contrast to assist with visibility in bright sunlight. Something like this:

-> <img src="/images/posts/qgis_contour0.png" /> <-

One of the requirements was to have topographic-map-like contours to indicate changes in elevation. Existing map services didn't provide what we needed so it was necessary to build a custom map, which meant generating contour lines. It had been years since I had last done that with Esri tools, but I didn't have any extension licenses available, so I turned to [QGIS](http://www.qgis.org/en/site/) to get the job done this time.

<!--more-->

My area of interest was a portion of Virginia. Since I couldn't find any pre-generated contours for the state, I turned to elevation models. There are numerous places to get such data, but I [downloaded some DEMs from Radford University](http://geoserve.asp.radford.edu/dems/va_dems.htm) since they are already carved up by county. They are perhaps a bit dated, but they sufficed for this particular testing round.

It was easy to find [guidance on how to generate contours in QGIS](http://boringnerdystuff.wordpress.com/2012/07/14/302/). So I ran the process on a couple of adjacent counties and noticed that the edges didn't line up, which was not surprising. My first thought was that I would need to merge the DEMs but, luckily, I stumbled across the virtual raster tool in QGIS. This tool provides a nice UI for building a [GDAL virtual raster](http://www.gdal.org/gdal_vrttut.html) from a series of separate rasters specified by the user. This can be a bit cumbersome to do manually and this GUI tool was a real time saver. It can be found in QGIS Dufour here: 

-> <img src="/images/posts/qgis_contour1.png" /> <-

To make my life easier, I moved all of my DEMs into one folder so I could just point the tool at the folder. I filled in the name of the output file and took the defaults for everything else.

-> <img src="/images/posts/qgis_contour2.png" /> <-

Notice that the dialog shows me the GDAL command that I am building with the UI. Advanced users can even edit it here. This is a really nice feature that can help you get comfortable with GDAL. I am not a GDAL expert, nor am I particularly adept with raster operations so I found this to be a huge help and I plan to use it more.

The tool doesn't change any data; it merely writes a text file so it works very quickly. The resulting virtual raster was done in a few seconds.

-> <img src="/images/posts/qgis_contour3.png" /> <-

With the data now "merged," I was able to continue with data generation. For my purposes, 10-meter contours were more than sufficient. I generated a shapefile, but any QGIS-supported format is valid as an output. It should be noted that the "Attribute name" choice is not checked by default. Check this if you want to attach the elevation value to each line. Also notice that QGIS is again giving us the relevant GDAL command as we build it. This is very powerful as it gives you the option to use QGIS to prototype GDAL operations and then script them outside of QGIS, if you desire.

-> <img src="/images/posts/qgis_contour6.png" /> <-

This process took a little longer, thanks to Fauquier County, but still finished in about 90 seconds. The resulting contours were contiguous across counties, so my needs were met.

-> <img src="/images/posts/qgis_contour8.png" /> <-

I'm now in the process of styling the map in [TileMill](https://www.mapbox.com/tilemill/) so that I can generate the databases. It's good to occasionally take off my developer hat and put on that of a user. I've known for quite a while that QGIS stands toe-to-toe with any other desktop GIS software but this work got me to use some tools that I rarely ever touch. I was impressed with not only the speed, but also how smoothly the work flowed. My pedestrian laptop didn't engage in nearly the same level of huffing and puffing that it does when I have to use other software. That may be a hidden "win" in that users can extend the useful life of their hardware by using tools that don't tax it as much while producing the same results.