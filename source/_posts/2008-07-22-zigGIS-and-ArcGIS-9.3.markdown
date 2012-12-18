---
layout: blog
title: zigGIS and ArcGIS 9.3
post_author: bdollins
categories:
- arcgis desktop
- esri
- gis
- postgis
- postgresql
- ziggis
---

Now that <a href="http://www.esri.com">ArcGIS 9.3</a> has been finalized, I have finally gotten around to testing <a href="http://www.obtusesoft.com">zigGIS</a> 2.0.1 with it. While the source code is available, I wanted to test the unmodified binary distro. I am happy to report that zigGIS appears to work fine with ArcGIS Desktop 9.3.

<a href="http://geobabble.files.wordpress.com/2008/07/ziggis_arcgis_93.png"><img alt="" class="alignnone size-medium wp-image-207" height="186" src="http://geobabble.files.wordpress.com/2008/07/ziggis_arcgis_93.png?w=300" width="300" /></a>

I guess the statement in the zigGIS About box regarding 9.2 is no longer accurate.  :D

I ran some preliminary tests on the editing capability and they seem to work fine. I was able to create a feature in ArcGIS, connect to my <a href="http://postgis.refractions.net">PostGIS</a> database using <a href="http://www.gvsig.gva.es/index.php?id=gvsig&amp;L=2">gvSIG</a> and see the feature. Just for grins, I then deleted the feature in gvSIG and refreshed my ArcMap display to see it disappear.

As you can see from the screen capture, I am using ArcEditor but that is because of other ArcGIS-related work that I do. zigGIS doesn't care about the license tier you use and will work just fine with ArcView.

ArcGIS Desktop 9.3 does have some improved mapping tools so those of you who have been using zigGIS as a lightweight means of access your PostGIS data from ArcMap can now look at what 9.3 has to offer.

<a href="http://twitter.com/zigGIS">Follow zigGIS on Twitter</a>