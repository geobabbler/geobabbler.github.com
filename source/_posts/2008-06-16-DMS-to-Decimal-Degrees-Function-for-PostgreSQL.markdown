---
layout: blog
title: DMS to Decimal Degrees Function for PostgreSQL
post_author: bdollins
comments: true
categories:
- gis
- postgresql
---

<!--zekiah -->
For another project, I had to work with a PostgreSQL table that was storing locations in Degrees/Minutes/Seconds. We had to create an event layer in ArcGIS so they had to be converted to decimal degrees. The server was not using PostGIS and I really had no control over the configuration (although the admins would let us create views or functions to facilitate what we needed). So I wrote a function to accomplish the conversion and allow us to create a view. It was pretty simple (and others may have more elegant approaches) but I figured I'd post it to save someone else some work in the future. Here's the code:

{% codeblock lang:postgres %}
CREATE OR REPLACE FUNCTION dms2dd(
       D integer, M integer, S integer, HEMI character varying(1)
   ) RETURNS double precision AS $$
   DECLARE
      ret double precision;
      dir integer;
   BEGIN
      dir := 1; --init to 1 for default positive return
      ret := 0; --init to zero.
      --ONLY S or W will trip this. Any other letter or NULL will result in positive return value
      IF UPPER(HEMI) = 'S' OR UPPER(HEMI) = 'W' THEN
	dir := -1; --then southern or western hemisphere
      END IF;
      --SOME data has negative values in minutes and seconds as well as degrees. Use ABS to standardize all three.
      ret := (ABS(CAST(D as double precision)) + (ABS((CAST(M as double precision) + (ABS((CAST(S as double precision))/60)))/60)));
      ret := ret * dir;
      RETURN ret;

  END;
  $$ LANGUAGE plpgsql;
{% endcodeblock %}

The function doesn't care whether it's latitude or longitude. You'll also notice that it's not doing any bounds checking. That's because our table had a constraint limiting the degree values of latitude and longitude to between -90/90 and -180/180 respectively. There's still a little room for error on the aggregated value, though. Our table had D, M, S and the hemisphere indicator stored in separate columns. The numeric values were stored as integers.

The usage for my table was:

{% codeblock lang:postgres %}
SELECT dms2dd(lat_d,lat_m,lat_s,lat_hemi) as latitude,
 lat_d, lat_m, lat_s, lat_hemi,
  dms2dd(lon_d,lon_m,lon_s,lon_hemi) as longitude,
   lon_d, lon_m, lon_s as latitude from dms_coords;
{% endcodeblock %}
Enjoy.