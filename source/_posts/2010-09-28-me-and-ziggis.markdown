---
layout: blog
title: Me and zigGIS
post_author: bdollins
comments: true
categories:
- arcgis desktop
- gis
- open source
- postgis
- postgresql
- software development
- ziggis
---

If you?ve been to the <a href="http://pub.obtusesoft.com">Obtuse Software</a> site recently, you may or may not have noticed a change to the ?<a href="http://pub.obtusesoft.com/who.aspx">Who We Are</a>? page. It now lists only <a href="http://abegillespie.blogspot.com">Abe Gillespie</a> and <a href="http://www.paolocorti.net/">Paolo Corti</a>. Prior to my trip to Colorado to talk about zigGIS at <a href="http://www.gisintherockies.org/GISITR2010/Home/Default.aspx">GIS in the Rockies</a>, I informed Abe and Paolo that I would be stepping back from any ?official? involvement in Obtuse.

This does not mean that I am stepping back from involvement in zigGIS. I plan to continue to support zigGIS as it returns to open-source but, in truth, I haven?t done much with zigGIS day-to-day in a long time. As part of the <a href="http://abegillespie.blogspot.com/2010/04/prodigal-extension.html">return of zigGIS to open-source at version 3.0</a>, Abe has been working on a plan to give the community multiple paths to support the project, including sponsorship and technical support plans. I'm sure he'll have the details out soon so I'll leave it at that (since it's not my story to tell). So, as Obtuse transitions to more of a supporting role for the zigGIS 3.0 open-source project, I felt that this was a good time to step away and become part of the community. <!--more-->

But enough about me, this post is called ?Me and zigGIS? so I?ll address some of the key needs for zigGIS 3.0, as I see them. Abe is planning a complete rewrite in order to make zigGIS better. A certain amount of that will have to stay on his plate (with help from Paolo) but it?s a large effort. To that end, help is needed. <a href="http://abegillespie.blogspot.com/2010/06/on-to-30.html">Abe published the roadmap</a> a while back so you can take a look and see what needs to be done. zigGIS 3.0 will happen faster and better with the help of additional developers, testers, end-users, etc. 

<img alt="null" src="http://geobabble.files.wordpress.com/2007/08/ziggis_logo.jpg" />

Developers are the most obvious. If you have C# and/or ArcObjects experience and want to get involved in an open-source project, zigGIS can use the help. Testing has always been a big issue with zigGIS as it has lots of moving parts. Between <a href="http://www.esri.com">ArcMap</a>, .Net, <a href="http://www.postgresql.org">PostgreSQL</a> and <a href="http://www.postgis.com">PostGIS</a>, there are a lot of pieces which drive testing of zigGIS. Each new release of any of these can necessitate compatibility testing, the results of which can drive changes to the code. One of the great things about open-source is that those kinds of things can happen more fluidly. Recognizing, however, that not every user of zigGIS is a developer, it?s good to know who may want to take a compiled executable and put it through its paces or who may want to test an installer.

Another big thing on the roadmap is internationalization. A lot of the users of zigGIS (maybe even most of them) are from outside the United States. Supporting languages other than English would be a good thing to do. That?s something that wouldn't necessarily require any coding skill at all but would be a huge help.

As an aside, when zigGIS 2.0 was released, we <a href="http://code.google.com/p/ziggis/">left zigGIS 1.x (licensed under the GPL) available</a>. It is read-only and lacks many of the features that have been added to 2.x but the downloads have continued so I know there is an appetite for an open-source tool that does what zigGIS does. So I hope that some of those people who have continued to use 1.x can help build 3.0.

So why help? Why zigGIS? I?ll address these questions in more detail in future posts. Before I ever got involved with the project, <a href="http://geobabble.wordpress.com/2006/12/17/postgis-and-arcgis-91/">I blogged about it</a>. The use case was a little clearer back then as ArcGIS simply did not support PostgreSQL/PostGIS as a back end. That changed at 9.3 and, although it may have muddied the waters somewhat for zigGIS, it provided a good option for ArcGIS users. So zigGIS had to find its niche. 

Over the last couple of years, I have been putting some thought into that and I think that it can provide a nice way to augment workflow in an ArcGIS environment, allowing an organization to maximize the value of its ArcView licenses. Additionally, zigGIS is a nice option for an organization that is growing into its GIS capability. Such an organization may use ArcMap and may be ready to begin managing its spatial data centrally but may not quite be ready to make down-range decisions regarding web-mapping, online GIS and the like. zigGIS can provide a nice stepping stone to help a shop get more organized while also giving it more time to decide its next steps, allowing it to make longer-range decisions about technology and resources on its own schedule. I?ll be exploring these use cases in more detail in future posts.

So, while I?ve stepped away from Obtuse, I don?t plan to step away from zigGIS. As I continue on with my consulting, it is a technology that has key place in my toolbox. I?m glad it will be returning to open-source and I am looking forward to seeing how it evolves. I have greatly enjoyed my association with Abe and Paolo thus far and look forward to it continuing in a new and different form.