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

    cacheFactors = new Map();
    
    let outputs = 0;
    
    //let primes = primesTo(b);
    // let primes = sievePrimes(Math.floor(Math.sqrt(b)));
    let primes = sievePrimes(b);

    for (let i = a + 1; i < b; i++) {
        let divisors = 0;
        divisors = findDivisorsOf(i, k, primes);
        // if (i > primes[primes.length - 1] && isPrimeMR(i)) {
        //     divisors = 2;
        // } else {
        //     divisors = findDivisorsOf(i, k, primes); 
        // }
        if (divisors == k) {
            outputs++;
        }
    }
    
    return outputs;
}

function findDivisorsOf(n, limit, primes) {

    let factorisation = primeFactors(n, primes);

    let sum = 1;
    let counts = {};
    factorisation.forEach(function(x) {
        counts[x] = (counts[x] || 0) + 1;
    });
    for (let key in counts) {
        let value = counts[key];
        sum *= value + 1;
        if (sum > limit) {
            break;
        }
    }
    return sum;
}

function arraysEqual(a1, a2) {

    let a1p = a1.concat().sort();
    let a2p = a2.concat().sort();

    for (let i = 0; i < a1p.length; i++) {
        if (a1p[i] !== a2p[i]) {
            return false;
        }
    }
    return true;
}

function primeFactors(n, primes) {
    console.log(n);
    if (cacheFactors.has(n)) {
        return cacheFactors.get(n);
    }

    if (primes.includes(n)) {
        let nList = [n];
        return nList;
    } else if (n > primes[primes.length - 1]) {
        console.log("this is me ", n);
    }


    const limit = Math.sqrt(n);
    for (let i = 0; i < primes.length; i++) {
        prime = primes[i];
        if (prime > limit) {
            break;
        }
        if (n % prime == 0) {
            let primeList = [prime];
            primeList = primeList.concat(primeFactors(n / prime, primes));
            cacheFactors.set(n, primeList);
            return primeList;
        }
    }
    throw "Failed to factorise " + n;
}

function sievePrimes(m) {
    let values = Array(m + 1);
    if (checkForES6()) {
        values.fill(true);
    } else {
        for (let i = 2; i < values.length; i++) {
            values[i] = true;
        }
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

function checkForES6() {
    if (typeof SpecialObject == "undefined") return false;
    try { specialFunction(); }
    catch (e) { return false; }

    return true;
}

function primesTo(m) {
    let primes = [];
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
        let z = primes[j];
        if (z > isqrt) {
            break;
        }
        if (i % z == 0) {
            return false;
        }
    }
    return true; 
}

function isPrimeMR(i, k) {
    if (i <= 1 || i == 4) {
        return false;
    }
    if (i == 2) {
        return true;
    }
    if (i == 3) {
        return true;
    }
    if (i % 2 == 0) {
        return false;
    }

    let d = i - 1;

    while (d % 2 == 0) {
        d /=2;
    }

    for (let j = 0; j < k; j++) {
        if (!MRTest(d, i)) {
            return false;
        }
    }

    return true;
}

function modPwr(a, b, p) {
    let out = 1;

    a %= p;
    while (b > 0) {
        if (b % 2 == 0) {
            out = (out * a) % p;
        }
        y = y >> 1;
        x = (x * x) % p;
    }

    return out;
}

function MRTest(d, n) {
    let a = 2 + Math.floor(Math.random() % (n - 4));

    let x = modPwr(a, d, n);

    if (x == 1 || x == n - 1) {
        return true;
    }

    while (d != n - 1) {
        x = (x * x) % n;
        d *= 2;

        if (x == 1) {
            return false;
        }
        if (x == n - 1) {
            return true;
        }
    }

    return false;
}