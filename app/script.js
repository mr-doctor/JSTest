var cacheFactors = new Map();
// var factors = new Map();

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
   
    for (let i = a + 1; i < b; i++) {
        let sum = 1;
        factors = new Map();
        factorise(i);

        for (const j of factors.values()) {
            sum *= j + 1;
        }
        if (sum == k) {
            outputs++;
        } 
    }
    
    return outputs;
}

var gcd = function(a, b) {
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
};

function f(a) {
    return (a * a) - 1;
}

function g(a) {
    return (a * a) + 1;
}

function abs(a) {
    return (a > 0) ? a : -a;
}

function pollardRho(n, func) {
    let a = 2;
    let b = 2;
    let divisor = 1;

    if (n % 2 == 0) {
        return 2;
    }

    do {
        a = func(a) % n;
        b = func(func(b)) % n;
        divisor = gcd(abs(a - b), n);
    } while (divisor == 1);

    if (divisor == n) {
        return pollardRho(n, g);
    }
    return divisor;
}

function factorise(n) {
    if (n == 1) {
        return;
    }
    if (isPrime(n)) {
        if (factors.has(n)) {
            factors.set(n, factors.get(n) + 1);
        } else {
            factors.set(n, 1);
        }
        return;
    }
    let divisor = pollardRho(n, f);

    factorise(divisor);
    factorise(n / divisor);
}

function isPrime(input) {
    for(i = 2; i <= Math.sqrt(input); i++) {
      if (input % i == 0) {
        return false;
      }
    }
    return true;
}