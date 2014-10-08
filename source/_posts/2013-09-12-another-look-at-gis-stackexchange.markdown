---
layout: post
title: "Another Look at GIS StackExchange"
date: 2013-09-12 11:10
comments: true
categories: 
- gis
- stackexchange
- grain of salt
- diversion
---
A year ago, I used the StackExchange API to facilitate an [analysis of tags on GIS StackExchange](http://blog.geomusings.com/2012/09/13/carving-up-gis-stackexchange/) to see what people were talking about on one of the largest and most successful vendor-neutral discussion sites in our industry. In that post, I stated "It would probably be good to revisit this in a year to see how things have changed, if at all."

Well, a year has passed so I decided to do it again. I used the same scripts and approach I used last time in order to be consistent. Since this is one year later, there is one key caveat. My analysis last year looked at the top 100 tags since the start of the [GIS StackExchange](http://gis.stackexchange.com/) site. Since I ran the same query this year, the new results are compounded so what they so are last year's results plus activity since then. Essentially, you are looking at "that plus this." The pie chart below shows the breakdown.

-><img src="/images/posts/stackexchange_chart_2013.png" /><-

<!--more-->

Compared to last year's results, there hasn't been much movement in the distribution of tags. One thing I did notice, however is that the tag "qgis" leaped to the top of the list. Last year, "arcgis" was the top tag and "qgis" was number three. That said, I wouldn't jump to too many conclusions. A quick [look at the data](/assets/data/stack2013/output_2013.csv) shows that, in addition to "arcgis", there are version-specific tags such as "arcgis-10.0" and "arcgis-10.1" as well as product-specific tags like "arcgis-server" so there's a lot of Esri-centric discussion going on, but that is to be expected. The top ten tags, however, include major components of the [OpenGeo](http://opengeo.org/) Suite (OpenLayers, GeoServer, PostGIS) in addition to QGIS so open-source tools seem to be every bit as active a topic of discussion as do [Esri](http://www.esri.com) tools.

Speaking of the top ten tags, they were: <br /><br />
1. qgis (3910) <br />
2. arcgis (2382) <br />
3. python (2171) <br />
4. arcgis-10.0 (2142) <br />
5. openlayers (1996) <br />
6. postgis (1560) <br />
7. geoserver (1193) <br />
8. arcobjects (1184) <br />
9. raster (1174) <br />
10. arcmap (1113) <br />

Last year, I got some back-channel requests to do a little more with the raw data so, seeing a chance to play with [D3](http://d3js.org), here is a look at how things break down. Hover over a bubble to see the full name and tag count. If you follow your nose a bit, the color scheme will become apparent in relation to the pie chart's key.

<link rel="stylesheet" href="/assets/data/stack2013/style.css" />
<iframe src="/assets/data/stack2013/frame.html" marginwidth="0" marginheight="0" scrolling="no"></iframe>

All of the same limitations I pointed out last year about posts having multiple tags and dilution across related tags still apply this year. If there is any insight into the mind share of the GIS community to be derived from this exercise, it is probably in the aggregate.

The exact StackExchange API URL that generated these results is: [https://api.stackexchange.com/2.1/tags?order=desc&sort=popular&site=gis&pagesize=100](https://api.stackexchange.com/2.1/tags?order=desc&sort=popular&site=gis&pagesize=100)

The results were generated on 11 September 2013 and subsequent results will vary from those shown here. The Python script used to process the results into CSV [can be found here](/assets/data/stack2013/handle_json.zip).