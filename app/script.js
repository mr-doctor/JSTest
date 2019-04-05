function evaluateDivisors(a, b, k){
    if (k <= 0)
        throw "Parameter k must be above 0."
    if (isNaN(a) || isNaN(b) || isNaN(k))
        throw "Parameter is not a number."
    
    primeFactorisation(100);
    return 1;
}

function primeFactorisation(n) {
    var primeFactors = []
    var p = 2;

    while (n >= p * p) {
        if (n % p == 0) {
            primeFactors.push(p);  
            n /= p;
        } else {
            p++;
        }
    }
    primeFactors.push(n);
    var str = "";
    var i = 0;
    primeFactors.forEach(element => {
        str += element + ((i == primeFactors.length - 1) ? "" : " * ");
        i++;
    }); 
    console.log(str)
}
