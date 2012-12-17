---
layout: blog
title: ArcGIS.Next (+)
post_author: bdollins
categories:
- arcobjects
- esri
- gis
- postgis
- ziggis
---

Steve has <a href="http://thesteve0.wordpress.com/2007/02/06/notes-from-the-esri-cahinvguam-regional-users-group/">blogged</a> about Clint Brown's talk at the CA/HI/NV/Guam RUG meeting. There's nothing particularly suprprising but we're starting to get dates and features tied to version numbers.

I am encouraged that 9.3 will be in beta soon. ESRI's odd-numbered releases are always more stable. The support for <a href="http://www.postgresql.org/">PostgreSQL</a> with ArcSDE is not a surprise. It will be interesting to see whether that ends up being a port of ArcSDE to PostgreSQL or whether they will take advantage of <a href="http://postgis.refractions.net/">PostGIS</a>. I suspect the former. However, the ability to choose an open-source RDBMS greatly reduces the overall cost of implementing ArcSDE. That can only be a good thing. Also, I'm glad they chose PostgreSQL rather than <a href="http://www.mysql.com/">MySQL</a>. At the risk of slings and arrows, I much prefer PG to MySQL.

I am particularly encouraged by some of the features planned for 10.0. I also don't see most of those features happening without ArcGIS finally moving away from COM. That will be an extremely welcome change. Hopefully, they will go straight to <a href="http://en.wikipedia.org/wiki/Windows_Presentation_Foundation">WPF</a> for the UI.

So what about <a href="http://code.google.com/p/ziggis/">zigGIS</a>? I see no reason to stop. If ESRI just implements PostGIS, maybe zigGIS becomes redundant but I suspect the GPL will prevent them from doing that. Therefore, I see it being more of a port of the existing ArcSDE. Anyway, I think the need for a completely free connector to PostGIS will continue, so we will keep moving forward.

All in all, I'm encouraged by what's on the way with regard to the technology. I'd still like to get more of an idea who ESRI's "Steve Ballmer" is, though.