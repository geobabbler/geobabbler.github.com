---
layout: post
title: "SharpMap 1.0 RC1 Released"
date: 2013-03-28 06:10
comments: true
categories: 
- GIS
- open source
- SharpMap
- .Net
- C#
---
Over on Google+, [Diego Guidi](https://plus.google.com/u/0/117900686009614580552/posts) let me know that the [SharpMap 1.0 Release Candidate has been released](http://sharpmap.codeplex.com/releases/view/104098). There was a time when I worked with, [and wrote about](https://www.google.com/search?q=site%3Ablog.geomusings.com&q=sharpmap), SharpMap a lot. During that entire time, the stable version of SharpMap sat at some version number that started with "0.9". The release of a 1.0 candidate is a signal that the project is moving forward.

-> <img src="http://www.zekiah.com/sites/default/files/images/SharpMapSQL2008.preview.png" /> <-

This is important because there are still an awful lot of .Net developers out there, especially in government shops that made a big Microsoft push in terms of infrastructure and training years ago. Of course, many of those shops are also committed to Esri technologies but SharpMap, while being a fully-functioning mapping/GIS library, also provides easy access to data sources not natively supported by Esri. Additionally, it is very easy to extend to support new or custom data sources and strightforward to [get SharpMap to play nicely in traditionally Esri-centric environments](http://www.zekiah.com/index.php?q=node/146).

<!--more-->

At [my company](http://www.zekiah.com) we've used SharpMap for just that for one of our key Navy customers. By building custom SharpMap data sources, we've been able to encapsulate business logic in Oracle, including the use of Oracle [Spatial SQL](http://www.slideshare.net/shawty_ds/what-is-spatial-sql) to execute spatial analysis processes and deliver the results back to an Esri web client that is also interacting with ArcGIS Server for many standard functions. SharpMap enabled us to expose this logic through an HTTP+JSON interface while bypassing geodatabases, server object extensions, and other such cruft.

In recent years, other open-source .Net projects such as [DotSpatial](https://dotspatial.codeplex.com/) have gained traction and that's good. The .Net environment remains in widespread use so it is useful to have open-source geospatial options for that platform. I'm happy to see SharpMap remaining an option in that space.