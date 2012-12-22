---
layout: blog
title: SharpMap and WPF
post_author: bdollins
comments: true
categories:
- gis
- mapobjects
- sharpmap
- wpf
---

A few weeks ago, I blogged about the <a href="http://geobabble.wordpress.com/2007/07/09/mo-no-mo/">end of the line for MapObjects</a>. I waxed nostalgic about how fun it was to develop with MO and how, although I haven't used it in a while, I'll still be sad to see it go.

Well, I'm glad I'm over that! I been working with <a href="http://www.codeplex.com/SharpMap">SharpMap</a> for the last few weeks and I'm feeling that old MO vibe again. It started a few weeks ago with developing a data provider for SQLite (<a href="http://geobabble.wordpress.com/2007/07/31/extending-sharpmap-with-sqlite/">read here</a>) but I've continued to look under the hood.

Lately, I've been working a project where we need to feed some spatial data into native <a href="http://msdn2.microsoft.com/en-us/netframework/aa663326.aspx">WPF</a> display. WPF offers high performance and great graphics quality. In addition, there are numerous other types of data involved that also need to be displayed. We didn't want dedicated display components for each type of data so we decided to bring the spatial data into WPF.
<!--more-->
I started looking at SharpMap because it gives us quite a few data options, has a robust geometry model and also includes a decent set of spatial operations. In addition, it's open source and free. The open source nature of SharpMap was a huge plus and I'm having fun doing things that I always wanted to do in MO. One thing is extend it support a new data source (ala SQLite). Another thing is to redirect layer rendering elsewhere.

SharpMap includes ASP.NET 2.0 and Winforms 2.0 controls. It features rendering objects that are distinct from the UI on which they are rendering. It's a model that allows for great flexibility.

In my current project, I am collaborating with a group outstanding developers working different pieces who already had a strong application framework in place. There already existed rendering and display components so I just had to extend those to understand geometry objects coming out of SharpMap. Being open source, it was really easy to dig under the hood to see what the objects were doing so I could integrate better.

So I read from the database, create the geometry objects and then feed them into a renderer that transforms them to screen space and converts them to WPF geometries for rendering. Pretty straightforward and, at a high level, exactly what you would do in COM and WinForms but still kinda neat given that I don't need an AxMapControl or some such other thing to pull off a free-standing app.

This is where I would normally post some code but I just got it working and my code is a) still ugly and b) still intertwined with a lot of other people's code. Once I get it cleaned up some, I can post some samples. But here's a little map...

<img alt="WPF Canvas" src="http://geobabble.files.wordpress.com/2007/08/wpf_sharpmap.png" />

This depicts one layer loaded into a WPF canvas control. It's still a little skewed and need some other work but I was excited to see it on the screen. It's been a while since I've had to deal with the nitty gritty of device rendering. <a href="http://www.esri.com">ESRI</a> always handled that for me :D

It's been quite fun coming up to speed on two APIs with which I'm not terribly familiar (SharpMap and WPF). Again, the SharpMap source code was a lifesaver. It didn't have anything to help with WPF <em>per se</em> but it was great reference as I was trying figure out behaviors. If you browse the <a href="http://sharpmapv2.googlecode.com/svn/trunk/">SVN trunk for SharpMap 2.0</a>, you'll see that they're planning to handle WPF but there's no code there yet. I can't wait see what they com up with. Anyway, here's one for the SharpMap team...

<img alt="The beer you?ve been practicing for." src="http://geobabble.files.wordpress.com/2007/08/guinness.jpg" />