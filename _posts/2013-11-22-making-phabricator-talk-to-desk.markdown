---
layout: post
title:  "Making Phabricator talk to Desk with email and APIs"
categories: [technology, things_i_made, python, APIs, Disqus]
thumbnail: https://media.disquscdn.com/notes/dmatt_script_ss.png
---

![Sew confused rite now.](http://i.imgur.com/kOj2h3Z.jpg)

Purpose of this python script is to make API requests to our [Desk.com](http://desk.com) account and set a label for cases which are associated with [Phabricator](http://phabricator.org/) tickets which have been resolved by our team. Basically, change the status of the case so we can easily notify a user when their issue has been resolved due to a code change.

This whole thing was essentially a Python and API requests learning experience for me. Here’s the gist of what the script does:

1. Phabricator notification email gets set to Gmail address
2. Script opens Pop connection to Gmail account
3. Get all unread message text and squish them into a single string
4. Parse the message to make a list of Phabricator Tasks that are resolved, i.e. `[T8287,T7632]`. This step is probably supposed to be done with regular expressions, but I don’t know how to do that, so instead I used `.find()` to look for the `"t/T”` in `http://phabricator.domain.net/T10762` :)
5. Make a bunch of requests to Desk to check what cases have the Task in a case custom field and make a list of those cases.
6. Make more requests to Desk that adds a label to those cases.
7. After update cases with these labels, I created a rule and notification email in Desk that says something like “Hey, we recently made a change in our code that fixes the issue you reported to us! Aren’t we great? If you’re still experiencing the issue, let us know.”

![Example email to a customer.](https://media.disquscdn.com/notes/dmatt_script_ss.png)

*Command link script output*

![Command line script output.](https://media.disquscdn.com/notes/dmatt_script_email.png)

*Example email to a customer*

Overall, I learned a few things about how to use:

- [Desk.com API](http://dev.desk.com/API/using-the-api/#general)
- [Requests](http://docs.python-requests.org/en/latest/)

Some more screenshots on the Disqus Blog [here](http://engineering.disqus.com/2013/11/05/the-disqus-hackathon.html#better-support-feedback). Exciting!