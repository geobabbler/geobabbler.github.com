---
layout: post
title: "WeoGeo: Now With GeoJSON"
date: 2013-10-17 05:42
comments: true
categories: 
- GIS
- WeoGeo
- GeoJSON
- data
---
It's great news that the [government shutdown is finally over](http://www.washingtonpost.com/politics/house-effort-to-end-fiscal-crisis-collapses-leaving-senate-to-forge-last-minute-solution/2013/10/16/1e8bb150-364d-11e3-be86-6aeaa439845b_story.html?hpid=z1). Many of our colleagues across the geospatial industry can now report back to work, ending a another stressful period for them. During the shutdown, many stepped up to try and fill the gap left by shuttered government web sites that would normally distribute geospatial data.

Among those who stepped into the breach are my friends at [WeoGeo](http://www.weogeo.com), who told me they saw a huge uptick in traffic as the community realized that government data sets such as TIGER and DRG are freely available in the [WeoGeo Market](http://market.weogeo.com/). One of the capabilities that has been quietly introduced into WeoGeo's platform over the last few days is the ability to extract and download TIGER and OSM data directly in [GeoJSON](http://geojson.org) format. The embedded video by WeoGeo walks through the customization and ordering process better than I can, but it's great to have the ability to extract fine-tuned data sets directly in GeoJSON format for use in modern web-mapping tools.

<iframe src="http://fast.wistia.net/embed/iframe/vth8yo4cnz"
allowtransparency="true" frameborder="0" scrolling="no"
class="wistia_embed" name="wistia_embed" allowfullscreen
mozallowfullscreen webkitallowfullscreen oallowfullscreen
msallowfullscreen width="770" height="433"></iframe>
<br/>
Static content has been making a comeback lately, and justifiably so. The truth is that most of the content we interact with on the web won't change over time and complex content management systems (CMS) that dynamically generate HTML and such from databases on every call are really overkill. Sure, there are caching strategies and CDNs and such to hide some of the misery but you can't beat the speed, simplicity, and scalability of static content.

<!--more-->

The same can really be said of maps on the web. Most maps are published to convey some information that has been validated for the point in time in which it was published. Most of the organizations I've worked with, government and commercial, have a release process to vet the contents of a map before it is published. In effect, such organizations are making their map content static. The truth is that, like a CMS, a complex map server probably isn't necessary for most maps we interact with today on the web.

In fact, I can still clearly recall use cases from just a few years where such architectures were not only overkill but counterproductive. We typically distributed analysis results via web-based interactive maps. The results were typically valid for point in time during which an area of interest was studied. We ended up developing versioning schemes to preserve analysis results from being altered by the next bulk data set update. Another tack was to set up a separate map service pointed at a directory of shapefiles. All of this was to get around the basic fact that geospatial data at the time was not web-ready. GeoJSON helps solve that problem.

With modern client-side mapping libraries like [Leaflet](http://leafletjs.com/) and [OpenLayers](http://www.openlayers.org/), and with content generation tools like TileMill, it has become increasingly easy to make beautiful, interactive web maps that require no specialized back-end server to deliver geospatial content. With WeoGeo's support, combined with the online editing capabilities of [geojson.io](http://geojson.io/) from [MapBox](http://mapbox.com), the validation capability of [GeoJSONLint](http://geojsonlint.com/) by [Jason Sanford](http://twitter.com/JCSanford), the [simple hosting capability of GitHub](https://help.github.com/articles/mapping-geojson-files-on-github), and the extended query API provided by [GitSpatial](http://gitspatial.com/) (again by Jason Sanford), we are very close to having a complete GeoJSON-centric workflow.

Even as government data sites come back online, there are still good reasons to head over to WeoGeo and check out what they have. The customization capabilities alone (shown in the video above) make it very easy to get data for just your area of interest without having to download a lot of extra, unneeded data. The addition of GeoJSON support, in my opinion, shortens the workflow needed to get from data to information.