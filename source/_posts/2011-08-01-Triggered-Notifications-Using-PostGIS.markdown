---
layout: blog
title: Triggered Notifications Using PostGIS
post_author: bdollins
comments: true
categories:
- database
- messaging
- OpenGeo
- postgis
- postgresql
- Python
- SMS
- SQL
---

My project work the last few months has kept me away from a lot of my favorite open-source tools and I was starting to get hives. Specifically, it had been a while since I had worked with <a href="http://www.postgresql.org">PostgreSQL</a> and <a href="http://postgis.refractions.net">PostGIS</a> and I was missing the experience, so I dreamed up something to do.

<img alt="" class="aligncenter size-full wp-image-1898" height="307" src="http://geobabble.files.wordpress.com/2011/08/elephant.png" title="Elephant" width="461" />

I do a lot of work implementing situational awareness systems for my customers and one common requirement is automated notification of events. I decided that I wanted to roll a completely FOSS approach to sending an SMS notification based upon the results of a spatial query. This post will discuss the basic wiring to make it all work. I'll probably add more advanced features in subsequent posts but I'll be sticking to the basics for now.
<!--more-->


I decided to keep my first pass relatively simple in order to work out the core logic and workflow. To get started, I really only needed a few things:

<ol>
	<li>PostgreSQL with PostGIS installed. I simply used the <a href="http://www.opengeo.org">OpenGeo</a> Community Edition.</li>
	<li><a href="http://developer.postgresql.org/pgdocs/postgres/plpython.html">plpython</a> - support for writing PostgreSQL functions in <a href="http://www.python.org">Python</a></li>
	<li>Python - I used version 2.7 for this</li>
	<li>Some spatial data - I loaded a data set of the US counties to test with</li>
</ol>

Using these tools, I set out to create a core workflow that would use a trigger function attached to a point data set to test, whenever a record was inserted or updated, whether the point geometry fell within a specific US county (St. Mary's County, Maryland in this case). If so, the system would send an SMS message to me. In order to do this, I had to create the following:

<ol>
	<li>An empty table with a PostGIS geometry column to store the incoming points</li>
	<li>A trigger function to perform the spatial query on insert or update</li>
	<li>A trigger to fire the trigger function</li>
	<li>A function to send the SMS message</li>
	<li>Some test SQL to insert records into the point table</li>
</ol>

The first step was loading my county data, which I had in shapefile format. For that, I simply used <a href="http://www.qgis.org/">QGIS</a> and its SPIT plug-in. After that, I created the table that would hold my point data. Right now, it's just a point and an ID. The SQL is very simple:

{% codeblock lang:postgres %}
CREATE TABLE locations (gid SERIAL PRIMARY KEY);
SELECT AddGeometryColumn ('public','locations','shape',4326,'POINT',2);
{% endcodeblock %}

This table is the one that does all the work. The initial trigger will be attached to it. The counties data set really just sits there waiting to be queried. I'll actually take the next three functions in the reverse of the order in which they will execute.

The first function I wrote was the one that sends off the actual SMS message. That is its sole job in this process. After looking at different ways to accomplish the SMS, my old <a href="http://www.obtusesoft.com/">zigGIS</a> partner, <a href="http://twitter.com/xanadont">Abe</a> <a href="http://www.linkedin.com/in/agillesp">Gillespie</a>, clued me in to using each provider's e-mail gateway. So, by sending a properly formatted e-mail, the end user will receive an SMS message. You can learn more about it <a href="http://www.emailtextmessages.com/">here</a>. (Thanks, Abe!) So, my task really just became sending an e-mail message, which is nice because I want support that as well so now I can reuse code. After looking at various means to send e-mail from within PostgreSQL, I decided that Python was the most direct way to accomplish it.

PostgreSQL supports using Python for functions in a manner similar to the way SQL Server supports embedded procedures written against the <a href="http://en.wikipedia.org/wiki/Common_Language_Runtime">Common Language Runtime</a>. You simply need to make sure plpython support is installed with your instance of PostgreSQL. Here is the code for the simplified messaging function:

{% codeblock lang:postgres %}
CREATE OR REPLACE FUNCTION emailme(txt text)
  RETURNS integer AS
$BODY$
#python starts here
# Import smtplib for the actual sending function
import sys
import smtplib
import email
import re

# Import the email modules we'll need
from email.mime.text import MIMEText
from threading import Thread

def mailfunction(recip,msgtxt,*args):   
    msg = MIMEText(msgtxt)

    # me == the sender's email address
    # you == the recipient's email address
    msg['Subject'] = 'Message from PostgreSQL'
    msg['From'] = 'contact@zekiah.com'
    #msg['To'] = 'not used here'

    # Send the message via our own SMTP server, but don't include the
    # envelope header.
    s = smtplib.SMTP('localhost')
    s.sendmail('contact@zekiah.com', [recip], msg.as_string())
    s.quit()

t = Thread(target=mailfunction,args=('1234567890@vtext.com', txt))
t.run()
return 0
$BODY$
  LANGUAGE plpythonu VOLATILE
  COST 100;
ALTER FUNCTION emailme(text) OWNER TO postgres;
{% endcodeblock %}

As can be seen, the Python code is embedded in the body of the function. Early on, I was experiencing significant slowness when sending the messages. After some code refactoring, I realized it was the SMTP handshake that was causing the problem. The original version used an external server that required authentication. I installed a local open-source SMTP server and configured it to allow unauthenticated relay from the local server and the bottleneck went away.

This version of the code receives the message body as a parameter and sends to a hard-coded address. I plan to change this to accept the recipient address as well. Then the calling function can pass in an array of recipients who have subscribed to these messages. For now, the system just talks to me.

Next, I built the trigger function. This is a little different from other platforms I've worked on. In SQL Server, a trigger is basically a stored procedure that gets called when a table event happens. When authoring, you simply build the one procedure. In PostgreSQL, you have two distinct objects: a trigger and a trigger function. The trigger function does the heavy lifting and the trigger is what calls it. In my case, the trigger function is what performs the actual spatial query to determine if the new point geometry falls within my county. The code for that function is here:

{% codeblock lang:postgres %}
CREATE OR REPLACE Function checkcounty() RETURNS TRIGGER AS

$BODY$
DECLARE

shp geometry;
a_row counties%ROWTYPE;

BEGIN
shp = new.shape;

SELECT * FROM counties WHERE ST_Contains(counties.shape, shp) INTO a_row;

IF a_row IS NOT NULL THEN
	IF a_row."COUNTY" = 'Saint Marys County' THEN
		PERFORM emailme('New feature in St. Mary`s County');
	END IF;
END IF;
RETURN new;

END;
$BODY$
LANGUAGE 'plpgsql' VOLATILE;
{% endcodeblock %}

Again, I'm just checking for one, hard-coded value. In my next iteration, I plan to make that configurable so that the trigger function will test for various user-specified conditions. Of course, the type of spatial relationship can also be configured.

Lastly, the trigger itself. As can be seen, it's primary job is to call the trigger function when appropriate.

{% codeblock lang:postgres %}
CREATE TRIGGER locations_change
  AFTER INSERT OR UPDATE
  ON locations
  FOR EACH ROW
  EXECUTE PROCEDURE checkcounty();
{% endcodeblock %}

Once these were all in place, I used the following to test:

{% codeblock lang:postgres %}
--TRUE
insert into locations
(shape)
VALUES
(ST_PointFromText('POINT(-76.662 38.348)', 4326));

--FALSE
--insert into locations
--(shape)
--VALUES
--(ST_PointFromText('POINT(-76.622 37.895)', 4326));

--NULL
--insert into locations
--(shape)
--VALUES
--(ST_PointFromText('POINT(-74.482 37.734)', 4326));
{% endcodeblock %}

These objects represent the basic skeleton of the notification capability I am building. In the future, I also want to support various types of messaging in addition to SMS and e-mail. I'm thinking of Twitter, publishing to RSS or Atom and other such options.

Even at this early stage, I've got to consider performance. The spatial query in the trigger is performing amazingly fast but my data is still small. I've got spatial indices built on the data sets but I'll need to keep an eye on that as this grows. Thankfully, <a href="http://www.manning.com/obe/">'PostGIS In Action'</a> offers lots of tips in that regard. Another design consideration I've made is that all of my spatial data sets will be stored in the same spatial reference. PostGIS has nice coordinate transformation capabilities but I don't want to introduce that into my trigger functions in case data starts to grow. I plan to pre-process buffers and such for the same reasons.

I'm pretty happy with this so far primarily because all of the logic is executing at the database level. There's really no need to extract any of this logic out into a middle-tier library of any kind and it's running without any dependence on any middleware. It's also a nice use of spatial processing that doesn't involve a map. I love maps but they aren't necessary in every application of spatial technology. I'm also excited to have a meaty requirement to dig into to help with my Python explorations. I've missed working with these tools. It's good to be back.