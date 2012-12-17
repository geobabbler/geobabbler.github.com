---
layout: blog
title: SharpMap on Apache
post_author: bdollins
categories:
- .net
- apache
- gis
- open source
- sharpmap
- where did that come from?
---

In the words of Pete Townshend (as sung by Roger Daltrey):

"Why should I care? Why should I care?"

I can't answer that one for you. I ran into <a href="http://weblogs.asp.net/israelio/archive/2005/09/11/424852.aspx">this post</a> while searching out something else. It shows how to get <a href="http://asp.net/">ASP.NET</a> running under <a href="http://httpd.apache.org/">Apache</a> on Windows. Curiosity got the better of me and I had to try it. One important note is that mod_aspdotnet is no longer maintained by the Apache Software Foundation. It's now available as a <a href="http://sourceforge.net/projects/mod-aspdotnet">separate project on SourceForge</a>. If you download the latest version, it works with Apache 2.2.6.

Although both Apache and mod_aspdotnet have had subsequent releases since this has been posted, the instructions still work. It was about 10 minutes to get the sample project running and not much longer to get <a href="http://www.codeplex.com/SharpMap">SharpMap's </a>"DemoWebSite" project working. Here's a screen capture (there nothing that makes it obvious it's running on Apache so You'll just have to trust me). 

<a href="http://geobabble.files.wordpress.com/2008/01/sharpmap_apache.png" title="Can you see the real me? Can ya?"><img alt="Can you see the real me? Can ya?" src="http://geobabble.files.wordpress.com/2008/01/sharpmap_apache.thumbnail.png" /></a>

This could be somewhat useful if you're using a non-Server version of Windows and want to avoid the connection limitations of IIS. Beyond that, it's probably just interesting.