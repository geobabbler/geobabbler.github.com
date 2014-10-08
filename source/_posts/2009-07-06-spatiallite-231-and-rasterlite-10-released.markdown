---
layout: blog
title: SpatialLite 2.3.1 and RasterLite 1.0 Released
post_author: bdollins
comments: true
categories:
- gis
---

Alessandro made two announcements today. First SpatiaLite 2.3.1 has been released. Changes include:

<blockquote>
* including SQLite v.3.6.16
* including GEOS.3 1.1
* added SQL version functions: spatialite_version(),
  proj4_version(), geos_version()
* added SQL functions: IsTiffBlob(), IsWaveletBlob()
  [RasterLite compatibility]
* now supporting the 'F' (float) datatype for DBF
  [while reading some Shapefile]

bug fixes:

* fixed a stupid initialization bug disabling MbrCache
* fixed a stupid initialization bug disabling VirtualFDO
* fixed some EXIF and EXIF-GPS inconsistencies
* fixed incorrect SRID handling for PointN(), GeometryN() ..
* fixed a nasty error [causing a crash] while parsing
  degenerated WKT geometries (single-vertex LINESTRING ...)
* fixed some ./configure oddities
  [--with-proj-include, --with-geos-include]
* and many others ...
</blockquote>

Also from Alessandro, RasterLite 1.0:
<blockquote>
today I released RasterLite, a really simple SpatiaLite-based C API [and related command-line management tools] supporting Raster Data Sources in a SpatiaLite DB.

RasterLite implements TILING and multi-level PYRAMIDS, and take full profit from RTree-based Spatial Indexing.

Individual tiles can be stored at your choice as:
TIFF     [supporting monochrome CCITT FAX-4 compression]
PNG      [loseless compression]
GIF      [loseless compression]
JPEG     [lossy compression]
WAVELET  [lossy compression]

As from my preliminary testings, RasterLite is able to handle really huge Raster Data Sources [several GB-sized] in a really efficient and painless way.

You can find a tutorial explaining in depth how to use the following popular publicly available satellite imagery and DEMs:
- TrueMarble 250m/pixel world coverage
- ETOPO5 wold coverage
- SRTM 90m/pixel world coverage
</blockquote>

Information on both can be found at the <a href="http://www.gaia-gis.it/spatialite">SpatiaLite web site</a>.