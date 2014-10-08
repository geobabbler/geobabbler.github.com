---
layout: blog
title: SQL Server 2008 and 2005 Side-By-Side
post_author: bdollins
comments: true
categories:
- sql server
- sql server spatial
---

Installing the the SQL Server 2008 November CTP side-by-side with SQL Server 2005 is very straightforward. On the previous build of my machine, I had them both running just fine. After my system crash, I began setting things up again. Because I had been working with 2008 before the crash, I installed that first and then got around to 2005 later.

It should have been obvious to me before I did that but installing them in that order seems to break a lot of stuff in 2008. Kinda makes sense. I was a little flustered at having to rebuild in the first place and perhaps rushing things a bit but here it is for the record: If you are installing both of them on a new box, put on 2005 first.

Generally the database engine worked well. Most of the issues I had came up in the management studio. After installing 2005, many of the dialogs and property pages in the Katmai management studio would no longer display. Attempting to invoke them usually resulted in a "class not registered" exception.

In order to fix that, I had to remove and then re-install 2008. Before doing that, I detached my databases and then re-attached them after I was done. Everything works fine now.

This probably says more about me than it does SQL Server ;) but I thought I'd share.