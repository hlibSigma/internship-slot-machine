
/*
    * floatPointOffset - Offset floating-point to avoid issue of division with numbers floating-point
    * JS float numbers division bug: 0.15/0.05 = 2.9999999999999996 instead of 3
    */
export function correctDivision(dividend:number, divisor:number, floatPointOffset:number = 100):number {
    return (dividend * floatPointOffset) / (divisor * floatPointOffset);
}

/*
* floatPointOffset - Offset floating-point to avoid issue of multiplication with numbers floating-point
* JS float numbers multiplication bug: 0.8*3 = 2.4000000000000004 instead of 2.4
*/
export function correctMultiplication(factor:number, multiplier:number, floatPointOffset:number = 100):number {
    return ((factor * floatPointOffset) * (multiplier * floatPointOffset)) / (floatPointOffset * floatPointOffset);
}
