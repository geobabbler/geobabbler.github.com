---
layout: blog
title: Getting Started With a Python Wrapper For the WeoGeo API
post_author: bdollins
categories:
- gis
- programming
- Python
- WeoGeo
---

One of my <a href="http://geobabble.wordpress.com/2011/01/03/turning-it-up-to-11/">goals for 2011</a> was to sharpen my Python skills. As if on cue, <a href="http://www.weogeo.com">WeoGeo</a> puts out a Python wrapper for their RESTful API. It can be found <a href="http://code.google.com/p/weogeo-public-code/">here</a>. The good news is that I now have a familiar problem set to sink my teeth into. The bad news (for me) is that it's so easy to use it's probably not going to do much for my Python skills.

The wrapper addresses the full WeoGeo API (Datasets, Jobs, Events, etc.) so it exposes pretty much everything you can through through the WeoGeo SaaS. For example, here is a very simple browse operation:
<!--more-->

{% codeblock lang:python %}
import WeoGeoAPI

#do a simple browse of WeoGeo Market
session = WeoGeoAPI.weoSession('market.weogeo.com', '', '')
session.connectToMarket()
#send some parameters to look for vector data sets covering Washington, DC.
datasets = session.getDatasets('JSON', '&amp;data_type=VECTOR&amp;per_page=2&amp;page=1&amp;north=39.043&amp;south=38.767&amp;west=-77.2&amp;east=-77.906')
#prints the raw JSON response
print datasets
{% endcodeblock %}

The output, cleaned up with <a href="http://jsonlint.com/">JSONLint</a> is at the end of this post. The WeoGeo JSON output for a dataset is large so I used the 'per_page" parameter to limit the response to two datasets.

Since I started playing with the wrapper, WeoGeo has posted a test script which shows how to use it. I'll start playing with creating jobs next. A word of caution about jobs: I highly recommend creating your own individual WeoGeo library (free) and loading a couple of datasets to play with. Most of the datasets on WeoGeo Market are for sale commercially so that's probably not the best place to test an API.

In all, the wrapper seems pretty straightforward. I'm looking forward to working with it in more detail.

The JSON response to the browse executed above:
{% codeblock lang:js %}
{
    'per_page': 2,
    'total_entries': 34,
    'current_page': 1,
    'total_pages': 17,
    'items': [
        {
            'rating': 0.0,
            'projection': 'geo',
            'provider_margin': 1995.0,
            'uncompressed_misc_files_size': 7683891,
            'spatial_resolution': 0,
            'children_count': 0,
            'datum': 'WGS84',
            'library': {
                'name': 'Pitney Bowes - Business Insight',
                'id': 112
            },
            'kml_file_size': 0,
            'hosted': True,
            'market': 'Complete',
            'center_lat': 38.8051135,
            'layers': [
                'all'
            ],
            'east': -74.986282,
            'votes': 0,
            'content_license': {
                'url': 'http: //licenses.weogeo.com/licenses/8/original.PDF?1273263090',
                'name': 'PBBI Software and Data End User License v. April 2008'
            },
            'data_type': 'VECTOR',
            'royalty_model': 'CREDITED',
            'west': -79.487651,
            'scales': '6;7;8;9;10;11;12',
            'provider_discount_expires_at': None,
            'boundaries': {
                'geo': {
                    'proj4': '+proj=latlong +datum=wgs84',
                    'north': '39.723622',
                    'west': '-79.487651',
                    'datum': 'WGS84',
                    'projection_datum': 'geo-wgs84',
                    'east': '-74.986282',
                    'south': '37.886605'
                },
                'tiles': {
                    'number_of_lines': '316',
                    'number_of_samples': '316',
                    'datum': 'WGS84',
                    'line_pixel_size': '-830.510836842',
                    'sample_pixel_size': '1585.72818023',
                    'proj4': '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs',
                    'projection_datum': 'spherical_mercator',
                    'west': '-8848524.83367',
                    'north': '4825860.68838',
                    'east': '-8347434.72872',
                    'south': '4563419.26394'
                },
                'native': {
                    'number_of_lines': '316',
                    'number_of_samples': '316',
                    'datum': 'WGS84',
                    'line_pixel_size': '-830.510836842',
                    'sample_pixel_size': '1585.72818023',
                    'proj4': '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs',
                    'projection_datum': 'spherical_mercator',
                    'west': '-8848524.83367',
                    'north': '4825860.68838',
                    'east': '-8347434.72872',
                    'south': '4563419.26394'
                },
                'data': {
                    'proj4': '',
                    'datum': 'WGS84',
                    'projection_datum': 'geo-WGS84'
                },
                'baseimage': {
                    'number_of_lines': 0,
                    'number_of_samples': 0,
                    'west': '-8848524.833673440000000',
                    'line_pixel_size': 0,
                    'sample_pixel_size': 0,
                    'proj4': 'spherical_mercator',
                    'projection_datum': 'spherical_mercator',
                    'north': '4945185.028635530000000',
                    'east': '-8347434.728720820000000',
                    'south': '4444094.923682910000000'
                }
            },
            'tile_layer_type': 'xyz',
            'provider_discount_rate': 100,
            'provider_discount_expire_option': True,
            'x_conv': 1,
            'parents_count': 0,
            'status': 'Approved',
            'north': 39.723622,
            'description': '&lt;b&gt;StreetPro USA&lt;/b&gt;&lt;br&gt;\nVersion 2009.12&lt;br&gt;&lt;br&gt; \nStreetPro offers users a premier street-level data product featuring accuracy and street display quality unparalleled in the industry. It reflects real world geographic conditions with the most current street data available.&lt;br /&gt;With StreetPro,
            perform the most comprehensive,
            efficient and effective street-based analysis possible.&lt;br /&gt;&lt;br /&gt;StreetPro U.S.: &lt;br /&gt; * Provides the most complete,
            current and comprehensive streets on the market.&lt;br /&gt; * Integrates easily with Pitney Bowes Business Insight software.&lt;br /&gt; * Includes exclusive tools for use with Pitney Bowes Business Insight software.&lt;br /&gt; * Ships with display templates to get up and running quickly and easily with great looking maps.&lt;br /&gt;&lt;br /&gt;Created from Tele Atlas streets,
            this highly accurate street data is gathered from over 35,
            000 sources including E911 agencies,
            the U.S. Postal Service,
            city planning commissions,
            state departments of transportation and other local government sources. ',
            'spatial_resolution_in_meters': 0.0,
            'provider_min_margin': 477.67,
            'from_appliance?': False,
            'center_long': -77.2369665,
            'user': {
                'username': 'pbbidata',
                'rating': 5.0,
                'votes': 1
            },
            'data_created_on': '2009/12/15',
            'provider_max_discount': 304.32,
            'permalink': 'pbbidata_streetpro_maryland',
            'uploaded_at': '2010/05/06 15: 42: 51 -0400',
            'name': u'StreetPro\xae Maryland',
            'price_type': 'VARIABLE',
            'tile_file_format': 'png',
            'number_of_layers': 1,
            'file_format': 'mapinfo_tab',
            'token': '64ac8785-eab9-4856-b04b-1f33d872f511',
            'uncompressed_data_files_size': 127090387,
            'y_conv': 1,
            'max_price': 1995.0,
            'south': 37.886605
        },
        {
            'rating': 0.0,
            'projection': 'geo',
            'provider_margin': 1995.0,
            'uncompressed_misc_files_size': 7683891,
            'spatial_resolution': 0,
            'children_count': 0,
            'datum': 'WGS84',
            'library': {
                'name': 'Pitney Bowes - Business Insight',
                'id': 112
            },
            'kml_file_size': 0,
            'hosted': True,
            'market': 'Complete',
            'center_lat': 38.003375,
            'layers': [
                'all'
            ],
            'east': -75.166435,
            'votes': 0,
            'content_license': {
                'url': 'http: //licenses.weogeo.com/licenses/8/original.PDF?1273263090',
                'name': 'PBBI Software and Data End User License v. April 2008'
            },
            'data_type': 'VECTOR',
            'royalty_model': 'CREDITED',
            'west': -83.675415,
            'scales': '5;6;7;8;9;10;11;12',
            'provider_discount_expires_at': None,
            'boundaries': {
                'geo': {
                    'proj4': '+proj=latlong +datum=wgs84',
                    'north': '39.466012',
                    'west': '-83.675415',
                    'datum': 'WGS84',
                    'projection_datum': 'geo-wgs84',
                    'east': '-75.166435',
                    'south': '36.540738'
                },
                'tiles': {
                    'number_of_lines': '316',
                    'number_of_samples': '316',
                    'datum': 'WGS84',
                    'line_pixel_size': '-1308.10717344',
                    'sample_pixel_size': '2997.51683788',
                    'proj4': '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs',
                    'projection_datum': 'spherical_mercator',
                    'west': '-9314704.58972',
                    'north': '4788645.33132',
                    'east': '-8367489.26895',
                    'south': '4375283.46452'
                },
                'native': {
                    'number_of_lines': '316',
                    'number_of_samples': '316',
                    'datum': 'WGS84',
                    'line_pixel_size': '-1308.10717344',
                    'sample_pixel_size': '2997.51683788',
                    'proj4': '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs',
                    'projection_datum': 'spherical_mercator',
                    'west': '-9314704.58972',
                    'north': '4788645.33132',
                    'east': '-8367489.26895',
                    'south': '4375283.46452'
                },
                'data': {
                    'proj4': '',
                    'datum': 'WGS84',
                    'projection_datum': 'geo-WGS84'
                },
                'baseimage': {
                    'number_of_lines': 0,
                    'number_of_samples': 0,
                    'west': '-9314704.589715850000000',
                    'line_pixel_size': 0,
                    'sample_pixel_size': 0,
                    'proj4': 'spherical_mercator',
                    'projection_datum': 'spherical_mercator',
                    'north': '5055572.058304870000000',
                    'east': '-8367489.268945700000000',
                    'south': '4108356.737534730000000'
                }
            },
            'tile_layer_type': 'xyz',
            'provider_discount_rate': 100,
            'provider_discount_expire_option': True,
            'x_conv': 1,
            'parents_count': 0,
            'status': 'Approved',
            'north': 39.466012,
            'description': '&lt;b&gt;StreetPro USA&lt;/b&gt;&lt;br&gt;\nVersion 2009.12&lt;br&gt;&lt;br&gt; \nStreetPro offers users a premier street-level data product featuring accuracy and street display quality unparalleled in the industry. It reflects real world geographic conditions with the most current street data available.&lt;br /&gt;With StreetPro,
            perform the most comprehensive,
            efficient and effective street-based analysis possible.&lt;br /&gt;&lt;br /&gt;StreetPro U.S.: &lt;br /&gt; * Provides the most complete,
            current and comprehensive streets on the market.&lt;br /&gt; * Integrates easily with Pitney Bowes Business Insight software.&lt;br /&gt; * Includes exclusive tools for use with Pitney Bowes Business Insight software.&lt;br /&gt; * Ships with display templates to get up and running quickly and easily with great looking maps.&lt;br /&gt;&lt;br /&gt;Created from Tele Atlas streets,
            this highly accurate street data is gathered from over 35,
            000 sources including E911 agencies,
            the U.S. Postal Service,
            city planning commissions,
            state departments of transportation and other local government sources. ',
            'spatial_resolution_in_meters': 0.0,
            'provider_min_margin': 477.71,
            'from_appliance?': False,
            'center_long': -79.420925,
            'user': {
                'username': 'pbbidata',
                'rating': 5.0,
                'votes': 1
            },
            'data_created_on': '2009/12/15',
            'provider_max_discount': 304.37,
            'permalink': 'pbbidata_streetpro_virginia',
            'uploaded_at': '2010/05/06 14: 35: 58 -0400',
            'name': u'StreetPro\xae Virginia',
            'price_type': 'VARIABLE',
            'tile_file_format': 'png',
            'number_of_layers': 1,
            'file_format': 'mapinfo_tab',
            'token': '06ce3537-deb2-cc51-a081-2360eff828f7',
            'uncompressed_data_files_size': 234980712,
            'y_conv': 1,
            'max_price': 1995.0,
            'south': 36.540738
        }
    ]
}
{% endcodeblock %}