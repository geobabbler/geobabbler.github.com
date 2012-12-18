---
layout: blog
title: Using ArcSDE 9.3 with PostgreSQL, Part 3
post_author: bdollins
categories:
- arcgis desktop
- esri
- gis
- postgis
- postgresql
- udig
---

Well, 9.3 is now shipping so the sun is setting on my time with the release candidate. One update from my first post: I posted the problem I was having with sdelayer -o register not calculate a default extent on the Beta forum and I got a reply that it shouldn't work that way and they would look at it. I'll probably see shortly whether a fix made it in this time or if I have to wait for a service pack.

The last piece I wanted to cover was working with the layer that I loaded in from a shapefile using ArcCatalog. As I indicated before, I used the PG_GEOMETRY keyword to force the use of PostGIS geometry.

I first left the layer as a simple feature. Within ArcGIS everything behaved as would be expected. I could note no difference in behavior versus what I would expect dealing with any other ArcSDE layer. I was also able to add the layer into uDig, but with a little anomalous behavior.

The layer I was working with was a polygon layer. When I loaded the layer into uDig, it displayed as a polygon layer but the uDig TOC showed a line symbol:

<a href="http://geobabble.files.wordpress.com/2008/07/udig_arcsde_layer.png"><img alt="ArcSDE PostgreSQL layers in uDig" class="alignnone size-medium wp-image-205" height="218" src="http://geobabble.files.wordpress.com/2008/07/udig_arcsde_layer.png?w=300" width="300" /></a>

Additionally, the fema_regions layer was not editable in uDig. The other layer editable but had the same display issues. To be fair, I had similar behavior with some layers I had loaded into PostGIS from shapefiles using FWTools. In that case, it didn't happen with all of the layers I loaded. In this case, I have not experimented with enough data sets to determine if the behavior is consistent or intermittent. I would also need to test whether it's the loader, PostGIS or uDig. Time has not been a friend here.

Next, I did some experimentation with versioning. I versioned my milbases layer, created a test version, added a feature and save the edit. As expected, when I connected in uDig, it connected to the DEFAULT version and I did not see my edit. Since this layer was editable in uDig, I added a feature here and refreshed my ArcMap display. In this case, I was able to see the uDig-created feature (in DEFAULT) in both versions (again, as expected).

My previous posts have brought a few questions about raster catalogs and the like. I have been able to load raster data and create raster catalogs. This is not, however, raster data in PostGIS. This is ArcSDE raster data next to PostGIS. PostGIS has no idea the raster data is there (although the raster footprints display in uDig as rectangles).

So, depending on how you implement it, ArcSDE for PostgreSQL can provide interoperability between ArcGIS and an open-source stack. uDig can be leveraged in a pinch to edit data loaded into ArcSDE using the PostGIS geometry type, allowing you to expand to meet demand. Additionally, ESRI has implemented the full geodatabase capability within PostgreSQL, providing a great alternative to shops that was GIS but not necessarily Oracle/DB2/SQL Server.

In future posts, I examine different technology mixes that can be used to build some compelling hybrid stacks.

Now, where's my 9.3 shipment?