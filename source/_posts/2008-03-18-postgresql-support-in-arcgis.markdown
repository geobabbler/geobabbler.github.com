---
layout: blog
title: PostgreSQL Support in ArcGIS
post_author: bdollins
comments: true
categories:
- arcgis server
- arcsde
- esri
- postgis
- postgresql
---

I just sat through a session titled "Working With the Geodatabase Effectively Using SQL." It was heavily focused on ST_GEOMETRY. That's pretty much what they want us to use. Interestingly, though, there won't be ST_GEOMETRY in SQL Server 2008. They've added it to PostgreSQL (more on that later) but not SQL Server. Seems a little strange to me.

There was a brief discussion of what PostgreSQL support will look like. There are no big surprises, just a little more detail. As I said, ESRI is implementing ST_GEOMETRY and also fully supporting the PostGIS spatial type. ST_GEOMETRY will be the default spatial type for ArcGIS but you will be able to use the PostGIS type via configuration keyword. The differences are:

1. ST_GEOMETRY types and functions will reside in the "sde" schema (I guess that's more efficient than call it the "arcgis_server_enterprise_basic" schema). PostGIS types and functions will reside in the public schema by default as is currently the case.

2. The ST_GEOMETRY implementation will be consistent with those on Oracle, DB2 and Informix so, if you're developing an app that is cross-platform (RDBMS-wise), you <em>may</em> want to use ST_GEOMETRY. It was said that the PostGIS spatial type only resides on PostgreSQL (we'll dodge the obvious OGC-compliance piece which makes that statement somewhat shaky).

3. The ST_GEOMETRY data type supports parametric geometry such as arcs and circles and the like whereas the PostGIS type does not. (Can you believe I've never looked into that? If that's not correct, please feel free to correct me.) Of course, the REST API doesn't support those and converts them to simple geometry...

4. The ST_GEOMETRY spatial data is stored in ESRI's compressed shape format which is sent directly to clients without translation. PostGIS stores in WKB format, which ArcGIS must first convert to compressed shape before sending so there will be something of a performance hit. Interpret that however you want, I'm just reporting.

ST_GEOMETRY will use the PostGIS GIST spatial indexing framework but will implement an RTREE strategy through its own set of geometry operators. Additionally, ST_GEOMETRY columns can be defined within a CREATE TABLE statement compared to the use of the AddGeometryColumn function in PostGIS. Regardless of the spatial type used, tables created through SQL will still need to be registered with the geodatabase through the "sdelayer -o register" process in order to be used in ArcGIS. I've done this before with Oracle Spatial as a means to let Oracle do all of the heavy lifting. I would imagine the same strategy could be used on PostgreSQL if you want PostGIS to do all of the management of the data.

As I said, there's nothing earth-shattering there. It's pretty much what I expected but now there are more details.