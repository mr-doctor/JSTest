function evaluateDivisors(a, b, k){
    if (k < 0)
        throw "Parameter k must be positive."
    if (k % 2 == 0) {
        throw "Parameter k must be odd."
    }
    if (isNaN(a) || isNaN(b) || isNaN(k))
        throw "Parameter is not a number."
    if (1 >= a || a >= b) {
        throw "Parameters must fit requirement 1 < a < b."
    }
    
    var outputs = 0;
    b = 102
    var primes = primesTo(b / 2);
    console.log(b);
    console.log("primes: " + primes);

    console.log(factorTree(0, b, [], primes, []));

    console.log(allPaths); 

    return outputs;
}


function factorTree(prime, number, path, primes, allPaths) {
    const bound = Math.floor(Math.sqrt(number));
    // if we've reached the end of a branch in our factor tree, send the list back
    
    if (primes.includes(number)) {
        // add the final number
        path.push(number);
        // add the complete path to all of our paths    
        allPaths.push(path);
        // send all of the paths back
        return allPaths;
    }

    // attempt to divide down by each prime
    for (let i = 0; i < primes.length; i++) {
        // we can't go over our bound
        if (primes[i] > bound) {
            break;
        }
        // we can't divide by this prime
        if (number % primes[i] != 0) {
            continue;
        }
        // we haven't reached the end yet, so add the original prime
        
        path.push(primes[i]);
        
        // calculate the new second number we're using
        let newNumber = number / primes[i];
         
        // head down the tree using the new prime, the new number, 
        //      giving it the path, all of our primes, and all paths
        allPaths.concat(...factorTree(primes[i], newNumber, [...path], primes, allPaths));
    }
    
    return allPaths; 
}

function primesTo(m) {
    var primes = [];
    primes.push(2);

    for (let i = 3; i <= m; i += 2) {
        if (isPrime(i, primes)) {
            primes.push(i);
        }
    }
    return primes;
}

function isPrime(i, primes) {
    if (i == 3) {
        return true;
    }
    if (i % 3 == 0) {
        return false;
    }

    var intSqrt = Math.floor(Math.sqrt(i));
 
    for (let j = 0; j < primes.length; j++) {
        if (i % primes[j] == 0) {
            return false;
        }
    }
    var q = 5;
    var p = 2; 

    while (q * q <= i) {  
        if (i % q == 0) {
            return false;
        } 
        i += p;
        p = 6 - p;
    }
    return true;
    
}