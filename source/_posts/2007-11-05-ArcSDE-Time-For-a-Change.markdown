---
layout: blog
title: ArcSDE - Time For a Change
post_author: bdollins
categories:
- arcgis server
- arcobjects
- arcsde
- database
- esri
- gis
---

I view <a href="http://www.esri.com/software/arcgis/arcsde/">ArcSDE</a> (and its predecessor, SDE) as something of a seminal technology. In my quest for true enterprise integration of GIS, ArcSDE <del datetime="2009-05-04T21:24:40+00:00">fills</del> filled a crucial gap by providing the ability to store, manage and analyze spatial data in the same <a href="http://en.wikipedia.org/wiki/Relational_database_management_system">RDBMS</a> used for everything else. Long gone are the days when I had to manage relates between INFO tables or shapefiles and that's a good thing. I have since accomplished similar tasks with <a href="http://postgis.refractions.net/">PostGIS</a> and <a href="http://www.oracle.com/technology/products/spatial/index.html">Oracle Spatial</a> but SDE was the first product I ever used that offered the capability to bring my GIS in from the cold.

At version 9.3, ArcSDE will support <a href="http://www.postgresql.org/">PostgreSQL</a> as a back-end, meaning you don't <em>also</em> need to license an expensive RDBMS in addition to ArcGIS to take advantage of everything ArcGIS Server has to offer. This gives us another option and options are good.

I have blogged before about my involvment with <a href="http://code.google.com/p/ziggis/">zigGIS</a>, which has given me a lot of exposure to PostGIS. I've also done a good bit of work with Oracle Spatial. Both experiences have given me experience with, and a love of, spatial SQL (as each has implemented it). Having all of the data types and methods necessary to store, manage and analyze spatial data completely encapsulated in the RDBMS is a huge advantage. Building an n-tier or services-oriented system is so much easier because all I really need to interact with my spatial data is an OLEDB provider (we're a .NET shop). This encapsulation serves to further expose the disadvantages of the current middleware approach of ArcSDE.<!--more-->

Basically, there's a good bit going on with the data (especially if you've versioned your geodatabase) that the RDBMS doesn't know about. This can pose problems for replication, backup, security, failover and a host of other issues. Most of these can be addressed by adhering to ESRI's system design white paper as well as the implementation of some (good) third-party tools.

Before I get too far down this road, let me re-iterate that ArcSDE will support PostgreSQL at 9.3 and that's good. I imagine it'll look a lot like current ArcSDE but with PG on the back end. That's fine and understandable so let me offer up one man's opinion on what ESRI should do with ArcSDE at 10.x.

I think the middleware (giomgr, etc.) needs to go. All of what ArcSDE currently does can and should be pushed completely into the RDBMS. All of the platforms currently supported by ArcSDE, as well as PostgreSQL, can support this. The way I see it, this can be accomplished in two basic ways.

1. Slay the beast - This is the more drastic and, IMO, the least preferable but I'll deal with it first. This approach would boil down to recognition that each of the database platforms supported by ArcSDE (including <a href="http://www.directionsmag.com/editorials.php?article_id=2477">SQL Server 2008</a>, which will be out by the time ArcGIS 10 is) has some form of embedded spatial support and ArcGIS will simply support each of those capabilities, essentially getting out of the spatial data management business. This would lead to issues of consistency across platforms (spatial indexing, query languages, support for partitioning, etc.) and also probably mean a reduction in capability when you consider versioning, feature data sets, raster support and many other features of an ArcSDE geodatabase. Ultimately, I think this approach would be the least desirable for the ESRI user community.

2. Push it down - This approach is, in my opinion, the logical endpoint of what ESRI has already started with the implementation of st_geometry. It is the creation of spatial data types and associated behaviors at the database level. Again, all of the platforms currently supported by ArcSDE can handle this as evidenced by the existence of spatial extensions (and the <a href="http://www.codeplex.com/Wiki/View.aspx?ProjectName=MsSqlSpatial">MsSqlSpatial</a> open-source project for SQL 2005). This wasn't necessarily true when SDE was first introduced so the middleware approach made sense. So I think ESRI should aggressively push all of the capability of ArcSDE down to the database level where it ultimately belongs. This would address a couple of traditionally nagging issues:

<ul>
	<li>Security - Security would be completely handled at the RDBMS level using the native security model of the RDBMS. In addition, there would be no need for a separate ArcSDE service that needs to connect via an 'sde' user. This has always caused problems for us, especially in shops where passwords must be changed periodically. In addition, it would eliminate the need to use port 5151. For MS SQL Server, it should be straightforward to implement Windows integrated authentication. It possible now but not terribly easy and we are constantly having tweak it whenever a new sysadmin comes along.</li>

	<li>Administration - By and large, your DBAs could handle most of the day-to-day admin. Native replication, backup and recovery tools should work also. In addition, it should be easier to set up failover and native clustering should work as well. By pushing everything down, the need for third-party tools to handle a lot these functions should go away (but they'll stay around in general because the RDBMS tools aren't always great).</li>
</ul>

So why not just support the native spatial extensions rather than create new ones? I see consistency being one primary reason. Essentially, ESRI could implement their own spatial objects and methods in a manner so that behaviors are consistent across platform. In addition, capability would also be consistent, especially in the area of raster handling but also in terms of versioning, topology, etc. It probably would only have partial benefit with regard to SQL since each platform's flavor of SQL is different (but that's getting better). Where it would benefit at the SQL level would be having all of the spatial functions with consistent calls and signatures.

This approach would also isolate the spatial data management into the data tier, making easier to support n-tier systems and SOA. From an application perspective, there's no reason why ESRI can't wrap ArcObjects around it to make transparent to an application developer. I could go on and on...

There are a lot of questions one could raise: Would it be an OGC compliant implementation? Would it be an "embrace and extend" approach where it's an OGC compliant implementation extended to support all of the additional features of a geodatabase? Would it be completely proprietary? The answers to all of those would have to be left up to ESRI. For me, it ulimately comes down to the fact that ArcSDE needs to change. The middleware needs to go away and the capability needs to be pushed to the RDBMS level. I don't think it's a particularly revolutionary thought, but thought I'd add it to the pile just in case pile has any bearing. Maybe that's what they've got planned for 10.x and st_geometry et. al. is just the first hint. If so, count me as a yes vote. If not, I'd encourage them to plot a new course.