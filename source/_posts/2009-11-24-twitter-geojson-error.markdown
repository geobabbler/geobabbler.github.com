---
layout: blog
title: Twitter GeoJSON Error
post_author: bdollins
comments: true
categories:
- geojson
- geolocation
- gis
- twitter
---

<a href="http://twitter.com/sgillies/statuses/6005237402">Sean Gillies pointed out</a> on Twitter today that the GeoJSON output of coordinates from <a href="http://thenextweb.com/appetite/2009/11/20/twitters-geolocation-api-live-find-tweets-twitters-nearby/">Twitter's just-released geolocation capability</a> is wrong. Sean is one of the authors of the spec so, when I saw his tweet, I took notice. According to the <a href="http://apiwiki.twitter.com/Twitter-REST-API-Method%3A-statuses%C2%A0update">Twitter documentation</a>:

<blockquote>
The XML response uses GeoRSS to encode the latitude and longitude.  encodes as latitude, space, and longitude (see the response below for an example).  For JSON the response uses conventions laid forth in GeoJSON which looks like 

"geo":
{
     "type":"Point",
     "coordinates":[37.78029, -122.39697]
}
</blockquote>

You will notice that this is in Latitude/Longitude order whereas the <a href="http://geojson.org/geojson-spec.html#appendix-a-geometry-examples">GeoJSON specification clearly states</a> Longitude/Latitude.

This is clearly an error that will throw off any existing software that has been developed to handle GeoJSON. This is somewhat reminiscent of a <a href="http://geobabble.wordpress.com/2007/12/18/sql-server-2008-wkt-xy-switching-illustrated/">similar issue with early versions of SQL Server 2008</a>, with a lot of the same issues applicable here. The main difference this time around being that the GeoJSON spec is much clearer on X/Y ordering than the WKT spec was.

There seem to be a lot of clients already on board with supporting geolocation in Twitter so this could be a potentially large proliferation of this particular GeoJSON error. Twitter should look at correcting this before a lot of data gets out there.

Good catch, Sean. And, yes, <a href="http://sgillies.net/blog/964/more-lessons-of-standardization">it should have been noticed before now</a>. Maybe we should look up from our iDroidBerries more often.