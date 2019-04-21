---
layout: post
title:  "Learning of the day: Multisets and Count Distinct"
categories: [databases, LOTD]
thumbnail: /images/excel-distinct-count.png
---

With large datasets, there is a common problem with doing "count distinct". From [WikiPedia](https://en.wikipedia.org/wiki/Count-distinct_problem):

>In computer science, the count-distinct problem (also known in applied mathematics as the cardinality estimation problem) is the problem of finding the number of distinct elements in a data stream with repeated elements.

A “multiset” is a set with some repeating values, for example a list of user IDs like `(001, 002, 003, 001, 001)`. In this multiset, the unique count of ids is 3. But if this dataset was super huge, it would take a lot of time/memory to count up all the unique user IDs. There is an algorithm called [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) that aproximates distint counts — I don't fully understand how the algorithm works, but elements in the set are hashed so that a multiset of uniformly distributed random numbers is produced like `(001, 002, 003, 001, 001) -> (308, 098, 092, 298, 298)` , this can then be used to look at the "maximum number of leading zeros in the binary representation of each number in the set" like `298 -> 0000000100101010`. Then the count estimate will be `2 ** maximum number of leading zeros in the binary representation of each number in the set`.

Some datastoring tools let you use HyperLogLog as a data sctucture. I came accross this concept while looking up "redis", and the name of the algorthm caught my attention which made me think ["What in The Hell Is Hyperloglog"](https://riak.com/posts/technical/what-in-the-hell-is-hyperloglog/). 🤔 