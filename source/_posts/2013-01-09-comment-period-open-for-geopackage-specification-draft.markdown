---
layout: post
title: "Comment Period Open for GeoPackage Specification Draft"
date: 2013-01-09 06:15
comments: true
categories: 
- GIS
- geospatial
- OGC
- standards
- policy
- SpatiaLite
- GeoPackage
---

The Open Geospatial Consortium (OGC) has [published a draft GeoPackage specification for comment](http://www.opengeospatial.org/pressroom/pressreleases/1756). The GeoPackage specification attempts to create a non-proprietary means for packaging and exchanging all geospatial data in all its forms (vector, raster, and tiles). A couple of things that jump out at me:

- It calls out [SQLite](https://sqlite.org/) as the reference implementation of a GeoPackage container
- It calls out [SpatiaLite](http://www.gaia-gis.it/gaia-sins/) 4 as the reference implementation of a vector feature store
- It does not call out a reference implementation for rasters or tiles
- It does not mention exchange of cartography.

<!--more-->

Although the draft references the [MBTiles](http://mapbox.com/developers/mbtiles/) specification and uses it as an example of a pure SQL method of storing tiles, it does not call out MBTiles as the chosen storage approach nor does it mention MBTiles as a reference implementation. The draft should not be read as "SpatiaLite + MBTiles."

<div style="text-align:center;"><a href="http://www.publicdomainpictures.net/view-image.php?image=9097&picture=empty-cardboard-boxes"><img src="/images/posts/boxes.png" /></a></div>

I think, in 2013, anything that attempts to do what GeoPackage sets out to do should have some provision for cartography. I would prefer CSS-like approach (such as [CartoCSS](http://mapbox.com/tilemill/docs/manual/carto/)) and will say so when I submit comments but I would suspect that future discussion of cartography, if any, will probably start with SLD. For now, tiles can fill the gap.

So comments are open, give it a look and tell OGC what you think.