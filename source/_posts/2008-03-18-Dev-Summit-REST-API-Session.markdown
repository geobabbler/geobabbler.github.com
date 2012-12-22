---
layout: blog
title: Dev Summit REST API Session
post_author: bdollins
comments: true
categories:
- Developer Summit
- esri
- REST API
---

I just sat through the first REST API session at the Dev Summit. They had it in a pretty big room and it was packed. There is a lot of interest in it here. Generally, you can walk up to just about any random person and they'll say they want to learn more about the REST API. The other web APIs (JavaScript, SOAP, etc.) are also generating a lot of interest.

To sum up the REST API in one word: impressive. ESRI is definitely on the right track here. I think this API could end up overshadowing the others over time. After sitting through the session, I have my doubts about whether the API holds up to the strictest definition of REST but I came away unconcerned by that. The simplicity and the power of this API cannot be understated.

All resources (requests, layers, services, etc.) are represented as URLs. This provides the ability to very simply call powerful geoprocessing and analysis services running in ArcGIS Server. The API also supports a myraid of output formats. They demonstrated using Google Earth, Google Maps and Virtual Earth as clients. Also shown was the use of Python and Ruby scripts to call AGS services through the REST API as well as Yahoo Pipes. The output formats specifically discussed were HTML (default), (geo)JSON, KML/KMZ, image, layer (for use by ArcMap clients), NMF (for AGX), Google Maps and Virtual Earth. There's enough there to pretty much do what you need.

Before anyone asks, no they did not specifically mention OpenLayers nor was it shown but there were numerous examples of GeoJSON output. Based on what I saw, I think it would trivial to integrate with OpenLayers.

The REST API makes diligent use of caching in order to optimize performance. One aspect I was interested in was security. During the plenary, it was mentioned that AGS security can be managed using industry standards such as LDAP and others. While this is not specific to the REST API, it is worth noting that, once security settings are defined, they automatically apply across all of AGS's supported web interfaces. This will be a huge thing for many of my customers. In addition, security is role-based and can be applied to folders or individual services.

From a developer standpoint, 9.3 could end up being the most important release of ArcGIS in a long time. The JavaScript, SOAP and REST APIs will open up development to a lot of new developers. I think that these APIs will be critical to achieving the goal for ArcGIS articulated at the FedUC for AGS to be the geospatial analysis engine that can feed the visualization client of your choice.

A couple of other minor notes: AGS 9.3 introduces a geometry service that's not bound to any specific data but exposes geometric opertations to clients. Currently, the REST API only supports simple geometries so parametric types such as arcs and circles are converted to densified lines or polygons.

This was an impressive session. It looks like ESRI is putting a lot of effort into getting the REST API as right as they can this first time out. This session made me eager to get home and get the 9.3 beta running.