---
layout: post
title:  "A Simple Weather Forecast Page Using Dark Sky API"
categories: [APIs, things_i_made]
thumbnail: /images/weather.gif
---

This simple <a href="/weather" target="_blank">weather page</a> get's the users' location and returns the current temperature, a short description of the upcoming forecast, and a corresponding animated icon.

## What, how?

First, a loading message is displayed while the page checks if a browser location is available and permissible by the user via the [geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation). If available, `getCurrentPosition()` is called and we get a `position` object which contains latitude and longitude coordinates.

With the coordinates, the page gets the users' city and state text from Google's `maps.googleapis.com/maps/api/geocode/json` [endpoint](https://developers.google.com/maps/documentation/geocoding/intro) and plops that into the page HTML.

Then, we use the very awesome [Dark Sky API](https://darksky.net/dev/) and send them the very same coordiates that we sent to Google. With this API, you can even get minute-by-minute forecasts if you want, which is cray.

With Dark Sky, we grab the current temperature, a short summary of the hourly forecast, and plop those into the page HTML. Dark Sky also returns a handy `icon` string which represents the appropriate weather, i.e. `clear-day` or `rainy-night`. We use this string with the [Skycons](https://darkskyapp.github.io/skycons/) library to display smooth-looking animated icons. Here's what that looks like:

<script src="https://gist.github.com/dmatt/7a368b04e11836f8b8814bbb80ee0620.js"></script>

There's also an event handler for clicks on the `°F` text on the page which will switch the temperature unit from F to C with some simple JavaScript maths (rather than making another call to Dark Sky).

To display all the temperature, forecast, and location data on the page, I used the [Google font API](https://fonts.google.com/), which has a very pretty interface for filtering and selecting fonts.