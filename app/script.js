var cacheFactors = new Map();

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

    // Resets the cache for honest testing
    cacheFactors = new Map();
    
    let outputs = 0;

     
    // Seive of Eratosthenes
     let primes = [];//sievePrimes(b);

    for (let i = a + 1; i < b; i++) {
        let divisors = 0;
        divisors = findDivisorsOf(i, k, primes);
        
        if (divisors == k) {
            outputs++; 
        }
    }
    
    return outputs;
}

function findDivisorsOf(n, limit, primes) {

    let factorisation = primeFactorisation(n);//primeFactors(n, primes);
    
    let sum = 1;
    let counts = {};
    factorisation.forEach(function(x) {
        counts[x] = (counts[x] || 0) + 1;
    });


    for (let key in counts) {
        let value = counts[key];
        sum *= value + 1;
        // Prevents unnecessary calculations beyond sum > k
        if (sum > limit) {
            break;
        }
    }
    return sum;
}

function primeFactors(n, primes) {

    if (cacheFactors.has(n)) {
        return cacheFactors.get(n);
    }

    // Either this has reached the end of a recursion branch in the tree, or the original input was prime
    if (primes.includes(n)) {
        let nList = [n];
        return nList;
    }

    
    const limit = Math.sqrt(n);

    for (let i = 0; i < primes.length; i++) {
        prime = primes[i];

        // Once the calculation reaches the square root of the input, anything higher would have already been
        //      reached by a previous factor. e.g. n = 93, there is no point in finding if it divides by 31 because
        //      that would already have been found by dividing by 3.
        if (prime > limit) {
            break;
        }
        // If the input can be divided by a new prime, create a new branch in the factor tree and calculate that
        if (n % prime == 0) {
            let primeList = [prime];
            primeList = primeList.concat(primeFactors(n / prime, primes));

            // We now know how to calculate this. No need to do it again
            cacheFactors.set(n, primeList);
            return primeList;
        }
    }
    throw "Failed to factorise " + n;
}

function sievePrimes(m) {
    let values = Array(m + 1);
    for (let i = 2; i < values.length; i++) {
        values[i] = true;
    }

    for (let i = 2; i * i <= m; i++) {
        if (values[i]) {
            for (let j = i * 2; j <= m; j += i) {
                values[j] = false;
            }
        }
    }
    
    let primes = [];
    for (let i = 2; i <= values.length; i++) {
        if (values[i]) {
            primes.push(i);
        }
    }
    return primes;
}

function primeFactorisation(n, output, originalN) {
    var output = (output || []);
    var root = Math.sqrt(n);
    var x = 2;

    if (n % x) {
        x = 3;

        while ((n % x)) {
            x += 2;
            if (x >= root) {
                break;
            }
        }
    }

    x = (x <= root) ? x : n;
    output.push(x);
    if (x === n) {
        
        return output;
    } else {
        return primeFactorisation((n / x), output, originalN);
    }
}