---
layout: blog
title: So, Which Is It?
post_author: bdollins
comments: true
categories:
- arcgis desktop
- arcgis server
- database
- esri
- gis
- PgMap
- ziggis
---

<strong>Update:</strong> I pulled this link out of the comment thread below to emphasize it. It seems to answer this question for now: <a href="http://forums.arcgis.com/threads/35676-Edit-spatial-data-with-quot-ArcGIS-for-Desktop-10.1-quot-in-non-SDE-RDBMS-systems">http://forums.arcgis.com/threads/35676-Edit-spatial-data-with-quot-ArcGIS-for-Desktop-10.1-quot-in-non-SDE-RDBMS-systems</a>

Since my <a href="http://blog.geomusings.com/2011/08/03/ziggis-the-end-of-the-road/">previous</a> <a href="http://blog.geomusings.com/2011/08/09/taking-a-look-at-pgmap/">posts</a> about <a href="http://st-links.com/default.aspx">PgMap</a> and the shuttering of <a href="http://www.obtusesoft.com/">zigGIS</a>, the nature of the planned support for connecting directly to spatial databases from ArcGIS 10.1 has gotten somewhat muddier.

{% youtube zU9lv_WqK6k %}

One of the first indications of direct support was <a href="http://events.esri.com/uc/QandA/index.cfm?fuseaction=Answer&amp;ConferenceID=DD02CFE7-1422-2418-7F271831F47A7A31&amp;QuestionID=3949">this statement from the ESRI UC Q&amp;A</a>.

<!--more-->

This statement, of course, doesn't specifically say anything about editing. I followed up with some people at <a href="http://www.esri.com">ESRI</a> (who shall remain nameless) who said the intent was to support editing of spatial databases in the same manner as current simple feature editing. So there we have it, read/edit from ArcMap without the need of ArcSDE.

Or not...

Subsequently, I have gotten a direct message on Twitter (from someone outside ESRI) indicating that editing will be supported only through the Spatial Data Server (SDS) and will require an SDS license. That seems to be bolstered by this <a href="http://proceedings.esri.com/library/userconf/proc11/uc/tw-pdfs/tw_1472.pdf">PDF from the ESRI UC</a>.

So, at this point, I'll confess to being a little confused. There's a lot of new technology and capability being introduced at 10.1. (Hmmmm, maybe it should be 11.0?) So, given that it's all still in beta, I'll chalk it up to general churn associated with an impending release.

Regardless of what the exact story is, I'm not sure it'll affect any decisions related to zigGIS. If ArcMap isn't supported, PgMap is still a compelling alternative for ArcGIS Desktop users. But perhaps someone from ESRI can help clear this up so the community can know what to expect.