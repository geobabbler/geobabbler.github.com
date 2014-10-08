---
layout: blog
title: Importing Data From GeoCommons Into ArcMap
post_author: bdollins
comments: true
categories:
- .net
- arcgis desktop
- arcobjects
- c#
- cloud
- esri
- GeoCommons
- gis
- programming
---

<strong>UPDATE:</strong> <em>The code for this post is available at the bottom of the page.</em>


I have been doing a lot of development with the <a href="http://resources.esri.com/arcgisserver/apis/silverlight/">ESRI Silverlight API</a> recently. One of the requirements of my project is to be able to dynamically add KML data at runtime. The incorporation of <a href="http://code.google.com/apis/kml/documentation/">KML</a> was handled for us through <a href="http://resources.esri.com/arcgisserver/apis/silverlight/index.cfm?fa=codeGalleryDetails&amp;scriptID=16487">one of the ESRI samples</a> on the resource center so we pretty much just had to integrate that code and test against our use cases. For testing, I typically reached out to <a href="http://www.geocommons.com">GeoCommons</a> since any data set available there can be streamed as KML.

Obviously, this is not my first exposure to GeoCommons but, when discussing it, I found that many of the analysts I spoke with were not aware of it and did not use it much. So I decided to tackle developing a simple ArcMap extension to allow a user to search GeoCommons and then download/add data to ArcMap without the need to manually download, unzip and add the data themselves.<!--more-->

GeoCommons, and the GeoIQ platform on which it is based, are produced by <a href="http://www.fortiusone.com/">FortiusOne</a> and are comprised, broadly speaking, of two main components: Finder and Maker. Finder allows you to search/browse data on GeoCommons while Maker allows you to visualize/map the data online and produce map products with nothing but a browser required. That's a gross oversimplification of what GeoCommons can do so I recommend that you kick the tires yourself if you haven't already done so.

Finder supports <a href="http://www.opensearch.org/Home">OpenSearch</a> (see more about this <a href="http://blog.fortiusone.com/2010/01/05/better-know-a-geocommons-feature-opensearch/">here</a>) so the basic search syntax is simple and RESTful. Results can be returned in a number of formats such as JSON, KML and Atom. For example, a query using the search term "oil" and returning results as Atom would simply be:

<a href="http://finder.geocommons.com/search.atom?query=oil">http://finder.geocommons.com/search.atom?query=oil</a>

We can further refine my query by added parameters such as "limit" to restrict the number of results returned (this can be a very good thing as there's quite a bit of data on GeoCommons) and "bbox", which can used to restrict your search to a specific geographic area. Once you have the search results, you can easily get at the actual data in a number of formats, KML and shapefile (zipped) for example. You specify the format in a RESTful manner by simply changing the URI. The following links point to Maryland zip code boundaries in KML and shapefile formats, respectively:

<a href="http://finder.geocommons.com/overlays/22026.kml">http://finder.geocommons.com/overlays/22026.kml</a>
<a href="http://finder.geocommons.com/overlays/22026.zip">http://finder.geocommons.com/overlays/22026.zip</a>

So what all of this boils down to is that Finder has a simple search syntax, returns results in a well-known format, and delivers data sets in standard formats. Integrating this into ArcMap should be fairly easy. I started by designing a simple search dialog:

<img alt="" class="alignnone size-full wp-image-932" height="374" src="http://geobabble.files.wordpress.com/2010/06/geocommons_form.png" title="A simple GeoCommons query dialog" width="419" />

This post is not intended to be a lesson on how to extend ArcMap so I'll describe the basic components at a high level. I used C# to develop the project and the dialog is built using regular Windows Forms rather than WPF. It uses version 3.5 of the .Net framework. There is a simple toolbar button that creates an instance of the form and passes in a reference to the ArcMap application so that the form can get access to information such as the current extent as needed.

The workflow is fairly simple. Enter a "search term" in the text box (exactly as you would in the Finder web interface), select a "limit" (default is 20) and then click "execute" to run your search. The following is the code behind the "execute" button:

{% codeblock lang:csharp %}
            IEnvelope bounds = this._mxd.ActiveView.Extent; //current map extent
            bounds.Project(this.getWGS84()); //convert to WGS84 for use in query
            ExecuteSearch(this.txtKeyword.Text, Convert.ToInt32(this.comboBox1.SelectedItem.ToString()), bounds.YMax, bounds.YMin, bounds.XMax, bounds.XMin);
{% endcodeblock %}

And the ExecuteSearch method that does the work:

{% codeblock lang:csharp %}
            WebClient request = new WebClient();
            string url = String.Format("http://finder.geocommons.com/search.atom?query={0}&amp;limit={1}&amp;bbox={2},{3},{4},{5}", term, limit.ToString(), west, south, east, north); //format the URI
            request.DownloadStringCompleted += new DownloadStringCompletedEventHandler(request_DownloadStringCompleted); //attach handler for async call
            request.DownloadStringAsync(new Uri(url)); 
{% endcodeblock %}

These two pieces of code format the URI and make the call to the GeoCommons API. As you can see, it automatically uses the current map extent to bound the query. GeoCommons expects the bounding box to be in WGS84 so I convert the extent before building the URI. The "getWGS84" method is an ArcObjects helper function that I wrote years ago and reuse extensively.

The next part of the workflow is to parse the search results and display them in the "results" list box. To support that, I created the following (very simple) class:

{% codeblock lang:csharp %}
    public class OverlayInfo
    {
        public string title { get; set; }
        public string shapelink { get; set; }
        public string kmllink { get; set; }
        public string infolink { get; set; }
    }
{% endcodeblock %}

Basically, I'll create an instance of OverlayInfo for each search result and add it to the results list, using the "title" property as the display member. I could have set up a data contract to bind these directly to the atom entries (and I may still do that) but, for the limited information I am handling at the moment, it was simpler to parse the atom using LINQ to XML. That work is done in the DownloadStringCompleted event handler here:

{% codeblock lang:csharp %}
            if (e.Error == null)
            {
                this.lstResults.Items.Clear();
                string s = e.Result;
                XElement root = XElement.Parse(s);
                string n = root.Name.LocalName;
                XNamespace atom = "http://www.w3.org/2005/Atom";
                IEnumerable&lt;XElement&gt; entries = root.Elements(atom + "entry"); //get the entry elements
                foreach (XElement entry in entries)
                {
                    XElement title = entry.Elements(atom + "title").First(); //query the entry title
                    IEnumerable&lt;XElement&gt; links =
                    (from el in entry.Elements(atom + "link")
                     where (string)el.Attribute("type") == "application/vnd.google-earth.kml+xml"
                     select el).Take(1); //query the link to the KML resource

                    XElement link = null;
                    if (links.Count() &gt; 0)
                    {
                        link = links.First();
                    }
                    if (link != null)
                    {
                        string kml = links.Attributes("href").First().Value;
                        string shp = kml.Replace("kml", "zip"); //coerce to zip (shapefile) link
                        string info = kml.Replace(".kml", ""); //coerce to general information link
                        OverlayInfo overlay = new OverlayInfo { title = title.Value, shapelink = shp, kmllink = kml, infolink = info }; //create instance of OverlayInfo
                        this.lstResults.Items.Add(overlay);
                    }
                }
            }
            else
            {
                MessageBox.Show(e.Error.ToString());
            }
{% endcodeblock %}

I use LINQ to query the entries out of the feed, iterate them, create an instance of OverlayInfo for each entry and add it to the list box. LINQ is nice for data structures that are known at runtime and I like it better than XPath for querying XML documents (although it's touchier about namespaces).

With that, the user now sees a list of search results. It's time to do something with them. For this pass, they can preview the KML for a selected result or they can download the shapefile data for it. The KML preview simply provides a means to look at the data before getting it.

You will recall that we attached the links to the KML and shapefile data to the OverlayInfo object for each result when we added it to the list so working with it is as simple as this:

{% codeblock lang:csharp %}
            OverlayInfo overlay = this.lstResults.SelectedItem as OverlayInfo;
            System.Diagnostics.Process.Start(overlay.kmllink);
{% endcodeblock %}

For this pass, the code simply does a shell execute using the KML link so what this actually does is cause the link to be opened in the default browser which should then prompt you to open the data in Google Earth (or whatever your default KML handler is). In the near future, I will update this to go to GE directly but this worked for now.

The "download" button actually downloads the data and adds it to ArcMap automatically. Handling this is a little more complicated because GeoCommons delivers the shapefile data in a zip file so it needs to be uncompressed first. For handling zip files, I used the open-source <a href="http://dotnetzip.codeplex.com/">DotNetZip</a> to handle the zip files. Here's the bulk of the heavy lifting for handling the shapefiles:

{% codeblock lang:csharp %}
        private void download_Click(object sender, EventArgs e)
        {
            //TODO: move all of this out of the event handler
            string tmp = System.IO.Path.GetTempPath(); //find user's temp folder
            OverlayInfo overlay = this.lstResults.SelectedItem as OverlayInfo;
            string file = System.IO.Path.GetFileName(overlay.shapelink);
            //build all of the necessary file info
            string filebase = file.ToLower().Replace(".zip", "");
            string outfolder = tmp + filebase; //output location
            System.IO.Directory.CreateDirectory(outfolder);
            string outpath = tmp + filebase + "\\" + file;
            //download the data
            WebRequest req = WebRequest.Create(overlay.shapelink);
            WebResponse resp = req.GetResponse();
            Stream strm = resp.GetResponseStream();
            SaveStreamToFile(outpath, strm);
            //unzip the data, getting the name of the .shp file
            string shapefile = Utils.ExtractFiles(outpath, outfolder, false); 
            resp.Close();
            //there may have been an error or no actual shapefile
            if (shapefile != "")
            {
                string workspace = System.IO.Path.GetDirectoryName(shapefile);
                string dataset = System.IO.Path.GetFileName(shapefile);
                dataset = dataset.ToLower().Replace(".shp", "");
                AddShapefile(workspace, dataset, overlay.title);
            }

        }

        private void SaveStreamToFile(string fileFullPath, Stream stream)
        {
            try
            {
                using(Stream fs = File.Open(fileFullPath, FileMode.Create) )
                {
                    byte []buf = new byte[1000];
                    int iRead = 0;
                    do
                    {
                        iRead = stream.Read(buf, 0, buf.Length);
                        if (iRead &gt; 0)
                            fs.Write(buf, 0, iRead);
                    } while (iRead &gt; 0);
                }                
            }
            catch (Exception ex)
            {
                //TODO: examine and throw
                MessageBox.Show(ex.ToString());
            }
        }

        private void AddShapefile(string folder, string dataset, string description)
        {
            try
            {
                IWorkspaceFactory wkspcfact = new ShapefileWorkspaceFactoryClass() as IWorkspaceFactory;
                //System.IO.Path.
                IFeatureWorkspace wkspc = wkspcfact.OpenFromFile(folder, 0) as IFeatureWorkspace;
                IFeatureLayer lyr = new FeatureLayerClass() as IFeatureLayer;
                IFeatureClass fc = wkspc.OpenFeatureClass(dataset);
                IGeoDataset gds = fc as IGeoDataset;
                IGeoDatasetSchemaEdit edit = gds as IGeoDatasetSchemaEdit;
                if (edit.CanAlterSpatialReference)
                {
                    //GeoCommons does not deliver a .prj file with
                    //shapefiles. This sets the spatial reference
                    edit.AlterSpatialReference(this.getWGS84());
                }
                lyr.FeatureClass = fc;
                lyr.Name = description;
                lyr.SpatialReference = this.getWGS84();
                _mxd.FocusMap.AddLayer(lyr); //_mxd is the current document open in ArcMap
            }
            catch (Exception ex)
            {
                //TODO: put in better user notification
                MessageBox.Show(ex.ToString());
            }
        }
{% endcodeblock %}

Below is a screen capture of all of this in action (click to enlarge). I zoomed into the Gulf of Mexico region and searched on the term "oil." As can be seen I selected the "Projected Oil Trajectory - Forecast 052610" data set and added it to ArcMap. I manually applied the color ramp after the download.

<a href="http://geobabble.files.wordpress.com/2010/06/geocommons_example.png"><img alt="" class="alignnone size-medium wp-image-934" height="178" src="http://geobabble.files.wordpress.com/2010/06/geocommons_example.png?w=300" title="GeoCommons/ArcMap example" width="300" /></a>

I was able to turn this around pretty quickly (less than a day) due to two main facts: 1) GeoCommons is well-designed and makes strong use of web standards and open interfaces to expose data in very well-known formats and 2) ArcGIS is, as it has always been, a very extensible platform. If it doesn't support a data source that you want to use, you can probably make it do so (although not always as easily as this example). <del datetime="2010-06-02T22:05:16+00:00">I plan on tidying up the code a bit more and making it available here so keep checking back.</del>

<strong>UPDATE:</strong> The code for this post is available <a href="http://code.google.com/p/geocommonsbrowser/">here</a>. It includes the source code and the Visual Studio 2008 solution as well as the binary for those of you who are not programmers. It has only been run/tested against ArcGIS Desktop 9.3.1 SP1.