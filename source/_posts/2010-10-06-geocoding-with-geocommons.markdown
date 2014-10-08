---
layout: blog
title: Geocoding with GeoCommons
post_author: bdollins
comments: true
categories:
- geocoding
- GeoCommons
- gis
---

One of the new features included in the latest release of <a href="http://www.geocommons.com">GeoCommons</a> is geocoding. Previous releases have provided the ability to upload non-spatial data (such as CSV files) and walk through a wizard-like interface to join that data with existing spatial data sets already in GeoCommons. This latest release brings the <a href="http://geocommons.com/help/FortiusOne_Geocoder">FortiusOne Geocoder</a> to bear to give you the ability to upload data containing US addresses and generate point locations. In my opinion, this is a very powerful addition to GeoCommons. <!--more-->

So, I decided to give it a spin. Since GeoCommons is open to the public, I decided to use some data that I wouldn't mind making available. I went to the Wawa web site and made a CSV of the <a href="http://www.wawa.com">Wawa</a> stores in my county (there are only five). These are locations that are well-known to me so they suited my purposes. It's a truism that even the best geocoders generally yield the "mailbox location" of the addresses fed into them. This becomes fairly obvious is in rural areas such as where I live. 

So, here's the CSV I started with:

city,zip,store,address,state
"Lexington Park","20653","579","21265 Great Mills Road","MD"
"Mechanicsville","20659","583","27605 Three Notch Road","MD"
"Lexington Park","20653","587","22530 Three Notch Road","MD"
"Charlotte Hall","20622","588","30320 Three Notch Road","MD"
"California","20619","592","23141 Three Notch Road","MD"

After I logged into GeoCommons, I went through the upload process like so:

First, I clicked "Upload Files" and navigated to my CSV.

<a href="http://geobabble.files.wordpress.com/2010/10/gc1.png"><img alt="" class="aligncenter size-full wp-image-1251" src="http://geobabble.files.wordpress.com/2010/10/gc1.png" title="GeoCommons uploader" /></a>

Once it was uploaded, I clicked "Next" to start processing.

<a href="http://geobabble.files.wordpress.com/2010/10/gc2.png"><img alt="" class="aligncenter size-full wp-image-1252" src="http://geobabble.files.wordpress.com/2010/10/gc2.png" title="File confirmation" /></a>

After I clicked through an intermediary screen, I was brought here, where I chose the "Geocode" option.

<a href="http://geobabble.files.wordpress.com/2010/10/gc3.png"><img alt="" class="aligncenter size-full wp-image-1253" height="237" src="http://geobabble.files.wordpress.com/2010/10/gc3.png" title="Geolocation options" width="500" /></a>

GeoCommons recognized my address columns so I just chose "Continue." Otherwise, I could have customized the processing.

<a href="http://geobabble.files.wordpress.com/2010/10/gc4.png"><img alt="" class="aligncenter size-full wp-image-1254" src="http://geobabble.files.wordpress.com/2010/10/gc4.png" title="Confirm columns or customize" /></a>

Then, it worked for a while (maybe a minute) and then showed me the geocoding results. You will see two new columns added to the data, those are explained in the <a href="http://geocommons.com/help/FortiusOne_Geocoder">GeoCommons API docs</a>.

<a href="http://geobabble.files.wordpress.com/2010/10/gc5.png"><img alt="" class="aligncenter size-full wp-image-1255" height="222" src="http://geobabble.files.wordpress.com/2010/10/gc5.png" title="Geocoding results" width="500" /></a>

After this, I edited the metadata and my data set was geocoded. Here is a link to the resulting KML: <a href="http://geocommons.com/overlays/66341.kml">http://geocommons.com/overlays/66341.kml</a>

And the results? As I said, living in a rural area can play games with geocoders. We have farms with very large road frontage as well as houses set as much as a half-mile back from the road. It's very hard to get an exact location. I don't have screen shots (because I don't want to risk running afoul of anyone's license), but I will say that in each case, GeoCommons was an exact match <em>or closer</em> to the corresponding result in <a href="http://maps.google.com">Google Maps</a>.

I will need to run more tests with more diverse data, but these results were encouraging with data that I know well. Additionally, the FortiusOne geocoder is open-source software. This means that I can set it up (with supporting data) inside the environment of a customer who may not want to make their data public and potentially achieve similar results. 

I will definitely be playing with this more but it made a good first impression, especially given the simplicity of the process.