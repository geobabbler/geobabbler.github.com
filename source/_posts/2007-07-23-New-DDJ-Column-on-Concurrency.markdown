---
layout: blog
title: New DDJ Column on Concurrency
post_author: bdollins
comments: true
categories:
- arcgis server
- arcobjects
- articles
- ddj
- esri
- gis
- software development
---

Anyone who has browsed this blog enough has probably figured out that I am a fan of <a href="http://www.ddj.com">Doctor Dobb's Journal</a>. This month's issue inaugurates <a href="http://www.ddj.com/dept/architect/200001985">a new column by Herb Sutter</a> dealing with concurrency. In my opinion, the confluence of mult-processor/multi-core systems with a greater emphasis on server-based GIS makes concurrency a huge issue for the GIS community.

The most obvious example of where concurrency can be of benefit is ArcGIS Server. The entire ArcObjects library is exposed in such a way that complex geospatial operations can be published as services. Many such operations can benefit from concurrency, especially as they are executed in a multi-user, server-based context.

I am of the opinion that the current 9.x architecture of AGS (with COM under the hood) is not optimally suited for such an approach but it will be interesting to see how <a href="http://www.esri.com">ESRI</a> addresses concurrency as 10.0 evolves. I also view the current AGS as a step along a path rather than an intended end state. Of course, there are other technologies out there. I merely hold up AGS as an obvious and visible example of a product that can benefit from being built with concurrency in mind. Of course, it's up to us as software developers to correctly build our apps as well.

That said, I highly recommend this column. The inaugural installment rightly kicks off from a conceptual standpoint but I suspect we'll be in the weeds soon enough.