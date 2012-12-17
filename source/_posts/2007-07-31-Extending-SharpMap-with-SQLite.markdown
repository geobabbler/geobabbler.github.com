---
layout: blog
title: Extending SharpMap with SQLite
post_author: bdollins
categories:
- gis
- open source
- sharpmap
- sqlite
---

Or vice versa.

A while back I posted about setting up a <a href="http://geobabble.wordpress.com/2007/06/19/my-little-open-source-stack/">GIS server using open source GIS technologies</a>. When I left off, I was going to start messing with <a href="http://www.codeplex.com/SharpMap">SharpMap</a>. I've been able to get back to that recently. I am working on a project where I need to do some basic spatial operations on a workstation but I want to keep a relatively small software foot print on the box. Of course, this screams "web service" or some such thing but the platform is mobile with no guaranteed network access.

So I went back to SharpMap. It's footprint is relatively small (compared to ArcGIS) and the licensing model can't be beat :-) . Next, I had to focus on the data source. I decided to look at <a href="http://www.sqlite.org/">SQLite</a> due to its small footprint. Additionally, the availabiliy of an <a href="http://sqlite.phxsoftware.com/">OLEDB driver</a> gave me option for non-spatial data that shapefiles alone didn't (I just didn't want to wrestle with the dBase driver).

So I got to do something I've wanted to do for a while: write my own data provider for SharpMap. There's probably something out there already but how can I learn that way? So I based my data provider class on the class that already existed for MS SQL Server (MsSql.cs). It served as an excellent basis. I was surprised at how very easy it was to do this sort of implementation. The picture below depicts a SharpMap MapImage control with polygon data being read from SQLite.

<a href="http://geobabble.files.wordpress.com/2007/07/sharpmap_sqlite.png" title="SharpMap desktop app with data from?SQLite"><img alt="SharpMap desktop app with data from?SQLite" src="http://geobabble.files.wordpress.com/2007/07/sharpmap_sqlite.thumbnail.png" /></a>

SQLite is inherently text-based so I found it easier to store the geometry as <a href="http://en.wikipedia.org/wiki/Well-known_text">WKT</a> rather that <a href="http://dev.mysql.com/doc/refman/5.0/en/gis-wkb-format.html">WKB</a> but that actually helps me with another project requirement: displaying the data in a <a href="http://en.wikipedia.org/wiki/Windows_Presentation_Foundation">WPF</a> form. Transforming the WKT to <a href="http://www.xaml.net/">XAML</a> will be easier but I digress.

I am very impressed with the updates being made to SharpMap. I feel like I'm just scratching the surface of what it can do. Version 2.0 has not technically been released but I have found the latest builds to be very stable and I'm moving forward without hesitation using it in my project.

I have uploaded my code below. Just rename it to a .cs file.

<a href="http://geobabble.files.wordpress.com/2007/07/sqllite.txt" title="SqlLite.cs Source Code">Click here for the SqlLite.cs source code</a>

<a href="http://www.statcounter.com/" target="_blank"><img alt="hit counter" border="0" src="http://c31.statcounter.com/2901378/0/be706774/0/" /></a>