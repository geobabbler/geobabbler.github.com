---
layout: blog
title: Moving Forward On A Couple of Fronts
post_author: bdollins
comments: true
categories:
- arcgis desktop
- arcobjects
- arcsde
- esri
- open source
- postgis
- postgresql
- ziggis
---

Well, it's been a while since I've posted anything technical. Work has been a little crazy and I'm not willing to carve into time with the family to keep other stuff moving. As a result a few things have been sitting for a while but I've been able to get around to two things. 

First, I've been playing with making a <a href="http://msdn2.microsoft.com/en-us/netframework/aa663324.aspx">WCF</a> web service that wraps spatial calls to <a href="http://postgis.refractions.net/">PostGIS</a>. The first thing I'm building is a call to do a coordinate transformation. Fairly simple stuff. This is actually my standard "getting my feet wet" task. I have written the same thing over the years in MapObjects, ArcObjects, ArcGIS Server, COM, Java, VB.NET, C#...you name it. Now, it's my guinea pig for WCF.

WCF changes the way web services are done in .NET. Given the larger focus on support SOA with .NET 3.0, the changes make sense. Overall, I think SOA in general will be easier in 3.0 but web services in particular are not as simple to implement as in 2.0. That's an overall change for the better IMO but it takes some getting used to. I've pretty much got it working on the service side but my client code is still having trouble. Once I get it ironed out, I plan to post what I did and discuss some of the issues.

Secondly, I'm picking back up with building ArcCatalog objects for <a href="http://code.google.com/p/ziggis">ZigGIS</a>. I'm trying to follow the model <a href="http://www.esri.com">ESRI</a> established with how to manage connections to ArcSDE in ArcCatalog. I've gotten far enough that I have a connection dialog that will write out a .zig file. The next step is to iterate the .zig files and list them as nodes in the ArcCatalog tree. More on that as I move along, also.

So the purpose of this post is really more to stick my head out and say "I'm still here." There, I've said it. More again soon...