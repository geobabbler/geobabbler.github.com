---
layout: blog
title: Regarding Extensions
post_author: bdollins
comments: true
categories:
- esri
- gis
---

<a href="http://www.spatiallyadjusted.com/2012/02/29/arcgis-future-sans-extensions/" target="_blank">James addressed</a> the idea that Esri is extending the core capability of ArcGIS to include functionality that, in the the not-too-distant past, would have been left to strategic partners and other third-party integrators. <a href="http://blog.geomusings.com/2012/02/23/esrifedcon-day-one-users-will-be-happy/" target="_blank">When I touched upon this</a> last week, I came at it from the standpoint that it will streamline procurement for Federal users. This observation was driven by the fact that I was at the Federal GIS Conference and it made sense for that audience. <!--more-->

James is correct that end users will be happy with having all of this new capability "just in there." But, in truth, I can imagine another reason for Esri to take this step. The fact is that a lot of third-party extensions to ArcGIS (especially for ArcGIS Desktop) really kind of stink. I won't name any because I don't need that can of worms in my life but it's easy to find third-party extensions with poor UIs, bad exception handling, unacceptable performance and generally poor implementation that can just crash ArcGIS. If you are a "power user" that has a number of these third-party tools running in the same process space, who knows what they are doing to each other or to ArcGIS?

But ask yourself this: When ArcMap crashes, do you curse ACME Geospatial and that crappy extension they built or do you curse ArcMap? Admittedly, I've had ArcMap inexplicably crash on me without any third-party tools but every third-party extension adds just a little bit more risk that, most likely, will ding the user's impression of Esri rather than that of the third-party developer. In short, bad third-party tools reflect poorly on Esri and perhaps even more so than the developer because most users can't see the distinction at runtime. They just see that ArcMap crashed. 

So, to mitigate this, I guess Esri could go all App Store on us and insist on some draconian process to get an extension "approved" or "certified" or some such nonsense. Or they could just build a lot of what these third-party tools do into the core product. If I'm Esri, I do the latter, saving myself a bunch of headaches and bringing these tools into my own development process, where I can control and support them. (I know...Or they could open-source the whole thing but that's not going to happen so I'm not going there.)

After years of dealing with some fairly poor third-party tools, I certainly can't blame Esri for heading in this direction.