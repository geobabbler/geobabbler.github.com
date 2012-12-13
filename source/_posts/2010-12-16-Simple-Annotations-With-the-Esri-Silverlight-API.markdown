---
layout: blog
title: Simple Annotations With the Esri Silverlight API
post_author: bdollins
categories:
- c#
- esri
- gis
- silverlight
---

In a previous post, I mentioned that I developed a MeasureString function for use in developing an annotation tool. In this post, I'll go into a little bit more detail about that tool. For purposes of discussion, I extended the interactive graphics sample from the <a href="http://help.arcgis.com/en/webapi/silverlight/samples/start.htm">Esri Silverlight API interactive SDK</a>.

For starters, I added another tool to the sample's tool bar (circled in red below) to provide access to the annotation capability.

<img alt="" class="alignleft size-full wp-image-1372" height="168" src="http://geobabble.files.wordpress.com/2010/12/sl_anno_1.png" title="Annotation tool on the toolbar" width="500" />
<!--more-->
<strong>The User's View</strong>

To kick things off from a user's perspective, you have to first click the tool on the toolbar to activate it and then click a location on the map where you would like your annotation to appear. In order to keep things simple this time around, I am only supporting centering the text on the selected point. After you click on the map, a <a href="http://msdn.microsoft.com/en-us/library/system.windows.controls.childwindow(v=vs.95).aspx">Silverlight child window</a> is displayed, as shown below, allowing you to type in your text and set other properties such as font and size (I plan to add a color picker soon).

<a href="http://geobabble.files.wordpress.com/2010/12/sl_anno_2.png"><img alt="" class="alignleft size-full wp-image-1374" height="264" src="http://geobabble.files.wordpress.com/2010/12/sl_anno_2.png" title="Child window for setting annotation properties" width="500" /></a>

Once you set your various annotation properties, click "OK" to dismiss the child window and your annotation will appear on the map control, centered on the point you clicked. In this case, I set the font to Times New Roman and the size to 16.

<a href="http://geobabble.files.wordpress.com/2010/12/sl_anno_3.png"><img alt="" class="alignleft size-full wp-image-1376" height="264" src="http://geobabble.files.wordpress.com/2010/12/sl_anno_3.png" title="Annotation placed on the map" width="500" /></a>

That's the basic user-centric process. I took it a step further and added a context menu tied to a right mouse click on a piece of text. This context menu allows you to delete the text or to edit it. If you choose to edit, it simply displays the child window again, showing the properties of the text you selected.

<a href="http://geobabble.files.wordpress.com/2010/12/sl_anno_4.png"><img alt="" class="alignleft size-full wp-image-1377" height="264" src="http://geobabble.files.wordpress.com/2010/12/sl_anno_4.png" title="A simple context menu" width="500" /></a>

<strong>Under the Hood</strong>

That's relatively simple. So what's happening to make it work? Let's walk through the procedure above from a code-centric view point.

When you click the tool on the toolbar, you are activating a class behind the tool. The activation method sets up a <a href="http://help.arcgis.com/en/webapi/silverlight/apiref/ESRI.ArcGIS.Client~ESRI.ArcGIS.Client.Draw.html">Draw</a> object in point mode like so:

{% codeblock lang:csharp %}
            if (_draw == null)
            {
                _draw = new Draw(BoundMap); //private class-level variable of type ESRI.ArcGIS.Client.Draw
                _draw.DrawComplete += DrawCompleteHandler; //subscribe to the DrawComplete event
                _activated = true;
                _draw.IsEnabled = true; //enable the Draw object
            }
            _draw.DrawMode = DrawMode.Point; //set it to Point mode
{% endcodeblock %}

When you click on the map, the Draw object's DrawComplete event is fired. The event handler simply displays the child window like so:

{% codeblock lang:csharp %}
        private void DrawCompleteHandler(object sender, DrawEventArgs args)
        {
            _currentPoint = args.Geometry as MapPoint; //capture the point that where the mouse was clicked
            TextSymbolPropsWindow win = new TextSymbolPropsWindow(); //My child window. This can be any you define.
            win.EditMode = false; //this tells the window that this is a new annotation
            win.Closed += new EventHandler(win_Closed); //subscribe to the window's Closed event
            win.Show();
        }
{% endcodeblock %}

At this point, the child window is displayed and you can set the text properties as you see fit. The code in the window itself really does nothing other than manage the window display. If you change the font, it is reflected in the textbox, as is the font size so that you can see what your annotation will look like. The heavy lifting is really done once the window is closed.

This where the other key object from the Esri Silverlight API comes into play: the <a href="http://help.arcgis.com/en/webapi/silverlight/apiref/ESRI.ArcGIS.Client~ESRI.ArcGIS.Client.Symbols.TextSymbol.html">TextSymbol</a> object. In order to draw the text, the code creates a graphic object using the point geometry captured on the mouse click and symbolizes it using a text symbol instead of an icon or some other marker symbol. That work all happens in the child window's Closed event as follows:

{% codeblock lang:csharp %}
        void win_Closed(object sender, EventArgs e)
        {
            TextSymbolPropsWindow win = sender as TextSymbolPropsWindow;
            if ((bool)win.DialogResult)
            {
                GraphicsLayer graphicsLayer = BoundMap.Layers["AnnoLayer"] as GraphicsLayer; //the layer on which the anno will be drawn
                string input = win.Annotation; 

                if (!String.IsNullOrEmpty(input))
                {
                    MapPoint pt = _currentPoint; //the location of the original mouse click
                    TextSymbol sym = new TextSymbol(); //create a new text symbol
                    sym.FontFamily = new FontFamily(win.TextFont);  //set the symbol's font from the window value
                    sym.FontSize = win.TextFontSize;  //set the symbol's font size from the window value
                    sym.Text = win.Annotation; //apply the text string from the window to the symbol
                    sym.Foreground = new SolidColorBrush { Color = Colors.Black }; //set the color. this could be user-selectable as well
                    Zekiah.Samples.Font f = new Font(); //this is a simple container object I wrote to pass font properties around
                    f.Family = sym.FontFamily;
                    f.Size = sym.FontSize;
                    f.Style = FontStyles.Normal;
                    f.Weight = FontWeights.Normal;
                    String s = new String(input.ToCharArray());

                    Size size = s.Measure(f); //use the extension method to measure the string
                    sym.OffsetX = size.Width / 2; //set offset to center horizontally
                    sym.OffsetY = size.Height / 2; //set offset to center vertically
                    //create the graphic and apply the geometry and symbol
                    ESRI.ArcGIS.Client.Graphic graphic = new ESRI.ArcGIS.Client.Graphic()
                    {
                        Geometry = pt,
                        Symbol = sym,
                    };
                    //set up the mouse event for the context menu
                    graphic.MouseRightButtonDown += new System.Windows.Input.MouseButtonEventHandler(graphic_MouseRightButtonDown);
                    //this block replaces the previous annotation if this was an edit operation
                    if (win.EditMode)
                    {
                        graphicsLayer.Graphics.Remove(Ambient.SelectedSymbol);

                    }
                    graphicsLayer.Graphics.Add(graphic); //add the new graphic to the map
                }
            }
        }
{% endcodeblock %}

That's the core of the work. You'll notice above that we use OffsetX and OffsetY to center the text. These values are in screen units as opposed to map units and this is why we need to know the size of the text string. The call to the "Measure" method is a call to <a href="http://geobabble.wordpress.com/2010/10/08/measurestring-for-silverlight/">the extension method I described here</a>. You'll also notice that I don't set the font weight or style. That's because the TextSymbol object doesn't seem to support those attributes yet. I could probably play with using styles to accomplish that but it wasn't necessary for this iteration. There also doesn't seem to be a built-in way to control rotation or scaling. Those may be able to be accomplished by other means but were not necessary for this iteration, either.

From here, you can go on to implement things like the context menu as you see fit. A couple of notes on some specifics: In the child window, I used the numeric up/down control from the <a href="http://silverlight.codeplex.com/">Silverlight Toolkit</a>. For the context menu, I used the <a href="http://sl4popupmenu.codeplex.com/">SL4PopupMenu</a> from Codeplex. I found the context menu from the Silverlight Toolkit didn't behave as expected when attaching events to map graphics.

So that was the basic process I followed for implementing simple, interactive annotations using the Esri Silverlight API. I'll try to get a working demo posted up soon.