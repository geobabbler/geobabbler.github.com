---
layout: blog
title: Rotating a Point Around a Base Point
post_author: bdollins
comments: true
categories:
- .net
- arcobjects
- esri
- gis
- software development
---

A while back, I was working on a project that required us to rotate a polygon around a base point and do a spatial query to analyze some underlying demographic data. I was working in ArcObjects and could find no intrinsic way to do what I needed to do so I wrote the following routine. As you can imagine, I had to break the polygon up into individual points and rotate each one. Despite the fact that I was using ArcObjects point objects and all of the attendant COM interop calls, it worked pretty well (a polygon consisting of ~5000 point was rotated in less than a second on a less-than-robust workstation).

The math is pretty simple: Assuming that the base point and target point form the two ends of the hypotenuse of a right triangle with one leg of the triangle being a segment of the X axis, you simply:
<ol>
	<li>Calculate the length of the hypotenuse</li>
	<li>Calculate the current angle of the hypotenuse</li>
	<li>Add the rotation angle to the current angle</li>
	<li>Calculate the coordinates of the new end point of the hypotenuse</li>
</ol>
The code below shows how to do it but there are a couple of notes about it:
<ul>
	<li>The coordinates must be in decimal degrees so you'll need to unproject any projected coordinates and then re-project the result. This <em>may</em> introduce some distortion. I didn't notice any in my application but I'd suggest some more rigorous testing if you've got tight precision requirements.</li>
	<li>Rotation follows engineering standards (zero East, counter-clockwise)</li>
	<li>This code is only mildly based on ArcObjects. It uses the AO IPoint interface and Point but that's it. It is trival to implement it with another point object (such as SharpMap) or just use numeric values.</li>
	<li>The base point is shifted to 0,0 and the same offset is applied to all other points in order to keep the math straightforward.</li>
	<li>It's in C#</li>
</ul>
So there it is. It's fairly simple but it's been useful for me on a couple of occasions since I wrote it.
{% codeblock lang:csharp %}
 private IPoint rotatePoint(IPoint basePoint, IPoint sourcePoint, double rotationAngle) 
 { 
     double r; 
     double theta; 
     double offsetX; 
     double offsetY; 
     double offsetTheta; 
     double rotateX; 
     double rotateY; 
     double rotationRadians; 
     IPoint retPoint; 
     try 
     { 
         //shift x and y relative to 0,0 origin 
         offsetX = (sourcePoint.X + (basePoint.X * -1)); 
         offsetY = (sourcePoint.Y + (basePoint.Y * -1)); 
         //convert to radians. take absolute value (necessary for x coord only). 
         offsetX = Math.Abs(offsetX * (Math.PI / 180)); 
         offsetY = offsetY * (Math.PI / 180); 
         rotationRadians = rotationAngle * (Math.PI / 180); 
         //get distance from origin to source point 
         r = Math.Sqrt(Math.Pow(offsetX, 2) + Math.Pow(offsetY, 2)); 
         //get current angle of orientation 
         theta = Math.Atan(offsetY / offsetX); 
         // add rotation value to theta to get new angle of orientation 
         offsetTheta = theta + rotationRadians; 
         //calculate new x coord 
         rotateX = r * Math.Cos(offsetTheta); 
         //calculate new y coord 
         rotateY = r * Math.Sin(offsetTheta); 
         //convert new x and y back to decimal degrees 
         rotateX = rotateX * (180 / Math.PI); 
         rotateY = rotateY * (180 / Math.PI); 
         //shift new x and y relative to base point 
         rotateX = (rotateX + basePoint.X); 
         rotateY = (rotateY + basePoint.Y); 
         //return new point 
         retPoint = new PointClass(); 
         retPoint.X = rotateX; 
         retPoint.Y = rotateY; 
         return retPoint; 
     } 
     catch 
     { 
         return sourcePoint; 
     } 
}
{% endcodeblock %}