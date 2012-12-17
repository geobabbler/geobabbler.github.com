---
layout: blog
title: MSDN Article on Mapping with WPF
post_author: bdollins
categories:
- .net
- articles
- gis
- microsoft
- msdn
- postgis
- sharpmap
- sql server spatial
- visual basic
- wpf
---

I found <a href="http://msdn.microsoft.com/msdnmag/issues/07/12/Maps/default.aspx">this article</a> today about using <a href="http://www.microsoft.com/express/vb/default.aspx">VB9</a> and <a href="http://windowsclient.net/Default.aspx">WPF</a> to draw thematic maps. It's a good walk-through of how to do it. The article admits that the coordinate transformation used is not terribly accurate but that can be rectified. This article is a good example of how to build a mapping application without any third-party components. The author converts Census boundary files to XML for this app. It shouldn't be a stretch to use <a href="http://www.microsoft.com/sql/2008/technologies/spatial.mspx">SQL 2008</a>, <a href="http://postgis.refractions.net">PostGIS</a> or some other database that can emit GML and has an OLEDB provider as a data source. 

I've been using WPF with <a href="http://codeplex.com/SharpMap">SharpMap</a> on a project <a href="http://geobabble.wordpress.com/2007/08/14/sharpmap-and-wpf/">for a while</a> but my mapping code is about 5% of the overall project and I haven't had a chance to extract what I've done into something digestable to provide an example. I had to fit into the rendering paradigm of a previously developed GUI so it deviates from how it's shaping up in SharpMap 2.0. 

So, if you're looking for an example of how to render spatial data in WPF, this is a good one.