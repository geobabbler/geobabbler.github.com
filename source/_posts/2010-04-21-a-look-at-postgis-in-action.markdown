---
layout: blog
title: A Look at "PostGIS In Action"
post_author: bdollins
comments: true
categories:
- books
- gdal/ogr
- gis
- postgis
- postgresql
- ziggis
---

Over the past few weeks, I have been reading a copy of the upcoming book by Regina Obe and Leo Hsu titled "<a href="http://manning.com/obe/">PostGIS In Action</a>." Through my work with <a href="http://pub.obtusesoft.com">zigGIS</a> and some of my consulting work with <a href="http://www.zekiah.com">Zekiah</a>, I have been using <a href="http://postgis.refractions.net/">PostGIS</a> with good results for some time now. I have found that it matches or exceeds the capabilities of its commercial counterparts and I can be quite productive with it.

<img alt="" src="http://www.manning.com/obe/obe_cover150.jpg" />

Regina has been a frequent contributor to zigGIS discussions over the years and her expertise with PostGIS has definitely helped <a href="http://dpulp.com/">Abe</a>, <a href="http://www.paolocorti.net/">Paolo</a> and I as we have worked on it. Also, many tips from the <a href="http://www.bostongis.com/">Boston GIS blog/site</a> have been very helpful so I have been looking forward to this book for some time.<!--more-->

I must confess to being something of a "book guy." I like having a book on my lap as I work through a problem (using my multiple monitors for actual implementation). "PostGIS in Action" puts most of what I need between one set of covers.

This book addresses a problem I have run into repeatedly in my consulting work: educating database professionals (DBAs, developers, etc.) on working with spatial data in a manner that they are familiar with. The authors are extremely knowledgeable about database technologies of all kinds and it comes through here. 

Since PostGIS extends <a href="http://www.postgresql.org/">PostgreSQL</a>, it is impossible to separate the two when discussing good data design and implementation. The "Data Modeling" chapter provides a good discussion of various considerations when working with spatial data (use of complex geometries vs. points, homogeneous vs. heterogeneous geometry columns, etc.) but it also provides one of the best discussions of PostgreSQL table inheritance and partitioning that I have found in one place. Each topic, as throughout the book, is backed up by SQL examples and succinct discussion of the pros and cons of each approach.

The design consideration regarding storing geometry as points versus storing lines or polygons may seem basic to a GIS professional but is a discussion I have had repeatedly throughout my career with database designers who are new to spatial data. Many times, their initial instinct is to store X and Y values in separate columns in a table. This may be a perfectly valid approach for a given data set and how it is to be used but many design considerations come into play. "PostGIS In Action" does a good job of encapsulating those considerations in a manner that is consistent with how most database professionals approach database design.

Another concept that typically confounds database professionals on their first exposure to spatial data is the spatial reference system. "PostGIS In Action" has a chapter dedicated to spatial reference systems. It discusses various common spatial references and their pros and cons as well as the components of a spatial reference (ellipsoid, datum, projection, etc.). This is a complex topic and the purpose of this book is not to "teach GIS" but it is a crucial topic when working with spatial data. The chapter gives a good overview of the concepts and considerations surrounding spatial references. If you are starting to work with spatial data, you will leave the chapter with an understanding of their importance and the fact that you should probably dig into them further.

"PostGIS In Action" continues on to discuss using PostGIS to perform spatial analysis. As always, real SQL samples are used so that a database professional will become comfortable with the use of spatial joins, spatial indexing, the many spatial functions built into PostGIS and many other concepts and techniques. Throughout the book, the authors return to a few examples (the fictional "Hello Town", San Francisco, Washington, DC) so that each topic is discussed within a problem set with which we become familiar. Additionally, tools such as <a href="http://www.gdal.org/ogr/">OGR</a> and <a href="http://www.qgis.org/">QGIS/SPIT</a> are also discussed (with examples).

I could go on but I will summarize what I like about "PostGIS In Action": it provides a solid foundation for an experienced database professional who needs to begin working with spatial data using PostGIS and PostgreSQL. 

Throughout this post, I have used the term "database professional" to describe who I think will benefit from this book. It is not for beginners or the faint of heart. You should be very comfortable with your knowledge of relational databases, SQL and (optionally) PostgreSQL before diving into the book. "PostGIS in Action" does not teach RDBMS basics, nor should it.

From the solid foundation it provides, the book delves into advanced topics and techniques that will enable the reader to become productive with PostGIS. A programmer can also benefit from the practical SQL examples in the book to write better applications (regardless of language) on top of of PostGIS/PostgreSQL. I also think database professionals working on other platforms (such as Oracle/Oracle Spatial) could benefit from the better understanding of the unique characteristics of spatial data that can be achieved with this book. They will also begin to see how well PostgreSQL stacks up against commercial RDBMS platforms in terms of capability. 

The subject of spatial data, as well as its implementation in PostGIS, is too big for one book to attempt to handle in a "one-stop shop" manner. "PostGIS In Action" wisely avoids trying to do this. It is a good starting point to begin building expertise if you are new to spatial data and, if you are experienced with it, you will probably learn a few things you didn't know. I recommend checking out "PostGIS In Action" if you are or will be working with PostGIS or spatial data.