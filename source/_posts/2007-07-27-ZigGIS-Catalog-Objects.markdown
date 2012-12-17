---
layout: blog
title: ZigGIS Catalog Objects
post_author: bdollins
categories:
- arcgis desktop
- arcobjects
- database
- postgis
- postgresql
- ziggis
---

Things have been REALLY slow on <a href="http://code.google.com/p/ziggis">zigGIS</a> for a while. All of us (Paolo, Abe, me) have all been up to our eyeballs with work, leaving little time to work on the zig. Now that <a href="http://www.digital-pulp.com/">Abe is out on his own</a>, the three of us have been trying to coordinate a chat session to lay out a little bit of a way ahead. That has proven somewhat difficult in itself. I think the best way to handle it at this point is for Abe and I to go out to Rome and sit down with Paolo ;-) .

Anyway, I had a little time so I pushed forward on the catalog objects. I've got it down to where the layers for a <a href="http://postgis.refractions.net/">PostGIS</a> database actually show up in the ArcCatalog tree but it's still a little flaky from there. The screenshot below shows what I've got. You'll notice that the geometry icons don't show up. Well, the layer doesn't draw in ArcCatalog either but everything still works fine in ArcMap.

<img alt="It?s a little closer?" src="http://geobabble.files.wordpress.com/2007/07/zigcatalog.png" />

So now that I've got the hierarchy fleshed out, I can focus on the display logic. Incidentally, the attributes for the layers do show up so all is not completely lost.

That's what I've got for now. I can't vouch for a specific schedule for a new release but we're trying to coordinate that.