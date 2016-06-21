---
layout: post
title:  "Recent Discussions Component for Disqus Channels"
categories: [technology, things_i_made, Disqus, APIs, jQuery]
thumbnail: http://i.imgur.com/YOtVML3.png
---

First, a little context...

[Channels](https://disqus.com/home/explore/) are public forums that live on [Disqus Home](https://disqus.com/home). They're pretty great because they take an age-old internet concpet, forums, and simplify the heck out of 'em, making them accessible and friendly to all. To name a few of my favorites:

- [GIFs](https://gifs.disq.us)
- [Art Show](https://artshow.disq.us)
- [MS Paint](https://mspaint.disq.us)
- [Discuss Disqus](https://discussdisqus.disq.us)

[Discuss Disqus](https://discussdisqus.disq.us) is a meta channel where people can talk about Disqus, report bugs, ask questions, get developer help, or convey their love/hate for various features. It's run by a stellar crew of community moderators and Disqus staff and has become an important part of the Disqus' development since it's channel birthday on August 29, 2014.

## Recent Discussions Component

[![Recent discussions compent displaying table with several discussions](http://i.imgur.com/YOtVML3.png)](https://disqus.com/home/)

I wanted a way to highlight the most recent discussions happening in Discuss Disqus directly on [help.disqus.com](https://help.disqus.com/) inside a table and play with [Bootstrap](http://getbootstrap.com/css/), [jQuery](https://jquery.com/), [moment.js](http://momentjs.com/).

**Why?**

- pull people into the community with a call-to-action
- show the high level of activity in the community
- show that there are real humans ready to help and discuss!

I looked at other companies' help pages and found a great one by [Olark](https://web.archive.org/web/20140214092247/http://www.olark.com/help#questions), so I did my best to copy the design (:raised_hands:).

It is a table with the `.table-striped` class. The table has 4 columns for inserting the discussion title, author, number of comments, and date. The code to populate this table does this:

<script src="https://gist.github.com/dmatt/bd8093375e9e96d6ba6853499a1683f2.js"></script>

`drawTable()` takes all the data from the `ajax()` call to Disqus' `/timelines/activities/` endpoint (currently a private) and plops different strings into variables that correspond with the columns we want to populate. `truncateString()` shortens those strings so they fit nicely into the table data cells every time. `moment()` turns the unix timestamp into a pretty relative time that's more appropriate for saying "yo, look at all this recent activity".

This was a good mini-project to learn a bit about ajax and using libraries like moment.js.

Check it out at [help.disqus.com](https://help.disqus.com/).