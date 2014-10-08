---
layout: blog
title: Inserting SQL 2008 Geometry With a SqlCommand
post_author: bdollins
comments: true
categories:
- c#
- gis
- sharpmap
- sql server spatial
---

<strong>Update (7/1/2011):</strong> I wrote this post early in the SQL 2008 CTP. I no longer use the method described here. If you found this post via StackOverflow or some other Q&amp;A site, I highly recommend this post by Vish as a more efficient way of doing things: <a href="http://viswaug.wordpress.com/2008/09/29/inserting-spatial-data-in-sql-server-2008/">http://viswaug.wordpress.com/2008/09/29/inserting-spatial-data-in-sql-server-2008/</a>

I'm in the process of using <a href="http://codeplex.com/SharpMap">SharpMap</a> to write a utility to load spatial data into my <a href="http://www.microsoft.com/sql/2008/technologies/spatial.mspx">SQL Server 2008</a> instance. A couple of the SharpMap data providers have a static method to load data from a shapefile (really any other SharpMap data provider, but I digress). The method creates a table and uses an ADO.Net command object (<a href="http://msdn2.microsoft.com/en-us/library/system.data.sqlclient.sqlcommand.aspx">SqlCommand</a> in this case) load individual records into the table. I started using the existing <a href="http://www.codeplex.com/SharpMap/SourceControl/FileView.aspx?itemId=30508&amp;changeSetId=28971">MsSql provider</a> as a template, which load the geometry's WKB into an image column.

The problem with SQL 2008 comes in when you add a parameter to the command. You must specify the data type of the parameter by passing it a <a href="http://msdn2.microsoft.com/en-us/library/system.data.sqldbtype.aspx">SqlDbType</a> enumeration. Currently, there is no enumeration that corresponds to geometry (or geography for that matter). My first attempt was to leave the parameter defined as the type SqlDbType.VarBinary and set the value as such:

{% codeblock lang:csharp %}
//define parameter
command.Parameters.Add("@shape", SqlDbType.VarBinary);
//
//code in between omitted
//
//set value of parameter
command.Parameters["@shape"].Value = feature.Geometry.AsBinary();
{% endcodeblock %}

In this case, feature.Geometry is of type SharpMap.Geometries.Geometry and AsBinary returns the <a href="http://dev.mysql.com/doc/refman/5.0/en/gis-wkb-format.html">WKB</a> representation of the shape. This code failed when attempting to execute the command, throwing an exception indicating that the table column (type geometry) was not a valid binary data type.

So I next tried defining the data type of the parameter as SqlDbType.Udt (user-defined type) and setting the UdtTypeName property to "geometry". This failed also.

On a whim (I wish I could say it was something more scientific than a desire to leave no stone unturned), I then tried working with text and set it up this way:

{% codeblock lang:csharp %}
//define parameter
command.Parameters.Add("@shape", SqlDbType.NVarChar);
//
//code in between omitted
//
//set value of parameter
command.Parameters["@shape"].Value = feature.Geometry.AsText();
{% endcodeblock %}

In this case, AsText returns the <a href="http://en.wikipedia.org/wiki/Well-known_text">WKT</a> representation of the shape. This worked! I have not dug into the details of why it worked but it seems the underlying spatial objects in SQL 2008 have some built-in default behaviours that coerce WKT. I am now loading data via a WinForms app with the aid of SharpMap. So, if you're trying to update geometry from within your code, the above example is what worked for me.

I'll probably post the code to the data loader a little bit later after I incorporate SRID and geometry type constraints and the like.