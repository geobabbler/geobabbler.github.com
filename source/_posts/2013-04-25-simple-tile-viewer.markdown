---
layout: post
title: "Simple Tile Viewer"
date: 2013-04-25 14:00
comments: true
categories: 
- node.js
- javascript
- GIS
- Leaflet
- tiles
---
We do a lot of tiles for various customers at [Zekiah](http://www.zekiah.com). Tiling is as much art as science and sometimes things go wrong so we have a range of utilities that we use to perform various kids of QA. Because the caches can be large, we usually want to perform a visual QA on the static tiles before pushing them up to wherever they are going to live full-time.

-> <img src="/images/posts/cacheviewer2.png" /> <-

In order to facilitate that, I wrote a very simple tile viewer using [Node.js](http://nodejs.org/) and [Leaflet](http://leafletjs.com/). It uses a config file to get everything it needs to operate so we just make our changes there. This application currently only works with Web Mercator tiles but I'm working on adding support for WGS84. It also doesn't work with 'compact' tiles from ArcGIS Server. It obviously requires Node, and it also requires an [NPM](https://npmjs.org/) install of the 'open' module to facilitate opening the browser.

Anything else you need to know is in the readme. I hope you find it useful. It can be [downloaded here](https://github.com/geobabbler/cacheview).
