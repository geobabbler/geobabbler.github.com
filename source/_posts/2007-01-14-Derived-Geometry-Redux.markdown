---
layout: blog
title: Derived Geometry Redux
post_author: bdollins
categories:
- .net
- arcobjects
- esri
- ziggis
---

A long time ago, on a blog-hosting site far far away, there was a blog called ArcDeveloper (not to be confused with <a href="http://www.arcdeveloper.net/">ArcDeveloper.Net</a>, which came later and did more). That was my first blog. It went in a few different directions. I wasn't happy with it, so I killed it. There's nothing to link to now.

Anyway, one of the posts I did on that blog had to do with creating derived geometry classes in .Net. The basic premise is simple: create a class that inherits from one of the ArcObjects geometry classes and then extend it to fit your needs. My application at the time had to do with writing an ArcGIS client for <a href="http://www.incident.com/cookbook/index.php/Welcome_to_the_CAP_Cookbook">Common Alerting Protocol (CAP)</a> feeds.<!--more-->

The following code shows the beginning of a derived polygon class I created for the CAP client. The constructor parses the polygon string (as defined in the CAP spec) and populates the base polygon with the points. When the object is instantiated, I have a polygon that I can pass to ArcMap for display. This is a pretty standard use of inheritance.
<pre>
<span class="kwrd">using</span> ESRI.ArcGIS.Geometry; 
<span class="kwrd">public</span> <span class="kwrd">class</span> Polygon : PolygonClass 
{ 
<span class="rem">/// &lt;summary&gt;</span> 
<span class="rem">/// Main constructor. Populates base polygon with points based upon the</span> 
<span class="rem">/// parsed capPointList. Set SpatialReference for base to WGS84 as per</span> 
<span class="rem">/// CAP standard version 1.0.</span> 
<span class="rem">/// &lt;/summary&gt;</span> 
<span class="rem">/// &lt;param name=?capPointList?&gt;Delimited list of coordinates to be parsed</span> 
<span class="rem">/// into point objects for insertion itno base polygon. As per CAP 1.0</span> 
<span class="rem">/// specification, the required syntax for point list is:</span> 
<span class="rem">/// ?y1,x1 y2,x2 y3,x3 ? yn,xn y1,x1</span> 
<span class="rem">/// CAP specification states that first coordinate should be repeated as</span> 
<span class="rem">/// last coordinate in order to close the polygon.&lt;/param&gt;

public Polygon(string capPointList)</span> 
{ 
    IGeographicCoordinateSystem gcs; 
?   ISpatialReferenceFactory spatialEnv = <span class="kwrd">new</span> SpatialReferenceEnvironmentClass(); 
?   <span class="kwrd">object</span> missing = System.Reflection.Missing.Value; 
?   <span class="kwrd">string</span>[] pointArray; 
?   <span class="kwrd">char</span>[] splitter = {? ?}; 
    <span class="rem">///As per CAP 1.0, spatial reference is WGS84.</span> 
    gcs = spatialEnv.CreateGeographicCoordinateSystem((<span class="kwrd">int</span>)esriSRGeoCSType.esriSRGeoCS_WGS1984); 
?   <span class="kwrd">base</span>.SpatialReference = (ISpatialReference)gcs; 
?   pointArray = capPointList.Split(splitter); 
?   <span class="kwrd">for</span> (<span class="kwrd">int</span> i = 0; i &lt; pointArray.Length; i++) 
?   { 
?       <span class="rem">/// this is a call to an external function that just makes a point object from y,x text</span> 
?       <span class="kwrd">base</span>.AddPoint(Ambient.parsePoint(pointArray[i]),<span class="kwrd">ref</span> missing, <span class="kwrd">ref</span> missing); 
?   } 
}</pre>
My recent involvment with <a href="http://code.google.com/p/ziggis/">zigGIS</a> has gotten me thinking about this approach again but, this time, with respect to passing WKB or WKT into the constructor. I think this approach would be a good way to achieve encapsulation of the parsing process as we create ESRI geometry objects from WKB and WKT.