---
layout: blog
title: Taking A Look At PgMap
post_author: bdollins
comments: true
categories:
- arcgis desktop
- gis
- OpenGeo
- PgMap
- postgis
- ziggis
---

When I blogged about <a href="http://blog.geomusings.com/2011/08/03/ziggis-the-end-of-the-road/">the official end of zigGIS</a> last week, I included a mention of <a href="http://st-links.com/default.aspx">PgMap</a>, a free extension to <a href="http://www.esri.com">ArcMap</a> for direct read/edit of <a href="http://postgis.refractions.net">PostGIS</a> data. Judging from outbound links, there seems to be a good bit of interest in it so I decided to take a look.

To recap, Abe decided to pull the plug on zigGIS due to the fact that <a href="http://events.esri.com/uc/QandA/index.cfm?fuseaction=Answer&amp;ConferenceID=DD02CFE7-1422-2418-7F271831F47A7A31&amp;QuestionID=3949">ESRI will support direct read/edit of spatial databases</a> (as simple features) in 10.1. In my opinion, this is a good development. With native support coming, there was no need to continue with zigGIS. That support, however, will only exist in ArcGIS 10.1. Users of older versions will need to find alternatives. Based on our experience with zigGIS (as well as download data I've seen for the <a href="http://www.zekiah.com/index.php?q=weogeo">WeoGeo toolbar</a>), there are a lot of people (especially outside the US) still using ArcGIS 9.x so demand for an alternative will probably be high for some time.   <!--more-->

A quick glance shows me that there are a lot of similarities between PgMap and zigGIS. This is not surprising as there are really only so many ways to approach the task of connecting directly to PostGIS from ArcMap. That said, there are some key differences that are very attractive. They are:

<ol>
	<li>Support for ArcGIS 10</li>
	<li>Support for PostgreSQL 9.x</li>
	<li>Support for PostGIS 1.5</li>
	<li>Availability of a companion product, QMap, for connecting to SQL Server 2008</li>
</ol>

These differences represent capabilities that were frequently requested by zigGIS users but that we simply hadn't gotten to so it's good to see that PgMap has been able to support them. While PgMap is free of charge, it does require a license key. Without the license key, the documentation says that you will only have access to the first 1000 rows of your data. I was only ever able to access the first 100 rows so I suspect there may be a typo in either the docs or the code.

Using ArcGIS 10.0 (ArcEditor), I gave it a very quick run-through. The capability I found is impressive. PgMap allows you to manage connections to PostGIS databases, add PostGIS tables as feature classes and set definition queries for those layers. It appears that PgMap reads the geometry_columns table to list layers. I will need to investigate further to see if it supports views or spatial tables that have not been registered in the geometry_columns table.

There is one key difference between zigGIS and PgMap that I did not mention above and which is quite powerful. PgMap supports the export of ArcGIS feature classes directly to PostGIS (and vice versa). It also appears to support appending to existing PostGIS tables but I have not tested that yet. I used PgMap to export a feature class from a file geodatabase to my PostGIS database and it went flawlessly.

<div style="text-align:center;"><img alt="" height="507" src="http://geobabble.files.wordpress.com/2011/08/pgmap_export.png" title="Using PgMap to export data to PostGIS" width="531" /><div style="text-align:center;font-size: 14px;">PgMap export dialog<br/><br/></div></div>

The resulting PostGIS table was displayed perfectly in QGIS, with all of the attributes coming over well. I have not delved in yet to to see what assumptions PgMap makes in terms of data type conversions between the geodatabase and PostgreSQL.

<div style="text-align:center;"><img alt="" height="315" src="http://geobabble.files.wordpress.com/2011/08/pgmap_qgis.png" title="QGIS displaying PostGIS data imported with PgMap" width="590" /><div style="text-align:center;font-size: 14px;">O Canada!<br/><br/></div></div>

PgMap also integrates seamlessly with the ArcMap editor toolbar for editing. During my investigations, I noticed that layers are loaded into in-memory workspaces so they are natively supported for editing. Edits are then posted back to PostGIS when saved. This is similar to the approach that zigGIS used and is also similar to the behavior of other tools as well. When I get my license, I will need to test with larger data sets. zigGIS originally used in-memory workspaces but we noticed performance problems when loading large data sets so we switched to scratch workspaces. There are numerous ways to mitigate this but, until I can access full data sets, I can't really test it.

Editing worked well. I was even able to use PgMap to do further testing on my <a href="http://blog.geomusings.com/2011/08/01/triggered-notifications-using-postgis/">notification system</a>.

All in all, I think PgMap is an impressive tool that should be able to support the needs of ArcGIS 9.x and 10.0 users going forward. It's good to know that a tool is out there to continue meeting that demand.