---
layout: blog
title: SQL Server 2008 SharpMap Data Provider Code
post_author: bdollins
comments: true
categories:
- c#
- database
- gis
- open source
- sharpmap
- sql server
- sql server spatial
---

As promised, I have uploaded the data provider code I <a href="http://geobabble.wordpress.com/2007/11/20/sharpmap-and-sql-server-2008-spatial/">mentioned earlier</a> to the <a href="http://www.codeplex.com/SharpMap">SharpMap</a> site. It's written in C#. I took the existing Oracle provider, stripped out the Oracle SQL and put in T-SQL. There are a couple of things I'm still trying to chase down but it's basically done at this point. I know they're busy trying to finish up SharpMap 2.0 so I don't know how long it'll take to become available. Just in case, here's the code:<!--more-->

{% codeblock lang:csharp %}
// Copyright 2008 - William Dollins
// SQL Server 2008 by William Dollins (dollins.bill@gmail.com)
// Based on Oracle provider by Humberto Ferreira (humbertojdf@hotmail.com)
//
// Date 2007-11-28
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

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Data.SqlClient;


namespace SharpMap.Data.Providers
{
	/// 
	/// SQL Server 2008 data provider
	/// 
	/// 
	/// This provider was developed against the SQL Server 2008 November CTP. The platform may change significantly before release.
	/// 
	/// Adding a datasource to a layer:
	/// <code lang="C#">
	/// SharpMap.Layers.VectorLayer myLayer = new SharpMap.Layers.VectorLayer("My layer");
    ///	string ConnStr = "Provider=SQLOLEDB.1;Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=myDB;Data Source=myServer\myInstance";
	/// myLayer.DataSource = new SharpMap.Data.Providers.Katmai(ConnStr, "myTable", "GeomColumn", "OidColumn");
	/// </code>
	/// 
    /// SharpMap SQL Server 2008 provider by Bill Dollins (dollins.bill@gmail.com). Based on the Oracle provider written by Humberto Ferreira.
	/// 
	[Serializable]
	public class Katmai : SharpMap.Data.Providers.IProvider, IDisposable
	{
		/// 
		/// Initializes a new connection to SQL Server
		/// 
		/// Connectionstring
		/// Name of data table
		/// Name of geometry column
		/// /// Name of column with unique identifier
		public Katmai(string ConnectionStr, string tablename, string geometryColumnName, string OID_ColumnName)
		{
            //Provider=SQLOLEDB.1;Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=ztTest;Data Source=\
			this.ConnectionString = ConnectionStr;
			this.Table = tablename;
			this.GeometryColumn = geometryColumnName;
			this.ObjectIdColumn = OID_ColumnName;
		}

 		/// 
		/// Initializes a new connection to SQL Server
		/// 
		/// Connectionstring
		/// Name of data table
		/// Name of column with unique identifier
		public Katmai(string ConnectionStr, string tablename, string OID_ColumnName) : this(ConnectionStr,tablename,"",OID_ColumnName)
		{
			this.GeometryColumn = "shape";
		}

		private bool _IsOpen;

		/// 
		/// Returns true if the datasource is currently open
		/// 
		public bool IsOpen
		{
			get { return _IsOpen; }
		}

		/// 
		/// Opens the datasource
		/// 
		public void Open()
		{
			//Don't really do anything.
			_IsOpen = true;
		}
		/// 
		/// Closes the datasource
		/// 
		public void Close()
		{
			//Don't really do anything.
			_IsOpen = false;
		}
	

		#region Disposers and finalizers
		private bool disposed = false;

		/// 
		/// Disposes the object
		/// 
		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
		}

		internal void Dispose(bool disposing)
		{
			if (!disposed)
			{
				if (disposing)
				{
					//Close();
				}
				disposed = true;
			}
		}

		/// 
		/// Finalizer
		/// 
		~Katmai()
		{
			Dispose();
		}
		#endregion

		private string _ConnectionString;

		/// 
		/// Connectionstring
		/// 
		public string ConnectionString
		{
			get { return _ConnectionString; }
			set { _ConnectionString = value; }
		}

		private string _Table;

		/// 
		/// Data table name
		/// 
		public string Table
		{
			get { return _Table; }
			set { _Table = value; }
		}

		private string _GeometryColumn;

		/// 
		/// Name of geometry column
		/// 
		public string GeometryColumn
		{
			get { return _GeometryColumn; }
			set { _GeometryColumn = value; }
		}

		private string _ObjectIdColumn;

		/// 
		/// Name of column that contains the Object ID
		/// 
		public string ObjectIdColumn
		{
			get { return _ObjectIdColumn; }
			set { _ObjectIdColumn = value; }
		}
	

		/// 
		/// Returns geometries within the specified bounding box
		/// 
		/// 
		/// 
		public Collection GetGeometriesInView(SharpMap.Geometries.BoundingBox bbox)
		{
            Collection features = new Collection();
            using (SqlConnection conn = new SqlConnection(_ConnectionString))
			{
                //Get bounding box string
                string strBbox = GetBoxFilterStr(bbox);

				string strSQL = "SELECT g." + this.GeometryColumn +".STAsBinary() ";
				strSQL += " FROM " + this.Table + " g WHERE ";

				if (!String.IsNullOrEmpty(_defintionQuery))
					strSQL += this.DefinitionQuery + " AND ";

				strSQL += strBbox;

				using (SqlCommand command = new SqlCommand(strSQL, conn))
				{
					conn.Open();
					using (SqlDataReader dr = command.ExecuteReader())
					{						
						while (dr.Read())
						{
							if (dr[0] != DBNull.Value)
							{
								SharpMap.Geometries.Geometry geom = SharpMap.Converters.WellKnownBinary.GeometryFromWKB.Parse((byte[])dr[0]);                               
                                if(geom!=null)
									features.Add(geom);								
							}
						}				
					}
					conn.Close();
				}
			}
			return features;
		}

		/// 
		/// Returns the geometry corresponding to the Object ID
		/// 
		/// Object ID
		/// geometry
		public SharpMap.Geometries.Geometry GetGeometryByID(uint oid)
		{
			SharpMap.Geometries.Geometry geom = null;
            using (SqlConnection conn = new SqlConnection(_ConnectionString))
			{
                string strSQL = "SELECT g." + this.GeometryColumn + ".STAsBinary() FROM " + this.Table + " g WHERE " + this.ObjectIdColumn + "='" + oid.ToString() + "'";
				conn.Open();
				using (SqlCommand command = new SqlCommand(strSQL, conn))
				{
					using (SqlDataReader dr = command.ExecuteReader())
					{
						while (dr.Read())
						{
							if (dr[0] != DBNull.Value)
								geom = SharpMap.Converters.WellKnownBinary.GeometryFromWKB.Parse((byte[])dr[0]);
						}
					}
				}
				conn.Close();
			}
			return geom;
		}
		/// 
		/// Returns geometry Object IDs whose bounding box intersects 'bbox'
		/// 
		/// 
		/// 
		public Collection GetObjectIDsInView(SharpMap.Geometries.BoundingBox bbox)
		{
			Collection objectlist = new Collection();
            using (SqlConnection conn = new SqlConnection(_ConnectionString))
			{

                //Get bounding box string
                string strBbox = GetBoxFilterStr(bbox);

				string strSQL = "SELECT g." + this.ObjectIdColumn + " ";
				strSQL += "FROM " + this.Table + " g WHERE ";

				if (!String.IsNullOrEmpty(_defintionQuery))
					strSQL += this.DefinitionQuery + " AND ";

				strSQL += strBbox;                

				using (SqlCommand command = new SqlCommand(strSQL, conn))
				{
					conn.Open();
					using (SqlDataReader dr = command.ExecuteReader())
					{
						while (dr.Read())
						{
							if (dr[0] != DBNull.Value)
							{
                                uint ID = (uint)(decimal)dr[0];
								objectlist.Add(ID);
							}
						}
					}
					conn.Close();
				}
			}
			return objectlist;
		}

        /// 
        /// Returns the box filter string needed in SQL query
        /// 
        /// 
        /// 
        private string GetBoxFilterStr(SharpMap.Geometries.BoundingBox bbox) {
            //geography::STGeomFromText('LINESTRING(47.656 -122.360, 47.656 -122.343)', 4326);
            SharpMap.Geometries.LinearRing lr = new SharpMap.Geometries.LinearRing();
            lr.Vertices.Add(new SharpMap.Geometries.Point(bbox.Left, bbox.Bottom));
            lr.Vertices.Add(new SharpMap.Geometries.Point(bbox.Right, bbox.Bottom));
            lr.Vertices.Add(new SharpMap.Geometries.Point(bbox.Right, bbox.Top));
            lr.Vertices.Add(new SharpMap.Geometries.Point(bbox.Left, bbox.Top));
            lr.Vertices.Add(new SharpMap.Geometries.Point(bbox.Left, bbox.Bottom));
            SharpMap.Geometries.Polygon p = new SharpMap.Geometries.Polygon(lr);
            string bboxText = SharpMap.Converters.WellKnownText.GeometryToWKT.Write((SharpMap.Geometries.IGeometry)p); // "";
            string whereClause = this.GeometryColumn + ".STIntersects(geometry::STGeomFromText('" + bboxText + "', " + this.SRID.ToString() + ")) = 1";
            return whereClause; // strBbox;
        }

		/// 
		/// Returns the features that intersects with 'geom'
		/// 
		/// 
		/// FeatureDataSet to fill data into
		public void ExecuteIntersectionQuery(SharpMap.Geometries.Geometry geom, FeatureDataSet ds)
		{
			List features = new List();
            using (SqlConnection conn = new SqlConnection(_ConnectionString))
			{
				//TODO: Convert to SQL Server
                string strGeom = "geography::STGeomFromText('" + geom.AsText() + "', #SRID#)";

                if (this.SRID > 0) {
                    strGeom = strGeom.Replace("#SRID#", this.SRID.ToString());
                } else {
                    strGeom = strGeom.Replace("#SRID#", "0");
                }
                strGeom = this.GeometryColumn + ".STIntersects(" + strGeom + ") = 1";

                string strSQL = "SELECT g.* , g." + this.GeometryColumn + ").STAsBinary() As sharpmap_tempgeometry FROM " + this.Table + " g WHERE ";

				if (!String.IsNullOrEmpty(_defintionQuery))
					strSQL += this.DefinitionQuery + " AND ";

				strSQL += strGeom;

				using (SqlDataAdapter adapter = new SqlDataAdapter(strSQL, conn))
				{
					conn.Open();
					adapter.Fill(ds);
					conn.Close();
					if (ds.Tables.Count > 0)
					{
						FeatureDataTable fdt = new FeatureDataTable(ds.Tables[0]);
						foreach (System.Data.DataColumn col in ds.Tables[0].Columns)
							if (col.ColumnName != this.GeometryColumn && col.ColumnName != "sharpmap_tempgeometry")
								fdt.Columns.Add(col.ColumnName, col.DataType, col.Expression);
						foreach (System.Data.DataRow dr in ds.Tables[0].Rows)
						{
							SharpMap.Data.FeatureDataRow fdr = fdt.NewRow();
							foreach (System.Data.DataColumn col in ds.Tables[0].Columns)
								if (col.ColumnName != this.GeometryColumn && col.ColumnName != "sharpmap_tempgeometry")
									fdr[col.ColumnName] = dr[col];
							fdr.Geometry = SharpMap.Converters.WellKnownBinary.GeometryFromWKB.Parse((byte[])dr["sharpmap_tempgeometry"]);
							fdt.AddRow(fdr);
						}
						ds.Tables.Add(fdt);
					}
				}
			}
		}

		/// 
		/// Convert WellKnownText to linestrings
		/// 
		/// 
		/// 
		private SharpMap.Geometries.LineString WktToLineString(string WKT)
		{
			SharpMap.Geometries.LineString line = new SharpMap.Geometries.LineString();
			WKT = WKT.Substring(WKT.LastIndexOf('(') + 1).Split(')')[0];
			string[] strPoints = WKT.Split(',');
			foreach (string strPoint in strPoints)
			{
				string[] coord = strPoint.Split(' ');
				line.Vertices.Add(new SharpMap.Geometries.Point(double.Parse(coord[0], SharpMap.Map.numberFormat_EnUS), double.Parse(coord[1], SharpMap.Map.numberFormat_EnUS)));
			}
			return line;
		}

		/// 
		/// Returns the number of features in the dataset
		/// 
		/// number of features
		public int GetFeatureCount()
		{
			int count = 0;
            using (SqlConnection conn = new SqlConnection(_ConnectionString))
			{
				string strSQL = "SELECT COUNT(*) FROM " + this.Table;
				if (!String.IsNullOrEmpty(_defintionQuery))
					strSQL += " WHERE " + this.DefinitionQuery;
				using (SqlCommand command = new SqlCommand(strSQL, conn))
				{
					conn.Open();
					count = (int)command.ExecuteScalar();
					conn.Close();
				}				
			}
			return count;
		}

		#region IProvider Members

		private string _defintionQuery;

		/// 
		/// Definition query used for limiting dataset
		/// 
		public string DefinitionQuery
		{
			get { return _defintionQuery; }
			set { _defintionQuery = value; }
		}

		/// 
		/// Gets a collection of columns in the dataset
		/// 
		public System.Data.DataColumnCollection Columns
		{
			get {
				throw new NotImplementedException();
			}
		}

		private int _srid = 0;

		/// 
		/// Spacial Reference ID
		/// 
		public int SRID
		{
			get {
				return _srid;
			}
			set {
                _srid = value;
			}
		}



		/// 
		/// Returns a datarow based on a RowID
		/// 
		/// 
		/// datarow
		public SharpMap.Data.FeatureDataRow GetFeature(uint RowID)
		{
            using (SqlConnection conn = new SqlConnection(_ConnectionString))
			{
                string strSQL = "select g.* , g." + this.GeometryColumn + ".STAsBinary() As sharpmap_tempgeometry from " + this.Table + " g WHERE " + this.ObjectIdColumn + "=" + RowID.ToString() + "";
                using (SqlDataAdapter adapter = new SqlDataAdapter(strSQL, conn))
				{
					FeatureDataSet ds = new FeatureDataSet();
					conn.Open();
					adapter.Fill(ds);
					conn.Close();
					if (ds.Tables.Count > 0)
					{
						FeatureDataTable fdt = new FeatureDataTable(ds.Tables[0]);
						foreach (System.Data.DataColumn col in ds.Tables[0].Columns)
							if (col.ColumnName != this.GeometryColumn && col.ColumnName != "sharpmap_tempgeometry")
								fdt.Columns.Add(col.ColumnName, col.DataType, col.Expression);
						if(ds.Tables[0].Rows.Count>0)
						{
							System.Data.DataRow dr = ds.Tables[0].Rows[0];
							SharpMap.Data.FeatureDataRow fdr = fdt.NewRow();
							foreach (System.Data.DataColumn col in ds.Tables[0].Columns)
								if (col.ColumnName != this.GeometryColumn && col.ColumnName != "sharpmap_tempgeometry")
									fdr[col.ColumnName] = dr[col];
							fdr.Geometry = SharpMap.Converters.WellKnownBinary.GeometryFromWKB.Parse((byte[])dr["sharpmap_tempgeometry"]);
							return fdr;
						}
						else
							return null;

					}
					else 
						return null;
				}				
			}
		}

		/// 
		/// Boundingbox of dataset
		/// 
		/// boundingbox
		public SharpMap.Geometries.BoundingBox GetExtents()
		{
            using (SqlConnection conn = new SqlConnection(_ConnectionString))
            {
                string strSQL = "SELECT g." + this.GeometryColumn + ".STEnvelope().STAsText() FROM " + this.Table + " g ";
                if (!String.IsNullOrEmpty(_defintionQuery))
                    strSQL += " WHERE " + this.DefinitionQuery;
                using (SqlCommand command = new SqlCommand(strSQL, conn))
                {
                    conn.Open();
                    //SharpMap.Geometries.Geometry geom = null;
                    SharpMap.Geometries.BoundingBox bx = null;
                    SqlDataReader dr = command.ExecuteReader();
                    while (dr.Read())
                    {
                        string wkt = dr.GetString(0); //[this.GeometryColumn];
                        SharpMap.Geometries.Geometry g = SharpMap.Converters.WellKnownText.GeometryFromWKT.Parse(wkt);
                        SharpMap.Geometries.BoundingBox bb = g.GetBoundingBox();
                        if (bx == null)
                        {
                            bx = bb;
                        }
                        else
                        {
                            bx = bx.Join(bb);
                         }
                    }
                    dr.Close();
                    conn.Close();
                    return bx;
                }
            }
		}

		/// 
		/// Gets the connection ID of the datasource
		/// 
		public string ConnectionID
		{
			get { return _ConnectionString; }
		}

		#endregion

		#region IProvider Members

		/// 
		/// Returns all features with the view box
		/// 
		/// view box
		/// FeatureDataSet to fill data into
		public void ExecuteIntersectionQuery(SharpMap.Geometries.BoundingBox bbox, SharpMap.Data.FeatureDataSet ds)
		{
			List features = new List();
            using (SqlConnection conn = new SqlConnection(_ConnectionString))
			{
                //Get bounding box string
                string strBbox = GetBoxFilterStr(bbox);

                string strSQL = "SELECT g.*, g." + this.GeometryColumn + ".Get_WKB() AS sharpmap_tempgeometry ";
				strSQL += "FROM " + this.Table + " g WHERE ";

				if (!String.IsNullOrEmpty(_defintionQuery))
					strSQL += this.DefinitionQuery + " AND ";

				strSQL += strBbox;

                using (SqlDataAdapter adapter = new SqlDataAdapter(strSQL, conn))
				{
					conn.Open();
					System.Data.DataSet ds2 = new System.Data.DataSet();
					adapter.Fill(ds2);
					conn.Close();
					if (ds2.Tables.Count > 0)
					{
						FeatureDataTable fdt = new FeatureDataTable(ds2.Tables[0]);
						foreach (System.Data.DataColumn col in ds2.Tables[0].Columns)
							if (col.ColumnName != this.GeometryColumn && col.ColumnName != "sharpmap_tempgeometry")
								fdt.Columns.Add(col.ColumnName,col.DataType,col.Expression);
						foreach (System.Data.DataRow dr in ds2.Tables[0].Rows)
						{
							SharpMap.Data.FeatureDataRow fdr = fdt.NewRow();
							foreach(System.Data.DataColumn col in ds2.Tables[0].Columns)
								if (col.ColumnName != this.GeometryColumn && col.ColumnName != "sharpmap_tempgeometry")
									fdr[col.ColumnName] = dr[col];
							fdr.Geometry = SharpMap.Converters.WellKnownBinary.GeometryFromWKB.Parse((byte[])dr["sharpmap_tempgeometry"]);
							fdt.AddRow(fdr);								
						}
						ds.Tables.Add(fdt);
					}
				}
			}
		}
		#endregion
	}
}
{% endcodeblock %}