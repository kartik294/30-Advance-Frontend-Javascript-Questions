//  Implement custom Object is

// To implement a custom version of Object.is, we need to understand its purpose. The Object.is method determines whether two values are the same value. It is similar to the strict equality operator (===), but with some differences, particularly in how it handles NaN, +0, and -0.

// Behavior of Object.is
// +0 and -0: Object.is(+0, -0) returns false, while (+0 === -0) returns true.
// NaN: Object.is(NaN, NaN) returns true, while (NaN === NaN) returns false.
// Other values: For all other values, Object.is behaves the same as the strict equality operator.
// Custom Implementation of Object.is
// Here's how you can create a custom Object.is function:

function customObjectIs(value1, value2) {
  // Check if both values are the same reference
  if (value1 === value2) {
    // Handle the special case for +0 and -0
    return value1 !== 0 || 1 / value1 === 1 / value2;
  }

  // Check for NaN (which is not equal to itself)
  return value1 !== value1 && value2 !== value2;
}

// Example Usage
console.log(customObjectIs(+0, -0)); // Output: false
console.log(customObjectIs(NaN, NaN)); // Output: true
console.log(customObjectIs(42, 42)); // Output: true
console.log(customObjectIs("Hello", "Hello")); // Output: true
console.log(customObjectIs({}, {})); // Output: false (different objects)
console.log(customObjectIs(null, null)); // Output: true

// Explanation:
// Strict Equality Check:

// The first condition if (value1 === value2) checks if both values are strictly equal.
// If they are, we further check for the +0 and -0 case. The expression value1 !== 0 || 1 / value1 === 1 / value2 correctly distinguishes between +0 and -0.
// Handling NaN:

// If the first check fails, we check for NaN. Since NaN is not equal to itself, we can use value1 !== value1 && value2 !== value2 to determine if both values are NaN.
// Return Value:

// The function returns true if both values are the same (considering the special cases), and false otherwise.
// Example Usage:
// The examples show how the customObjectIs function behaves with various inputs, including +0, -0, NaN, primitives, and objects.
// Conclusion:
// This implementation of Object.is correctly handles the edge cases associated with equality in JavaScript. You can further expand this function if you need additional features or optimizations.
