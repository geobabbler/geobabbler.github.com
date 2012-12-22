---
layout: blog
title: zigGIS Update
post_author: bdollins
comments: true
categories:
- arcobjects
- postgis
- postgresql
- ziggis
---

Paolo has posted an update to <a href="http://ziggis.googlecode.com/files/ZigGis11.zip">zigGIS</a>. This update deals more effectively with data layers that have an SRID associated (SRID != -1). They now seem to overlay well. On-the-fly reprojection is still not working but he is working on it. <a href="http://www.archaeogeek.com/blog/">Archaeogeek</a>?recently <a href="http://www.archaeogeek.com/blog/2007/01/05/arcgis-connectors-for-postgis/">posted</a> about some issues getting zigGIS to work.<!--more-->

Some the frustrations mentioned are long-standing ones that I've had, such as the difficulty getting the ArcObjects .Net libraries onto the machine. I've been doing ArcObjects development in .Net for quite a while now and I quickly came to the conclusion that wouldn't redistribute the .Net libraries with my apps (This mainly applies to writing apps for Desktop). This means they need to be installed beforehand.

I have supported environments where ArcGIS was distributed as part of the standard desktop via Ghost. Obviously, they were using floating licenses. Anyway, the .Net libraries are almost never considered when building the image. The best way to get them installed after the fact is to install the Desktop Developers Kit. This will avoid the problem Archaeogeek had with having to re-install ArcGIS (I've never had to do that for this purpose). It is true that, at 9.0 and 9.1, the ESRI libraries are built against the .Net Framework 1.1. The libraries are simply wrappers around the ESRI COM libraries. If you want wrappers for 2.0, <a href="http://msdn2.microsoft.com/en-us/library/x8fbsf00.aspx">you can generate them using COM interop</a>. This, however, is more than a user would or should want to do, it is merely offered as an aside. At 9.2, the ESRI wrappers use 2.0. ZigGIS, however, is written using .Net 2.0. So, to use it with ArcGIS 9.1, you need both. The install process that worked for me was:
<ol>
	<li>Install .Net 1.1</li>
	<li>Install .Net 2.0</li>
	<li>Install PostgreSQL (without PostGIS)</li>
	<li>Install PostGIS (download latest version)</li>
	<li>Install ArcGIS 9.1</li>
	<li>Install the ArcGIS Desktop Developers Kit</li>
	<li>Install zigGIS</li>
	<li>Add the toolbar button</li>
	<li>Start using it</li>
</ol>
No development environment should be needed. Arcaeogeek goes on to mention some usability and data display issues. The need to type in a layer is a valid concern that's mainly isolated to the GUI. The data display issue may be related to an SRID issue that Paolo has been working and partially solved.

ZigGIS is still under development. The original work done by Abe Gillespie ranks as some of the best ArcObjects programming I've seen outside of ESRI but there's still a lot to do. I have recently joined the project and hope I can keep up with the likes of Abe and Paolo. So, visit the <a href="http://code.google.com/p/ziggis/">project home</a>?and you'll see there's an issues list and a discussion forum. The more feedback, the better!