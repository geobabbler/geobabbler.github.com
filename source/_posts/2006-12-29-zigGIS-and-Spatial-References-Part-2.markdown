---
layout: blog
title: zigGIS and Spatial References, Part 2
post_author: bdollins
categories:
- arcobjects
- postgis
- postgresql
- ziggis
---

Update to <a href="http://geobabble.wordpress.com/2006/12/21/ziggis-and-spatial-references/">this post</a>:

Another post about zigGIS. I didn't really intend this blog to be so dominated by zigGIS but that's certainly the way it's been thus far. Basically, it's just really cool and it satisfies my geek nature on a couple of fronts.

After posting about the spatial reference issue before, I couldn't resist digging into it. I found a placeholder in the implementation of IFeatureClass.  Abe G. had even left a comment there that he needed to go back and implement it. So I dove in...

In the IFeatureClass implementation of CPostGisFeatureClass the SpatialReference property was stubbed out to always return and UnknownCoordinateSystem object. The feature class wraps a CLayer object (among others). This is the object I needed to use to get the spatial reference. The loadLayer method of CLayer (in the postgis_connector project) contained the following code:

<pre>
<span class="kwrd">string</span> sql = CDbHelper.createSelectSql
(CPostGisConstants.geometryColumnsTable + <span class="str">" as g"</span>,
<span class="str">"g.*,g.oid,s."</span> + CPostGisConstants.spatialReferenceSrField,
<span class="str">"left join "</span> + CPostGisConstants.spatialReferenceTable + 
<span class="str">" as s on g."</span> +
CPostGisConstants.spatialReferenceIdField + <span class="str">"=s."</span> +
CPostGisConstants.spatialReferenceIdField,
<span class="kwrd">where</span>);
</pre>

This code queries the geometry_columns table for all of the metadata I need. So I added the following code to the CLayer class:

<pre>
<span class="kwrd">private</span> <span class="kwrd">int</span> m_srid = -1;
<span class="kwrd">public</span> <span class="kwrd">int</span> srid { get { <span class="kwrd">return</span> m_srid; } }
</pre>

I then added this code to the loadLayer method...

<pre>
m_srid = (<span class="kwrd">int</span>)((Int32)dr[<span class="str">"srid"</span>]);
</pre>

...in order to expose the srid for the layer. The variable dr refers to an instance of the CAutoDataReader class defined in the postgis_connector project.

Finally, i added the following code to the init method of the CPostGisFeatureClass class in the postgis_geodatabase project:

<pre>
<span class="kwrd">if</span> (m_layer.srid != -1)
{
    ISpatialReferenceFactory2 srfact = <span class="kwrd">new</span> SpatialReferenceEnvironmentClass();
    m_spaRef = srfact.CreateSpatialReference(m_layer.srid);
}
</pre>

With that, the layer properties dialog in ArcMap correctly reports my spatial reference and the geometry that once failed to draw now works fine. I've got some more clean-up to do to the code to add some error-handling and the like. I'm sure it wouldn't take much to crash it right now.

I think the thing I like about zigGIS is that it's got something for everyone. ArcObjects geeks will appreciate the implementation of feature classes, cursors and the like. .NET geeks will appreciate nuggets like the CAutoDataReader class which is an implementation of the IDataReader interface. All in all, it's a nice piece of work that I find more to like about as I dig deeper.

As I mentioned before, the project has a new home in Google Code and the discussion forum is getting a little more active so maybe zigGIS will gain a little more momentum. That's all for now...