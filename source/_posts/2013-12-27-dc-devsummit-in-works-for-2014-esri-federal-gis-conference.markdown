---
layout: post
title: "DC DevSummit In Works for 2014 Esri Federal GIS Conference"
date: 2013-12-27 13:15
comments: true
categories:
- GIS
- ESRI
- geospatial
- devsummit
- events
---
I got word today that [Esri](http://www.esri.com) is planning a one-day [Developer Summit] in conjunction with the [2014 Federal GIS Conference](http://www.esri.com/events/federal/). It appears that the DevSummit will happen on the Wednesday immediately following the Fed Conference (which runs on the Monday and Tuesday) and will be focused on the issues and challenges that are unique to developing applications with Esri technologies for the Federal Government. I spoke with [Jim Barry](http://www.linkedin.com/in/jdbarry), who told me the DevSummit has come together rather quickly and Esri hasn't had time to do its usual data gathering to prepare for such an event. As a result, they are canvassing the developer community for input on topics they should cover. Here are some things I suggested:

<!--more-->

- Developing for [FISMA](http://en.wikipedia.org/wiki/Federal_Information_Security_Management_Act_of_2002) compliance - FISMA compliance has to be baked into an application from the beginning. It would be great to see some content on best practices and resources available to support this when developing with Esri tools and APIs. Esri's regional office in Vienna, Virginia has been doing a lot of work in this area but I'm not sure the information is widespread.

- Desktop development - I still see *a lot* of ArcGIS desktop development in the Federal arena. This ranges from traditional ArcObjects extensions to add-ins to work with the File Geodatabase API. I think content related to how to do continued desktop development and support in light of the current realities of highly constrained desktop environments would be invaluable. For example, how to construct and deploy applications that don't necessarily need to touch the registry and can be deployed without administrative rights. Also, some content on the future of Esri desktop products (like [ArcGIS Professional](http://video.esri.com/watch/2533/unveiling-the-new-arcgis-professional-application-with-jim-mckinney-and-jack-dangermond)) and what it means for application developers would be useful.

<img src="/images/posts/code.png" style="float:left;margin: 5px 25px 5px 0px;" />

- .Net - There's still a lot of .Net development going on in Federal spaces. Most of my Federal customers are still primarily using .Net and you can peruse Federal geospatial RFPs on any given day and see that it is widespread. I'm fairly comfortable with .Net, as are most of the government and contractor developers I work with but it would be good to have some .Net-focused content alongside the newer, sexier platforms.

- [ArcGIS Online for Organizations](http://www.arcgis.com/features/) - Whatever messaging Esri thinks they are doing is not working very well. I encounter a great many Federal users who simply don't understand what it can do for them, why they would consider it, how to budget for it, or whether they can really use it. My understanding is the main Federal GIS Conference will be talking about these issues a lot so I think the DevSummit should focus on the [tools and APIs](https://developers.arcgis.com/en/) that are available so that developers can begin to address the ideas the main conference attendees will come back with.

- Data interoperability - I have spent a lot of time over the past year developing tools to support data modeling and configuration management efforts for some Federal users. Part of this work has involved developing tools to produce physical implementations of approved geospatial data models in a number of formats, though the formats that have been of primary interest with my customers have been the Esri File Geodatabase and [SpatiaLite](http://www.gaia-gis.it/gaia-sins/). The general workflows I have seen involve users working with Esri geodatabase formats in the office, while ingesting field-collected data in SpatiaLite format. All of this data needs to remain compliant with approved data models throughout the life cycle, regardless of format. [We've been tackling that](http://www.zekiah.com/index.php?q=blog/topics/pim) at [Zekiah](http://www.esri.com) with good success. Given the support of SQLite/SpatiaLite in ArcGIS 10.2, I'd like to see some discussion of data conversion/interoperability approaches that developers can automate with Esri tools.

Those are some topics I suggested to Jim off the top of my head. I'll probably think of more. Jim and his team at Esri are actively seeking this sort of input since time is short so I'd suggest [contacting him](http://www.linkedin.com/in/jdbarry) with your thoughts. Given the short timeframe, I'd expect official information from Esri very soon.
