---
layout: post
title: "OGC Abandons the Web"
date: 2013-05-30 10:52
comments: true
categories: 
- GIS
- OGC
- standards
- JSON
- GeoJSON
- ESRI
---

Those are my words, not theirs. 

It came to light today that [OGC](http://www.opengeospatial.org/) has decided to [withdraw the GeoServices REST Specification](http://lists.osgeo.org/pipermail/discuss/2013-May/011789.html), also known as the "ESRI REST API," as a proposed standard. I will not take up the relative merits of the specification or the implications of OGC potentially adopting an industry-developed specification that has so much implied workflow embedded in it. With this decision, three facts remain unaltered:

1.	The ESRI REST API will continue forward as a widely-used de facto standard in the form of ArcGIS Server installs and other emulations, such as that in [Arc2Earth](http://www.arc2earth.com/).
2.  GeoJSON will continue forward as a widely-used de facto standard in the form of numerous open-source implementations.
3.	OGC still has no JSON syntax.

Yes, twelve years after the [birth of JSON](https://en.wikipedia.org/wiki/JSON#History), five years after the [release of the ESRI REST API and its embedded JSON syntax](http://webhelp.esri.com/arcgisserver/9.3/java/index.htm#whats_new_93.htm), and five years after the [release of GeoJSON 1.0](http://geojson.org/geojson-spec.html), OGC is still has no entry in the JSON space. Between Esri and GeoJSON, the utility of JSON in web mapping applications has been roundly proven. In the ESRI arena, find me anyone who willingly uses the SOAP API these days while the adoption of support for GeoJSON across the open-source GIS world speaks volumes. The industry has voted with its feet and its code as to what it prefers.

There's probably a lively discussion to be had about where JSON should fit into OGC's priorities. What is clear, however, is that Javascript and JSON are driving the web at large and the web-mapping space in the geospatial market. With no official stance of any kind in this area, it becomes increasingly difficult to take OGC seriously in matters of the modern web.

Howard Butler had a great point a while back when discussing the potential adoption of the GeoServices REST Specification:

{% tweet http://twitter.com/howardbutler/status/331405667837542401 %}

The irony here is that the withdrawal of the specification accomplishes the same thing. I won't go so far as to say OGC has no clue or doesn't care but, in the perception-is-reality department, they look pretty out-of-touch these days. Is this a problem with process? Maybe. Is it a problem with message? Definitely. The message I've gotten from this whole episode is that we can keep doing what we've been doing with our web mapping applications because OGC has nothing for us.

