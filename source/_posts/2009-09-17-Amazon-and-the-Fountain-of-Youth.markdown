---
layout: blog
title: Amazon and the Fountain of Youth
post_author: bdollins
categories:
- Amazon
- software development
- where did that come from?
---

Yesterday, I enjoyed Seth Godin's post titled <a href="http://sethgodin.typepad.com/seths_blog/2009/09/the-end-of-dumb-software.html">"The End of Dumb Software."</a> This morning, I got an e-mail started off like this:

<blockquote>
Dear Amazon.com Customer,
As someone who has purchased or rated books by Norman Bridwell, you might like to know that <em>Clifford The Champion</em> will be released on October 1, 2009.  You can pre-order yours at a savings of $5.20 by following the link below.
</blockquote><!--more-->

This e-mail serves as another great example of Seth Godin's point.

About 10 years ago, I ordered a set of "Clifford the Big Red Dog" books for my son, who was about two years old at the time. I had the package addressed to him and he was quite delighted by the idea that the mail carrier just brought him some Clifford books. We got quite a lot of enjoyment out of reading those books to him and, later, having him read them to us.

Over years, I have continued to get e-mail announcements such as the one above about the release of a new Clifford book or a sale on older books. Each time I get one, I shake my head for Amazon in sympathy for its lost opportunity.

What gets me is that Amazon already has all of the information its needs to make this process smarter. It knows what book I bought and when I bought it and has demonstrated that it is willing to store and use that information for a very long time. If you look up the reading level of <a href="http://www.amazon.com/gp/product/0590442805/ref=s9_simz_gw_s0_p14_i1?pf_rd_m=ATVPDKIKX0DER&amp;pf_rd_s=center-2&amp;pf_rd_r=1DS0ZZV66M3V927HNKDR&amp;pf_rd_t=101&amp;pf_rd_p=470938631&amp;pf_rd_i=507846">a Clifford book</a>, you will see that it says it's for reading levels of 4 - 8 years. If you know nothing else about me, you can add 10 to 4 - 8 can come up with the assumption that my child is now between 14 and 18 years old. (You'd be wrong because it misses the fact that many parents read these books to kids who are much younger but not as wrong as the current case.) 

However, in Amazon-land, my son is still apparently 4 - 8 years old and interested in Clifford books. Having recently passed the age of 40, Amazon-land is looking pretty attractive.

I understand the mechanics of the current approach. When a new Clifford book is coming out, you query your database for anyone who ever bought one and blast an e-mail. It's a relatively low cost process beyond a momentary surge in bandwidth and may net you a good number of sales given the size of the Amazon database. But is it really low cost? What is the cost in lost customer confidence when someone like me gets one of those e-mails and thinks "do they really think I need Clifford books after ten years?" Maybe Amazon's sales volume is such that it doesn't really matter to them but I doubt that.

Given the computing power demonstrated by Amazon with its EC2 and S3 offerings, it clearly has the resources to be smarter. Rather than a simple dumb e-mail blast, it could <em>actually use</em> the data it already collects about customers, sales and products (books in this case) to target its promotions automatically. Would be that hard to cross-reference the "progressed age" of my child with books that target that age group. Most 14 - 18 year-olds are, at a minimum, having to deal with required reading lists in high school that draw from a pretty standard list of titles. Not to mention cross-referencing sales data of popular or new titles relevant to the age group. 

Of cource, this isn't just relevant to children's books. Amazon has been around long enough and collected enough data that it should be more effectively tracking, analyzing and taking advantage of the changing demographics of its customer base. Ultimately, Amazon would target its promotions better and I, as a customer, may get more relevant information from it.

While it would be harder to implement than a simple blast, I have a hard time imagining that a little temporal reasoning wouldn't be a better approach for both Amazon and its customers.