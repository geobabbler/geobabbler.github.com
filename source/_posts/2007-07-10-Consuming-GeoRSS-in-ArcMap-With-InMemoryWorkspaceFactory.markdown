---
layout: blog
title: Consuming GeoRSS in ArcMap With InMemoryWorkspaceFactory
post_author: bdollins
comments: true
categories:
- arcgis desktop
- arcobjects
- c#
- esri
- georss
- gis
---

This will be my last post for a couple of weeks. I'm heading out to Florida tomorrow to spend time with my family and the Mouse. But before I head out, I thought I'd share a little something I've been working on.

I've been playing the last few days with the <a href="http://edndoc.esri.com/arcobjects/9.2/ComponentHelp/esriDataSourcesGDB/InMemoryWorkspaceFactory.htm">InMemoryWorkspaceFactory</a> class in ArcObjects. I am looking at using it for a project I will be working on when I get back so I thought I'd do a little prototyping beforehand.

The fact that it works in memory is very attractive, especially for using volatile data. <a href="http://georss.org/">GeoRSS</a> seemed like a natural source to use for prototyping.
<!--more-->
I wrote this in C# as a set of tools for ArcMap 9.2. The first thing I did was create a static reference to a single InMemoryWorkspaceFactory. It's a singleton anyway but this approach forces me to use a single entry point. 


{% codeblock lang:csharp %}
public static void initInMemoryWorkspaceFactory()
{
    // Create an InMemory workspace factory.
    InMemoryWorkspaceFactory workspaceFactory = new InMemoryWorkspaceFactoryClass();

    // Create an InMemory geodatabase.
    IWorkspaceName workspaceName = workspaceFactory.Create("", "GeoRssWorkspace", null, 0);

    // Cast for IName.
    IName name = (IName)workspaceName;

    //Open a reference to the in-memory workspace through the name object.
    IWorkspace inmemWor = (IWorkspace)name.Open();
    m_memFeatWorkspace = (IFeatureWorkspace)inmemWor;
}
{% endcodeblock %}

Next, I created a custom FeatureLayer class called GeoRssFeatureLayer. It inherits from the ArcObjects FeatureLayer class and implements a custom interface called IGeoRssFeatureLayer. Using inheritance makes it easy to pass an instance around within ArcObjects and have it behave properly. Here's a snippet with the interface and class declaration:
{% codeblock lang:csharp %}
public interface IGeoRssFeatureLayer
{
    string Uri { get; set;}
    void Refresh();
}

[Guid("a675765b-30d0-4294-ad98-28579c9f8994")] 
[ClassInterface(ClassInterfaceType.None)] 
[ProgId("ztGeoRss.GeoRssFeatureLayer")] 
public class GeoRssFeatureLayer : ESRI.ArcGIS.Carto.FeatureLayerClass, IGeoRssFeatureLayer 
    private string m_uri = string.Empty; 
    private IFeatureClass m_fc = null; 
    public GeoRssFeatureLayer(string uri) 
    { 
        m_uri = uri; 
        this.Refresh(); 
    }
{% endcodeblock %}
I also added a constructor so I could pass in the URI directly. The IGeoRssFeatureLayer.Refresh method does most of the heavy lifting with some help from the loadFeatures method and a few statics in the Ambient class (it's a pretty name that gets the point across without conflicting with reserved words like "Environment"):
{% codeblock lang:csharp %}
public void Refresh()
{
    if (m_fc != null)
    {
        Marshal.ReleaseComObject(m_fc);
    }
    m_fc = null; 
    ISpatialReferenceFactory srf = new SpatialReferenceEnvironmentClass(); 
    ISpatialReference sr = srf.CreateGeographicCoordinateSystem((int)esriSRGeoCSType.esriSRGeoCS_WGS1984); 
    sr.SetDomain(-180, 180, -90, 90); 
    IGeometryDefEdit gde = (IGeometryDefEdit)new GeometryDefClass(); 
    gde.SpatialReference_2 = sr; 
    gde.GeometryType_2 = esriGeometryType.esriGeometryPoint; 
    gde.GridCount_2 = 1; 
    gde.set_GridSize(0, 1000); 
    IFieldsEdit fe = (IFieldsEdit)new FieldsClass(); 
    fe.AddField(Ambient.makeField("OBJECTID", esriFieldType.esriFieldTypeOID, 0, null)); 
    fe.AddField(Ambient.makeField("SHAPE", esriFieldType.esriFieldTypeGeometry, 0, (IGeometryDef)gde)); 
    fe.AddField(Ambient.makeField("Title", esriFieldType.esriFieldTypeString, 100, null)); 
    fe.AddField(Ambient.makeField("Description", esriFieldType.esriFieldTypeString, 300, null)); 
    fe.AddField(Ambient.makeField("Link", esriFieldType.esriFieldTypeString, 100, null)); 
    fe.AddField(Ambient.makeField("Author", esriFieldType.esriFieldTypeString, 100, null)); 
    fe.AddField(Ambient.makeField("Comments", esriFieldType.esriFieldTypeString, 300, null)); 
    fe.AddField(Ambient.makeField("PubDate", esriFieldType.esriFieldTypeString, 50, null)); 
    fe.AddField(Ambient.makeField("Guid", esriFieldType.esriFieldTypeString, 50, null)); 
    IFeatureWorkspace fws = Ambient.GeoRssWorkspace; 
    m_fc = fws.CreateFeatureClass(System.Guid.NewGuid().ToString(), (IFields)fe, null, null, esriFeatureType.esriFTSimple, "Shape", ""); 
    loadFeatures(); 
    base.FeatureClass = m_fc; 
}

private void loadFeatures()
{
    RssFeed f = RssReader.GetFeed(m_uri);
    base.Name = f.Title;
    if (f.Items.Count &gt; 0)
    {
        //Cast for an IWorkspaceEdit        
        IWorkspaceEdit workspaceEdit = (IWorkspaceEdit)Ambient.GeoRssWorkspace;
        //Start an edit session and operation        
        workspaceEdit.StartEditing(true);        
        workspaceEdit.StartEditOperation();                
        //Create the Feature Buffer        
        IFeatureBuffer featureBuffer = m_fc.CreateFeatureBuffer();        
        //Create insert Feature Cursor using buffering = true.        
        IFeatureCursor featureCursor = m_fc.Insert(true);
        IPoint pt = new PointClass();
        int i;
        for (i = 0; (i &lt;= (f.Items.Count - 1)); i++)
        {
            RssItem itm = f.Items[i];
            pt.X = Convert.ToDouble(itm.Longitude);
            pt.Y = Convert.ToDouble(itm.Latitude);
            featureBuffer.Shape = pt;
            featureBuffer.set_Value(2, itm.Title);
            featureBuffer.set_Value(3, itm.Description);
            featureBuffer.set_Value(4, itm.Link);
            featureBuffer.set_Value(5, itm.Author);
            featureBuffer.set_Value(6, itm.Comments);
            featureBuffer.set_Value(7, itm.Pubdate);
            featureBuffer.set_Value(8, itm.Guid);
            object oid = featureCursor.InsertFeature(featureBuffer);
        }                
        //Flush the feature cursor to the database        
        //Calling flush allows you to handle any errors at a known time rather then on the cursor destruction.        
        featureCursor.Flush();
        //Stop editing        
        workspaceEdit.StopEditOperation();        
        workspaceEdit.StopEditing(true);
        //Release the Cursor        
        System.Runtime.InteropServices.Marshal.ReleaseComObject(featureCursor);
    }
}
}
{% endcodeblock %}

That pretty much does most of the real work. I have an ArcObjects command that actually instantiates the layer and adds it to ArcMap and there are a few helper functions as well. I snagged a good bit of other people's code to be able to turn around a prototype quickly so credit where credit is due:
<ul>
	<li><a href="http://www.codeproject.com/KB/cs/rssreader.aspx">RssReader</a> on CodeProject - This handles the interaction with the feeds. I extended it to support geo tags</li>
	<li><a href="http://www.codeproject.com/cs/miscctrl/InputBox.asp">InputBox</a> on CodeProject - I used this to provide a simple means to allow the user to enter a URI.</li>
	<li>I also C#-ified some of <a href="http://ambergis.wordpress.com/">Kirk's</a> code I found on the ESRI forums</li>
	<li>I also grabbed a few lines from the ESRI help files</li>
</ul>

I'll probably post an update when I get back but here's a screen capture. It depicts <a href="http://earthquake.usgs.gov/eqcenter/catalogs/eqs7day-M2.5.xml">USGS M2.5+ Earthquakes feed</a> and the path of <a href="http://krkinnan.members.winisp.net/georss/2004hurricaneivan.xml">Hurricane Ivan in 2004</a>. As of this writing, it only handles points in the "simple" formats.

<a href="http://geobabble.files.wordpress.com/2007/07/georss_arcmap.png" title="GeoRSS in ArcMap"><img alt="GeoRSS in ArcMap" src="http://geobabble.files.wordpress.com/2007/07/georss_arcmap.thumbnail.png" /></a>

Basically, I like the in-memory implementation because it allows for a pretty fast refresh plus it allows selections (note the selection of the last few positions of Ivan), identify (with automatic hyperlinking from the identify window) and other operations, make it a big plus over an XY event layer. It remains to be seen if there are any memory leaks but that'll come with further testing.

<strong>UPDATE:</strong> Basically, the biggest problem with this approach right now is that a feature class can't contain multiple geometry types, regardless of the type of workspace. This is a big pain and makes management of a full GeoRSS feed (with points, lines and polygons) difficult. I'll post more when I get farther.

<a href="http://www.statcounter.com/" target="_blank"><img alt="hit counter" border="0" src="http://c31.statcounter.com/2901378/0/be706774/0/" /></a>