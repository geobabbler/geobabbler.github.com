---
layout: blog
title: SpatiaLite 2.3.0 Released
post_author: bdollins
categories:
- gis
- open source
- sqlite
---

Alessandro has been very busy lately. He announced, via the <a href="http://groups.google.com/group/spatialite-users">SpatiaLite Google Group</a>, the release of version 2.3.0. The new features include (from the announcement):

<blockquote>
- supporting Routing [VirtualNetwork]
- supporting EXIF GPS pictures
- compatibility support for FDO/OGR RFC16 [VirtualFDO]
- intensive and generalize debugging
- AMALGAMATION: all the stuff put in a single source, as SQLite already does a complete SpatialDBMS engine in just 2 (two) C sources
- clear separation between the LIB and the TOOLs
- libspatialite-2.3.0 now includes libsqlite; linking a single library allow to support a full SpatialDBMS engine [some 800KB required]
- now builds on M$ Visual Studio .NET as well
========================================================
enhanced GUI-tool:
- color SQL syntax
- full DB self-initialization during creation
  [using init_spatialite.sql is no longer required]
- introducing MEMORY-DB ... try and see ...
  ... never seen before something comparable ...
</blockquote>

If you haven't checked out SpatiaLite, you really should. It's a very unique and useful tool.