---
layout: post
title: "SpatiaLite 4.1.0 Beta Preview Available"
date: 2013-01-03 08:34
comments: true
categories: 
- database
- gis
- open source
- SpatiaLite
---

On the [SpatiaLite Google Group](https://groups.google.com/forum/?fromgroups#!forum/spatialite-users) this morning, Sandro Furieri announced the availability of a beta preview of SpatiaLite 4.1.0. The primary focus of this preview is to get early comment on new capabilities supporting the storage, validation, and query of XML documents. 

More information about this update [can be found here](https://www.gaia-gis.it/fossil/libspatialite/wiki?name=XmlBlob+and+VirtualXPath). Says Sandro:

<blockquote>
The main goals of these recently introduced enhancements are:<br/>
- storing XML Documents directly within the DBMS <br/>
- supporting XML validation<br/>
- supporting plain SQL queries on behalf of XML Documents <br/>
  via canonical XPath expressions<br/>
<br/>
Implementing directly into the Spatial DBMS a common core of 
XML-oriented features surely is an interesting and useful option,
just considering that ISO- and INSPIRE-Metadata or SLD/SE Styles 
are fully based on XML.
</blockquote>

Although I find myself working more with [GeoJSON](http://geojson.org) and [CartoCSS](http://developmentseed.org/blog/2011/feb/09/introducing-carto-css-map-styling-language/) these days, I think support for XML is a good step for SpatiaLite. There are some very mature use cases based on XML, as Sandro points out. While [SLD](http://www.opengeospatial.org/standards/sld) is not my favorite, this may keep it on my radar. Also, it would be interesting to see how this new capability would possibly affect the evolution of the [OGC GeoPackage draft specification](http://www.opengeospatial.org/projects/groups/geopackageswg).