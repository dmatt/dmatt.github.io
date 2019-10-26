---
layout: post
title:  "Weekly Digest: Recursion"
categories: [weekly digest,]
thumbnail: /images/recursive_centaur.jpeg
---

## Recursion

Summary of ["The Big Recursive Idea"](https://www.youtube.com/watch?v=oKndim5-G94) which is _Just don’t think about the recursion_.

3 steps to recursion problem solving

1. “Iterate“. Come up with the parameter list which can be figured out iteratively and should most always be identical to the final recursive param list
2. “Nibble and Dispatch” Write a “dispatcher” function that solves for some “minimal” data set (i.e. size parameter of array is 0)
	a. Then dispatcher should call iterative function to handle non-minimal cases. ❗️must pass smaller data set to iterative function, i.e. by passing array size - 1`
	b. Then dispatcher must only handle last elements in the array and then add it to return value of the dispatched iterative.
3. “Leap of faith” In the dispatcher, replace the call to the dispatched iterative function by swapping in a call to the dispatcher (itself)
	a. Works by either handling the minimal data set OR handling 1 small piece/nibble of the data set , then makes a call to solve the problem for the reduced data set. Combines all these results together.
	b. Don’t think about what the recursive call does, just “if this call returns the result it is supposed to, how do I solve the entire problem?"

How I would write recursion in very length pseudocode:

```
a "recursive function name" that does something on "parameters":
		base case - what condition is the simplest case of what "parameters" can be?:
				in this simple/smallest case, do something for the last time with last 1 unit of
				parameter
				return the result
		else if, are there any other next simplest cases to catch?:
				pass
		else:
				do something to 1 unit of the parameter
				return a call to "recursive function name" on 1 unit smaller version of parameter,
				reduce the parameter so that it eventually becomes simple/small case above
```

🐎