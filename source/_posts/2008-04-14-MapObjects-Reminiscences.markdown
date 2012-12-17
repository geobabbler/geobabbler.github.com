---
layout: blog
title: MapObjects Reminiscences
comments: true
post_author: bdollins
categories:
- esri
- gis
---

<a href="http://gisprog.wordpress.com/2008/04/09/mapobjects-evaluation-version/">GIS Programming relays the fact</a> that the MapObjects Evaluation version is no longer available. <a href="http://geobabble.wordpress.com/2007/07/09/mo-no-mo/">I posted a while back</a> about MO not being supported on Vista. In recent <a href="http://twitter.com">Twitter</a> conversations I have learned that some folks are still running MOIMS apps.

The bottom line is that MapObjects rivals ArcView 3.x as the ESRI product with the most enthusastic fan base. Just mention MO to a GIS developer of a certain age (ahem) and the war stories will start to flow. So, in honor of this latest nail in the coffin, let 'em flow.

Do you still use/support MO? If so, what are you doing with it?

Do you plan to migrate to ArcGIS Engine or will you consider other libraries, like <a href="http://www.codeplex.com/sharpmap">SharpMap</a>?

What was coolest thing you ever did with MO?

For me, it was a modular application that we designed to integrate a bunch of free-standing analysis apps. Some were AV3 extensions, some were done in MapBasic MapX, some were completely proprietary code, some were already in MO. Our customer couldn't easily build an integrated analysis product with all of those results. We designed a common GUI and a plug-in COM API so that all of those apps could be migrated into one place but managed according their own lifecycles. We got it working and also built in some collaboration features. We got a couple of releases out before ESRI released ArcGIS with a similar architecture and we decided to go there. It didn't upset me too much, I considered it the sincerest form of flattery ;)  .