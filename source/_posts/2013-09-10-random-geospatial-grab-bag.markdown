---
layout: post
title: "Random Geospatial Stuff"
date: 2013-09-10 10:16
comments: true
categories: 
- GIS
- geospatial
- random
---
It's been a while since I've posted as the usual wind-down of summer and wind-up of the school year has had me otherwise engaged. What follows are few developments over the past few months that have floated through the transom of my geo-awareness.

-><img src="http://daylightdonutsstier.com/assets/images/slideshow/CakeDonuts.jpg" height="50%" width="50%"/><-

[geojson.io](http://geojson.io/) - Remember all of the attention given to the ability to render GitHub-hosted GeoJSON files as maps? Well, [Tom MacWright](http://twitter.com/tmcw) of [MapBox](http://mapbox.com) has, in fairly rapid fashion, given us this tool to edit GeoJSON in the browser and publish to either a GitHub repo or a gist. It's an easy-to-use tool with an interface consistent with other MapBox tools. It's definitely worth checking out and adds an important piece of workflow to the GeoJSON-on-GitHub concept.

<!--more-->

[GitSpatial](http://gitspatial.com/) - Continuing with the theme of being more productive with GeoJSON on GitHub, [Jason Sanford](http://twitter.com/JCSanford) has developed GitSpatial to wrap a spatial API around your hosted GeoJSON. It actually works using a 'sync' approach so it pulls the GeoJSON into its own infrastructure and watchs the data on GitHub for changes. Jason has also updated his [Leaflet Vector Layers](http://geojason.info/leaflet-vector-layers/) project to support GitSpatial. This project is in its early stages and Jason has been very open to feedback. I encourage you to check it out and help him make it better.

[VirtualPG](https://www.gaia-gis.it/fossil/virtualpg/index) - This extension to SQLite/SpatiaLite was released in August and it is intended to facilitate data exchange between those platforms and PostgreSQL/PostGIS. I have yet to kick the tires on it but I plan to soon.

[HSIP 2013](http://www.dhs.gov/infrastructure-information-partnerships#2) - For the first time in quite a while, I attended a [HIFLD](https://www.hifldwg.org/) meeting. The theme of the meeting was HSIP Feedback, to which about one HIFLD per year is dedicated. While HSIP has never been perfect, it has managed to evolve to provide value across numerous communities. The meeting featured a parade of users articulating the essential nature of HSIP to their missions. With HSIP 2013, the distribution expands to 6 DVDs. In my opinion, this distribution method is one of its biggest, and most solvable, problems. With a plethora of [technologies](http://www.weogeo.com) to choose from, streamlining and tailoring the delivery of HSIP to its users should be low-hanging fruit for HSIP's custodians.

As for me, I've been spending my days writing interfaces for custom message formats to synchronize locations with video frames. It's much lower-level development than I've done in a while but it's been very fun. I've also been making some updates to my [GeoJSON extension for ArcGIS Server](https://github.com/geobabbler/AGSOpenFormats) but I'll post about that in more detail soon.