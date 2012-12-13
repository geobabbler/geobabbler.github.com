---
layout: blog
title: Using PostgreSQL Views in zigGIS 2.0.2
post_author: bdollins
comments: true
categories:
- arcgis desktop
- gis
- postgis
- postgresql
- ziggis
---

When we mapped out the way ahead for zigGIS, we knew we wanted to lay the groundwork to add support for SQL Server 2008 and possibly other database platforms. The way zigGIS was originally constructed, it used the PostGIS geometry_columns table to discover available spatial tables. This has worked well but we came to realize that there are numerous workflows that can be employed to create spatial tables in PostGIS and many of these don't necessarily register in the geometry_columns table. For example, you can use a standard CREATE TABLE to create a table that includes a geometry column. In this case, the table will not be registered but will still be a valid spatial table. The same can be said for views.<!--more-->

SQL Server 2008 doesn't have any equivalent to the geometry_columns table and most likely won't. When considering extending zigGIS to support SQL Server, we were basically left with two paths:

1. Create tables analagous to the PostGIS geometry_columns and spatial_ref_sys tables (and possibly other supporting structures) inside a zigGIS schema or:
2. Eliminate the need to have your data listed in geometry_columns and have zigGIS "discover" your spatial data by examining the schema information.

Since our preference is always to keep zigGIS as light as possible, we went with the latter. This approach was implemented in version 2.0.2. While we haven't extended to SQL Server yet, zigGIS does provide more flexibility for user to implement their own data workflow. For me, one of the biggest benefits is the ability to create a view in PostgreSQL and add it into ArcMap as a layer.

For example, I have a spatial table called "states" which was imported from a shapefile of the US states. Additionally, I have a table called "us_states_pop" that contains population estimates from the US Census Bureau. Using the following SQL, I created a view that joined the two tables based upon the state abbreviation and displayed the 2007 and 2008 poplation estimates.

{% codeblock lang:sql %}
SELECT s.gid, s.shape, s.state_name, s.state_abbr, p.e20080701, p.e20070701
   FROM states s
   JOIN us_states_pop p ON s.state_abbr::text = p.abbr::text;
{% endcodeblock %}

I saved this view with the name "vwStatePop". Your view must return a geometry column and an integer ID column (shape and gid in this case). Next, I started up ArcMap and selected my view like so:

[caption id="attachment_459" align="alignnone" width="300" caption="zigGIS 2.0.2 layer selector (click to enlarge)"]<a href="http://geobabble.files.wordpress.com/2009/01/zig_pick_view.png"><img alt="zigGIS 2.0.2 layer selector (click to enlarge)" class="size-medium wp-image-459" height="187" src="http://geobabble.files.wordpress.com/2009/01/zig_pick_view.png?w=300" title="zig_pick_view" width="300" /></a>[/caption]

I simply selected the view in the dialog, then used the dropdowns to set the correct values for the ID column, geometry column and geometry type and then clicked "OK". The view data then displayed in ArcMap as any other layer like so:

<div style="text-align: center;"><a href="http://geobabble.files.wordpress.com/2009/01/zig_view_map.png"><img alt="PostgreSQL/PostGIS spatial view displayed in ArcMap. (click to enlarge)" class="size-medium wp-image-465" height="187" src="http://geobabble.files.wordpress.com/2009/01/zig_view_map.png" title="zig_view_map" width="300" /></a><div style="text-align: center; font-size:14px">PostgreSQL/PostGIS spatial view displayed in ArcMap. (click to enlarge)<br/></div></div>

This was a fairly simple example but you can get pretty sophisticated with your views. I like the fact that I just need to create a standard PostgreSQL view in the same way that I always do and I can use it in ArcMap right away. The ability to use views in zigGIS is the enhancement I am most excited about in version 2.0.2.