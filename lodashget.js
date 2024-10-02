//  Implement custom lodash get

// To implement a custom version of Lodash's get function in JavaScript, we need to extract the value from a deeply nested object using a path (which can be a string or an array). If the value doesn't exist, the function should return a default value.

// Custom get Implementation
// Here's how to implement it:

function customGet(object, path, defaultValue) {
  // Ensure path is an array, if it's a string convert it into an array
  const pathArray = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)]/g, ".$1").split(".");

  // Iterate through the path array to get the nested value
  let result = object;
  for (let key of pathArray) {
    result = result?.[key];
    if (result === undefined) {
      return defaultValue;
    }
  }

  return result;
}

// Example usage:

const obj = {
  a: {
    b: {
      c: 42,
      d: null,
    },
  },
};

console.log(customGet(obj, "a.b.c")); // Output: 42
console.log(customGet(obj, "a.b.c.e", "default")); // Output: 'default'
console.log(customGet(obj, "a.b.d", "default")); // Output: null
console.log(customGet(obj, "a.b.c[0]", "default")); // Output: 'default'

// Explanation:
// Handling Path:

// If the path is a string (like 'a.b.c'), it is converted into an array using .split('.'). This allows for easy traversal of nested objects.
// The regular expression /\[(\d+)]/g is used to handle cases like a[0], converting it to a.0.
// Iterating through the Path:

// The function then iterates over each key in the path and traverses the object step by step.
// If at any point a key does not exist, it returns the defaultValue.
// Optional Chaining:

// result?.[key] safely accesses properties using optional chaining. If result is undefined or null, the entire expression short-circuits and returns undefined.
// Return Value:

// If the entire path exists in the object, the corresponding value is returned.
// If any part of the path is undefined, the defaultValue is returned.
// Edge Cases:
// If the path does not exist in the object, the default value is returned.
// The function can handle both array and object paths.
// If the value at the path exists but is null, it will return null (not the default value).
// This function mimics the behavior of Lodash's get utility, allowing you to safely access nested properties in JavaScript objects.
