---
layout: blog
title: SQL Server 2008 WKT X/Y Switching Illustrated
post_author: bdollins
comments: true
categories:
- database
- gis
- oracle spatial
- postgis
- sql server spatial
---

<strong>UPDATE:</strong> Microsoft has <a href="http://blogs.msdn.com/isaac/archive/2007/12/27/latitude-longitude-ordering.aspx">announced</a> that they will address this issue in an upcoming CTP. They plan to implement longitude-latitude ordering in WKB and WKT for both the geography and geometry types.

In a response to my <a href="http://geobabble.wordpress.com/2007/12/18/inserting-sql-2008-geometry-with-a-sqlcommand/">previous post</a>, <a href="http://www.spatialdatalogic.com/cs/blogs/brian_flood/default.aspx">Brian Flood</a> mentioned the ongoing discussion about <a href="http://www.microsoft.com/sql/2008/technologies/spatial.mspx">SQL Server 2008</a> and the "switching" of X and Y values in <a href="http://en.wikipedia.org/wiki/Well-known_text">WKT</a> strings depending upon which spatial data type, geometry or geography, is being used. The SQL snippet below boils the issue down to a simple example:

{% codeblock lang:sql %}
DECLARE @g geometry;
SET @g = geometry::STGeomFromText('POINT(3 8)', 4326);
SELECT @g.STX as geomX;

DECLARE @h geography;
SET @h = geography::STGeomFromText('POINT(3 8)', 4326);
SELECT @h.Lat as geogLat;
{% endcodeblock %}

In both cases, the value returned is 3. As can be seen, the same WKT string is being used in both cases. The main difference is that one example queries the X value of a GEOMETRY object and the other queries the Lat (Latitude, or Y) value of a GEOGRAPHY object. So, depending on the data type, the same ordinal can be X or Y. You can check out the debate on this topic <a href="http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=2431933&amp;SiteID=1">here</a>. It is a great discussion that covers a lot of ground and I highly recommend checking it out.

For me, the issue is consistency. Regardless of the mindsets of professionals vs. non-professionals or the imprecision of the OGC spec, the bottom line is that the same call behaves differently for two related data types. Admittedly GEOGRAPHY and GEOMETRY do different things. GEOGRAPHY is for geodetic (spherical) data and GEOMETRY is for planar data. This fact, however, has no bearing on how WKT is parsed. The current situation is analagous to having a rounding function that by default rounds up for doubles and rounds down for singles.

At this point, I would normally say pick a method and run with it for both data types but I do have a preference here. I think that WKT should be parsed as X,Y consistently in order to provide better interoperability with a wider variety of client software. The simple fact is that most products out there do X,Y. For instance, I am working with SharpMap and it generates WKT in X,Y order and assumes X,Y order when parsing. Other database platforms such as Oracle, PostGIS and MySQL do the same but it's the client software that matters most in this case. I'm sure that others can chime in with more examples.

I am intrigued by the use of a separate data type to handle geodetic data but the X,Y order of WKT has no bearing here. To my way of thinking, the best approach would be to commit to X,Y order for both GEOMETRY and GEOGRAPHY.