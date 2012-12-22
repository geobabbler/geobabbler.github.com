---
layout: blog
title: QGIS 1.4.0 Released
post_author: bdollins
comments: true
categories:
- gis
- open source
- OSM
- QGIS
---

<a href="http://blog.qgis.org/node/142">QGIS 1.4.0 has been released.</a> As <a href="http://wherewithal1.wordpress.com/">Terry</a> mentioned on Twitter, that news seemed to get lost amongst the discussion of the GeoDesign Summit and the rebranding of ArcGIS 9.4 to 10.0. I have made use of QGIS in the past and have been perusing 1.4.0 lately. I must state that I am not an analyst nor do I play one on TV but I have been very happy with this release.<!--more-->

QGIS has been building a lot of capability over the last few versions, in part because of its integration with GRASS but also partly because of its extensible nature. QGIS features a plug-in approach that allows developers to extend it using Python in addition to C++. This gives the ability for someone to develop plug-ins that run on all of the platforms supported by QGIS, lowering the barriers for third-party developers.

The new release puts a lot of these capabilities out in front of you at start-up. This can lead to a first impression of a cluttered user interface but, in this case, I think it is a good decision. In my experience, users find hiding of capability attractive only if they are very familiar with a application and are comfortable navigating it to find what they need. This is not always true with a new application with which they may be unfamiliar.

Many of the analysts that I work with, for instance, continue to go back to ArcMap because they know what tools it contains and how to access them. I have known for a while that QGIS has had many tools that would be attractive (such as some of the raster analysis tools) but it was not always obvious that those tools were present or how to access them.

The new release resolves that. By putting everything on display, the capability is there to discover. As users get comfortable with QGIS, they can hide tools as desired and gain proficiency in navigating the application.


I am particularly impressed with the support of <a href="http://www.openstreetmap.org/">OpenStreetMap</a> in QGIS. It provides tools to download OSM data, edit it and upload it from within your QGIS session.

<div style="text-align:center;"><a href="http://geobabble.files.wordpress.com/2010/01/qgis1.png"><img alt="" height="178" src="http://geobabble.files.wordpress.com/2010/01/qgis1.png" title="QGIS 1.4.0" width="300" /></a><div style="text-align:center;font-size: 14px;">QGIS 1.4.0 with OSM data displayed<br/><br/></div></div>

So, I?ve decided that it?s time to put QGIS in front of some of my analyst colleagues again and it?s also time for me to commit to learning how to build a QGIS plug-in. It may finally be the kick in the pants I need to get comfortable with Python.