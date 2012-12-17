---
layout: blog
title: Desktop? We Don't Need No Stinkin' Desktop!
post_author: bdollins
categories:
- arcgis desktop
- arcgis engine
- arcgis server
- arcobjects
- esri
---

I figured I'd pile on here because it seems that a little ganging up may be in order. <a href="http://www.spatiallyadjusted.com/2007/01/24/esri-arcgis-desktop-and-the-developer-summit">James</a> and <a href="http://ambergis.wordpress.com/2007/01/24/and-what-is-desktop-chopped-liver/trackback/ http://www.spatiallyadjusted.com/2007/01/24/esri-arcgis-desktop-and-the-developer-summit">Kirk</a> have posted about the dearth of Desktop sessions at the upcoming <a href="http://www.esri.com/events/devsummit/sessions/technical.html">Developer Summit</a>.

Kirk also provides a good, specific example of a server-only feature that would be useful, and perfectly possible, in Desktop. One of the big advantages to having a product like ArcGIS Server which, like Engine and Desktop, is built from ArcObjects, is that you can have the same core set of objects to use to build applications in all three environments. Yes, there will be some peculiarities to each platform (especially Server) that dictate some special cases but, really, something like the FeatureGraphicsLayer that Kirk points out should be available in all cases.

ArcObjects is a behemoth and ESRI's challenge will be not to fork the code base unnecessarily along platform lines. I realize Server is the cool kid on the block right now but Desktop is going to be the workhorse for a long time. ESRI needs to make sure it doesn't get left behind at the API level.