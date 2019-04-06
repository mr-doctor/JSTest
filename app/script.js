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
    var primes = primesTo(b / 2);

    for (let i = a + 1; i < b; i++) {
        if (findDivisorsOf(i, k, primes) == k) {
            outputs++;
        }
    }
    // console.log(findDivisorsOf(28, 3, primes));
    
    return outputs;
}

function findDivisorsOf(n, limit, primes) {
    

    let factorisation = primeFactors(n, primes);
    // console.log(factorisation)
    if (factorisation === null) {
        return 2;
    }

    let sum = 1;
    let counts = {};
    factorisation.forEach(function(x) {
        counts[x] = (counts[x] || 0) + 1;
    });
    for (var key in counts) {
        var value = counts[key];
        sum *= value + 1;
        if (sum > limit) {
            break;
        }
    }

    return sum;
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

function primeFactors(n, primes) {
    if (primes.includes(n)) {
        return [n];
    }

    for (var i = 0; i < primes.length; i++) {
        prime = primes[i];
        if (prime > Math.sqrt(n)) {
            break;
        }
        if (n % prime == 0) {
            factor = primeFactors(Math.floor(n / prime), primes);
            if (factor !== null) {
                return [prime].concat(factor);
            }
        }
    }
    return null;
}

function factorTree(number, path, primes) {

    const bound = Math.floor(Math.sqrt(number));

    // if we've reached the end of a branch in our factor tree, send the list back
    if (primes.includes(number)) {
        // add the final number
        path.push(number); 

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
        
        // calculate the new second number we're using
        let newNumber = number / primes[i];
         
        // head down the tree using the new prime, the new number, 
        //      giving it the path, all of our primes, and all paths
        let foundPaths = factorTree(newNumber, newPath, primes);
        allPaths = allPaths.concat(foundPaths);
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