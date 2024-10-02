// To implement a custom version of Lodash's set function in JavaScript, we need to be able to update or add properties in a deeply nested object using a given path (which can be a string or array). If any part of the path doesn't exist, we need to create it.

// Custom set Implementation
// Here’s how you can implement a custom set function:

function customSet(object, path, value) {
  // Ensure the path is an array, convert string paths to an array
  const pathArray = Array.isArray(path)
    ? path
    : path.replace(/\[(\d+)]/g, ".$1").split(".");

  // Iterate through the path and set the value
  let current = object;

  pathArray.forEach((key, index) => {
    // If we are at the last key, set the value
    if (index === pathArray.length - 1) {
      current[key] = value;
    } else {
      // If the key doesn't exist or is not an object/array, create an empty object or array
      if (current[key] === undefined || current[key] === null) {
        current[key] = isNaN(Number(pathArray[index + 1])) ? {} : [];
      }
      // Move to the next nested level
      current = current[key];
    }
  });

  return object;
}

// Example usage:
const obj = {};

// Set a nested value
customSet(obj, "a.b.c", 42);
console.log(obj); // Output: { a: { b: { c: 42 } } }

// Set a value in an array
customSet(obj, "a.b.arr[0].d", 100);
console.log(obj); // Output: { a: { b: { c: 42, arr: [{ d: 100 }] } } }

// Modify an existing value
customSet(obj, "a.b.c", 99);
console.log(obj); // Output: { a: { b: { c: 99, arr: [{ d: 100 }] } } }

// Explanation:
// Handling Path:

// If the path is a string (like 'a.b.c'), it's converted into an array using .split('.').
// The regular expression /\[(\d+)]/g is used to handle array indices like 'arr[0]', converting it to 'arr.0' for easier traversal.
// Traversing and Setting the Value:

// The function iterates over each key in the path.
// If the current key is not the last key, the function checks whether the key already exists in the object.
// If the key does not exist, it creates an empty object {} or an empty array [] depending on the next key (whether it's numeric or not).
// Setting the Value:

// Once the iteration reaches the last key, the value is set at the specified path.
// Returning the Object:

// The function returns the modified object after setting the value.
// Edge Cases:
// Path doesn't exist: If any part of the path doesn’t exist in the object, it will be created (either as an object or an array depending on the next key).
// Arrays in the path: The function handles array indices like arr[0] and sets values at the correct positions.
// Overwriting values: If the path already exists in the object, the value at that path is overwritten.
// This custom implementation of set mimics the behavior of Lodash's set function, allowing you to safely set deeply nested properties in a JavaScript object.
