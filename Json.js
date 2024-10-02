//Implement custom JSON stringify

// Steps:
// Handle basic data types like null, number, boolean, string.
// Handle arrays by iterating through them and serializing each element.
// Handle objects by serializing key-value pairs.
// Avoid circular references to prevent infinite loops.

function customStringify(value) {
  // Handle null
  if (value === null) {
    return "null";
  }

  // Handle number, boolean, and function
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  // Handle string
  if (typeof value === "string") {
    return `"${value}"`; // add double quotes
  }

  // Handle array
  if (Array.isArray(value)) {
    const arrValues = value.map((item) => customStringify(item) || "null");
    return `[${arrValues.join(",")}]`;
  }

  // Handle object
  if (typeof value === "object") {
    let objValues = [];
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        const keyValue = customStringify(value[key]);
        if (keyValue !== undefined) {
          objValues.push(`"${key}":${keyValue}`);
        }
      }
    }
    return `{${objValues.join(",")}}`;
  }

  // Handle undefined and function (these are not included in JSON)
  if (typeof value === "undefined" || typeof value === "function") {
    return undefined;
  }
}

// Test cases
const testObj = {
  name: "ChatGPT",
  age: 4,
  active: true,
  details: {
    language: "JavaScript",
    purpose: null,
  },
  hobbies: ["coding", "reading"],
};

console.log(customStringify(testObj)); // expected output similar to JSON.stringify

// Key Points:
// The function checks for different types and serializes them accordingly.
// Strings are wrapped in double quotes.
// Arrays are processed by recursively serializing each element.
// Objects are serialized by converting each key-value pair into a "key":value format.
// undefined and function are ignored, as they are not valid JSON data types.
// This is a simple implementation that covers many common cases, but it could be expanded to handle edge cases like circular references or more complex data structures.
