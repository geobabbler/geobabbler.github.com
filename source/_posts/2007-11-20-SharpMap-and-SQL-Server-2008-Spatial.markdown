---
layout: blog
title: SharpMap and SQL Server 2008 Spatial
post_author: bdollins
categories:
- database
- gis
- open source
- sharpmap
- sql server
- sql server spatial
---

I downloaded the <a href="http://www.microsoft.com/downloads/details.aspx?FamilyId=3BF4C5CA-B905-4EBC-8901-1D4C1D1DA884&amp;displaylang=en">November CTP</a> yesterday and couldn't resist. Today I wrote a <a href="http://www.codeplex.com/SharpMap">SharpMap</a> data provider for it. The black rectangle below represents a sample data set I created. It's not as pretty as the Mexico data I used with <a href="http://www.sqlite.org/">SQLite</a> but it's beautiful to me. It's being displayed in the DemoWinForm app that comes with SharpMap 0.9. I am still working in 0.9 because a project I am on is using it. I'll migrate to 2.0 a little later.

<a href="http://geobabble.files.wordpress.com/2007/11/sharpmap_sql2008.png" title="sharpmap_sql2008.png"><img alt="sharpmap_sql2008.png" src="http://geobabble.files.wordpress.com/2007/11/sharpmap_sql2008.thumbnail.png" /></a>

Anyway, <a href="http://geobabble.wordpress.com/2007/07/31/extending-sharpmap-with-sqlite/">I previously sung the praises of SharpMap and its ease of extensibility</a>. The turn-around time needed to write a provider speaks well of SQL 2008 to this point. All of the native SharpMap functions for handling WKB are working fine with the output from SQL 2008. This tells me that Microsoft is doing a good job of implementing OGC specifications.

I am compiling my first impressions about SQL 2008 Spatial and will post them later. Most of them are favorable. It's the first public beta of sorts and there are still some things missing (coordinate tranformations for instance) that I hope will come later but it makes a good first impression. Outside of the spatial capability, the platform in general seems stable. It's almost production-ready as is.

I will post the code to the provider later. There's one piece unrelated to data handling that I need to clean up and then I'll most likely post it over on the SharpMap site and see if they'll take it. After that, I guess I'll build a data loader...