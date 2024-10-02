// Implement custom Object assign

// Key Steps:
// Create a target object (or use the first argument as the target).
// Iterate over each source object and copy its own enumerable properties to the target object.
// Handle edge cases such as null or undefined source objects.

function customAssign(target, ...sources) {
  // Ensure the target is not null or undefined
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  // Convert target to an object if it's not already
  const to = Object(target);

  // Iterate over each source object
  sources.forEach((source) => {
    if (source != null) {
      // skip if source is null or undefined
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          to[key] = source[key]; // assign property to target
        }
      }
    }
  });

  return to; // return the modified target object
}

// Test cases
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3, d: 4 };

console.log(customAssign(target, source1, source2)); // { a: 1, b: 2, c: 3, d: 4 }

// Key Points:
// Target Validation: The target object cannot be null or undefined. We check for this at the start and throw a TypeError if necessary.
// Copying Properties: We iterate over each source object’s own enumerable properties (using hasOwnProperty) and assign them to the target object.
// Multiple Sources: We use ...sources (rest parameters) to accept multiple source objects.
// Returning the Target: After copying the properties, we return the modified target object.
// Behavior Similarities:
// The customAssign function works similarly to the native Object.assign:
// It throws an error if the target is null or undefined.
// It skips copying properties from null or undefined sources.
// It shallow copies the properties from sources to the target.
