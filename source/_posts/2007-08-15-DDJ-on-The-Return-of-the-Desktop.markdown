---
layout: blog
title: DDJ on "The Return of the Desktop"
post_author: bdollins
categories:
- arcgis desktop
- arcgis engine
- arcgis server
- arcobjects
- articles
- ddj
- esri
- gis
---

Okay, I swear I'm not on the DDJ payroll, but <a href="http://www.ddj.com/web-development/201202675">this article</a> caught my eye immediately. <a href="http://www.swaine.com/">Michael Swaine</a> has been on a roll lately but I think this one just drips with significance for the GIS community.

Over the past 10 years, as everyone has run screaming from the desktop, I've been a little mystified as to why it was considered a good thing to reduce a <a href="http://www.computerpoweruser.com/Editorial/article.asp?article=articles/archive/c0612/28c12/28c12.asp&amp;guid=">CPU more powerful than everything NASA had in 1969</a> to a mere vehicle for a browser. The browser-based model reduced our computers to really cool-looking equivalents of a <a href="http://en.wikipedia.org/wiki/VT220">VT220</a> so it's nice to see that the market is starting to gain back a little sanity.
<!--more-->
I will readily admit that the browser model has its advantages. Application deployment is a snap compared to what it takes to ensuring desktops are in synch. Anyone who's had to deal with <a href="http://www.nmciinfo.usmc.mil/nmci2/nmci.nsf/HomePage?openform">NMCI</a> will vouch for that. In addition, there's the matter of targeting the desktop OS. That can be a pain for a desktop app (Windows/UNIX/Linux?, Flavor of Linux?, 32bit or 64bit?, ugh). That hasn't changed much over the years. I remember running ArcView under <a href="http://en.wikipedia.org/wiki/Win32s">Win32s</a> on <a href="http://en.wikipedia.org/wiki/Windows_3.1x">Windows 3.11</a> also testing <a href="http://www.macrovision.com/products/installation/installshield.htm">Installshield</a> builds against WinNT 4, Win2K and Win9x for <a href="http://www.esri.com/software/mapobjects/index.html">MapObjects</a> apps. So, yeah, the web app model is definitely attractive. However, the trend has also led to the need for really big bandwidth, multi-socket/multi-core servers and a loss of control at the desktop for the user. If the developer of the server app/service didn't think of it and the sysadmin of the server doesn't want you to have it, you're kind of outta luck. Also, Moore's Law has been giving us faster, better CPUs but we've been asking them to do less and less.

The article gives a few examples of products that are making use of local resources instead merely relying on the server for everything. In the article, things like <a href="http://dojotoolkit.org/">Dojo</a>, <a href="http://gears.google.com/">Gears</a> and <a href="http://silverlight.net/">Silverlight</a> are discussed. We're already seeing some of this trend in our market with the advent of the various virtual globes (<a href="http://earth.google.com/">Google Earth</a>, <a href="http://worldwind.arc.nasa.gov/">NASA World Wind</a>, <a href="http://www.esri.com/software/arcgis/explorer/index.html">ArcGIS Explorer</a>, etc.). These apps tap into very data-rich servers or services but use local resources for tasks such as tile caching. I think GIS is an ideal place to push the boundaries of this model due to the resource-intensive nature of some geospatial processes.

This is an area where, with a little work, the <a href="http://www.esri.com">ESRI</a> product line could shine. With <a href="http://www.esri.com/software/arcgis/about/desktop_gis.html">ArcGIS Desktop</a>, <a href="http://www.esri.com/software/arcgis/arcgisengine/index.html">Engine</a> and <a href="http://www.esri.com/software/arcgis/arcgisserver/">Server</a>, the same objects can potentially reside on the server as well as the desktop. It would be interesting to see these objects be able to communicate together in such a way as distribute processing load between themselves. Of course, any of the technologies mentioned in the article could serve as a basis to do a similar thing with non-ESRI technologies or for users with only a browser. Not that such an approach would be easy or trivial, but it would certainly be worthwhile.