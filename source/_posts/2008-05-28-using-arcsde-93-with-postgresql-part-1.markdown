---
layout: blog
title: Using ArcSDE 9.3 with PostgreSQL, Part 1
post_author: bdollins
categories:
- arcsde
- esri
- gis
- postgis
- postgresql
---

This post may cover some similar ground to that which <a href="http://blog.davebouwman.net/2008/05/12/PostGISRound2ReadingTheManual.aspx">Dave has been treading</a> but I'm just trying to document my experiences as they occur.

By virtue of my association with <a href="http://www.obtusesoft.com">zigGIS</a>, I've been involved with using <a href="http://www.postgresql.org">PostgreSQL</a> and <a href="http://postgis.refractions.net">PostGIS</a> in the <a href="http://www.esri.com">ArcGIS</a> envrionment for some time now. One of the primary sources of excitement about 9.3 for me was that <a href="http://www.esri.com/software/arcgis/arcsde/">ArcSDE</a> would finally support PostgreSQL as an RDBMS platform. ArcSDE has always been positioned as an enterprise platform and has, therefore, been rather expensive. This expense has been compounded by the need to also separately license an RDBMS platform such as Oracle, SQL Server or DB2 in addition to ArcSDE. PostgreSQL helps alleviate some of that cost while also providing very advanced capability.<!--more-->

PostgreSQL is an outstanding, enterprise-quality RDBMS platform. My hope is that the support by ESRI will raise its profile here in the States to the point that more organizations will realize how well it matches up to its better-known proprietary counterparts.

I have been experiementing with the ArcSDE 9.3 for PostgreSQL beta and release candidate. This post will describe what's been working for me. Before going on, however, I stongly recommend reading <a href="http://blog.cleverelephant.ca/2008/05/why-use-arcsde.html">Paul Ramsey's post</a> debating the need for ArcSDE. The post itself and the Nabble discussion it references are both outstanding discussions that contain many points I agree with. My post will assume that you intend to use ArcSDE with PostgreSQL.

One thing that becomes readily apparent is that the single-database model with direct connect is the way to go with PostgreSQL. If you run the default installation and post-installation, you end up with the typical "sde" database with all of the ArcSDE system tables and functions and the like set up as can be seen in this screen clip from PgAdmin. <img alt="" class="alignright size-medium wp-image-186" height="213" src="http://geobabble.files.wordpress.com/2008/05/sde_postgis1.png?w=240" width="240" />
The post-installer will also give you the option to create a service to use a giomgr process. If you choose to do this, you will end up with the usual ArcSDE service using esri_sde on port 5151. This is where the design of PostgreSQL comes into play. PostgreSQL uses both databases and schemas. Schemas are contained within a database. Schemas are roughly equivalent to databases in SQL Server (I said roughly). PostgreSQL does not allow cross-database referencing so it's important not to get caught up in "SQL Server thinking" when considering databases. This screen capture shows what I mean (I tried registering a PostGIS layer in the arcsde_test1 database using the esri_sde service which connects to the sde database).

<a href="http://geobabble.files.wordpress.com/2008/05/sde_postgis2.png"><img alt="" class="alignnone size-medium wp-image-187" height="151" src="http://geobabble.files.wordpress.com/2008/05/sde_postgis2.png?w=300" width="300" /></a>

What this means in terms of ArcSDE is that the old multiple-database model (one "sde" database and multiple user databases with spatial data) doesn't really work here. With SQL Server, you could use the esri_sde giomgr process to access spatial data in any database on the server. In PostgreSQL, it gives you access to data in multiple schemas in one database. If you want to store data in another database, you need to run the post-installer to set up the ArcSDE objects in that database and let it create another service listening on a different port. You can see how this could get cumbersome.

So, really, it's just time to give up the giomgr process and just use direct connect or do all of your spatial work in one database. My preference is for direct connect (which has been the ESRI-recommended approach for a while now, anyway). In this case, you still use the post-installer to set up the ArcSDE objects in your database but you don't create the service. You'll then use a direct connect string to access your data (sde:postgresql:localhost for example), specifying your database.

This means you'll have the ArcSDE objects installed in each database you want to use with ArcSDE. This approach not unlike what you need to to with PostGIS. In fact, if you want to use PostGIS geometries with ArcSDE, you will need to install both PostGIS and ArcSDE in your database. In this case you need to create the database first using the PostGIS template database and then install the ArcSDE objects into the database. ArcSDE always installs in its own schema so its pretty well segmented from everything else.

I tried setting up a PostGIS/ArcSDE template database to simplify things but it simply didn't work. For the ArcSDE objects to be properly configured, you have to use the post-installer. This is something that ESRI may want to take a look at in the future since using a template database in quite convenient and sort of the standard approach in PostgreSQL.

So now I have a couple of databases configured with the ArcSDE and PostGIS objects. Although I will eventually get around to testing ST_GEOMETRY, my real interest is in seeing what I can do with the PostGIS data type. In my next post, I'll take a couple of different paths to get data into PostgreSQL/PostGIS/ArcSDE and see what types of things I can do.

To be continued...