---
layout: post
title: "File Geodatabase Schema Compare Tool"
date: 2014-01-08 20:32
comments: true
categories: 
- GIS
- PIM
- Zekiah
- ESRI
- FGDB
- data
- schema
---
In my work supporting various aspects of geospatial data modeling, I've spent a lot of time delving into concepts around configuration management of such data models. We've been able to apply a core tool set to perform various functions such as version managment, profiling, version-to-version migration, and validation in conjunction with a system we call the platform independent model (PIM). I gave quick overview of the PIM [in this post over on the Zekiah blog](http://www.zekiah.com/index.php?q=blog/2014/01/02/generating-physical-schemas-pim) and the complete series on it [can be found here](http://www.zekiah.com/index.php?q=blog/topics/pim).

I've recently spent a bit of time consolidating code after a recent data delivery and decided to post a utility that was an outgrowth of that effort: [a tool to compare schemas of two Esri file geodatabases and report differences](https://github.com/Zekiah/ArcGISCompare). This lent itself to general use because it does not require any connection to a PIM.

-><img src="https://github.com/Zekiah/ArcGISCompare/raw/master/screenshot.png" /><-

<!--more-->

The PIM deals mainly at the logical level with data models, but a full configuration management workflow must occasionally touch physical data sets. One use case we had to support, for which this tool was built, was the case where users in the field must compare separate data sets for eventual integration. Although these workflows start with a template data set, it is not unusal for changes to be made during collection, resulting in very similar but not identical schemas. This tool helps users identify such differences in order to make configuration management decisions based upon the actual state of the collected data.

The tool is fairly straightforward: choose a template data set, choose an implementation data set, run the compare, and examine the results. It contains ArcObjects dependencies although we may migrate it to the file geodatabase API in order to eliminate those. 

We are also in the process of building a similar tool to work with SQLite/SpatiaLite data sets, which is the other format we commonly see used and will post that tool when it is complete. In the meantime, I hope you find this application useful.

An installer (10.1) [can be found here](https://dl.dropboxusercontent.com/u/6749645/PIM/setup_ArcGISCompare.zip).