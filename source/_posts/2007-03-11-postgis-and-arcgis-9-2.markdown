---
layout: blog
title: PostGIS and ArcGIS 9.2
post_author: bdollins
comments: true
categories:
- arcgis desktop
- arcobjects
- database
- esri
- open source
- postgis
- postgresql
- ziggis
---

Updating my <a href="http://geobabble.wordpress.com/2006/12/17/postgis-and-arcgis-91/">earlier post</a>:

I completed my upgrade to 9.2 yesterday with the installation of the last service pack. The first thing I did was upgrade <a href="http://code.google.com/p/ziggis">zigGIS</a> to ensure that there wouldn't be problems. I have to say that the first thing I noticed was all of the tools ESRI has integrated with VS2005. I liked what they did with 2003 but these are even better. One thing I liked was the "Add ArcGIS Reference" tool. It updated my old 9.1 references to 9.2 without my having to remove them first. It was nice to have that step taken away.

That was all I needed to do. After I upgraded the references and built the project, it worked like a charm. I've got to work on a clean way to swap the references in and out, though. <a href="http://www.paolocorti.net">Paolo</a> is still at 9.0. When I was at 9.1, I would have to go and update references every time a pulled a new version from Google Code. Right now, I just keep a copy of the .csproj off to the side but there should be a more elegant way to do it.

So the good news is that zigGIS has now been verified against 9.0 (SP3), 9.1 and 9.2.