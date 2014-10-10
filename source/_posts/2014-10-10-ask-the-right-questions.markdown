---
layout: post
title: "Ask the Right Questions"
date: 2014-10-10 07:42
comments: true
categories: 
- geospatial
- mapping
- production
- GIS
- web mapping
---
If you're about to embark on a requirements drill or needs assessment focused on "web GIS," it is important to be sure to answer one question as you proceed: Do you actually need any specialized mapping server at all?

If "none" isn't one of the choices in your analysis of alternatives, then you are doing it wrong in 2014 and you may be doing a disservice to your users. The state of current technology makes it perfectly feasible to publish interactive mapping products as static content, using nothing more than your current web server. Given the complexity of today's IT environments, including requirements for FISMA compliance on Federal systems, it is irresponsible not to consider this option before recommending yet another specialized server product (or hosted cloud solution) for your user's IT architecture.

<!--more-->

As I embark on another [Leaflet](http://leafletjs.com/)/HTML/[GeoJSON](http://geojson.org/)/[D3](http://d3js.org/) implementation for a user, I can think of about ten projects that I've done over the last dozen or so years that I would love to revisit with this technology mix. These projects shared some characteristics with my current project which made me go down this route this time around.

1.	Product-based workflow - These projects have typically been centered around the delivery of value-added analytical product. Often, the products are only valid for the version of the source data used at the time. Changes to the underlying source data would warrant a re-validation of the analytical product. In other words, "configuration management."
2.	Frequent, but not constant, product updates - Analytical products are typically generated on a schedule that has an interval that is measured in at least a few days, but usually more. Referring back to item 1, this is usually because the source data isn't updated frequently enough to warrant constant attention to the product.
3.	Version history - Products often need to be retained for a long period of time, even when superseded. In many of the shops I've supported, the previous product serves as the starting point for the next version, so maintaining the history is important to understand the context of the current version of a product.

A dozen years ago, if you wanted to generate some sort of web-based interactive mapping product, you needed to have some sort of map server technology living in your stack somewhere. Over time, those map servers became tied to database servers, either directly or through middleware, and there may have been some wonderfully cumbersome APIs involved to achieve some level of customization. Such technologies are simply not necessary in all cases anymore.

There are still use cases where such technologies are still necessary or useful, particularly if data changes rapidly or if there is a need to expose some sort of advanced geospatial operation directly over the web. (This should be an exceedingly rare requirement.) But it is important to distinguish between "web GIS" and geospatial workflows that result in relatively static mapping products. If an honest assessment reveals the latter, then it is perfect feasible to build a system that involves no mapping server software at all, yet still results in rich interactive maps on the web. This alternative must be considered today when assessing the need for web mapping in an organization.

Advantages to going this way if you can include, among others:

1.	Simplicity - Because mapping content is served only from the web server, there is no need to install, patch, or otherwise manage any specialized geospatial software attach to the public-facing infrastructure.
2.	Security - This is related to the item above. The lack of such specialized software means the lack of a need to secure such specialized software. In the days of FISMA, this is a pretty compelling argument. The ability to remove potential threat vectors and rely on more broadly understood and well-exercised security practices and tools aids in system security and accreditation. All of the specialized geospatial software can live completely disconnected from the public-facing systems, leaving IT security staff to focus only on those systems that are absolutely necessary for interaction with external users.
3.	Version control - I have seen many organizations that make use of some very convoluted database versioning approaches in order to preserve product history. Static content, if it is a viable option, solves this problem as well. Geospatial outputs, along with the value-added analysis and assessment that adds context and richness can simply be configured inside git or TFS or SVN or whatever an organization's preferred document management approach may be. In other words, standard tools can be used for the job without muddying the waters with some need to make the process unnecessarily spatial.

Of course, [interactive maps backed with static content](http://blog.geomusings.com/assets/demos/govwin/) such as GeoJSON and local basemap tiles are nothing new, but that is exactly the point. They are not new and they need to be considered equally alongside heavier, traditional "enterprise" tools during alternatives evaluation. There are stable, proven, open-source technologies available to enable not only the serving of such products, but also the supporting production workflows. Many organizations are starting to look at revamping their IT architectures, whether for FISMA compliance or data center reduction or any of a number of myriad reasons, and are thinking of how best to fit in complex, cumbersome, specialized map server software and make it secure and scalable. If you or your user finds yourself in this situation, you would do well to stop and consider the possibility that, depending on how you do business, you simply may not need to.
