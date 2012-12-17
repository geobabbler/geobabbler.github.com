---
layout: blog
title: A One-Touch (Almost) Data Loader With FWTools and PostGIS
post_author: bdollins
categories:
- fwtools
- gdal/ogr
- gis
- open source
- postgis
- postgresql
---

So my <a href="http://postgis.refractions.net/">PostGIS</a>/<a href="http://www.codeplex.com/SharpMap">SharpMap</a>/<a href="http://en.wikipedia.org/wiki/Windows_Presentation_Foundation">WPF </a>project is ready to go out the door. Literally. The servers are being loaded onto pallets and shipped to their respective destinations. Great! Time for a cold one! Well......maybe not. There's one little problem: there's no data on the servers yet.

We had to coordinate with a large national government agency to get the data we needed. That part of the process experienced a little "slippage". As a result, the last part of the task changed from loading data onto the servers to developing a data loading tool that could be run from a DVD with minimal involvement from humans. (Those pesky humans.) Just another Monday.<!--more-->

So my as-yet-to-be-developed tool had to load vector spatial data into PostGIS. That data had yet to arrive but could be in any of a number of formats. And it had to run from a DVD. Sounded like a job for <a href="http://fwtools.maptools.org/">FWTools</a>. Luckily, I remembered a <a href="http://www.spatiallyadjusted.com/2007/08/01/fwtools-on-usb-memory-stick/">post</a> or <a href="http://www.spatiallyadjusted.com/2007/12/28/using-ogr-to-visualize-data/">two</a> from James as well as the fine work done by <a href="http://www.archaeogeek.com/blog/portable-gis/">Jo Cook</a>. I figured if it could run from a USB stick, then why not a DVD?

After a little investigation, I realized I was going to need <a href="http://www.postgresql.org/">PostgreSQL</a>/PostGIS on the DVD as well as FWTools. The servers I was loading onto had a very specific configuration: a system drive, an apps drive, and a data drive. I had to ensure my data was loaded onto the data drive so I had to create a tablespace on the data drive and create my database there. A little research told me that the driver used by OGR does not support database (or tablespace) creation. Expecting the users to do that via the command line or using PgAdmin was not an option so I had to include this in my process.

So I loaded FWTools onto my disk (I did my initial testing on a USB drive) and used <a href="http://trac.osgeo.org/gdal/wiki/FWToolsOnUSB">setfw_portable.cmd</a> to set it up to run from the disk. Next, I copied the binaries of PostgreSQL/PostGIS onto the disk. I ran a couple of simple command line tests to verify that everything was working properly.

First, I developed a simple SQL script to perform the creation of the tablespace and database. Next, I wrote a Windows command line script to drive the process. The process was rather straightforward:

1. Delete existing directory tree on the data drive (just in case)
2. Create the directory tree on the data drive to hold the PostgreSQL tablespace
3. Set the necessary file system permissions
4. Use psql to execute the SQL script to
    a. Drop any existing tablespace and database
    b. Create a new tablespace on the data drive
    c. Create a new database using the PostGIS template database
5. Call the setfw_portable.cmd script to set up the FWTools environment
6. Make successive ogr2ogr calls to load data into PostGIS

So, thanks to these open-source tools, I've been able to develop a data loader that runs from a DVD without needing to install anything on the target server. Also, there are no licensing issues. It's a little heavy in that the FWTools and PostgreSQL binaries use about 200MB so, if I were using a CD, I'd be giving up a lot of space. I have not had time to see how much I could really pare down the binaries to just the essentials. In addition, my script is not terribly generic. I pretty much know what data I'm loading and where it's located. In the future, I hope to tweak the script so it just loads whatever is there but time constraints dictated otherwise this time around. Oh yeah, and it's command-line :D so it gave me a little of that ARC/INFO nostalgia.