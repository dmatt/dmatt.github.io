---
layout: post
title:  "Weekly Digest: Methods"
categories: [weekly digest, python, OOP, django]
---

## Python Object Oriented Odds and Ends

* **Abstract Base Classes** are what they sound like — a Base class that other objects can extend from. It is abstract because it is loosly defined (but this is done on purpose). It's not good to have loosly defined objects all over the place, especially because you don't want yourself (and others) to accidentally create object instances of these poorly defined classes. So for this reason, instantiation of ABCs is disallowed
    * Example: Imagine you create a class called Animal from which all other critter classes extend from. I.e. `Class Sloth(Animal):` and `Class Butterfly(Animal):` and you define all of your methods and attributes and properties inside `Sloth` and `Butterfly` because of course, they are and do very different things. Then one day you get lazy and create an object with `animal = Animal()` and you try to `animal.make_noise()` because you forgot that `make_noise()` method is only defined in child classes (Sloth and Butterfly).
    * This is a good reason to make `Animal` an abstact base class, which disallows it be instantiated).
* Additionally, if you create a method in the ABC, classes that extend from it are _required_ to define all methods that the ABC does not implement. Sort of a like a "required field" for methods that needs filling by extension classes.
	* As I'm learning more, I'm trying to keep this quote in mind:

    > "The reasons why these things are powerful is not really apparent at first, but just keep it in mind as you move forward. It will keep coming back." - which comes from a reddit comment I read that I can't find.

* **Class methods** and the `@classmethod` decorator
	* This decorator exists so you can create class methods that are passed the actual class object (usally writen as `cls`)  within the function call, much like `self` is passed to any other ordinary instance method in a class.
    * The difference is that `cls` is the actual Class, not an instantiated object from that Class like `self`.

* **Static Methods**
    * methods that do not implicitly take the object instance `self` as the first parameter
    * nice way to encapsulate a function within a Class but is not required to do anything with an object instance's state — perhaps it holds some logic relevant to the Class
        * can be called from the Class like `Sloth.calculate_max_speed()` without needing to instantiate a `Sloth` because perhaps there is a natural law that determines the max speed of ALL sloths (doesn't matter how strong or healthy their state is)

## Some basics notes on Django Signals, Garbage Collection, Reference Counts

* **Signals**
	* Signals are an implementation of the [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern)
	    * A good analogy is how all subscribers to a YouTube channel get a notification when a content creator uploads new content.
        * Observer pattern should be used when:
            * we have many separate code/modules interested in the same events
            * modules within an app or across apps are decoupled, but you don't want to use RESTful communication methods to trigger them with data
        * Dependents are receivers/observers of events that a parent object is sending (dependents don't control the parents sending)
            * This pattern then perfectly suits any process where data arrives through I/O, that is, where data is not available to the CPU at startup (mouse, http requests, etc)
    * Fun sidenote: for Signal connections in django, you can pass the `dispatch_uid` param which will dedupicate singals with the same uid (maybe you don't want to send an email twice if 2 similar events connect a signal reciever).
* Garbage collection (GC) and reference counting
    * how does it relate to Django Signals?
        * [Django stores signal handlers as weak references by default](https://docs.djangoproject.com/en/3.0/ref/signals/#module-django.db.models.signals)
	* Reference counting - objects are deallocated memory when there are no references in a program
        * Analogy: if no one knows the location/name/existance of a tree that falls in the woods, does it exist? No, garbage collect it!
		* Every variable in Python is a reference (a pointer) to an object and is not the actual value itself
		    * assignments like =, argument passing, and appending an `obj` to a `list` like this: `[1]`
		* References can be cyclical (think cyclical linked list) which can be problematic if only the reference counting algo was used in garbage collection
		* Visualize! This looks like a neat way to visualize references https://mg.pov.lt/objgraph/
	* Weak referenced object (aka "weakly reachable") - An object referenced only by weak references – meaning "every chain of references that reaches the object includes at least one weak reference as a link" – is considered weakly reachable, and can be treated as unreachable and so may be collected at any time.
	    * Analogy - If one is not known by name by any other human, and is only known anonymously by their doorman, does one exist? No, garbage collect them!) 🚛
