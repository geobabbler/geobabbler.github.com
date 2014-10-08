---
layout: post
title: "GeoJSON on GitHub: Now What?"
date: 2013-06-18 16:04
comments: true
categories: 
- GIS
- GeoJSON
- GitHub
- QGIS
- innovation
- disruption
---

So [GitHub](http://github.com) [announced](https://github.com/blog/1528-there-s-a-map-for-that) that you can now automatically view any [GeoJSON](http://geojson.org) files that may be in a repository inside an interactive map driven by [MapBox](http://www.mapbox.com/) technology. This simple enhancement to GitHub is probably one of the most significant developments in the geospatial industry in years. I'll explain a little later in this post. It's also important to view this new capability as a great, but limited, first step. I'll discuss that a little later as well.

While it's cool to click on a link and just see a map, it doesn't take long to wonder about how you can use this capability beyond viewing data in GitHub. What follows are three ways to capitalize on GeoJSON in GitHub. Not all are directly related to the new mapping capability, and two have been possible for a long time. That said, the GitHub announcement may draw interest from users who have not previously considered either GitHub or GeoJSON, so I hope these approaches will be useful.

### Embed the GitHub map.

<del>If you click on a GeoJSON file and view the new map in GitHub, a quick view of the page source will show that this map is embedded in an IFRAME object.</del> GitHub provides a [simple embedding method](https://help.github.com/articles/mapping-geojson-files-on-github#embedding-your-map-elsewhere) to display the GitHub map in any page. (Thanks to [Ben Balter](https://github.com/benbalter) for this update.) It's a great way to quickly publish a data set while also providing access to download the raw data.

-><script src="https://embed.github.com/view/geojson/geobabbler/geodata/master/geojson/leonardtown_bldgs.geojson"></script><-

<!--more-->

### Stream the data into your own web map.

This is not a new capability; if you've had GeoJSON in a repo, you've always been able to do this. That said, if you're checking out GitHub or GeoJSON for the first time as a result of the new mapping capability, this is something you may want to try. I have had a page up for a while showing the [county-by-bounty breakdown of Maryland's marriage equality question from the 2012 election](http://blog.geomusings.com/assets/demos/mdq6/) that uses this approach to load the data into a [Leaflet](http://leafletjs.com/) map from GitHub and style it. (Incidentally, the tiles in the map are also hosted on GitHub.)

### Stream the data into your desktop.

A third option is to stream the GeoJSON data directly into desktop GIS software such as QGIS for further analysis. In QGIS, simply need to add a vector, specifying "Protocol" and entering the URL to your GitHub-hosted GeoJSON file. Make sure you use the "raw" URL that looks something like this: https://raw.github.com/geobabbler/geodata/master/geojson/leonardtown_bldgs.geojson .

-><img src="/images/posts/add_geojson_layer.png" /><-

After a few seconds (or more depending on the file size), it should load into QGIS like this:

-><img src="/images/posts/qgis_github_geojson.png" /><-

Additionally, the [GDAL/OGR plug-in for ArcGIS](https://github.com/RBURHUM/arcgis-ogr/) by [AmigoCloud](http://www.amigocloud.com/homepage/index.html) provides a way to get GeoJSON into ArcMap, though you may need to download the data first.

UPDATE: Dane Springmeyer pointed out that TileMill supports remote URLs as well.

{% tweet https://twitter.com/springmeyer/status/347483526171594753 %}

Those are three (or so) quick ways to capitalize on GeoJSON data in GitHub now. So what next?

I stated earlier that I think the GitHub announcement was one of the most significant developments in years. I think it is best explained by [feoMike in his recent post](http://feomike.github.io/post/thoughts-on-disruption.html). As he points out, GitHub has made it easy to communicate spatial information in a way that is fully consistent with the web. Now that simple mapping is available to a large community of developers, it will be interesting to see where they take it. feoMike offered up a few early examples in his post. It's worth a read.

The GitHub move is great for GeoJSON as a format. I've said in the past that the search for the next shapefile ends with GeoJSON. If the web is this generation's dominant computing platform (it is), then GeoJSON provides a simple, elegant solution for geographic data transport in a manner that the shapefile did for the desktop. Support by GitHub is one more example of the community voting with its code as to what it prefers.

I also said it was a great first step, but limited. The mapping capability is understandably basic, though the documentation shows how you can customize styling somewhat. There is also a point at which the data seems to become too big to render (in either the map or in raw form). Bill Morris has identified this limit to be in the ballpark of 4.5MB, which can be easy to hit with GeoJSON.

{% tweet http://twitter.com/vtcraghead/status/346825523521019904 %}

So this means that enterprises won't be dumping terabytes of vectors to GeoJSON and loading them into GitHub. That's a good thing in my book. It is, however, an acceptable solution for small data sets and quick turn-around data sharing. As with all things, you have to go in with the right set of expectations.

The thing I'm probably least worried about is how this affects [Esri](http://www.esri.com). Without any specific inside knowledge of Esri's plans, I suspect some form of official support for GeoJSON isn't far off. There are too many people inside Esri who get GeoJSON for it not to happen. If anything, the GitHub announcement may provide a bit of a push by providing a potentially rich source of data sets to consume. The real question is what form the support will take. In any event, Esri provides enough APIs to enable us to develop our own support for GeoJSON if we need it.

The addition of GeoJSON mapping to GitHub is a very small change in the scheme of that platform, but such small changes can sometimes lead to big shifts. It has been possible for a long time to use GitHub to host geospatial data for applications. The main benefit of this latest change, in my opinion, is its potential to get people thinking about the platform in a different way. With such a visible (and visual) change on a platform targeted at developers, I hope that it will motivate that community to begin experimenting with how far it can be pushed. If a hosted platform with an already-baked-in workflow for change management and version control begins to be viewed as a viable home for spatial data, it has the potential to change how the geospatial community thinks about how it does business.