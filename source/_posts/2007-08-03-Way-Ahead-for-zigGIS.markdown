---
layout: blog
title: Way Ahead for zigGIS
post_author: bdollins
comments: true
categories:
- arcgis desktop
- arcobjects
- database
- esri
- gis
- open source
- postgis
- postgresql
- ziggis
---

<a href="http://abegillespie.blogspot.com">Abe</a>, <a href="http://www.paolocorti.net">Paolo</a> and I had a chat session yesterday to coordinate efforts on <a href="http://code.google.com/p/ziggis">zigGIS</a>. It was good session and we're all on the same page with getting zigGIS solidified.

The general theme of the outcome from yesterday is that we want to make zigGIS a solid experience for <a href="http://postgis.refractions.net/">PostGIS</a> users first. We have discussed other data sources in the past but we feel that we should nail down PostGIS first and then let that be a reference implementation for other data sources such as <a href="http://www.oracle.com/technology/products/spatial/index.html">Oracle Spatial</a>, <a href="http://www.codeplex.com/Wiki/View.aspx?ProjectName=MsSqlSpatial">MS SQL Spatial</a> and the like.

With that said, the most glaring gap in the current capability of zigGIS is editing. Meaning you can't. Editing is our highest priority in the near future. Over the next few weeks, we will be developing use cases to define an editing workflow. We'll also prototype ways to integrate zigGIS with the native editing capabilities of ArcMap in order to reduce the amount of custom editing code we need to write.

We'll also be restructuring the existing code. The current code is rather flat in that individual .cs files contain multiple classes and the directory structure doesn't reflect the namespaces. Fixing all of that will give us a little more flexibility with version control and managing distributed programming. It'll also make it easier if...ahem...any other programmers want to join the project.

There are also still some performance issues with the current capabilities we need to iron out, such as the one <a href="http://geobabble.wordpress.com/2007/05/08/ziggis-and-spatial-references-part-3/">Bruce pointed out</a> a while ago.

Of course the catalog objects are ongoing but there may not be any movement on that until after we get the code restructured. Paolo is going on vacation for three weeks :D but Abe is planning to start the code restructure in the meantime as a way to re-familiarize himself with the code.

As always, the biggest impediment is time. It seems that the need to put food on the table refuses to go away but we should be able to build a little more forward momentum than we've seen recently.

<a href="http://code.google.com/p/ziggis" title="zigGIS Logo"><img alt="zigGIS Logo" src="http://geobabble.files.wordpress.com/2007/08/ziggis_logo.jpg" /></a>