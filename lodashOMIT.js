// Implement custom lodash omit

// The _.omit function in Lodash creates an object composed of properties that are not omitted from the original object. This function allows you to exclude specific properties from an object.

// To implement a custom omit function, we need to:

// Take an object and a list of keys to omit.
// Return a new object that contains only the properties of the original object that are not in the list of omitted keys.
// Custom omit Implementation
// Here's how to implement the omit function in JavaScript:

function customOmit(obj, keysToOmit) {
  // Convert keysToOmit to a Set for faster lookups
  const omitSet = new Set(keysToOmit);

  // Use Object.keys() to iterate over the object
  return Object.keys(obj).reduce((result, key) => {
    // Add to result if the key is not in the keysToOmit set
    if (!omitSet.has(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {}); // Start with an empty object
}

// Example usage:
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

const result = customOmit(obj, ["b", "d"]);
console.log(result); // Output: { a: 1, c: 3 }

// Explanation:
// Input Parameters:

// obj: The original object from which you want to omit keys.
// keysToOmit: An array of keys that you want to omit from the object.
// Using a Set for Faster Lookup:

// Convert keysToOmit into a Set for fast O(1) lookups, ensuring the omitted keys are checked efficiently.
// Iterating over Object Keys:

// Use Object.keys(obj) to get an array of the object’s keys.
// Iterate over each key using reduce(), checking whether the key is present in the omitSet. If not, add it to the result object.
// Building the Result:

// The reduce() function starts with an empty object {}.
// If a key is not in the omitSet, it’s added to the result object with its value.
// Returning the Result:

// After iterating through all the keys, the final object (excluding the omitted keys) is returned.
// Edge Cases:
// Non-existent Keys: If a key to omit doesn't exist in the object, it will simply be ignored.
// Empty Keys Array: If no keys are specified to omit, the original object is returned unchanged.
// Immutable Operation: The original object is not modified. A new object is created and returned.

const obj2 = {
  name: "John",
  age: 30,
  gender: "male",
  city: "New York",
};

console.log(customOmit(obj2, ["age", "city"]));
// Output: { name: 'John', gender: 'male' }

// This custom omit function replicates the behavior of Lodash's omit, allowing you to exclude specific properties from an object in a clean and efficient way.
