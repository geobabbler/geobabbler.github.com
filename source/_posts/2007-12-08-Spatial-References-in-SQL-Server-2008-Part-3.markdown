---
layout: blog
title: Spatial References in SQL Server 2008, Part 3
post_author: bdollins
categories:
- database
- gis
- microsoft
- sql server
- sql server spatial
---

A little clarification is in order:

SQL Server 2008 Books Online makes the following statement about SRIDs:

<blockquote>
"A SQL Server-supported SRID for geography instances must be used when performing calculations or using methods with geography spatial data. The SRID must match one of the SRIDs displayed in the sys.spatial_reference_systems catalog view."
</blockquote>

As previously noted, SQL 2008 supports two spatial data types: geometry and geography. As can be seen, the above statement only applies to the geography data type. If you are using geometry, the SRID can be set to anything (I have done so). It would probably be a best practice to stick to <a href="http://www.epsg.org/">EPSG</a>-defined SRIDs but this does open up the possibility of user-defined spatial references similar to <a href="http://postgis.refractions.net">PostGIS</a>. <a href="http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=2505683&amp;SiteID=1">In a discussion with Isaac on the MSDN forum</a>, he clarified that they plan to leave such things to the discretion of the database designers/users for implementation. As can be seen in the discussion, it seems they may also write up some best practices but it seems many things such as constraints to limit SRIDs and geometry types will be left to users/developers/DBAs to implement. 

So, as a result of the discussion, I think I have a better understanding of <a href="http://www.microsoft.com">MSFT</a>'s intent and how to proceed with SQL 2008. It will be interesting to adjust my way of thinking from what I have come to expect from other products.

Also, other discussions on the forum seem to indicate that this release will not have any coordinate transformation functions so those of us planning to use and develop with SQL 2008 should probably get comfortable with something like <a href="http://www.codeplex.com/ProjNET">Proj.Net</a>.