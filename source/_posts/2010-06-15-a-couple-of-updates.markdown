---
layout: blog
title: A Couple of Updates
post_author: bdollins
comments: true
categories:
- .net
- arcgis desktop
- arcobjects
- c#
- cloud
- esri
- GeoCommons
- gis
- open source
- programming
---

Shortly after my <a href="http://geobabble.wordpress.com/2010/06/02/importing-data-from-geocommons-into-arcmap/">previous post</a>, about browsing and downloading data from <a href="http://www.geocommons.com">GeoCommons</a>, hit the wires, I got quite a few back-channel requests for the code. I sent it out via e-mail to a number of people and then posted it via DropBox. I have finally gotten around to posting it up on Google Code, making things much more manageable. It is now available <a href="http://code.google.com/p/geocommonsbrowser/">here</a>.

I have made a few updates since the original post. Some were administrative but were functional. They are:

1. The code was updated to replace SharpZipLib with <a href="http://dotnetzip.codeplex.com">DotNetZip</a> for handling zip files.
2. The code now attempts to identify the default KML handler on the user's system and pass KML directly to it for previewing.
3. The user now gets a wait cursor when the tool is processing downloads and such. This should make it a little more usable.
4. The code headers had been pasted in from <a href="http://sharpmap.codeplex.com">SharpMap</a> and I missed some references to SharpMap in the text. Those have been corrected.

Anyway, thanks for all the interest. It sort of caught me off guard but at least the code is more accessible now. I've got a few more updates planned so this should streamline things.