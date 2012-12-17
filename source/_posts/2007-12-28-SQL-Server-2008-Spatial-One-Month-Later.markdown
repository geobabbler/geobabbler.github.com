---
layout: blog
title: SQL Server 2008 Spatial - One Month Later
post_author: bdollins
categories:
- gis
- sql server spatial
---

So it's been about a month since the release of the SQL Server 2008 November CTP. I've been dabbling with it and have made several posts about it. I still have a lot more digging to do with it but here are my impressions after a month:<!--more-->

1. Geography - I was a little dubious about the use of two different spatial data types when I first cracked it open but have gradually begun to come around to this concept. I like the idea of a data type dedicated to spherical data. I'm sure that's in there to meet requirement of Virtual Earth but I can think of a number of uses. Specifically, certain types of signals modeling/simulation and over-the-horizon visibility analysis could benefit from it. I will admit that I haven't dug into the geography data type as much as I'd like to, but I plan to focus more on that after the first of the year.

2. Spatial References - From a GIS perspective, support for spatial references could be seen as a little thin. Oracle, PostGIS and ArcSDE have spoiled me into expecting the database to do it all for me but MSFT seems to be taking a different view here. They've provided the geometry data type and you can specify an SRID but it's pretty much left to the application to know what to do with it. Taking the long view, there is an opportunity here for a third-party or open-source solution to provide the capability that the GIS community has come to expect. It's not a stretch to imagine something like <a href="http://www.codeplex.com/Wiki/View.aspx?ProjectName=MsSqlSpatial">MsSqlSpatial</a> modified to use the SQL2008 geometry type. So, I've decided to keep my mind open here.

3. <del datetime="2007-12-28T00:12:11+00:00">WKT - The X/Y switching issue is the only thing I've seen so far that really needs to be addressed and changed. I think this will be a can of worms.</del> Microsoft listened. <a href="http://www.sharpgis.net/2007/12/27/TheCommunityWorks.aspx">Morten</a> said it best: the community works!

4. Buzz - No denying it, there was a huge amount of pent-up demand for spatial support in SQL Server. In addition to the commercial support (slightly unprecedented for a CTP, I think), there's been quite a bit of activity among independent developers. It's important to remember that this is the first CTP in which spatial support has been included (although commercial partners had earlier access) so I would expect things to grow from here.

5. Spatial Indexing - I haven't dug into this too deeply except to note that a spatial index does (unsurprisingly) increase performance. I need to benchmark it more (like at all) from this standpoint. I'm also curious about behavior of spatial indices across table partitions. There were some deficiencies (IMHO) with spatial indices and partitioning with Oracle Spatial so I'm curious here.

6. Data Loading tools - There aren't any included that support spatial data. There is always <a href="http://www.safe.com/">FME</a> but I think there should at least be support for importing from a shapefile (and maybe GML or KML) in the 'SQL Server Import and Export Wizard' so that you have something to get going with. That may come in a later CTP but there's nothing there now.

7. Oh yeah, the rest of SQL Server. Kinda lost in all of the spatial discussion is that SQL 2008 is already pretty solid. As a whole, it's close to production quality now.

In summation, I come away fairly impressed so far. I think that those of us who've been working with GIS (and spatial DB's) for a while will definitely need to change our mindsets when working with SQL Server. There are definitely some different viewpoints at work with it. Out of the box, it does less than you may be used to. That'll force your DBA's to get up to snuff with a lot of new concepts but it'll also present an opportunity in the 3rd party market.

So there's my two cents so far. This and $4.50 will get you...

<img alt="You'll need it after staying up till 3:00 AM playing with SQL Server 2008" src="http://bigmarketing.files.wordpress.com/2007/05/starbucks_cup.jpg" />