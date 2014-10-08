---
layout: post
title: "DevOps for Geospatial Data"
date: 2013-07-28 10:54
comments: true
categories: 
- GIS
- Data
- DevOps
- OpenGeo
- ESRI
- GitHub
---
There has been a bit of buzz the past couple of weeks over the [ability of GitHub to render GeoJSON and TopoJSON files](https://github.com/blog/1541-geojson-rendering-improvements) automatically using  and embedded [Leaflet](http://leafletjs.com/) map and [MapBox](http://www.mapbox.com/) technology. This buzz is quite justified as it presents an easy way to simply publish and visualize vector data sets. In the weeks since the initial announcement, the community has begun exploring the limits of GitHub's capability. Probably the two biggest limiting factors are individual file size limits and API rate limits. Some, including myself, are exploring strategies for maximizing the ability to store, disseminate, and visualize data within these confines. For the near term, [GitHub](https://github.com/) will probably not be the place to store terabytes of data or act as the CDN for a high-volume mapping application. That is perfectly fine and there is still a great deal of value to be found within GitHub's current generous constraints.

-><img src="/images/posts/geodata-git.png" /><-

One aspect of GitHub (really, its underlying [git](http://git-scm.com/) engine) that is of great interest to me is the ability to perform version control and configuration management on data itself. With GitHub, that currently takes the form of text-based formats such as JSON but it's a start. In my experience supporting various customers over the years, configuration management of data has been a common gap in information operations. The most common, and inadequate, approach to this problem has been through the use of metadata. Almost two decades of viewing out-of-date, incomplete, and inaccurate metadata has given the lie to this approach. Metadata represents a separate maintenance workflow for which many organizations simply do not dedicate resources. Data-set-level metadata is also inadequate for volatile data sets in which individual records are updated frequently.

<!--more-->

I have worked with many organizations that had excellent DevOps processes for managing and deploying application code that simply had no corresponding processes for the data that the code was utilizing. We are long past time for addressing the importance of configuration management for data itself.

That is not to say there have not been approaches to addressing this issue. Since version 8.0, [Esri](http://www.esri.com) has had a means of [versioning enterprise geodatabases](http://www.esri.com/software/arcgis/geodatabase/multi-user-functionality) that are stored in an RDBMS. This approach does have the ability to track feature-level changes and manages their inclusion in the master version of the data set. Quite frankly, I've never loved the Esri approach to versioning. I think it gives too much responsibility to middleware when it should be the database's sole responsibility to keep itself intact. Also, I have always felt the workflow is a bit too proscribed and takes too much business process decision ability from the data owner. That said, it has been the only real game in town for a long time so I have implemented it many times.

[OpenStreetMap](http://www.openstreetmap.org/) (OSM) has also been a success story for tracking feature-level version history. Its approach has successfully managed millions of edits to a worldwide database so its utility is certainly proven. Organizations that need to maintain their own data behind their firewalls cannot really make use of OSM itself but the OSM approach is solid.

[At my own company](http://www.zekiah.com), we have been working with customers to implement [configuration management of data models](http://blog.geomusings.com/2012/03/27/configuration-management-for-geospatial-data-models/) (logical and physical) but we are not really addressing CM of the data managed by those models. Even so, working at the model/schema level has still helped our customers improve their data management workflows by being able to identify versions of data models supported by deployed applications and helping to migrate between versions as needed.

The recent move by GitHub to support visualization of spatial data files actually introduces no new capability in terms of configuration management of data files. Users have always had the ability to store and manage JSON, text, XML and other formats in GitHub and git. My hope is that the visualization capability, and the inevitable exploration it will generate, will shine more light on the issue of data configuration management. In my opinion, this is the most powerful aspect the platform brings.

I'm also encouraged by [OpenGeo's](http://opengeo.org/) [GeoGit](https://github.com/opengeo/GeoGit) initiative. I have not personally experimented with it yet so I will not speculate on the specifics of its implementation, but I am happy to see OpenGeo recognizing the need for a more open approach to feature-level version control. Since, however, it will be open-source, my hope is that proprietary GIS vendors, or their supporting integrators, will eventually support it as well.

Ultimately, I am happy to see both GitHub and OpenGeo addressing this issue. Although their approaches are different, they offer, in addition to the Esri approach, choices for organizations in terms of workflow. Many data managers, whether for legal, strategic, or other reasons, recognize the importance of maintaining version history of geospatial data records. It is important for everything from parcel mapping to critical infrastructure protection and many other use cases. Historically, there have been very few tools available to address this problem effectively but I am hoping that is starting to change.