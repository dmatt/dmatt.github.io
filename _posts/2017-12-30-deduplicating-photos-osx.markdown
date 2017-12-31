---
layout: post
title:  "This Python Script Deletes Duplicate Photos and I Like It"
categories: [technology, python, photography]
thumbnail: /images/storage_before.png
---

I started taking photos with my [Sony a6000](https://www.dpreview.com/reviews/sony-alpha-a6000) a couple years ago, and as a result, I've been slowly filling up my harddrive with large RAW image files.

![About this Mac > Storage](/images/storage_before.png)

My first thought: throw all my photos into my existing cloud storage (Google Photos, iCloud, etc), delete everything on my computer, and call it day. But cloud storage is expensive ([this is a useful chart](https://www.cloudwards.net/comparison/) for cheap(er) services. As an aside, [Arq](https://www.arqbackup.com/) seems neat because let's you manage syncing/backups to Amazon S3.).

So, I went ahead and put everything into multiple free cloud storage services, but learned a couple things:

- Google Photos charges for storing original quality photos but compress photos are free.
- Amazon can store RAW photos, as long as they are non-commercial use (you're not a photography business)
- Amazon can apparently [do anything they want with your data](http://www.zdnet.com/article/no-privacy-on-amazons-cloud-drive/) :(

OK, after backing stuff up in a few places, there is actually a way to dedupe images/data on my computer!

## How to deduplicate photos

### Buy one of these mac apps

[Duplicate Photos Fixer Pro](https://itunes.apple.com/us/app/duplicate-photos-fixer-pro/id963642514?mt=12)

[PhotoSweeper](https://itunes.apple.com/us/app/photosweeper/id463362050?mt=12)

...and read more about how to use them at [9to5mac](https://9to5mac.com/2015/05/07/how-to-shrink-mac-photo-library-delete-duplicates/).

### Try this python script for free

[https://github.com/philipbl/duplicate-images](https://github.com/philipbl/duplicate-images) by [philipbl](https://github.com/philipbl).

This script uses something called perceptual hash 👀 ([pHash](http://www.phash.org/)) to "look" at each file and give it a fingerprint hash ☝️ and save that to a database. Then, it compares all the hashes to figure out which images are (really) similar (regardless of filesize, minor edits, etc.). Then the script allows you to move every similar copy referenced in the database to your trash, review, and delete! 💥

Pretty cool.

At least, this is all my very basic understanding and I hope I didn't nuke any of my digital memories. The most difficult part of all this is finding cheap external storage so that you can safely fiddle with (or set fire to) your local library.

After running the tool, I found a large number of low filesize duplicates (probably system thumbnails) which didn't make a *huge* impact for me this time around, but I think this tool can be even more useful if you've accidentally imported photos into multiple libraries, i.e. Photo Booth, Aperture, iPhoto, Photos, etc.

**So, is there any easier/smarter way? What is *your* method of archiving tons of photos?**