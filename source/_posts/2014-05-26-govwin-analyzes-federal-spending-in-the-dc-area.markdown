---
layout: post
title: "GovWin Analyzes Federal Spending in the DC Area"
date: 2014-05-26 15:16
comments: true
categories: 
- Government
- Procurement
- DMV
- Map
---

[GovWin](http://www.deltek.com/products/govwin), the procurement research service of [DelTek, Inc](http://www.deltek.com/). recently released a report titled ["Federal Prime Spending in DC, MD, and VA"](http://more.deltek.com/LP=4108) (PDF, registration required) which analyzed federal spending patterns in those areas. The report included the top 20 counties, by total spending from FY10 to FY14. With permission from the GovWin research team, I made a simple interactive map of the data.

<iframe src="/assets/demos/govwin/map.html" marginwidth="0" marginheight="0" scrolling="no" style="width: 672px;height: 350px;border: 1px solid #DEDEDE"></iframe>

<!--more-->

The jurisdictions highlighted here are not particularly surprising, though the exclusion of Charles County, Maryland and King George County, Virginia caught my eye. Perhaps the inclusion of the Hampton Roads, Virginia rather than limiting the study to the usual Beltway region caused them to drop out. Those counties are home to Navy bases that provide a significant amount of jobs but the presence of a single base is clearly not enough to boost a county in comparison to those with a more diveresified presence of federal spending.

In some ways, the data follows the adage that all maps really just show population. In this case, the spending patterns generally follow the "dumbbell" (the Baltimore and Capital beltways connected by I-95), extended to include the I-66 corridor. The jurisdictions in this area feature large populations, significant presence of Federal agencies, and numerous offices of supporting contractors. The same holds true for the Hampton Roads area. The only real exception to this pattern is St. Mary's County, Maryland. Still largely rural, it benefits from the presence, in addition to a Naval Air Station, of the headquarters of Naval Air Systems Command; giving a boost from a significant amount of procurement related to Naval air power.

When charting out the year-by-year data, the general trend of decreasing government spending becomes apparent. This may not be a bad thing, as it is causing some local jurisdictions to look at strategies for diversifying away from heavy reliance on federal spending, especially from a single source.

## Top 20 Counties Ordered by Total Procurement <br/>
<iframe src="/assets/demos/govwin/chart.html" marginwidth="0" marginheight="0" scrolling="no" style="width: 672px;height: 510px;border: 1px solid #DEDEDE"></iframe>

What I found interesting was when I added the American Community Survey data for 2012 into the mix. By calculating the per capita procurement spending using the 2012 population estimate, the ordering of the jurisdictions changed noticeably. The most dramatic was Mannassas City, VA which is last in total procurement spending but fourth in per capita spending. Similarly, St. Mary's County, Maryland jumps from 13th to 5th when looking at per-capita spending. Conversely, Baltimore County, Maryland drops to 19th despite being 6th in total spending.

## Top 20 Counties Ordered by Per Capita Procurement <br/>
<iframe src="/assets/demos/govwin/percapita.html" marginwidth="0" marginheight="0" scrolling="no" style="width: 672px;height: 510px;border: 1px solid #DEDEDE"></iframe>

There's probably a bit more analysis that could be done in terms of per-capita spending and household or individual income. Since 'spending' is fully burdened, including all costs and not limited to only direct labor (salary) and fringe (benefits), such an analysis would need to include a reasonable assumption to factor out other indirect costs in order to arrive at a meaningful comparison. That factor would certainly have a geographic component since many overhead costs vary widely by location.

I found this report interesting because it starts to quantify the impact of contracting revenue on jurisdictions. This can be a bit nebulous in comparison to assessing the impact of payroll for government employees but is an important part of the overall picture. Understanding this picture can help jurisdictions that are currently heaviliy reliant on federal spending begin to plan how diversify themselves in the face of downward pressure on the federal budget.

---
For those that are curious, the procurement data was manually captured from the GovWin report and joined to the county data using [PostGIS](http://postgis.net). It was then exported as a static [GeoJSON](http://geojson.org) file for mapping using [Leaflet](http://leafletjs.com). Income and population data came from the US Census Bureau's [American Community Survey](http://www.census.gov/acs/www/) for 2012. The charts are built using [D3](http://d3js.org). All data, spatial and otherwise, is served as static content without the use of a map server of any kind.