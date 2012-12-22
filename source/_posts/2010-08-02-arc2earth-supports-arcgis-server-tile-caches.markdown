---
layout: blog
title: Arc2Earth Supports ArcGIS Server Tile Caches
post_author: bdollins
comments: true
categories:
- Arc2Earth
- arcgis desktop
- arcgis server
- google maps
---

I just got an e-mail announcement from <a href="http://www.arc2earth.com">Arc2Earth</a> (disclaimer: my <a href="http://www.zekiah.com">company</a> is a reseller) regarding some updates to version 3 that have come out since the ESRI UC. One of the updates that catches my attention is:

<blockquote>
<strong>ArcGIS Server Tile Cache Format</strong> - You can now create or manage tile caches that can be used with ArcGIS Server. use Arc2Earth tile management tools (like the Change Detection Level) to dramatically reduce the time it takes to update tile caches
</blockquote>
<!--more-->

Previous versions of Arc2Earth generated tiles in the Google/Bing XYZ format, using the appropriate file naming conventions and directory structures. This update now gives a user the ability to generate a cache using the ArcGIS Server naming conventions. It will still correspond to the Google/Bing zoom levels and still use web mercator but it will conform to the ArcGIS Server "exploded" cache structure.

This should be very handy for those organizations that may have their production ArcGIS Server in a different location than the data that they use to generate tiles.  Now the work can be done in ArcMap. This, combined with Arc2Earth's change detection feature, will save a lot of work for some of my customers.

The full change log is here: <a href="http://links.arc2earth.com/changelog">http://links.arc2earth.com/changelog</a>