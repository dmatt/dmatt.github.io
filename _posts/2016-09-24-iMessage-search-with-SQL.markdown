---
layout: post
title:  "A Noob's Guide to Finding iMessages with SQL"
categories: [technology, SQL]
thumbnail: /images/imessage_party.gif
---

Having all your iMessages in iCloud is pretty neat because you can search for any message you've ever sent to anyone... ever. Do you want to know how many times you've used `😱` in a sentence? Go for it. Do you need to fact-check how many `Happy Birthday`'s you've sent to your best friend? Knock your self out, weirdo.

### But. iMessage search is pretty bad. 

![Why was I talking about raccoons?](/images/imessage_racoon_search.png?1)

It shows you the total number of matches but provides no way to navigate through each instance, it just plops you down at the most recent result, which your stupid brain probably would have remembered anyway.

Someone dear to me asked recently, "can you re-send me that one gif you made of my cat leaping through the air a couple years ago?". I remembered that I put it up on [giphy](http://giphy.com/) and texted it to them, but I couldn't find a trace of it anywhere.

### Finding iMessages with SQL

I [learned](http://apple.stackexchange.com/questions/108171/export-imessages-in-human-readable-form-for-archival) that there's a `chat.db` file in `~/Library/Messages/chat.db`. Yay! Here's how:

Start sqlite3 with the file.

`sqlite3 ~/Library/Messages/chat.db`

Use `.fullschema` so I can find names of the tables.

```
sqlite> .fullschema
CREATE TABLE _SqliteDatabaseProperties (key TEXT, value TEXT, UNIQUE(key));
CREATE TABLE message (ROWID INTEGER PRIMARY KEY AUTOINCREMENT, guid TEXT UNIQUE NOT NULL, text TEXT, replace INTEGER DEFAULT 0, service_center TEXT, handle_id INTEGER DEFAULT 0, subject TEXT, country TEXT, attributedBody BLOB, version INTEGER DEFAULT 0, type INTEGER DEFAULT 0, service TEXT, account TEXT, account_guid TEXT, error INTEGER DEFAULT 0, date INTEGER, date_read INTEGER,

... etc ...
```

See what's in the column `text` in the `message` table.

```SQL
SELECT text FROM message LIMIT 5;
```

```
❤️❤️
thank you ❤️ I hope you do too, good luck studying!￼
OMFG
why I’m I here, and not there?
dang, I need to follow nonoburger
```

Yup. Definitely my nonsensical texts. Also why do I talk like a teenager? Let's find the GIF.

```SQL
SELECT text FROM message WHERE text LIKE '%.gif%';
```

```
http://media.giphy.com/media/yc2TAL5zhG9fq/giphy.gif
http://i.imgur.com/MKhq0Zc.gifv
http://www.lolzgif.com/wp-content/uploads/2012/11/cat-wearing-glasses.gif
From reddit:
One of my employees set a trap to catch a skunk in her backyard. She got her dog instead. The look of humiliated rage on this dog's face... http://imgur.com/sAE4pcP.gif
http://i.imgur.com/fqd9uUj.gifv
http://i.imgur.com/SQwiTmD.gif
http://i.imgur.com/j4lQdEM.gif
http://i.imgur.com/Q9NkfmE.gifv
http://i.imgur.com/h5jd59f.gifv
http://i.giphy.com/l0MYth81U8QHBk3vy.gif
```

I found it! I also realized this is a fun way to find all the best links you deemed worthy of sharing. There's all kinds of useful columns to put in your queries:

```
is_audio_message
cache_has_attachments
is_from_me
is_audio_message
date
```

So there you have it:

![My cat leaping through the air](http://i.giphy.com/l0MYth81U8QHBk3vy.gif)