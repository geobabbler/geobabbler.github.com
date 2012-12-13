---
layout: blog
title: Spatial References in SQL Server 2008, Part 2
post_author: bdollins
categories:
- database
- gis
- postgis
- sql server
- sql server spatial
---

With some guidance from <a href="http://geotips.blogspot.com/">Paul Ramsey</a>, I implemented a check constraint on my sample table to allow only a single SRID in a table. As Paul indicated in <a href="http://geobabble.wordpress.com/2007/11/26/spatial-references-in-sql-server-2008-november-ctp/#comment-3803">his comment on my previous post</a>, <a href="http://postgis.refractions.net">PostGIS</a> does this for you. SQL 2008 doesn't yet but I hope it does. The syntax for my table was:

{% codeblock lang:sql %}
--only allow WGS84
ALTER TABLE SpatialTable
  ADD CONSTRAINT enforce_srid_geometry CHECK (GeomCol1.STSrid = 4326);
{% endcodeblock %}

After doing that, the following SQL will properly fail:

{% codeblock lang:sql %}
UPDATE SpatialTable
	SET GeomCol1.STSrid = 4127;
{% endcodeblock %}

Thanks to Paul for chiming in!