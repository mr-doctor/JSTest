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
    b = 24;
    var primes = primesTo(b / 2);

    let allPaths = factorTree(b, [], primes);

    let exponents = [];

    for (let i = 0; i < allPaths.length; i++) {
        for (let j = allPaths.length - 1; j >= allPaths.length; j--) {
            if (i == j) {
                continue;
            }
            if (arraysEqual(allPaths[i], allPaths[j])) {
                allPaths.splice(j, 1);
            }
        }
        
        
    }

    console.log(allPaths);

    return outputs;
}

function arraysEqual(a1, a2) {

    var a1p = a1.concat().sort();
    var a2p = a2.concat().sort();

    for (let i = 0; i < a1p.length; i++) {
        if (a1p[i] !== a2p[i]) {
            return false;
        }
    }
    return true;
}

function factorTree(number, path, primes) {
    console.log('factoring', number, 'have', path);

    const bound = Math.floor(Math.sqrt(number));

    // if we've reached the end of a branch in our factor tree, send the list back
    if (primes.includes(number)) {
        // add the final number
        path.push(number); 

        console.log('found node', path);
        // send all of the paths back
        return [path];
    }
    let allPaths = [];
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
        let newPath = [...path];
        newPath.push(primes[i]);
        console.log('adding', primes[i]);
        
        // calculate the new second number we're using
        let newNumber = number / primes[i];
         
        // head down the tree using the new prime, the new number, 
        //      giving it the path, all of our primes, and all paths
        let foundPaths = factorTree(newNumber, newPath, primes);
        console.log('found', foundPaths);
        allPaths = allPaths.concat(foundPaths);
        console.log(number, 'now have', allPaths)
    }
    
    console.log(number, 'has', allPaths);
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
    console.log(primes);
    return primes;
}

function isPrime(i, primes) {
    let isqrt = Math.floor(Math.sqrt(i));
    for (let j = 0; j < primes.length; j++) {
        var z = primes[j];
        if (z > isqrt) {
            break;
        }
        if (i % z == 0) {
            return false;
        }
    }
    return true; 
}