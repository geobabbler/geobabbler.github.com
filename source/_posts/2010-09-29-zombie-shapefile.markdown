---
layout: blog
title: Zombie Shapefile?
post_author: bdollins
comments: true
categories:
- esri
- gis
- shapefile
---

So I was walking to the <a href="http://www.esri.com/events/dev-meetup/index.html">Esri Dev Meetup</a> in Arlington, VA with <a href="http://www.maploser.com/">Kate Chapman</a> and <a href="http://www.adamestrada.com">Adam Estrada</a> and we were talking about <a href="http://www.gaia-gis.it/spatialite/">SpatiaLite</a>. Specifically, we were discussing <a href="http://www.spatiallyadjusted.com/2010/09/16/spatialite-is-not-the-shapefile-of-the-future/">James' recent post</a> and the lack of uptake of SpatiaLite. The really easy thing to do is to lay the blame at the feet of <a href="http://www.esri.com">Esri</a> for not supporting it. But then it occurred to me that Esri hasn't succeeded in making the file <a href="http://webhelp.esri.com/arcgisdesktop/9.2/index.cfm?TopicName=Types_of_geodatabases">geodatabase</a> the next shapefile nor did they succeed in making the personal geodatabase the next shapefile. When I think about it, Esri has been trying really hard to kill the shapefile for a long time, without success. <!--more-->

<img alt="null" src="http://laughingsquid.com/wp-content/uploads/zombie_can_has.jpg" />

A little historical perspective is in order. At the time ESRI published the shapefile format, they were under a lot of pressure from the community to open something. I recall most of the focus being on the <a href="http://en.wikipedia.org/wiki/ArcInfo">ARC/INFO</a> <a href="http://walrus.wr.usgs.gov/infobank/programs/html/definition/arc.html">coverage</a>, mainly because a lot of data resided in that format. Instead, they opened the shapefile, which had been introduced with ArcView 2.0. It took off like wildfire. Before long, every major competing platform could read and write shapefiles (heck, even Visio had a "maps" feature that could read it).

Keep in mind that most of us were dissatisifed with DBF files even back then. They were already long in the tooth. Also, the multiple-file structure of the shapefile was clunky from the get-go. The way I see it, the main reason for the success of the shapefile was the lack of anything else. The shapefile never had to present a "compelling reason to change" because there was nothing to change from. Sure, everyone still used their GIS-du-jour's proprietary format (<a href="http://www.mapinfo.com">MapInfo</a> TAB for example) but we could now pass around shapefiles freely.

The problem with any data format that seeks to succeed the shapefile is that it must first succeed the shapefile in the minds of users. Any subsequent pretender format must jump a hurdle that the shapefile simply did not. It must provide a compelling reason to change from the shapefile. As developers and system architects, we have plenty of those reasons (long column names, topology, better spatial reference support, object-oriented data, single-file structures, etc.). For whatever reason, those things have not resonated with the users. Even all of the compelling features of the geodatabase (which are well-summarized <a href="http://www.paolocorti.net/2008/06/06/spatial-database-for-postgres-and-arcgis-users-how-to-choose/">here</a>), for those users committed to staying completely within the Esri framework, have not killed off the shapefile.

So I'm left to wonder if the shapefile is:

 a) the brainless format that just won't die; or
 b) good enough?