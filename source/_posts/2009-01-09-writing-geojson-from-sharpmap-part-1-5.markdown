---
layout: blog
title: Writing GeoJSON from SharpMap, Part 1.5
post_author: bdollins
comments: true
categories:
- c#
- geojson
- gis
- open source
- sharpmap
---

Following up on my <a href="http://geobabble.wordpress.com/2008/09/25/writing-geojson-from-sharpmap-part-1/">post a few months back</a> about <a href="http://geojson.org/">GeoJSON</a> and <a href="http://www.codeplex.com/sharpmap">SharpMap</a>; here is the code to the converter as it stands so far. I have mentioned recently that things have been pretty busy at work so I have progressed on this more slowly than I had wished. I have yet to insert code to handle CRS but I thought it would be better to post something than nothing.

Basically, I just had to do some modifications to <a href="http://www.sharpgis.net">Morten's</a> original code for handling WKT. It was pretty straightforward owing mainly to the quality of Morten's code. So here it is. Enjoy...<!--more-->

{% codeblock lang:csharp %}
// Copyright 2008 - William Dollins
// GeometryToGeoJson converter by William Dollins (bill@zekiah.com / www.zekiah.com)
//
// Date 2008-09-25
//
// This file is part of SharpMap.
// SharpMap is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
// 
// SharpMap is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.

// You should have received a copy of the GNU Lesser General Public License
// along with SharpMap; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA 
//
//SOURCECODE IS MODIFIED FROM ANOTHER WORK AND IS ORIGINALLY BASED ON THE 
//GeometryToWKT class of SharpMap which was in turn was based on GeoTools.NET (see below):
// Copyright 2005, 2006 - Morten Nielsen (www.iter.dk)
//
// This file is part of SharpMap.
// SharpMap is free software; you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
// 
// SharpMap is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.

// You should have received a copy of the GNU Lesser General Public License
// along with SharpMap; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA 

// SOURCECODE IS MODIFIED FROM ANOTHER WORK AND IS ORIGINALLY BASED ON GeoTools.NET:
/*
 *  Copyright (C) 2002 Urban Science Applications, Inc. 
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 *
 */

using System;
using System.IO;
using System.Text;
using SharpMap.Geometries;

namespace SharpMap.Converters.GeoJson
{
    /// 
    /// Outputs the GeoJSON representation of a  instance.
    /// 
    /// 
    /// The GeoJSON representation of Geometry is designed to exchange geometry data in a form
    /// sutiable for use my Javascript mapping clients that support GeoJSON, such as OpenLayers.
    /// Examples of GeoJSON representations of geometry objects can be found in the comments for individual
    /// conversion routines. These examples are originally from the geojson.org site and were used for testing.
    /// 
    public class GeometryToGeoJson
    {
        #region Methods

        /// 
        /// Converts a Geometry to GeoJSON representation.
        /// 
        /// A Geometry to write.
        /// A GeoJSON geometry string (see the GeoJSON
        /// Specification)
        public static string Write(IGeometry geometry)
        {
            StringWriter sw = new StringWriter();
            Write(geometry, sw);
            return sw.ToString();
        }

        /// 
        /// Converts a Geometry to its GeoJSON representation.
        /// 
        /// A geometry to process.
        /// Stream to write out the geometry's text representation.
        /// 
        /// Geometry is written to the output stream as a GeoJSON geometry string (see the GeoJSON
        /// Specification).
        /// 
        public static void Write(IGeometry geometry, StringWriter writer)
        {
            AppendGeometryTaggedText(geometry, writer);
        }

        /// 
        /// Converts a Geometry to GeoJSON format, then Appends it to the writer.
        /// 
        /// The Geometry to process.
        /// The output stream to Append to.
        private static void AppendGeometryTaggedText(IGeometry geometry, StringWriter writer)
        {
            if (geometry == null)
                throw new NullReferenceException("Cannot write GeoJSON: geometry was null"); ;
            if (geometry is Point)
            {
                Point point = geometry as Point;
                AppendPointTaggedText(point, writer);
            }
            else if (geometry is LineString)
                AppendLineStringTaggedText(geometry as LineString, writer);
            else if (geometry is Polygon)
                AppendPolygonTaggedText(geometry as Polygon, writer);
            else if (geometry is MultiPoint)
                AppendMultiPointTaggedText(geometry as MultiPoint, writer);
            else if (geometry is MultiLineString)
                AppendMultiLineStringTaggedText(geometry as MultiLineString, writer);
            else if (geometry is MultiPolygon)
                AppendMultiPolygonTaggedText(geometry as MultiPolygon, writer);
            else if (geometry is GeometryCollection)
                AppendGeometryCollectionTaggedText(geometry as GeometryCollection, writer);
            else
                throw new NotSupportedException("Unsupported Geometry implementation:" + geometry.GetType().Name);
        }

        /// 
        /// Converts a Coordinate to GeoJSON point format,
        /// then Appends it to the writer.
        /// 
        /// the <code>Coordinate</code> to process
        /// the output writer to Append to
        private static void AppendPointTaggedText(Point coordinate, StringWriter writer)
        {
            writer.WriteLine("{");
            writer.WriteLine("\"type\": \"Point\",");
            writer.Write("\"coordinates\": ");
            AppendPointText(coordinate, writer);
            writer.WriteLine("}");
        }

        /// 
        /// Converts a LineString to GeoJSON LineString format, 
        /// 
        /// The LineString to process.
        /// The output stream writer to Append to.
        private static void AppendLineStringTaggedText(LineString lineString, StringWriter writer)
        {
            writer.WriteLine("{");
            writer.WriteLine("\"type\": \"LineString\",");
            writer.WriteLine("\"coordinates\": ");
            AppendLineStringText(lineString, writer);
            //writer.WriteLine("]");
            writer.WriteLine("}");
        }

        /// 
        ///  Converts a Polygon to GeoJSON Polygon format,
        ///  then Appends it to the writer.
        /// 
        /// Th Polygon to process.
        /// The stream writer to Append to.
        private static void AppendPolygonTaggedText(Polygon polygon, StringWriter writer)
        {
        //{
        //   "type": "Polygon",
        //   "coordinates": [
        //       [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
        //   ]
        //}
        // with holes (inner rings)
        //{
        //   "type": "Polygon",
        //   "coordinates": [
        //       [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
        //       [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
        //   ]
        //}

        //{
        //"type": "Polygon",
        //"coordinates": 
        //[ [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]], [[5, 5], [7, 5], [7, 7], [5, 7], [5, 5]]] ]
        //}

            writer.WriteLine("{");
            writer.WriteLine("\"type\": \"Polygon\",");
            writer.WriteLine("\"coordinates\": ");
            //writer.Write("[ ");
            AppendPolygonText(polygon, writer);
            //writer.WriteLine(" ]");
            //writer.WriteLine("]");
            writer.WriteLine("}");
        }

        /// 
        /// Converts a MultiPoint to &lt;MultiPoint Tagged Text&gt;
        /// format, then Appends it to the writer.
        /// 
        /// The MultiPoint to process.
        /// The output writer to Append to.
        private static void AppendMultiPointTaggedText(MultiPoint multipoint, StringWriter writer)
        {
        //{
        //   "type": "MultiPoint",
        //   "coordinates": [
        //       [100.0, 0.0], [101.0, 1.0]
        //   ]
        //}
            writer.WriteLine("{");
            writer.WriteLine("\"type\": \"MultiPoint\",");
            writer.WriteLine("\"coordinates\": ");
            AppendMultiPointText(multipoint, writer);
            writer.WriteLine("}");
        }

        /// 
        /// Converts a MultiLineString to &lt;MultiLineString Tagged
        /// Text&gt; format, then Appends it to the writer.
        /// 
        /// The MultiLineString to process
        /// The output stream writer to Append to.
        private static void AppendMultiLineStringTaggedText(MultiLineString multiLineString, StringWriter writer)
        {
        //{
        //   "type": "MultiLineString",
        //   "coordinates": [
        //       [ [100.0, 0.0], [101.0, 1.0] ],
        //       [ [102.0, 2.0], [103.0, 3.0] ]
        //   ]
        //}
            writer.WriteLine("{");
            writer.WriteLine("\"type\": \"MultiLineString\",");
            writer.WriteLine("\"coordinates\": ");
            AppendMultiLineStringText(multiLineString, writer);
            writer.WriteLine("}");
        }

        /// 
        /// Converts a MultiPolygon to &lt;MultiPolygon Tagged
        /// Text&gt; format, then Appends it to the writer.
        /// 
        /// The MultiPolygon to process
        /// The output stream writer to Append to.
        private static void AppendMultiPolygonTaggedText(MultiPolygon multiPolygon, StringWriter writer)
        {
        //{
        //   "type": "MultiPolygon",
        //   "coordinates": [
        //       [
        //           [ [102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0] ]
        //       ],
        //       [
        //           [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
        //           [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
        //       ]
        //   ]
        //}
            writer.WriteLine("{");
            writer.WriteLine("\"type\": \"MultiPolygon\",");
            writer.WriteLine("\"coordinates\": ");
            AppendMultiPolygonText(multiPolygon, writer);
            writer.WriteLine("}");

        }

        /// 
        /// Converts a GeometryCollection to &lt;GeometryCollection Tagged
        /// Text&gt; format, then Appends it to the writer.
        /// 
        /// The GeometryCollection to process
        /// The output stream writer to Append to.
        private static void AppendGeometryCollectionTaggedText(GeometryCollection geometryCollection, StringWriter writer)
        {
        //{
        //   "type": "GeometryCollection",
        //   "members": [
        //       {
        //           "type": "Point",
        //           "coordinates": [100.0, 0.0]
        //       },
        //       {
        //           "type": "LineString",
        //           "coordinates": [
        //               [101.0, 0.0], [102.0, 1.0]
        //           ]
        //       }
        //   ]
        //}
            writer.WriteLine("{");
            writer.WriteLine("\"type\": \"GeometryCollection\",");
            writer.WriteLine("\"geometries\": ");
            AppendGeometryCollectionText(geometryCollection, writer);
            writer.WriteLine("}");
        }


        /// 
        /// Converts a Coordinate to Point Text format then Appends it to the writer.
        /// 
        /// The Coordinate to process.
        /// The output stream writer to Append to.
        private static void AppendPointText(Point coordinate, StringWriter writer)
        {
            if (coordinate == null || coordinate.IsEmpty())
                writer.Write("EMPTY");
            else
            {
                writer.Write("[");
                AppendCoordinate(coordinate, writer);
                writer.Write("]");
            }
        }

        /// 
        /// Converts a Coordinate to &lt;Point&gt; format, then Appends
        /// it to the writer. 
        /// 
        /// The Coordinate to process.
        /// The output writer to Append to.
        private static void AppendCoordinate(Point coordinate, StringWriter writer)
        {
            for (uint i = 0; i < coordinate.NumOrdinates; i++)
                writer.Write(WriteNumber(coordinate[i]) + (i < coordinate.NumOrdinates - 1 ? ", " : ""));
        }

        /// 
        /// Converts a double to a string, not in scientific notation.
        /// 
        /// The double to convert.
        /// The double as a string, not in scientific notation.
        private static string WriteNumber(double d)
        {
            return d.ToString(SharpMap.Map.numberFormat_EnUS);
        }

        /// 
        /// Converts a LineString to &lt;LineString Text&gt; format, then
        /// Appends it to the writer.
        /// 
        /// The LineString to process.
        /// The output stream to Append to.
        private static void AppendLineStringText(LineString lineString, StringWriter writer)
        {

            if (lineString == null || lineString.IsEmpty())
                writer.Write("EMPTY");
            else
            {
                writer.Write("[");
                for (int i = 0; i < lineString.NumPoints; i++)
                {
                    if (i > 0)
                        writer.Write(", ");
                    writer.Write("[");
                    AppendCoordinate(lineString.Vertices[i], writer);
                    writer.Write("]");
                }
                writer.Write("]");
            }
        }

        /// 
        /// Converts a Polygon to &lt;Polygon Text&gt; format, then
        /// Appends it to the writer.
        /// 
        /// The Polygon to process.
        /// 
        private static void AppendPolygonText(Polygon polygon, StringWriter writer)
        {
            if (polygon == null || polygon.IsEmpty())
                writer.Write("EMPTY");
            else
            {
                writer.Write("[");
                AppendLineStringText(polygon.ExteriorRing, writer);
                for (int i = 0; i < polygon.InteriorRings.Count; i++)
                {
                    writer.Write(", ");
                    AppendLineStringText(polygon.InteriorRings[i], writer);
                }
                writer.Write("]");
            }
        }

        /// 
        /// Converts a MultiPoint to &lt;MultiPoint Text&gt; format, then
        /// Appends it to the writer.
        /// 
        /// The MultiPoint to process.
        /// The output stream writer to Append to.
        private static void AppendMultiPointText(MultiPoint multiPoint, StringWriter writer)
        {

            if (multiPoint == null || multiPoint.IsEmpty())
                writer.Write("EMPTY");
            else
            {
                writer.Write("[");
                for (int i = 0; i < multiPoint.Points.Count; i++)
                {
                    if (i > 0)
                        writer.Write(", ");
                    writer.Write("[");
                    AppendCoordinate(multiPoint[i], writer);
                    writer.Write("]");
                }
                writer.Write("]");
            }
        }

        /// 
        /// Converts a MultiLineString to &lt;MultiLineString Text&gt;
        /// format, then Appends it to the writer.
        /// 
        /// The MultiLineString to process.
        /// The output stream writer to Append to.
        private static void AppendMultiLineStringText(MultiLineString multiLineString, StringWriter writer)
        {

            if (multiLineString == null || multiLineString.IsEmpty())
                writer.Write("EMPTY");
            else
            {
                writer.Write("[");
                for (int i = 0; i < multiLineString.LineStrings.Count; i++)
                {
                    if (i > 0)
                        writer.Write(", ");
                    AppendLineStringText(multiLineString[i], writer);
                }
                writer.Write("]");
            }
        }

        /// 
        /// Converts a MultiPolygon to &lt;MultiPolygon Text&gt; format, then Appends to it to the writer.
        /// 
        /// The MultiPolygon to process.
        /// The output stream to Append to.
        private static void AppendMultiPolygonText(MultiPolygon multiPolygon, StringWriter writer)
        {

            if (multiPolygon == null || multiPolygon.IsEmpty())
                writer.Write("EMPTY");
            else
            {
                writer.Write("[");
                for (int i = 0; i < multiPolygon.Polygons.Count; i++)
                {
                    if (i > 0)
                        writer.Write(", ");
                    AppendPolygonText(multiPolygon[i], writer);
                }
                writer.Write("]");
            }
        }

        /// 
        /// Converts a GeometryCollection to &lt;GeometryCollection Text &gt; format, then Appends it to the writer.
        /// 
        /// The GeometryCollection to process.
        /// The output stream writer to Append to.
        private static void AppendGeometryCollectionText(GeometryCollection geometryCollection, StringWriter writer)
        {
            if (geometryCollection == null || geometryCollection.IsEmpty())
                writer.Write("EMPTY");
            else
            {
                writer.Write("[");
                for (int i = 0; i < geometryCollection.Collection.Count; i++)
                {
                    if (i > 0)
                        writer.Write(", ");
                    AppendGeometryTaggedText(geometryCollection[i], writer);
                }
                writer.Write("]");
            }
        }
        #endregion
    }
}
{% endcodeblock %}