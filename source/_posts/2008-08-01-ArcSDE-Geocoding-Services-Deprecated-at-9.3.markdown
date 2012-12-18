---
layout: blog
title: ArcSDE Geocoding Services Deprecated at 9.3
post_author: bdollins
categories:
- arcgis server
- arcsde
- esri
- geocoding
- gis
---

This isn't a huge surprise but <a href="http://support.esri.com/index.cfm?fa=knowledgebase.documentation.viewDoc&amp;PID=66&amp;MetaID=1430">this announcement</a> made it official a couple of days ago.

Basically, you'll need to use ArcGIS Server's server-side geocoding because the next release of ArcSDE won't include it. The PDF attached to the announcement gives more detail. I know we had moved away from ArcSDE geocoding some time ago because it didn't hold up to the load we were putting on it. We used Oracle Spatial instead.

But, if you've got any apps that are still using ArcSDE for geocoding, now's the time the transition.