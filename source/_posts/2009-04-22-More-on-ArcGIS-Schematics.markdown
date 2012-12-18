---
layout: blog
title: More on ArcGIS Schematics
post_author: bdollins
categories:
- esri
- gis
---

A few weeks ago, <a href="http://geobabble.wordpress.com/2009/03/12/and-now-for-something-completely-different-arcgis-schematics/">I posted</a> about <a href="http://www.esri.com/software/arcgis/extensions/schematics/index.html">ArcGIS Schematics</a>. That post came at the end of a frustrating day and was more negative in tone than I typically prefer. Since that post, I have had periodic exchanges with Rick Anderson, product manager at <a href="http://www.esri.com">ESRI</a>.<!--more-->

Our exchanges culminated today with a <a href="http://office.microsoft.com/en-us/livemeeting/default.aspx?ofcresset=1">LiveMeeting</a> session where Rick showed me the changes that are in store for Schematics at 9.4. <em>Of course, he was showing me a pre-alpha version so anything could change or disappear before release.</em> The last few weeks, and today's session, have given me more of an appreciation for the product. 

Schematics at 9.4 will represent a substantial re-write in order to facilitate better integration with the ArcGIS core. Rick indicated that the driving force behind this was improvements in symbology and labeling and it succeeds in those areas.

The main reason it succeeds is that Schematics diagrams will now be managed as feature classes. Therefore, symbology and labeling is managed using the same tools that you use for any feature class. Beyond this, however, is the fact that most of the core tools will work with Schematics diagrams (selection tools, join tools ,etc.). This level of integration does much to a) increase the utility of Schematics and b) ease the learning curve for ArcGIS users.

The designer tool has been re-christened the "Schematics Data Set Editor" and has been re-written in C#. It has a much cleaner look and supports the new approach to diagrams. Many of the functions, such as diagram attributes, seem to be cleaner.

Within ArcMap, diagrams are now composite layers with each class (entity/link) as an individual feature class. This gives you the ability to reorder the layers as you see fit and fine-tune symbology and labeling. Once it is formatted correctly, you can save a layer file and import it into the dataset editor as a template. Additionally that layer file can be applied to other diagrams with the same set of classes and alternate templates can be easily applied as you would using a layer file for anythign else.

Editing will be safer with the introduction of private edit sessions that lock a diagram while you are editing. Rick also explained the API for integrating new algorithms. This has been in place for a few versions and offers a means to extend Schematics for business specific purposes. 

Most of the demo was centered on the standard builder, which works with diagrams generated from network feature classes. I have played with the custom query builder, which is the most laborious approach to take. There have been improvements in that area with the introduction of static diagrams that improve the persistence and performance of diagrams generated from the customer builder.

Based on this demo, I will try dig into the application of rules more as a means really tapping into the analysis capabilities of Schematics.

I do appreciate Rick taking the time to show what they've got in store for Schematics at 9.4. It was very educational for me. <em>Obviously, anything can change between now and release time </em>but what I saw today looks very encouraging.