---
layout: blog
title: Using GeoIQ Analytics in .Net Applications
post_author: bdollins
comment: true
categories:
- .net
- c#
- esri
- GeoCommons
- GeoIQ
- gis
- software development
---

A few weeks ago, I posted about some <a href="http://blog.geomusings.com/2012/06/11/geoiq-api-wrappers-for-net/" target="_blank">.Net wrappers</a> I created for the <a href="http://developer.geoiq.com/api/" target="_blank">GeoIQ API</a>. Due to ongoing project work, I have continued to extend them by adding methods to wrap GeoIQ analytical capabilities. Despite the recent <a href="http://blog.geoiq.com/2012/07/10/building-from-the-inside/" target="_blank">acquistion of GeoIQ by Esri</a>, it's my understanding that <a href="http://geocommons.com" target="_blank">GeoCommons</a> and existing GeoIQ installations will continue for some time. That's good, because analytics on the GeoIQ platform are powerful and fairly easy to use. This post will demonstrate how to use analytics in a .Net application.

As previously posted, the .Net wrappers can be found on github <a href="https://github.com/geobabbler/GeoIQ4Net" target="_blank">here</a>.

The GeoIQ platform offers <a href="http://developer.geoiq.com/api/analysis/" target="_blank">several functions</a> to analyze data sets hosted on a GeoIQ instance or GeoCommons. I have not yet wrapped all of the functions but am working my way through them as I can.

For this post, I will intersect the locations of <a href="http://geocommons.com/overlays/87503" target="_blank">US GISPs as of 1/26/2011</a> with the <a href="http://geocommons.com/overlays/149925" target="_blank">Maryland Zip Code Boundaries</a> to produce a data set containing the locations of GISPs in Maryland, depicted in the map below.

<div style="text-align: center;"><a href="http://geobabble.files.wordpress.com/2012/07/intersect_results.png"><img alt="" class="size-full wp-image-2793" height="340" src="http://geobabble.files.wordpress.com/2012/07/intersect_results.png" title="intersect_results" width="640" /></a><div style="text-align: center; font-size: 14px">Don't worry, none of these are me.<br /><br/></div></div>

<!--more-->

It is important to understand how analytics on the GeoIQ platform work. The output of any successful operation will be a new data set representing the analysis results. Additionally, due to the fact that some analyses may take a long time, they are run asynchronously so you'll need to check back periodically to see if the analysis is complete. That leads to the following very basic workflow:

1. Initialize analysis
2. Periodically check status
3. When complete, do something with it 

So let's get started. Since my original commit, I have added a class that contains wrappers for the GeoIQ analysis methods (<a href="https://github.com/geobabbler/GeoIQ4Net/blob/master/Analytics.cs" target="_blank">see here</a>). Due to the consistency of the GeoIQ design, they are all very similar and I'll probably get around to doing some clean-up refactoring after I get all of the methods wrapped. All of the methods I've wrapped so far return the same JSON response so it was easy to create a simple <a href="https://github.com/geobabbler/GeoIQ4Net/blob/master/Data/AnalyticsData.cs" target="_blank">AnalyticsResponse</a> class to deserialize that.

In the calling application, I'll set up a couple of module-level objects to help keep track of things:

{% codeblock lang:csharp %}
        private System.Timers.Timer _layerTimer = new System.Timers.Timer(500); //to check status of analysis
        private AnalyticsResponse _response = null; //response object created by analysis
        private Analytics _analytics = new Analytics("http://geocommons.com", "username", "password"); //instance of wrapper class for GeoIQ analytic methods
{% endcodeblock %}

With these building blocks in place, it's fairly easy to execute the basic workflow:

1. Initialize analysis:

{% codeblock lang:csharp %}
//call intersect method
//layer 87503 = GISPs, layer 149925 = zip codes
//prefer_1 tells GeoIQ to return records from layer 1 (GISPs in this case)
 _response = _analytics.Intersect(87503, 149925, MergeOptions.prefer_1); //capture response object
 //start timer to check status
 this._layerTimer.Enabled = true;
{% endcodeblock %}

This calls the intersect method of the Analytics object, captures the resulting response object, and starts the timer to check the status of the analysis.

2. Periodically check status:

In this case, I used a simple timer that checks every half second, although you may want to space that out more if you're sure your analyses will take a while to run. This shows the timer event handler code:

{% codeblock lang:csharp %}
void _layerTimer_Elapsed(object sender, System.Timers.ElapsedEventArgs e)
{
     string status = _analytics.GetState(_response.ID); //ID is that of new layer created by analysis
     if (status.ToLower() == "\"complete\"") //this means analysis is complete
     {
         //use Invoke to access UI elements from timer thread
         this.Invoke(new MethodInvoker(delegate
         {
            //set up link label to enable download of new data as KML
            this.lnkDownloadShape.Text = "Analysis Complete: Download KML";
            this.lnkDownloadShape.Links.Clear();
            this.lnkDownloadShape.Links.Add(19, 18, "http://geocommons.com/overlays/" + _response.ID.ToString() + ".kml");
            this.lnkDownloadShape.Visible = true;
            this._layerTimer.Enabled = false;
         }));
     }
}
{% endcodeblock %}

In a nutshell, it checks the status using a wrapper method. If the status is "complete", then a download link is shown. This code makes the KML version available but you could choose a shapefile or any other format supported by GeoIQ.

3. When complete, do something with it:

In this case, I just make it available for download. Once the data set exists, however, it's really just a matter of imagination.  

{% codeblock lang:csharp %}
private void lnkDownloadShape_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
{
    //this actually downloads the data and may even fire off Google Earth
    System.Diagnostics.Process.Start(e.Link.LinkData.ToString());
}
{% endcodeblock %}

In a more robust application (meaning not a sample for a blog post), you could put the results into a map or feed them into locally-installed analysis tools for further processing or do just about anything you want that supports your workflow. I've been a fan of the analytical capability of GeoIQ for some time and I hope, whatever the future holds, that these kinds of tools make it into the next generation of products.

The full Windows Forms code for this sample is <a href="https://gist.github.com/3137738" target="_blank">available here</a>.