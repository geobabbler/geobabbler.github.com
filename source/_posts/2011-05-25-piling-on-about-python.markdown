---
layout: blog
title: Piling On About Python
post_author: bdollins
comments: true
categories:
- gis
- open source
- programming
- Python
- software development
---

First and foremost, I am not a <a href="http://www.python.org">Python</a> expert. I am not even sure I could effectively play one on TV. <a href="http://geobabble.wordpress.com/2011/01/03/turning-it-up-to-11/">As I mentioned at the beginning of the year</a>, I am trying to beef up my Python skills.

Secondly, what I have to say in this post isn't particularly original or unique. <a href="http://sgillies.net/blog/find?q=python&amp;submit=Search">Others</a> <a href="http://blog.safe.com/2009/10/snakes-on-a-map-python-in-gis/">have</a> <a href="http://www.spatiallyadjusted.com/2011/01/03/2011-the-year-python-takes-over-gis/">said</a> it before. 

So I am posting this because I have fielded some form of this question at least ten times (no exaggeration) in the past couple of months: "What skill do you recommend most for someone getting into GIS today?"   <!--more-->

My answer, invariably, has become "Python."

<div style="text-align:center;"><img alt="Python: The Swiss Army Knife of GIS programming" height="296" src="http://geobabble.files.wordpress.com/2011/05/wenger_giant_knife.png" title="Python: The Swiss Army Knife of GIS programming" width="277" /><div style="text-align:center;font-size: 14px;">Python: The Swiss Army Knife of GIS programming<br/><br/></div></div>

This may sound like a very programmer-centric answer, and it may be, but just today I got this in an e-mail from one of the senior GIS analysts with whom I work:

<blockquote>Looks like you were right.  Can't use field calculator to do what I'm trying to do.  I'll be writing a Python script.</blockquote>

He had been trying to use the ArcGIS Desktop field calculator to find the minimum value in a column. After a quick call to Esri, he confirmed that it didn't work that way. Gone are the days when a GIS analyst can just sit down, double-click the icon of their desktop GIS of choice and accomplish everything they need to do solely with the use of <a href="http://en.wikipedia.org/wiki/WIMP_(computing)">WIMP</a>. Truly effective analysts will need to do some scripting and that's where Python comes in.

Python is a real language that can be used to build real, complex, enterprise-scale applications. It also happens to be very effective for scripting as well. In the Esri world, the thankful sunsetting of VBA leaves analysts with Python as the recommended way to accomplish that. That said, if you are entering the GIS field in 2011, you need to have Python in your arsenal. It simply positions you to work with a broad set of tools, such as:

<a href="http://help.arcgis.com/en/arcgisdesktop/10.0/help/index.html#/What_is_ArcPy/000v000000v7000000/">ArcGIS</a>
<a href="http://www.qgis.org/wiki/Writing_Python_Plugins">Quantum GIS</a>
<a href="http://mapnik.org/">Mapnik</a>
<a href="http://trac.osgeo.org/gdal/wiki/GdalOgrInPython">GDAL/OGR</a>
<a href="http://trac.gispython.org/lab/wiki/Shapely">Shapely</a>
<a href="http://grass.osgeo.org/wiki/GRASS_and_Python">GRASS</a>
<a href="http://postgis.refractions.net/documentation/">PostGIS/PostgreSQL</a>
<a href="http://code.google.com/p/weogeo-public-code/downloads/list">WeoGeo</a>
<a href="http://geodjango.org/">GeoDjango</a>
<a href="http://groups.google.com/group/python-gis-sig">And a host of others discussed here.</a>
And more, I'm sure.

This list is not comprehensive nor is it intended to be. It is meant to show that, wherever you want to go, Python is probably already there. Some of the tools listed there are not strictly GIS tools but are designed to perform some component functions of GIS very well so interpret the list broadly. Also, this list doesn't really touch upon python libraries that can help with commonly performed related tasks like statistical analysis (things like <a href="http://rpy.sourceforge.net/">rpy</a>, which interfaces with <a href="http://www.r-project.org/">R</a> via Python).

If it's not obvious by now, I am becoming a Python convert and having a lot of fun in my explorations. I can't think of another time in my career where one language has cut across such a wide array of tools. It makes me wish I could have all those years of <a href="http://en.wikipedia.org/wiki/ARC_Macro_Language">AML</a> back.