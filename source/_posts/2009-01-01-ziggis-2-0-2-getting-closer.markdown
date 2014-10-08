---
layout: blog
title: zigGIS 2.0.2 Getting Closer
post_author: bdollins
comments: true
categories:
- arcgis desktop
- arcobjects
- postgis
- ziggis
---

<a href="http://abegillespie.blogspot.com">Abe</a> announced via <a href="http://twitter.com/zigGIS">Twitter</a> today that <a href="http://pub.obtusesoft.com/">zigGIS</a> 2.0.2 will be available in about a month. This a small but significant release becuase zigGIS will now support the generic PostGIS "GEOMETRY" type. Because ArcGIS expects homogenous feaure classes, zigGIS will ask the user to choose a geometry type for the the specified GEOMETRY-typed column. So, if your table has mixed geometry types, you will need to specify one (like polygon for example) and zigGIS will present only records of that type to ArcGIS.

Secondly, zigGIS will no longer expect your primary key to be called "gid". This should reduce the instances where tables need to be modified for use with zigGIS.

In previous releases, a few enterprising users had figured out how to get zigGIS to see views as layers by manually hacking them into the geometry_columns table. This was one way to get around the "gid" and GEOMETRY limitations. In 2.0.2, views will be fully supported so that no such hacking will be necessary.

Abe, Paolo and I had a chat session a while back about the zigGIS roadmap and this represents the first step down that road. More information will be forthcoming as we flesh out the details of further changes.

<img alt="" class="alignleft" height="270" src="http://geobabble.files.wordpress.com/2007/08/ziggis_logo.jpg" title="zigGIS" width="270" />