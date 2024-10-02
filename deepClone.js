// Implement custom Deep Clone

// Implementing a custom deep clone function in JavaScript allows you to create a copy of an object or array that includes nested objects and arrays. A deep clone ensures that all levels of nested objects are copied by value, rather than by reference, which prevents unintended mutations to the original object when modifying the clone.

// Steps to Implement a Deep Clone Function:
// Type Checking: Check the type of the value being cloned.
// Handle Different Types: Handle cloning for objects, arrays, and primitive values.
// Circular Reference Handling: Use a Map or WeakMap to track already cloned objects to avoid infinite loops in case of circular references.
// Custom Deep Clone Implementation
// Here's how you can create a custom deepClone function:

function deepClone(value, hash = new WeakMap()) {
  // Check for circular references
  if (value === null || typeof value !== "object") {
    return value; // Return primitive values as is
  }

  if (hash.has(value)) {
    return hash.get(value); // Return the cloned instance if already cloned
  }

  // Create a new instance based on the type of the object
  const clonedValue = Array.isArray(value)
    ? []
    : Object.create(Object.getPrototypeOf(value));
  hash.set(value, clonedValue); // Store the reference to avoid circular references

  // Recursively clone each property
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clonedValue[key] = deepClone(value[key], hash); // Recursion for nested objects
    }
  }

  return clonedValue; // Return the deep cloned value
}

// Example Usage
const original = {
  name: "John",
  age: 30,
  nested: {
    isActive: true,
    hobbies: ["reading", "traveling"],
  },
  circularRef: null,
};
original.circularRef = original; // Adding a circular reference

const cloned = deepClone(original);

console.log(cloned); // Output the cloned object
console.log(cloned.nested.hobbies); // Output: ['reading', 'traveling']
console.log(cloned.circularRef === cloned); // Output: true (circular reference preserved)
console.log(cloned === original); // Output: false (different objects)

// Explanation:
// Function Signature:

// The deepClone function accepts a value to clone and an optional hash parameter (defaulting to a new WeakMap for tracking circular references).
// Primitive Value Check:

// If the value is null or a primitive (not an object), it is returned as is.
// Circular Reference Handling:

// Before cloning, the function checks if the value has already been cloned by looking it up in the hash map. If found, it returns the previously cloned instance to avoid circular references.
// Object or Array Creation:

// A new object or array is created based on the type of the value being cloned using Array.isArray() for arrays and Object.create() for objects to maintain the prototype chain.
// Property Cloning:

// The function iterates over the properties of the original object using a for...in loop and recursively calls deepClone for each property, ensuring that nested objects are also cloned.
// Return Value:

// Finally, the newly created cloned object or array is returned.
// Example Usage:
// The example shows how to use deepClone with an object that includes nested properties and a circular reference. The clone retains the structure and values of the original object, ensuring that changes to the clone do not affect the original.
// Conclusion:
// This implementation of a deep clone function effectively handles cloning of objects and arrays while accounting for circular references, preserving the prototype chain, and providing a comprehensive solution for creating deep copies in JavaScript.
