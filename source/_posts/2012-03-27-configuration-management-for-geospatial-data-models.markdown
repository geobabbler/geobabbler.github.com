---
layout: blog
title: Configuration Management for Geospatial Data Models
post_author: bdollins
comments: true
categories:
- configuraton management
- data models
- database
- geodatabase
- gis
- Oracle Spatial
- PIM
- PostGIS
- SpatiaLite
---

I wanted to take a opportunity to do something I don't often do, and draw attention to a series of posts that's going on over on <a href="http://www.zekiah.com/index.php?q=blog">my company's blog</a>. About a year ago, my company, <a href="http://www.zekiah.com">Zekiah Technologies</a> joined forces with Upper 90 Systems. Upper 90 was probably best known for their work building tools that supported the Spatial Data Standard for Facilities, Infrastructure, and Environment (SDSFIE), which is a data model that is used by the US DOD to standardize the representation of GIS data for the purpose of performing facilities management on military installations.

<a href="http://www.acq.osd.mil/ie/bei/disdi/factsheet_sdsfie.pdf" target="_blank">SDSFIE</a> (PDF) has existed for some time, with several versions of the standard being rolled out to its diverse user community. Through that process, we've learned a thing or two about configuration management of widely-implemented geospatial data models. This understanding has been turned into a series of tools designed to help with the issues surround lifecycle management of a data model (as opposed to physical databases themselves). <!--more-->

The approach and tools are loosely referred to as the "platform-independent model", or PIM. We call it that because the model defines the rules that govern how to create and manage a geospatial database in compliance with a given data standard, but the model is not the database itself. As a result, we can support physical implementations on any number of platforms (Esri, PostGIS, Oracle Spatial, SpatiaLite, Bentley, Autodesk, etc.). The tools give users the ability to perform version management, schema generation, compliance checking, profiling, development of migration paths between versions and many other functions.

Barry Schimpf, the former president of Upper 90 Systems and now my colleague at Zekiah, has been working on a series of posts describing this approach and, eventually, the tools. Three posts have gone up with others on the way:

<a href="http://www.zekiah.com/index.php?q=blog/2012/01/13/expanding-usefulness-geospatial-data-standards" target="_blank">Expanding Usefulness of Geospatial Data Standards</a>
<a href="http://www.zekiah.com/index.php?q=blog/2012/03/19/applying-flexible-yet-standard-geospatial-conventions" target="_blank">Applying Flexible, Yet Standard, Geospatial Conventions</a>
<a href="http://www.zekiah.com/index.php?q=blog/2012/03/24/understanding-geospatial-data-rules-platform-independent-model-pim" target="_blank">Understanding Geospatial Data Rules in the Platform Independent Model (PIM)</a>

The approach Barry discusses has already been leveraged to support Federal data models beyond SDSFIE so we know it is transferable. We think it could have benefits for at the state, local, or regional levels as well. I encourage you to check out the posts and keep an eye out for more as they emerge.