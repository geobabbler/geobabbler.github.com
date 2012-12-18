---
layout: blog
title: SQL Server SIG at the UC
post_author: bdollins
categories:
- arcsde
- esri
- gis
- sql server
- sql server spatial
---

My blogging has been slower this time around because I've been doing a lot of booth duty. This is my thrid conference this year and some of our other staff are getting to go to the sessions. I did, however, go to the SQL Server SIG a little while ago.

Ed Katibah had a few tricks up his sleeve. First off, he dropped the news that, as of 11:00am, SQL Server 2008 is now in RTM. Very soon, the final version will be in our hands. That's great news to everyone who has been working with the CTPs and RCs.

Ed had few other nuggets. He described the stress-testing that SQL 2008 has undergone. In short, there has been about 375,000 hours of stress testing run against SQL 2008 so we should be able to expect it to be solid. Additionally, Microsoft has already been running on SQL 2008 for "a few months." To me, this is all great news that makes me feel even more confident about the product (which already had my confidence). When I first installed the November CTP, I felt that much of the platform was already production-ready but more testing and use can't have hurt.

Ed went on to describe the two spatial types and reationale for doing that. That discussion is well documented and I fall in the "it's a good thing category" mainly because of previous work with applications that had over-the-horizon requirements.

Ed gave props to Paul Ramsey during his talk when explaining the XY switching debate. It was great to see that kind of respect on display.

Some nuts and bolts: SQL 2008 limits spatial objects to about 250 million vertices. This greatly exceeds Ed's largest test case, which is a high-res vector data set of the world's oceans. Polygons are limited to about 65,000 holes. I think those limits leave a lot of wiggle room. He also discussed the significance of coordinate ordering for the geography data type. Basically, it's counter-clockwise for outer rings and clockwise for inner rings. This is consistent with implementations in Informix, DB2 and Oracle (those are what he mentioned). He did mention that this was an industry consensus but there was no official specification on this matter. Ed also mentioned it may be a topic of future discussion for OGC.

Ed also demonstrated the spatial results window in the SQL management Studio. This is a really nice tool that lets you visualize the results of your spatial SQL inside the management studio. As a developer, that will be a huge help because I won't have to do a test run to see if I got the query right. Ed just saved me a bunch of time!

Ed went on to announce a companion CodePlex site for SQL Server 2008 spatial tools: <a href="http://www.codeplex.com/sqlspatialtools">www.codeplex.com/SqlSpatialTools</a>. There are already some tools that Isaac has posted but Ed said that other tools will include shapefile and KML converters. The site will also be open to contribs from the community. All of the tools currently there were developed using the <a href="http://blogs.msdn.com/isaac/archive/2008/05/30/our-upcoming-builder-api.aspx">Builder API</a> and full source code is available so they serve has great examples of working with the Builder API.

All in all, it was a great talk. Ed's one of the nicest guys ever and he is having a lot of fun with ArcSDE on SQL Server 2008.