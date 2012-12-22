---
layout: blog
title: How Do You Disable This Dialog in ArcMap?
post_author: bdollins
comments: true
categories:
- arcgis desktop
- arcobjects
- arcsde
- esri
- software development
---

<strong>**UPDATE**</strong><em>Check the comments for the resolution to this. 9.2 offers a registry setting and, since I'm upgrading, I'll make use of that. I got pretty far on my API hack though.</em>

My question is twofold: First: Can you stop this dialog from appearing in ArcMap 9.1? Second: If not, does 9.2 give you the option to turn this thing off?

<img alt="ArcMap Drawing Errors?Dialog" src="http://geobabble.files.wordpress.com/2007/02/arcmap_draw_error.JPG" />

I have posted a similar query on the ESRI forums but I thought the blogosphere may be able to weigh in on this. This dialog was introduced at 9.1 as a "feature" but it's not the most developer-friendly thing in the world. A little background:

I have an application running as a Windows service that is receiving data and stuffing it into ArcSDE. I have another app that's an ArcMap extension. It refreshed the map on a specified interval and shows the new data as it comes in. There is no syncronization between the two. As you would expect, there are occaionally collisions. The ArcSDE layer may be in load-only mode or something similar. I have a lot of exception-handling in place to trap all of those kinds of things.

This dialog defies all of that. Despite my exception handling, it still pops up and it completely freaks out my users. I would like to turn it off. (I would really like to kill it.) I can't find a registry setting or any other such option that allows me to do that so I'm stumped. Any help would be appreciated and I promise to sing your praises on this blog if you have the solution.

For background: we are using 9.1 (for a number of reasons). We are starting the upgrade planning to go to 9.2. If 9.2 fixes this, then I'll stop worrying about it. Any useful info would be very helpful. My next step is some slimy Windows API hack to suppress the damned thing.