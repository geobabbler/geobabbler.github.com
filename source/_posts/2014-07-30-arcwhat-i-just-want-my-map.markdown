---
layout: post
title: "ArcWhat? I Just Want My Map."
date: 2014-07-30 15:19
comments: true
categories: 
- GIS
- Esri
- ESRI
- ArcGIS
- Mess
- Confusion
---
### TL;DR:

What follows is probably my last post related to the Esri User Conference and is highly Esri-centric. Open-source readers may want to jump off here, or exercise a willing suspension of disbelief.

-----

[A couple of posts ago](http://blog.geomusings.com/2014/07/16/the-esri-uc-so-far/), I did something that I generally try to avoid. I took [Esri](http://www.esri.com) to task for its confusing product names without really offering any thoughts on how to make things better. I don't really like it when people do that to me so I'll try to correct that here. It bears noting that I was not the only person feeling this way at the UC. I was happy to see [Adena's post over at Directions](http://www.directionsmag.com/articles/making-sense-of-the-2014-esri-international-user-conference/410201) touch on this and it also came up in a number of conversations I had while I was in San Diego. 

Here are some things that I think may help. They represent most of the stumbling blocks I typically encounter when doing consulting/integration with Esri-centric users, especially new ones.

-> <img src="http://upload.wikimedia.org/wikipedia/commons/9/93/Spaghetti.jpg" /> <br/>
 <sub>"<a href="http://commons.wikimedia.org/wiki/File:Spaghetti.jpg#mediaviewer/File:Spaghetti.jpg">Spaghetti</a>". Licensed under <a href="http://creativecommons.org/licenses/by-sa/3.0/" title="Creative Commons Attribution-Share Alike 3.0<p></p>">CC BY-SA 3.0</a> via <a href="//commons.wikimedia.org/wiki/">Wikimedia Commons</a>.<sub> <-

<!--more-->

1. Retire the "Arc" prefix - It's confusing to have a relatively meaningless and seemingly random (to new users) prefix attached to everying. If you are moving to a platform concept, shouldn't that platform just bear your name? The company is Esri, the platform should be "Esri GIS" or something. Don't hide from your own product line. "Arc" is a verbal stumbling block. Try telling a user how to publish a map online and see how many times you say "Arc." Is it any wonder they get confused? It's like the old dog food commercial, except all they hear is "Blah blah Arc blah Arc blah blah Arc."

2. Acknowledge four environments for the platform - Mobile, Desktop, Server, Online. Period. "Esri GIS Desktop" or "Esri GIS Server" for example. Clean up spurious products that just clutter the menu. The current Explorer? Esri GIS Mobile (resist the urge to tack on "for iOS"). The current Portal? Esri GIS Online (Online can offer a hosted or on-premise version). What's the distinction between Esri GIS Server and an on-premise instance of Esri GIS Online? I don't know. Those are your waters to unmuddy.

3. One Desktop - Basic? Standard? Advanced? How about just Desktop? After 15 or so years of selling the three tiers, you should have enough data on the sales mix to set one normalized price for a fully-functional desktop product and be done with it. I suspect that price would hover somewhere between the current prices of Basic and Standard, perhaps closer to Standard. Everybody pays one price, everybody gets the current Advanced product. If nothing else, that code base should have long since paid for itself. Then you'll be better positioned for the inevitable transition to Esri GIS Pro (which could really just be the next Esri GIS Desktop) that everyone sees coming. Need more? Buy extensions. 

4. Speaking of Extensions - You can have too much of a good thing. Roll some of them into core products (like Spatial Analyst). Doing so will assure users that a common set of tools will be available as they move between the environments (see item number 2). Furthermore, stop calling everything an "extension," which exacerbates the need for cumbersome qualifiers like "for Desktop" and "for Server." Choose a standard nomenclature for each environment and stick with it. Desktop can have "extensions" and server can have "adapters," for example. Then I know that a discussion about the Network Analyst Adapter is focused on Server.

5. Stop changing product names - Take any of the suggestions above, or do something else entirely. But, whatever you do, leave it alone once you're done. At least for a couple of dot releases, anyway.