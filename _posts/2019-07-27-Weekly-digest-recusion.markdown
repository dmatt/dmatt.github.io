---
layout: post
title:  "Weekly Digest: Recursion"
categories: []
thumbnail: /images/recursive_centaur.jpeg
---

## Recursion

Summary of ["The Big Recursive Idea"](https://www.youtube.com/watch?v=oKndim5-G94) which is _Just don’t think about the recursion_.

*  3 steps to recursion problem solving
	1. “Iterate“. Come up with the parameter list which can be figured out iteratively and should most always be identical to the final recursive param list
	2. “Nibble and Dispatch” Write a “dispatcher” function that solves for some “minimal” data set (i.e. size parameter of array is 0)
		1. Then dispatcher should call iterative function to handle non-minimal cases. ❗️must pass smaller data set to iterative function, i.e. by passing array size - 1`
		2. Then dispatcher must only handle last elements in the array and then add it to return value of the dispatched iterative.
	3. “Leap of faith” In the dispatcher, replace the call to the dispatched iterative function by swapping in a call to the dispatcher (itself) 
		1. Works by either handling the minimal data set OR handling 1 small piece/nibble of the data set , then makes a call to solve the problem for the reduced data set. Combines all these results together.
		2. Don’t think about what the recursive call does, just “if this call returns the result it is supposed to, how do I solve the entire problem?"
