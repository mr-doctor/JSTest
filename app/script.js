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
    
    let outputs = 0;

    for (let i = a; i <= b; i++) {
        let divisors = 0;
        divisors = countDivisorsOf(i, k);
        
        if (divisors == k) {
            outputs++; 
        }
    }
    
    return outputs;
}

/**
 * Counts the number of divisors of a given input. 
 * 
 * @param {number}  n The number to count the divisors of.
 * @param {number} limit The maximum number of divisors - the function will finish early if it goes over this limit.
 */
function countDivisorsOf(n, limit) {

    let factorisation = primeFactorisation(n, []);
    
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

/**
 * 
 * Uses prime decomposition to find the prime factorisation of a given input.
 * 
 * @param {number} n The number to factorise.
 * @param {Array} output The current factorisation of `n`. This should begin as an empty array. 
 */
function primeFactorisation(n, output) {

    var output = (output || []);
    var limit = Math.sqrt(n);
    var x = 2;

    // Attempt to find a divisor of n
    if (n % x) {
        x = 3;

        while (n % x) {
            x += 2;
            // No need to calculate beyond sqrt(n), because if x > sqrt(n) then the other factor would already have been found
            //      when dividing by x
            if (x >= limit) {
                break;
            }
        }
    }

    if (x > limit) {
        x = n;
    }

    output.push(x);

    if (x === n) {
        return output;
    } else {
        return primeFactorisation((n / x), output);
    }
}