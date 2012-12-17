---
layout: blog
title: DDJ Article on MyMap Javascript API
post_author: bdollins
categories:
- articles
- ddj
- gis
- mymap
- open source
- web development
---

An <a href="http://www.ddj.com/dept/webservices/197003355">article</a> in the latest Dr. Dobb's caught my eye. It's about MyMap; a javascript api that standardizes the calls between Google Maps, Yahoo Maps and Virtual Earth. I'm always drawn when mapping tools get press outside of the GIS world. MyMap is predicated on the idea that each mapping engine provides similar capabilities. There is a different .js file for each but the function calls are the same. Therefore, it makes it relatively easy to provide similar capabilities for your web app regardless of the back-end engine.

I installed the <a href="ftp://66.77.27.238/sourcecode/ddj/2007/0703.zip">sample</a> from the DDJ resource center and it's pretty straightforward. You may need to comment out the call to Google Maps because the API key won't work for you. If you have your own, you can use that. Either way, the Yahoo and VE calls work fine and give good idea of how MyMap works. I'd recommend checking it out.