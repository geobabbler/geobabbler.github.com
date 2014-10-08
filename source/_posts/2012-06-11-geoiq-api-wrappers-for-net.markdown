---
layout: blog
title: GeoIQ API Wrappers for .Net
post_author: bdollins
comments: true
categories:
- .net
- c#
- GeoCommons
- GeoIQ
- gis
- programming
---

A while back, I built a small <a href="http://blog.geomusings.com/2010/06/02/importing-data-from-geocommons-into-arcmap/" target="_blank">interface between GeoIQ/GeoCommons and ArcGIS Desktop</a>. From there, it became more of a full-fledged <a href="http://developer.geoiq.com/tools/arcgis-toolbar/" target="_blank">toolbar for ArcGIS</a>. During that effort, I began developing some .Net classes to wrap the <a href="http://developer.geoiq.com/api/rest-api/" target="_blank">GeoIQ RESTful API</a>. As we progressed with the toolbar, my colleague <a href="http://www.hugoestrada.net/" target="_blank">Hugo Estrada</a> also contributed to the library.

<img alt="" class="aligncenter size-full wp-image-2676" height="145" src="http://geobabble.files.wordpress.com/2012/06/geoiq_dotnet2.png" title="GeoIQ + .Net" width="640" />

The original intent was to wrap the entire API but it turns out that we were undertaking this in the middle of GeoIQ's upgrade to version 2.0. In the intervening time, we got some projects implementing the <a href="http://www.geoiq.com" target="_blank">GeoIQ</a> platform for end users (such as the <a href="http://blog.geoiq.com/2012/04/27/visualizing-our-changing-climate-with-climascope/" target="_blank">Climascope portal</a> that Andrew Turner recently blogged about). <!--more-->

While all of this was going on, I would occasionally blog about some of the work we were doing and, thanks to various search engines, I've gotten a few inquiries about interfacing with GeoIQ within .Net applications. Apparently, GeoIQ has also had a few such inquiries.

Because of this interest, I have decided to post the wrapper library as it currently stands to GitHub. It can be found here: <a href="https://github.com/geobabbler/GeoIQ4Net">https://github.com/geobabbler/GeoIQ4Net</a>

It is very much a work in progress. We have been able to extend it on a project-by-project basis to touch those parts of the API that we have needed to use. For example, you may notice that the wrapper for the GeoIQ Maps API is a little thin. It implements only what we needed to use during a project time crunch. You may also notice the lack of docs. Those will be coming soon, I promise.

We have successfully used this library to develop desktop tools, command-line tools, <a href="http://www.silverlight.net/" target="_blank">Silverlight</a> applications and ASP.NET applications (old ASP.NET forms as well as MVC). Additionally, I have successfully compiled the library on Linux using <a href="http://www.mono-project.com/Main_Page" target="_blank">Mono</a> with no modifications. Most of the original methods have synchronous and asynchronous versions to support both Silverlight and ASP.NET applications, some of the later ones are still lacking asynchronous equivalents.

I have my own road map of things that I'd like to implement to make the library more complete but, given the rising interest in integrating GeoIQ with .Net, I thought it best to put the code out now. Most of the initial development was funded by GeoIQ with the intent of releasing it as open-source. This step finally fulfills that vision. Please feel free to fork, improve, patch or contribute as you see fit and check back for updates. If you have questions, feel free to contact me directly (contact information is on the About page of this blog) until such time as I can post some docs. 

A couple of technical notes: The library is written in C#. There project files for the .Net Framework 3.5 and 4.0. This was done to meet the needs of ArcGIS 9.3 and Microsoft Office 2010, respectively. The library was been successfully used with private, hosted GeoIQ instances as well as <a href="http://www.geocommons.com" target="_blank">GeoCommons</a>.