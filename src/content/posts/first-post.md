---
title: Android Mobile Browser
author: Karianne Burns
template: post.hbt
---

Recently, a nasty Android native bug appeared in our mobile application. Whenever the user tried to enter text and a keyboard popped out, the landscape media queries were triggered, because the browser would automatically resize. Normal landscape and portrait media queries were not sufficient to targeting the behavior of the screen.

Media queries like landscape and portrait are used for responsive layouts. The queries test the width of the display. If you need to target unusual behavior with window resizing its helpful to understand the aspect ratios these queries are targeting.

Aspect ratios are represented by two numbers in a fraction or separated by a colon. The numerator (top number) is the width or horizontal size, the denominator is the height or vertical size.

A landscape aspect ratio tests for a minimum aspect ratio of 1/1, meaning that when the width is greater than the height, landscape styles are applied. The landscape ratio reduces to at least 1.

@media screen and (min-aspect-ratio: 1/1) { /* landscape styles here

A portrait aspect ratio tests for a maximum aspect ratio of 1/1, meaning that whenever the width is less than the height, portrait style are applied. The portrait ratio reduces to less than 1.

@media screen and (max-aspect-ratio: 1/1) { /* portrait styles here

Now back to the issue with Chrome for Android. Normal portrait for the Android Moto X (2nd generation) was 360px/556px, or .64. When the keyboard entered, the browser size went to 360px/282px, or 1.27. Thus the landscape styles were applied, as the aspect ratio was greater than 1.

To capture this keyboard edge case and maintain portrait styles, we need a higher min-aspect-ratio than 1. 13/9 as an aspect ratio reduces to 1.4, so it should cover the 1.27 edge case.

So for landscape media:

@media screen and (min-aspect-ratio: 13/9) { /* landscape styles here

And for portrait media:

@media screen and (max-aspect-ratio: 13/9) { /* portrait styles here

The Android simulator in Android studio is incredibly slow, thus remote-debugging may be your best option with actual devices on hand:

https://developer.chrome.com/devtools/docs/remote-debugging

Sources:

http://robandlauren.com/2014/04/03/aspect-ratio-media-queries/

http://blog.abouthalf.com/development/orientation-media-query-challenges-in-android-browsers/
