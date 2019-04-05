
Solnet Javascript Exercise
==========================
As  part of our recruitment process we ask all our candidates to complete the following programming exercise.

The problem will require some thinking about and can be solved via multiple approaches,
to varying degrees of efficiency, this is what we will be  evaluating.

If you have any questions please feel free to contact us for clarification (preetesh.chauhan@solnet.co.nz).

SETUP
-----

1. Install node on your machine if you have not already from: https://nodejs.org/en/
2. Install gulp globally using npm
    $ npm install --global gulp-cli
2. Run npm install from the directory containing this file (Ignore any warning messages. However, if you receive any critical errors we suggest that you upgrade your version of Node.js)
    $ npm install
3. Run the server
    $ gulp
4. Open http://localhost:5000/

INSTRUCTIONS
------------
Once you have the project setup complete and running, Implement the function evaluateDivisors(a,b,k) in the file scripts.js
The function should return the number of integers between A and B inclusive that have exactly K divisors.

The solution must pass the jasmine unit tests provided, the results of which are shown on http://localhost:5000/

Once you solution is running, try unskipping (remove the x from the 'it' keyword) the tests for larger ranges, to evaluate how efficient your solution is.
A well thought-out and optimised solution will be able to run these large ranges in a few seconds.

SUBMISSION
----------
Rename your script.js to script.txt and email the file to preetesh.chauhan@solnet.co.nz