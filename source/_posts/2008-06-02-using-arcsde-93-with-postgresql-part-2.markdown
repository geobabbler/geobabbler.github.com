---
layout: blog
title: Using ArcSDE 9.3 with PostgreSQL, Part 2
post_author: bdollins
comments: true
categories:
- arcgis desktop
- arcsde
- esri
- gis
- postgis
- postgresql
---

In my <a href="http://geobabble.wordpress.com/2008/05/28/using-arcsde-93-with-postgresql-part-1/">previous post</a>, I discussed some approaches to configuring <a href="http://www.postgresql.org">PostgreSQL</a> databases and accessing the data in them with <a href="http://www.esri.com/software/arcgis/arcsde/index.html">ArcSDE</a> 9.3. For this post, I will describe some of my ongoing experiences with getting data into ArcSDE 9.3.

There are two main ways that I am investigating of loading/making available your spatial data in ArcSDE 9.3 for PostgreSQL. The first is the traditional method of importing a feature class via ArcCatalog. (You can also create data in this manner but I haven't played with that yet.) The second is to register an existing <a href="http://postgis.refractions.net">PostGIS</a> table as a layer using the "<a href="http://edndoc.esri.com/arcsde/9.0/admin_cmd_refs/sdelayer.htm">sdelayer</a> -o register" command-line tool. I will discuss this latter option first.<!--more-->

My first experience in trying to register an existing layer met with abject failure. I was greeted with an error message stating that I had to be the owner of the table in order to register it. I was already aware of this fact via the online documentation and I was, indeed, the owner of the table.

<a href="http://geobabble.files.wordpress.com/2008/05/sdelayer_register_owner_error.png"><img alt="Error message from sdelayer command" class="alignnone size-medium wp-image-189" height="151" src="http://geobabble.files.wordpress.com/2008/05/sdelayer_register_owner_error.png?w=300" width="300" /></a>

I hacked at this numerous time, parsing through PostgreSQL and ArcSDE log files to no avail. I did find some cryptic messages referring to tables in a "postgres" schema (which I didn't have), but generally found nothing helpful.

Next I turned to ArcCatalog and decided to import a shapefile and see how well that worked. I set up an ArcSDE connection as depicted below.

<a href="http://geobabble.files.wordpress.com/2008/05/connect_props.png"><img alt="My connection properties" class="alignnone size-medium wp-image-190" height="280" src="http://geobabble.files.wordpress.com/2008/05/connect_props.png?w=300" width="300" /></a>

I was able to connect just fine but my first attempt to import a shapefile failed with a message saying it could not create a feature class named "arcsde_test1.postgres.fema_regions". At that point, I realized that ArcCatalog was assuming that I was importing the data into the schema of the user that I was connected as. The "postgres" user is the equivalent to SQL Server's "sa". PostgreSQL doesn't create a schema for it automatically and I don't typically create one for it in my databases. In this case, because I was testing, I did (not sure if that's a good practice or not). I did so using the following SQL in pgAdmin III:

CREATE SCHEMA AUTHORIZATION postgres;

This creates a schema for the user that will own the objects in the schema. Once this was in place, I was able to import my shapefile with no issues. I did make sure to use the PG_GEOMETRY configuration keyword to ensure that the PostGIS data type was used.

This got me wondering about my earlier registration problem. I went back and used shape2pgsql to import a shapefile into the newly created postgres schema and then attempted to use the sdelayer utility to register it with ArcSDE. This time it registered! What I learned is that, in addition to being the owner of the table, the table must be in the schema for the user that you are using to register the table. In my case, it wasn't enough that the "postgres" user already owned the table. The table also had to be in the postgres user schema in my database.

At this point I had one layer which had been loaded via ArcCatalog and using PostGIS geometries and I had another copy of the same data set loaded via shp2pgsql and registered via "sdelayer -o register". It was time to check the behavior of each. Because I was using PostGIS geometry, I wanted to test both layers in ArcMap and in <a href="http://udig.refractions.net/">uDig</a>. 

First, the layer registered with the sdelayer command-line tool. This layer did not initially draw in ArcMap after it was registered. With a little investigation in ArcCatalog, I realized the X and Y offsets, the scaling factor and XY cluster tolerance were not set. I will not go into an ArcSDE tuning discussion here but suffice it to say I was able to rectify this problem. I have used the "sdelayer -o register" approach in the past with Oracle Spatial and did not have to take this step so I am chalking it up to a "beta-ism". I will submit this as feedback to ESRI. The next two images show this data set. The top image shows it in ArcMap and the bottom shows it in uDig. Both applications are reading the same PostGIS data set. Bear in mind that additional tuning was required in ArcSDE and this tuning will need to be maintained separately but, as of this point, both applications are reading the same data set.

<a href="http://geobabble.files.wordpress.com/2008/06/milbases_postgis_arcmap.png"><img alt="" class="alignnone size-medium wp-image-191" height="181" src="http://geobabble.files.wordpress.com/2008/06/milbases_postgis_arcmap.png?w=300" width="300" /></a>

<a href="http://geobabble.files.wordpress.com/2008/06/milbases_postgis_udig.png"><img alt="" class="alignnone size-medium wp-image-192" height="181" src="http://geobabble.files.wordpress.com/2008/06/milbases_postgis_udig.png?w=300" width="300" /></a>

With this having been accomplished, it was now time to see what I could do with the data. Since I believe in jumping in with both feet, I went straight to editing. My test was pretty simple: with both ArcMap and uDig pointed at the layer, I did the following:

1. Add a new feature using ArcMap and save it (the big triangle in the Northwest).
<a href="http://geobabble.files.wordpress.com/2008/06/arcmap_edit.png"><img alt="" class="alignnone size-medium wp-image-193" height="187" src="http://geobabble.files.wordpress.com/2008/06/arcmap_edit.png?w=300" width="300" /></a>

2. Refresh the display in uDig to show the new feature.
<a href="http://geobabble.files.wordpress.com/2008/06/arcmap_edit_udig.png"><img alt="" class="alignnone size-medium wp-image-194" height="187" src="http://geobabble.files.wordpress.com/2008/06/arcmap_edit_udig.png?w=300" width="300" /></a>

3. Modify the feature in uDig and commit the change.
<a href="http://geobabble.files.wordpress.com/2008/06/udig_edit.png"><img alt="" class="alignnone size-medium wp-image-195" height="187" src="http://geobabble.files.wordpress.com/2008/06/udig_edit.png?w=300" width="300" /></a>

4. Refresh the display in ArcMap to show the update.
<a href="http://geobabble.files.wordpress.com/2008/06/udig_edit_arcmap.png"><img alt="" class="alignnone size-medium wp-image-196" height="187" src="http://geobabble.files.wordpress.com/2008/06/udig_edit_arcmap.png?w=300" width="300" /></a>

As can be seen from the series of screen captures, this test worked flawlessly. I have also been able to render the data in both desktops and perform analysis on it. It is important to remember that this test only addresses PostGIS layers that have been registered with ArcSDE via the "sdelayer -o register" command line tool. In my next post I will dig a little deeper with the layer I loaded via ArcCatalog.