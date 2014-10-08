---
layout: post
title: "Meanwhile, Over at Zekiah..."
date: 2014-02-06 11:34
comments: true
categories: 
- GIS
- PIM
- technology
- Zekiah
- geek
- Clojure
- Silverlight
- ESRI
- AWK
- Google
---
I don't usually cross-pollinate between this, my personal blog, and the company blog over at [Zekiah](http://www.zekiah.com). One of the great things about working at a place like Zekiah, however, is the opportunity to work with smart people and see what they are doing. At times, my colleagues will share components of their work on the company blog. We encourage this, and the experimentation that leads to the posts, as a way to keep our technical capabilities fresh and to also showcase what we do in a way that goes beyond the typical capabilities statements that exist on every site. My colleagues have been pretty busy but have managed to take some time to write a few posts about their work:

- [Esri CityEngine, Unity 4.0 and the Oculus Rift](http://www.zekiah.com/index.php?q=blog/2014/02/04/esri-cityengine-unity-40-and-oculus-rift) - My colleague, [Dan Entzian](http://twitter.com/DanEntzian), is an avid gamer, a great developer, and a smart GIS guy. This post combines those interests by showing how to bring cities created in Esri's [CityEngine](http://www.esri.com/software/cityengine/) into gaming environments like [Unity](http://unity3d.com/) and integrate them with the [Oculus Rift](http://www.oculusvr.com/) virtual reality display. It's a quick, but detailed, read that shows the interactions possible between geospatial tools and games.

<!--more-->

-> <img src="/images/posts/unity_ide.png" /> <-

- [Using AWK to ease your CSV manipulation](http://www.zekiah.com/index.php?q=blog/2014/01/23/using-awk-ease-your-csv-manipulation) - [Hugo Estrada](http://twitter.com/hugoestr) shows how to use an old, but still effective, tool, [AWK](http://www.grymoire.com/Unix/Awk.html), to process GPS data for use in GIS software. This post is a great reminder that the best tool for the job may already be sitting there at our command prompt waiting for us.

- [Exporting ESRI Silverlight Graphic Layer to Google Earth, Part 2](http://www.zekiah.com/index.php?q=blog/2013/12/18/exporting-esri-silverlight-graphic-layer-google-earth-part-2) - While Silverlight is, politely speaking, passe, we have a few customers that are still attached to it. Generally, the systems that are using it are accredited systems of record so a rip-and-replace of Silverlight (or any other component) is simply not feasible without a significant paperwork drill. So we try to help our customers keep those systems as useful for their end users as possible. This post, also by Dan Entzian, illustrates how we did that in one case. A follow up to [an older post](http://www.zekiah.com/index.php?q=blog/2011/10/11/exporting-esri-silverlight-graphic-layer-google-earth), this post was done in response to an e-mail inquiry from a reader of the previous post.

- [An Overview of Clojure](http://www.zekiah.com/index.php?q=blog/2013/12/17/overview-clojure) - In this post, Hugo Estrada takes a look a [Clojure](http://clojure.org/), a variant of the Lisp programming language, and reports on his experience at Clojure Con. I found this particularly interesting since, as a lifelong programmer, I am always interested in new languages (even if it is getting harder to find the time to tinker with them myself).

- [Generating Physical Schemas From a PIM](http://www.zekiah.com/index.php?q=blog/2014/01/02/generating-physical-schemas-pim) - Okay, this one was written by me, but the work is pretty interesting and involved the efforts of a few co-workers, including Barry Schimpf and Dan Entzian. This post describes a tool that we developed as part of our overall approach to geospatial data model management. This script generator produces SQL scripts for either [PostGIS](http://postgis.net/) or [SpatiaLite](http://www.gaia-gis.it/gaia-sins/) that enable a user to create spatial databases that are compliant with a data model. The information for the data model (which is always user-defined, not proscribed by us) is stored in what we call the platform independent model, or [PIM](http://www.zekiah.com/index.php?q=blog/topics/pim). We've used the PIM, its encapsulating API, and tools to good effect for a couple of customers now. This post attempts to provide a concrete picture of what can be an abstract concept.

Since Zekiah is a services company, rather than a platform company, we get to work with a broad range of technologies in support of our customers, in addition to our own internal research. This makes each day pretty interesting and can also make for lively conversation at company events. As the posts above showcase, my colleagues are working on some interesting things and it's a pleasure to work them each day.