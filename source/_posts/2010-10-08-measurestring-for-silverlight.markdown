---
layout: blog
title: MeasureString for Silverlight
post_author: bdollins
comments: true
categories:
- c#
- esri
- gis
- silverlight
---

I was working on an annotation tool for an application I am developing using the <a href="http://help.arcgis.com/en/webapi/silverlight/index.html">Esri Silverlight API</a>. The <a href="http://help.arcgis.com/en/webapi/silverlight/apiref/ESRI.ArcGIS.Client~ESRI.ArcGIS.Client.Symbols.TextSymbol.html">TextSymbol</a> class has properties to specify the X and Y offsets in order to position the text relative to the symbol's base point. I needed to calculate the size of the string in order to determine the offset I wanted to use. Silverlight seems to have no intrinsic equivalent to the <a href="http://msdn.microsoft.com/en-us/library/6xe5hazb.aspx">MeasureString function</a> so I hacked this up. <!--more-->

I built it as an <a href="http://msdn.microsoft.com/en-us/library/bb383977.aspx">extension method</a> to the <a href="http://msdn.microsoft.com/en-us/library/system.string.aspx">System.String</a> class. The Font class is just a simple container that I use as a parameter. It uses a TextBlock to do the work, which strikes me as a little hackish, but it seemed to be the most direct way to do things. I hope it saves others a little work. Enjoy.

{% codeblock lang:csharp %}
using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace Helpers
{
    //Simple container class for font properties
    public class Font
    {
        public FontFamily Family { get; set; }
        public FontStyle Style { get; set; }
        public FontWeight Weight { get; set; }
        public double Size { get; set; }
    }

    public static class Extensions
    {
        //Extension method on System.String
        public static Size Measure(this String str, Font font)
        {
            Size retval = new Size();
            try
            {
                TextBlock l = new TextBlock();
                l.FontFamily = font.Family;
                l.FontSize = font.Size;
                l.FontStyle = font.Style;
                l.FontWeight = font.Weight;
                l.Text = str;
                retval.Height = l.ActualHeight;
                retval.Width = l.ActualWidth;
            }
            catch
            {
                retval.Height = 0;
                retval.Width = 0;
            }
            return retval;
        }
    }
}
{% endcodeblock %}