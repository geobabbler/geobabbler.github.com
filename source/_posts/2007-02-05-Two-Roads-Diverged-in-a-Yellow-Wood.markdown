---
layout: blog
title: Two Roads Diverged in a Yellow Wood...
post_author: bdollins
comments: true
categories:
- esri
- gis
- open source
- software development
- ziggis
---

With apologies to the great Robert Frost.

I'll admit that over the last few months I've become something of an open-source convert. I've been in the consulting business for about 15 years now and I've made through the "holy wars" relatively unscathed (Microsoft/Linux, IE/Netscape/Firefox, Oracle/Everyone else, ad nauseum). I've said it before that it's not religion, it's technology. I've gotten to this particular point in my career with two basic philosophies intact: 1) Nothing big works and 2) I can do whatever you need to do on whatever platform you want with whatever tools you give me; it's just a matter of "how."

Most of my GIS consulting work over the years has been with ESRI technologies and it's served me and my customers well. In general, it works and, more importantly, I know how it works. But over the last couple of years, there has been a disturbing trend with the technology: it's gotten more complex (nothing big works) and more expensive. When my Federal customers start to balk, I know there's a problem. In addition, there's ESRI itself. It is still a privately held company with an owner that's not getting any younger. Lacking any evidence of a transition plan that maps out how the next 10 to 15 years will go, I've begun doing the only responsible thing for my company and my customers: hedging my bets.

Given that most of ESRI's serious commercial competition imploded years ago (don't try to debate that with your single-digit-market-share tool of choice), I began paying more attention to open-source products. The approach I've taken is to try to piece together an open-source architecture that I would feel as comfortable recommending to a customer as the ESRI architecture. My focus has begun to gel around a core few: <a href="http://docs.codehaus.org/display/GEOS/Home">GeoServer</a>, <a href="http://www.codeplex.com/Wiki/View.aspx?ProjectName=SharpMap">SharpMap</a>, <a href="http://www.postgresql.org/">PostgreSQL</a>/<a href="http://postgis.refractions.net/">PostGIS </a>and <a href="http://qgis.org/">QGIS</a>. Also key for me is that any client technology must be able to take advantage of Oracle Spatial. It's not open-source, but it's everywhere.

Being a programmer from the ArcObjects/ArcSDE mold, the ones I've been having the most fun with are SharpMap and PostGIS. As I've posted before, I even joined the <a href="http://code.google.com/p/ziggis/">zigGIS</a> project to enable connectivity between PostGIS and ArcGIS. That's been the most fun I've had in a long time. Probably the weakest link so far is the lack of a really good desktop tool that I could put in front of one of my analysts and say "make a map that looks as good as the ones you make in ArcMap." QGIS is on the right track but still pretty far from the station. My analysts, thus far, won't give it a second look.

So how has all of this made me a convert? It's come down to the simple convenience of open-source. I'm still doing a lot of experimenting. Some of my existing customers are really interested in implementing open-source but can't quite make the switch yet. So I was playing around with a very simple tool I was trying to build using SharpMap and I just couldn't get it to work. I figured I had to be doing something wrong so I opened up SharpMap's source code and examined the class I was using, realized my mistake, and moved on. The power and simplicity of that act, compared to the years of hacking against ArcObjects bugs and documentation, was breathtaking. It's raised the bar significantly in terms of my expectations of software.

Now to step back from the edge a little: It's not religion. Most of my customers use, and are committed to, ESRI technology. I've had a good working relationship with the company and the people in it. Also, quite frankly, many open-source tools are very immature and unstable. But, as ESRI shifts their focus more to the enterprise market, there will be an increasing number of small of mid-sized users getting into the geospatial game for the first time who will feel priced out. For my part, it would be irresponsible not to be prepared to address their needs with an alternate set of technologies. It will be interesting to see which becomes the road less traveled.