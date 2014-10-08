---
layout: blog
title: Announcing WeoGeo Tools for ArcGIS
post_author: bdollins
comments: true
categories:
- arcgis desktop
- gis
- WeoGeo
- Zekiah
---

I generally try to keep my blog separate from my daily work life in that I usually don't directly blog about the projects on which I am working. I'm going to deviate from that today to make a couple of announcements. 

It's been a while now, but you may recall that, about a year ago, <a href="http://www.weogeo.com">WeoGeo</a> <a href="http://blog.weogeo.com/2010/02/16/introducing-weogeo-tools-for-arcgis/">announced the availability</a> of WeoGeo Tools for ArcGIS. It was an <a href="http://www.esri.com/products/index.html#desktop_gis">ArcGIS Desktop</a> extension that integrated the ability browse data sets on WeoGeo Market or hosted libraries as well as providing the ability to upload your data directly from ArcMap.

My first bit of news is that my company, <a href="http://www.zekiah.com">Zekiah Technologies</a>, produced that extension for WeoGeo. We did not announce it at the time because the original plan was for WeoGeo to support it after it was released. That arrangement has continued to the present.  <!--more-->

Shortly before the <a href="http://www.esri.com">Esri</a> International User Conference last year, I delivered a preliminary build of an updated version with a better user interface. This was shown in the WeoGeo booth but never officially released, primarily because WeoGeo had a few major changes to their systems and APIs in the offing which would have had a large impact on the extension's code. So we decided to hold off on implementing a new version until after those changes were complete. That leads me to my second announcement.

Zekiah is happy to announce the availability of the first beta release of the new version of WeoGeo Tools for ArcGIS. This release improves an existing capability (browsing Market and libraries), adds a new one (the ability customize and create a data order) and temporarily removes a previous capability (uploading data). But don't worry, uploading will be back very soon! WeoGeo introduced a new set of APIs to support uploading (the previous version used their command-line tool behind the scenes) and also implemented a new tiling scheme for preview images so the upload capability requires a complete re-write but will be better. (We also intend to leverage new the ability of <a href="http://www.arc2earth.com">Arc2Earth</a> to generate WeoGeo tile packs so you may want to check that out.)

<div style="text-align:center;"><a href="http://geobabble.files.wordpress.com/2011/02/weotools10.png"><img alt="" height="314" src="http://geobabble.files.wordpress.com/2011/02/weotools10.png" title="Browsing WeoGeo Market in ArcGIS Desktop 10" width="590" /></a><div style="text-align:center;font-size: 14px;">Browsing WeoGeo Market in ArcGIS Desktop 10<br/><br/></div></div>

This release is an open beta. There are versions for ArcGIS Desktop 9.3 and 10.0 which currently have the same capabilities; but this will change. You can find information about WeoGeo Tools for ArcGIS (and download it) here: <a href="http://www.zekiah.com/index.php?q=weogeo">http://www.zekiah.com/index.php?q=weogeo</a>. From there, you can download the extension and also view the development roadmap. The user manual is draft and will be fleshed out with more detail with each release. When you view the roadmap, you will see that the capabilities between 9.3 and 10.0 will quickly diverge. We plan to integrate the new upload capability with 10.0 but limit 9.3 to browse and download. The final release (scheduled for mid-June) will be the only one that supports 9.3. From that point forward, we will focus solely on 10.0 and beyond. Please feel free to download the version for your platform. We have also established a <a href="http://zekiah.uservoice.com">feedback site</a> for comments.

One of the best parts is that we plan to keep WeoGeo Tools for ArcGIS free-of-charge. Of course there are fees associated with ordering data from WeoGeo Market or from having a library subscription but users will be able to install and use the extension throughout their organization without needing to purchase a license.

We are excited about this release for a number of reasons. First, this is the first product that will have a Zekiah "nameplate" so it breaks new ground for us. Second, it strengthens our relationship with WeoGeo, who have been great to work with throughout this process. And, third, this release will put the power of WeoGeo's hosted data infrastructure at the fingertips of analysts working in ArcMap. This release helps streamline the WeoGeo workflow for ArcMap users, allowing them to access their hosted geospatial content without leaving their environment.

I won't be using my blog for announcements in the long term. We are finalizing a new company site and announcements will ultimately come from there. You can also track us on <a href="https://www.facebook.com/pages/Zekiah-Technologies-Inc/134576235629?ref=ts">Facebook</a>, <a href="http://twitter.com/zekiah">Twitter</a>, and <a href="http://www.linkedin.com/company/109709">LinkedIn</a> for news related to WeoGeo Tools for ArcGIS and Zekiah in general.

Between project work which almost kept me from attending NCGIS and this, there have been a few long nights so I am happy to pass this milestone. There's quite a bit left to be done but it's nice to get this far.

In the coming weeks, I do plan to blog some aspects of building the extension. I've gotten pretty comfortable with some nice technologies like <a href="http://brutile.codeplex.com/">BruTile</a> and am excited to explore them more. Stay tuned...