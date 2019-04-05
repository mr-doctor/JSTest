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
 
    for (var number = a + 1; number < b; number++) {
        
        var factorsExponents = primeFactorExponents2(number);
        // console.log("n = " + number);
        // console.log(factorsExponents);
        var sum = 1;

        for (var exp of factorsExponents) {
            sum *= exp + 1; 
            
            if (sum > k) { 
                break;
            }
        } 
        if (number == 9) {
            console.log(factorsExponents);
        }
        if (sum == k) {
            console.log(number);
            outputs++;
        }
        // console.log("sum = " + sum);

    }
    // console.log("outputs = " + outputs)
    return outputs;
}

function addFactor(primeFactors, n) {
    if (primeFactors.has(n)) {
        primeFactors.set(n, primeFactors.get(n) + 1);
    } else {
        primeFactors.set(n, 1);
    }
    return primeFactors;
}

function primeFactorExponents2(n) {
    var primeFactors = new Map();
    while (n % 2 == 0) {
        primeFactors = addFactor(primeFactors, 2);

        n /= 2;
    }

    for (let i = 3; i <= Math.sqrt(n); i+=2) {
        while (i % n == 0) {
            primeFactors = addFactor(primeFactors, i);

            n /= i;
        }
    }

    // if (n > 2) {
        primeFactors = addFactor(primeFactors, n);
    // }

    return primeFactors.values();
}