---
layout: blog
title: IRasterLayer Export Gotcha in 9.2
post_author: bdollins
comments: true
categories:
- arcobjects
---

Not long ago, I was working on a project that required us to convert our rasters from their native format (mostly CADRG) to TIFF. We need to do do this because we were viewing them in a .NET 3.0 WPF control so we needed a format it could recognize.

At the outset, we were using Engine 9.1 and settled upon using the IRasterLayerExport.Export method. The choice of TIFF was driven by the fact that, at 9.1, it was the only output format this method supported that could be read by WPF. Everything worked fine. For those of you unfamiliar with this method, here is our call (abridged):

            rasterLayerExport = new RasterLayerExportClass();
            rasterLayerExport.RasterLayer = exportRasterLayer;
            rasterLayerExport.Force2RGB = true;
            rasterLayerExport.Export((IWorkspace)ws, outputName, "TIFF");

About half-way through (for a number of reasons), we upgraded to 9.2. It was at this point that we noticed that the TIFFs we were generating were no longer readable by WPF. After some research, we discovered that, instaed of a standard TIFF, this method now exports a GeoTIFF. The extra header information throws off WPF.

The good news? The IRasterLayerExport.Export method now supports many more output formats. We updated our code to export out to PNG and kept going.

All in all, I think the changes to this method are a net plus but I wanted to share that little gotcha. If you've been using it to export to external graphic applications, you'll want to do some testing.