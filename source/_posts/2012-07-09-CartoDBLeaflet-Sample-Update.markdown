---
layout: blog
title: CartoDB/Leaflet Sample Update
post_author: bdollins
comments: true
categories:
- CartoDB
- gis
- Leaflet
- open source
- postgis
- web development
---

A while back, I posted about some experimentation I did with <a href="http://leaflet.cloudmade.com/" target="_blank">Leaflet</a> and <a href="http://cartodb.com/" target="_blank">CartoDB</a> in the wake of FOSS4G in Denver. I recently had the chance to go back and update that sample with some spatial queries. At the time of the original post, CartoDB was still in beta and spatial queries didn't seem to work, despite the fact that the back-end was driven by PostGIS.

<img alt="" class="aligncenter size-full wp-image-2737" height="310" src="http://geobabble.files.wordpress.com/2012/07/cartodb_spatial_query.png" title="cartodb_spatial_query" width="640" />

<!--more-->

Since then, of course, CartoDB has gone production, as has <a href="http://www.postgis.org" target="_blank">PostGIS</a> 2.0 (up to <a href="http://www.postgis.org/news/20120622/" target="_blank">2.0.1</a> now) so I decided to <a href="http://demo.zekiah.com/propfinder2/" target="_blank">update the sample</a> a little. This time, I added a floodway layer that flows through <a href="http://leonardtown.somd.com/" target="_blank" title="Official Leonardtown home page">Leonardtown</a>, <a href="http://maps.google.com/maps?sugexp=chrome,mod%3D16&amp;q=leonardtown,+md&amp;um=1&amp;ie=UTF-8&amp;hq=&amp;hnear=0x89b768aa0432337d:0x22590e342c11b91b,Leonardtown,+MD&amp;gl=us&amp;sa=X&amp;ei=wRL8T9TIFqno0QGshqC6Bg&amp;ved=0CHwQtgM" target="_blank" title="Leonardtown in Google Maps">Maryland</a>. With a button click, you can identify the buildings that intersect the floodway. I am again using the CartoDB SQL API and GeoJSON to accomplish this. The API call that accomplishes this is:

<a href="http://geomusings.cartodb.com/api/v2/sql?q=SELECT%20leonardtown_bldgs.*%20FROM%20leonardtown_bldgs,floodway%20WHERE%20ST_Intersects(floodway.the_geom,leonardtown_bldgs.the_geom)&amp;format=geojson" target="_blank">http://geomusings.cartodb.com/api/v2/sql?q=SELECT%20leonardtown_bldgs.*%20FROM%20leonardtown_bldgs,<br />floodway%20WHERE%20ST_Intersects(floodway.the_geom,leonardtown_bldgs.the_geom)<br />&amp;format=geojson</a>

If you pull that apart, you'll see a relatively straightforward use of a PostGIS spatial operator in there:

{% codeblock lang:sql %}
--
SELECT leonardtown_bldgs.* FROM leonardtown_bldgs,floodway WHERE ST_Intersects(floodway.the_geom,leonardtown_bldgs.the_geom)
--
{% endcodeblock %}

The Javascript function that executes the query is here:

{% codeblock lang:js %}
	function getFloodBldgs(){
		var bldgLayer = new L.GeoJSON();
        bldgLayer.on('featureparse', function(e) {
          e.layer.setStyle({ color:  '#FFFFB2', weight: 1, fill: true, fillColor: '#FFFFB2', fillOpacity: 0.9 });
		  var label = "";
		  if (e.properties &amp;&amp; e.properties.address){
        		label += "&lt;b&gt;Address:&lt;/b&gt;: " + e.properties.address + "&lt;br/&gt;";
    	  }
		  if (e.properties &amp;&amp; e.properties.structure_){
        		label += "&lt;b&gt;Property Type:&lt;/b&gt;: " + e.properties.structure_ + "&lt;br/&gt;";
    	  }
		  if (e.properties &amp;&amp; e.properties.shape_area){
        		label += "&lt;b&gt;Square Footage:&lt;/b&gt;: " + e.properties.shape_area + "&lt;br/&gt;";
    	  }
		  if (label != "")
		  {
		  	e.layer.bindPopup(label);
		  }
        });
	
        $.getJSON(
            "http://geomusings.cartodb.com/api/v2/sql?q=SELECT%20leonardtown_bldgs.*%20FROM%20leonardtown_bldgs,floodway%20WHERE%20" + 
"ST_Intersects(floodway.the_geom,leonardtown_bldgs.the_geom)&amp;format=geojson&amp;callback=?",
            function(geojson) {
	        $.each(geojson.features, function(i, feature) {
              bldgLayer.addGeoJSON(feature);
            })
        });
		
        map.addLayer(bldgLayer);
	}
{% endcodeblock %}

The CartoDB documentation has greatly improved since my last post, including some <a href="http://developers.cartodb.com/examples.html" target="_blank">good developer examples</a>. A little bit of comfort with PostGIS-esque spatial SQL goes a long way with CartoDB. It's good to see how the platform is evolving.