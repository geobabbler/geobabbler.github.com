---
layout: post
title: "URL Utility for Twitter Direct Messages"
date: 2014-02-17 12:40
comments: true
categories:
- Twitter
- Social Media
- URL
- Silly 
---
When Twitter opened up direct messages (DMs) so that anyone could DM anyone else, they made it much more difficult to DM links. This is understandable as it makes DM spamming much more difficult. I have found that links to tweets and links to GitHub seem to work but many, many others do not.

This has led to a variety of strategies for sending a link, including cumbersome entry as something like "www[dot]microsoft[dot]com" or similar. The strategy I settled on was to replace slashes with pipes and dots with asterisks(http:||www\*microsoft\*com). It's easy and relatively risk free in terms of [RFC 3986](http://tools.ietf.org/html/rfc3986), but I'm still not a huge fan of typing and, if there will be errors introduced, it will most likely occur between the chair and the keyboard. As a result, I wrote myself a dirt-simple little tool to make my life easier. In the spirit of [making things and putting them on the internet](http://geohipster.com/2014/02/11/lyzi-diamond-make-things-put-internet/), I posted it as a utility on this site and [it can be found here](/samples/urltoken.html). It seems to do just enough to satisfy the Twitter filter, which is really all I'm after.

It's very simple but it makes my life easier. If I send you a link in this format, you can unroll it here. If you want to send a link, you can roll it up here. Feel free to try it and I hope you find it useful. Feedback is always welcome.