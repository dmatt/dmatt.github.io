---
layout: post
title:  "Embedding Twitch Streams for a Top Ten Leaderboard"
categories: [technology, javascript, vscode, APIs]
thumbnail: /images/twitch_top_ten.png
---

![mobile view of top ten list](/images/twitch_top_ten.png)

Not being much of a [Twitch](https://twitch.com) user myself (and yes my residence under this rock is very cozy, thank you), there were a few mildly interesting things I learned about the product while working on this little project:

- One of the most popular channels is a guy who plays online blackjack and with a human "live dealer" who streams an actual table, cards, casino carpet etc.
- Twitch shows a lot of ads targeted at gamers, more interestingly they overlay some text that says "this ad supports [channel name]" over each ad which actually seems to make the ads more tolerable
- Twitch streamers can directly "host" other streamers which is a neat way for popular channels to help out small/growing channels.
- People communicate in sticker-like "emotes" alomst as much as they do in text, resulting in what must be the most quickly changing hyroglyphic language ever known to humankind (not sure what I'm talking about but it is hilarious).

![what is going on](/images/twitch_chat.png)

# Making a Leaderboard

So the goal of the [Use the Twitch JSON API](https://learn.freecodecamp.org/coding-interview-prep/take-home-projects/use-the-twitch-json-api/) project is to get channel data from Twitch to show the status of certain streams, i.e. whether or not a given user is online/offine, and display some relevant details. This project used to be a part of the frontend certification but was recently moved to the "Take Home Projects" section. I thought it would be a bit more interesting to grab the top 10 streamers on every refresh of the page for a "leaderboard".

The top section of the page displays a Twitch embed, and clicking "Watch" on any channel in the ranked leaderboard list will update the embed with the given channel that you clicked. Pretty simple!

# Things I learned

Here's a collection of some of the things I learned during this project:

- CSS and JavaScript can not target IDs that start with an integter(https://stackoverflow.com/questions/22141358/why-can-an-element-id-not-start-with-an-integer) despite that pattern being valid HTML. I was using `n-place` for each div ID wher n was the rank number of the item. I had to update this to `place-n`.
- To set a `div` height equal to text height (used in the collapsed style of the twitch channel description within each card), set an explicit `line-height` and use the same value for div `height`.
- In CSS `rem` units are just a unit of whatever the `<html>` root font size is, keeps all sizes relative to font size `1rem`, `2.5rem` etc.
- In script.js there's a function that takes JSON data from the API call, does `forEach()` through it, and inserts channel data like "description" into pre-created elements. Would probably be better if I used [Element templates](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) and just cloned a new one to insert new data. Simple example of this `index.html` and `components/nav.html` (first time using this html5 feature!). I'm not sure what is a better practice: creaming elements from JavaScript, or creating all of the HTML structure first.
- It is very easy to add event listenters to many elements within a class like `document.querySelectorAll('.expand, .watch').forEach(function() {addEventListener( [...] )`. This class represents all of the buttons on the page.
- During this project I learned how to use the [VScode](https://code.visualstudio.com/) debugging feature via [Chrome Debugging for VS Code](https://code.visualstudio.com/blogs/2016/02/23/introducing-chrome-debugger-for-vs-code). It is a joy to use, you can set breakpoints, inspect variable values by hovering, and make code changes all in one editor so this saves a ton of time, clicks, and context switching.
- The `HTMLize()` function was my first time trying create a (somewhat) generic way to iterate through an API reponse object and manipulate the DOM. It is easy to add new elements to the DOM by simply adding copy/pasting `case`s to the `switch` which looks for different data attributes in the API repsonse object. Maybe there's a more common method / library that does this?

Here's what that HTMLize() function looks like:

```javascript
function HTMLize(response) {
  // set global variable with all streams from the API response
  topTenStreams = response.streams;
  // get name or first channel asap and start
  startFirstChannel(topTenStreams[0].channel.name);
  topTenStreams.forEach((obj, i) => Object.keys(obj).forEach((attributeName) => {
    // every `case` is data we want append to the DOM
    switch (attributeName) {
      case 'preview': {
        const thumbnailElement = document.createElement('img');
        thumbnailElement.classList = 'card-text card-img-top';
        const newthumbnailUrl = obj.preview.template.replace('{width}x{height}','770x430'); // arbitrary size
        thumbnailElement.src = newthumbnailUrl;
        document.querySelector(`#place-${i}`).parentNode.prepend(thumbnailElement);
        break;
      }
      case 'viewers': {
        const viewersElement = document.createElement('h6');
        viewersElement.classList = 'card-subtitle mb-2 text-muted';
        viewersElement.innerHTML = `👀 ${obj.viewers.toLocaleString()}`;
        document.querySelector(`#place-${i}`).appendChild(viewersElement);
        break;
      }
      case 'channel': {
        const titleElement = document.createElement('h5');
        titleElement.classList = 'card-title';
        titleElement.innerHTML = obj.channel.display_name;
        document.querySelector(`#place-${i}`).appendChild(titleElement);
        const textElement = document.createElement('p');
        textElement.classList = 'card-text';
        textElement.innerHTML = obj.channel.status;
        document.querySelector(`#place-${i}`).appendChild(textElement);
        break;
      }
      default:
        // do nothing
    }
  }));
  return response;
}
```

