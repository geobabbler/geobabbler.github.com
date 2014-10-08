---
layout: blog
title: PostGIS and ArcGIS 9.1
post_author: bdollins
comments: true
categories:
- arcobjects
- esri
- gis
- postgis
- postgresql
- ziggis
---

I've been intrigued for some time by an open-source (GPL) project out there called <a href="http://code.google.com/p/ziggis/">zigGIS</a>. It is a C# project that enables a direct read of PostGIS by ArcGIS. It is intriguing for a couple of reasons. First is the promise of reading directly from PostGIS and working with your data in ArcMap without the need to create intermediate shapefiles or some other ESRI-friendly data format. Second is the fact that the project is a good example of the "correct" way to extend data support in ArcGIS. That's to say the authors built the necessary workspace, feature class, and cursor objects to behave like any other set of geodatabase objects. As an ArcObjects developer, having a working example of this, with source code, was irresistable.

I had originally downloaded it about a year ago but let it sit because it only supported ArcGIS 8.x. I recently went back to it discover an updated version but still only 8.x support. I had a little more time on my hands this time and decided to do the upgrade to 9.1 myself.

The ArcObjects upgrade was fairly painless but I've done that a few times now. I found the documentation to be a little thin on some of the project's dependencies. Specifically, there are several external open-source projects that zigGIS is dependent upon: log4net, npgsql, nini. While the readme specifies these, it doesn't mention version numbers. This created the greatest issue with npgsql due to the fact that the zigGIS developers build a custom version for zigGIS.

The install instructions indicate that you should get npgsql from the pgFoundry and then replace the DLL with custom one for zigGIS. The problem arose from the fact that npgsql has been updated and it also has a dependency on Mono.Security.dll. The latest version of npgsql.dll uses version 2.0 of Mono.Security.dll but the version used by zigGIS uses version 1.0.5 of Mono.Security.

Once I sorted this out, I used the ESRI developer tools to remove references to ESRI.ArcObjects.Core and replace them with the necessary 9.1 libraries. ZigGIS comes with a VS2005 solution but I highly recommend following the developers' instructions and using nant to do your build. They provide their build script and it needs to be updated for 9.1 but it works great. The cursor and geodatabase projects introduce the kind of circular references that Visual Studio doesn't like but that nant handles nicely.

<a href="http://geobabble.files.wordpress.com/2006/12/postgis_arcmap.png"><img alt="POSTGIS Data in ArcMap with identify window." border="0" src="http://geobabble.files.wordpress.com/2006/12/postgis_arcmap.thumbnail.png" style="float: left; cursor: hand; margin: 0 10px 10px 0;" /></a> After I got the project to build, I was able to access data directly from PostGIS. This screen shot shows a sample data set in ArcMap. I'm running PostgreSQL 8.2 with PostGIS 1.2.0 on a Windows XP box. I loaded this data into PostGIS using the shp2pgsql utility that ships with PostGIS. The utility of zigGIS is readily apparent but its approach holds wider promise. There are numerous other data sources and open-source projects that could be integrated using the approach the zigGIS team has laid out here. <a href="http://mitab.maptools.org/">MITAB</a> is one that springs to mind.

Despite some of the issues I had with the build process, I got the project up and running in less than a day. Given the results, that seems like a worthy investment of time.