---
layout: blog
title: More From the FedUC Plenary
post_author: bdollins
comments: true
categories:
- esri
- FedUC
- gis
---

<img alt="feduc2008.png" src="http://geobabble.files.wordpress.com/2008/02/feduc2008.png" />

I want to focus a little more on some of the demos and also how ESRI is positioning the ArcGIS platform to support the "GeoWeb" implementation pattern. Jack identified four "implementation patterns" that defin typical GIS architectures. The first three are pretty standard: single user desktop, multi-user server, and "federated" (an ESB-type implementation). The last one is what he called the "GeoWeb". That was depicted as a set of services (data, analysis and otherwise) that can be used by various types of clients included, desktop, web, globes, mobile and pretty much anything else. This is perhaps most effectively visualized as a "mashup" type of situation. This seems to intersect nicely with the realm of "neogeography" in concept.<!--more-->

Jack painted a picture of the ArcGIS platform supporting this by providing the ability, via ArcGIS Server, to serve out models and analysis as well as just data. So you could have a service that runs a service-area analysis based upon inputs from a client. Essentially, apps/services like Virtual Earth, Google Earth, Google Maps, OpenLayers, etc. provide an effective basemap for visualization so the role that AGS can play in that is to serve specific data/models/results from "authoritative sources", thereby exposing more advanced processes in a way that they can executed and their results visualized through clients such a those just mentioned.

This makes sense to me because ESRI's products do have a lot of analytical capability embedded in them. I think ESRI would waste a lot of resource trying to compete in the visualization area since that's been effectively sewn up by others. What they can bring to the game is a robust set of spatial methods that can be exposed as services. It's a "play to your strengths" strategy.

This idea was illustrated effectively with a few demos. Of course, demos are demos so we'll have to wait to see how well it really works but I'll describe the demos. First was demo of ArcGIS Explorer build 450 loading data from various sources (ArcIMS, AGS, WMS, KML, file geodatabase). The performance with ArcIMS layers seems greatly improved and you now have the ability to pull in sublayers from an ArcIMS service and symbolize them however you want, which is nice. So AGX reads a lot of different data, big deal. Next they demonstrated a custom task that called a model on AGS and ran a drive-time analysis using a placemarker in AGX. It returned the expected polygons and symbolized them nicely. So, we learned that AGX can talk to AGS. Again, big deal.

Next came the Google Earth demo where a similar placemarker was created in GE and used to call the same AGS model. It returned the result in nicely symbolized KML. That was good to see. From there the demos jump into the new javascript API. In Google Maps, the javascript API was used to display apartment locations from Craig's List and then call an AGS-hosted proximity model that identified the best place park to optimize your apartment search. So locations from one (non-ESRI) server were fed to AGS for analysis. Lastly, a Virtual Earth app (using the javascript API) was created before our eyes that embedded a call to and AGS-hosted Spatial Analyst tool to identify areas of higher solar radiation for optimal solar panel placement. This result was rendered in 3D using VE. That was all very impressive, especially the re-use of services that were supporting multiple clients (ESRI and otherwise). 

So the take away was "we've got the server to crunch your data and give you good analysis results, display it any way you want." There was no OpenLayers demo but it was mentioned several times and something that should be able to leverage new APIs. There were no demos of the REST API, BTW.

So, I can see and understand how they are positioning ArcGIS to play in a "neogeography" world. It will be interesting to see how it really works as 9.3 gets closer to release. I will venture a very safe guess that it won't be all the way there yet but the battleship seems to be coming about more and possibly gaining momentum.

So I saw a lot of demos that worked really well. That's not a huge surprise but it did make me want to get stuff in my hands and try to break it. ;)  Overall, I think I like this direction and things look promising so far.