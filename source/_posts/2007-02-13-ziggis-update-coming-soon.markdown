---
layout: blog
title: zigGIS Update Coming Soon
post_author: bdollins
comments: true
categories:
- arcobjects
- gis
- open source
- ziggis
---

Things have been a little slow on the <a href="http://code.google.com/p/ziggis/">zigGIS</a> front for the last few weeks. Both Paolo and I have been incredibly busy at work. We have both made some updates but it's been hard to pull them together into a coherent release. That's getting very close now. Enhancements this time around will include:
<ol>
	<li>On-the-fly reprojection - We have been able to get layers with different SRIDs to overlay correctly. Also, you can change the SRIF of the map and the layers display correctly. Obviously, we haven't tested every spatial reference out there but we're encouraged.</li>
	<li>Dataset Enumeration - We can now list the PostGIS layers in the database to which we connect. Paolo has implemented a new dialog that allows you to pick the layer you want rather than having to type it.</li>
	<li>Use of a PropertySet for workspace properties - It's now not as tightly coupled to the .zig file and more consistent with how other data sources are implemented in ArcGIS</li>
</ol>

Paolo is working hard to pull all of our changes together and get a release out soon. There are probably other updates that I'm missing but there will be a full accounting once the release is out. We're still working toward some bigger issues, such as editing. Also, we've begun the development of some catalog objects. Those will be addressed in subsequent releases.