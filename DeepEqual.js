// Implement custom Deep Equal

// Key Steps:
// Handle primitive types (like numbers, strings, booleans, null, and undefined) by comparing them with the strict equality operator (===).
// For objects and arrays, recursively compare their properties or elements.
// Ensure that both objects or arrays have the same number of properties or elements, and compare each one.
// Handle special cases like Date, RegExp, Map, Set, and edge cases like functions, null, NaN, and circular references (optional for basic implementation).

function deepEqual(obj1, obj2) {
  // Check for strict equality first (covers primitive types)
  if (obj1 === obj2) {
    return true;
  }

  // Handle case where one or both are null (null is an object in JS)
  if (
    obj1 === null ||
    obj2 === null ||
    typeof obj1 !== "object" ||
    typeof obj2 !== "object"
  ) {
    return false;
  }

  // Compare object prototypes (if they differ, objects aren't equal)
  if (Object.getPrototypeOf(obj1) !== Object.getPrototypeOf(obj2)) {
    return false;
  }

  // Handle arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) return false;
    }
    return true;
  }

  // Compare objects by their keys and values
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

// Test cases
const objA = {
  name: "John",
  age: 30,
  nested: {
    score: [1, 2, 3],
    active: true,
  },
};

const objB = {
  name: "John",
  age: 30,
  nested: {
    score: [1, 2, 3],
    active: true,
  },
};

const objC = {
  name: "John",
  age: 30,
  nested: {
    score: [1, 2, 4], // Difference in score array
    active: true,
  },
};

console.log(deepEqual(objA, objB)); // true
console.log(deepEqual(objA, objC)); // false

// How It Works:
// Primitive Comparison: First, it checks if obj1 === obj2. This handles cases where the values are the same primitive types or the same reference.

// Type and Null Check: It verifies whether the types differ (e.g., one is object and the other is null), which results in inequality.

// Arrays: If both values are arrays, it compares their lengths and elements recursively.

// Objects: For objects, it checks if both objects have the same number of keys and compares each key-value pair recursively.

// Edge Cases: This handles basic objects and arrays but can be expanded to include comparisons for other special objects (e.g., Date, RegExp, Map, Set).

// Considerations:
// This solution does not handle circular references. For that, a set or map to track visited objects is required to prevent infinite loops.
// It assumes NaN is not equal to NaN, similar to === behavior.
