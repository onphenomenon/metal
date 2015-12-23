---
title: Android Mobile
author: Karianne Burns
template: post.hbt
---
Horizontal to Vertical:
Width/ Height:

Aspect Ratio Media Queries like landscape and portrait are used to test the width of the display. However what if need to target unusual behavior with window resizing?
Aspect ratios are represented by the horizontal ratio and the vertical ratio, with two numbers like this 4:3, CSS uses 4/3.

To test for landscape media, could do the following:
@media screen and (min-aspect-ratio: 1/1) { /* landscape styles here
This just means “whenever the width is greater than the height, apply these styles”, width is top number, horizontal.

To test for portrait:
@media screen and (max-aspect-ratio: 1/1) { /* portrait styles here
Which means “whenever the width is less than the height, apply these styles”, height is bottom number;

To test for

The media query describes the aspect ratio of the targeted display area of the device/window. If the screen is within the bounds of the denoted ratio, the query will go into effect.

@media screen and (min-aspect-ratio: 8/5){…} Describes the aspect ratio of the of the targeted display area.
@media screen and (min-device-aspect-ratio: 8/5) Describes the physical aspect ratio of the screen itself.

If the window aspect is 8:5 or higher, call this css (8:4, 8:3);

Issue with Chrome for Android: When the software keyboard is displayed, the browser window is resized, and a window.orientenationchange event in JavaScript, causing CSS media queries to be applied.

Web apps with a different layout for portrait and landscape orientation can break when keyboard is displayed. When the keyboard is displayed, Droid can go from 360px wide by 640px tall to 360px by 253px when the keyboard is displayed; This makes the screen size appear to the browser to be slightly square landscape orientation.

Now orientation: landscape media queries apply and break the layout.
We need to capture the weird keyboard edge case:
The orientation of the Droid screen in portrait orientation when the keyboard displayed is 360 by 253: 1.4, use 13/9

For landscape media:


@media screen and (min-aspect-ratio: 13/9) { /* landscape styles here 


And for portrait media:

@media screen and (max-aspect-ratio: 13/9) { /* portrait styles here

"anything that is portrait-to-slightly-landscape gets the portrait styles, anything wider gets landscape styles”.

Only shows up when you have highly precise portrait and landscape layout for a website or app which require a text entry in a form field, breaks your layout.

Moto X pure edition:
1440 x 2560 pixels

Moto 2nd generation
1080 x 1920 pixels

http://robandlauren.com/2014/04/03/aspect-ratio-media-queries/

http://blog.abouthalf.com/development/orientation-media-query-challenges-in-android-browsers/

https://developer.chrome.com/devtools/docs/remote-debugging
