---
layout: blog
title: Creating ArcObjects Spatial Reference Objects From PostGIS Spatial Reference Definitions
post_author: bdollins
comments: true
categories:
- arcobjects
- esri
- gis
- open source
- postgis
- postgresql
- ziggis
---

As discussed in my previous post, I'm trying to beef up the spatial reference support in zigGIS. I am doing this mainly to introduce support for user-defined spatial references. It pretty much boils down to querying the the appropriate SR from the PostGIS spatial_ref_sys table and applying the value of the srtext column to create a spatial reference in ArcObjects.

This approach has a few advantages and disadvantages. First, the advantages. Although both PostGIS and ESRI implement the EPSG spatial reference codes, there is not a one-to-one match between the two. Therefore, you could get an SRID in PostGIS that's not supported in ArcGIS. The approach described above should alleviate that, adding stability. Secondly, if you've created a user-defined spatial reference in PostGIS, you should be able to use it in ArcGIS.

The disadvantages are relatively minor. First, all of the spatial references, even those created from standard EPSG SRs will appear to ArcGIS as custom spatial references, mainly because of the differing syntax of the SR string. Also, some unit definitions from PostGIS are not specifically recognized by ArcGIS. For instance "US survey feet" is shown as "unknown" in ArcGIS. This last one may be more than minor, depending on if it has any effect on distance calculations and the like but I haven't gotten around to testing it yet.

So, how about some code? Here's a C# routine that I'm developing for zigGIS (don't look, it's not there yet). It's based on a previous routine that Paolo and I developed. I should note that the Connection and AutoDataReader objects are zigGIS classes that inherit from ADO.NET classes. You should be able to replace them with standard OleDbConnection and DataReader objects and be fine.

{% codeblock lang:csharp %}
        static public ISpatialReference setEsriSpatiaReferenceFromSrText(int srid, Connection conn)
        {
            ISpatialReference sr = new UnknownCoordinateSystemClass();
            string srText = "";
            int i = 0;
            try
            {
                //Bill: query srtext associated with srid
                AutoDataReader dr = conn.doQuery("select * from spatial_ref_sys where srid = " + srid.ToString());
                if (dr.Read())
                {
                    srText = dr["srtext"] + "";
                    ISpatialReferenceFactory2 srf = new SpatialReferenceEnvironmentClass();
                    if (srText == "")
                    {
                        sr = new UnknownCoordinateSystemClass();
                    }
                    else
                    {
                        //use srText to construct SR.
                        srf.CreateESRISpatialReference(srText, out sr, out i);
                    }
                }
                return sr;
            }
            catch
            {
                //PostGis srid is not implemented as an Esri Factory Code
                sr = new UnknownCoordinateSystemClass();
                return sr;
            }
        }
{% endcodeblock %}