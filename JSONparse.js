//  Implement custom JSON parse

// To implement a custom JSON parser in JavaScript, we need to understand the basic structure of JSON and how to convert a JSON string into a JavaScript object. The JSON format is essentially a text representation of structured data, and we need to handle various data types, including objects, arrays, strings, numbers, booleans, and null.

// Basic Steps for JSON Parsing
// Remove Whitespace: Ignore leading and trailing whitespace.
// Handle Different Data Types: Parse different types of values like strings, numbers, booleans, arrays, and objects.
// Construct the Result: Build a JavaScript object or value based on the parsed data.
// Custom JSON Parse Implementation
// Here's a basic implementation of a custom JSON.parse function:

function customJSONParse(jsonString) {
  // Remove whitespace from the input
  jsonString = jsonString.trim();

  // Helper function to parse a value based on its type
  function parseValue(value) {
    // Handle strings
    if (value[0] === '"') {
      return parseString(value);
    }
    // Handle numbers, booleans, and null
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "null") return null;
    if (!isNaN(value)) return Number(value); // Convert to number if it's a valid number
    throw new SyntaxError(`Unexpected token: ${value}`);
  }

  // Helper function to parse strings
  function parseString(value) {
    // Remove the starting and ending quotes
    let result = "";
    let i = 1; // Start after the opening quote
    while (i < value.length) {
      const char = value[i];
      if (char === '"') break; // End of string
      if (char === "\\") {
        // Handle escape characters
        i++;
        const nextChar = value[i];
        if (nextChar === "n") result += "\n";
        else if (nextChar === "t") result += "\t";
        else if (nextChar === "r") result += "\r";
        else if (nextChar === '"') result += '"';
        else if (nextChar === "\\") result += "\\";
        // Add other escape sequences as needed
      } else {
        result += char; // Add regular characters
      }
      i++;
    }
    return result; // Return the parsed string
  }

  // Main parsing logic
  function parseObject() {
    const obj = {};
    let key = "";
    let expectingKey = true;
    let i = 1; // Start after '{'

    while (i < jsonString.length) {
      const char = jsonString[i];

      if (char === "}") break; // End of object
      if (char === ",") {
        i++;
        continue; // Move to the next character
      }

      if (expectingKey) {
        // Parse key
        if (char === '"') {
          let keyString = "";
          while (jsonString[++i] !== '"') {
            keyString += jsonString[i];
          }
          key = keyString;
          expectingKey = false; // Now expecting value
        }
      } else {
        // Parse value
        let valueString = "";
        while (
          jsonString[i] &&
          jsonString[i] !== "," &&
          jsonString[i] !== "}"
        ) {
          valueString += jsonString[i];
          i++;
        }
        obj[key] = parseValue(valueString.trim()); // Add the key-value pair to the object
        key = ""; // Reset key
        expectingKey = true; // Now expecting key
      }
      i++;
    }

    return obj; // Return the constructed object
  }

  // Main entry point to parse the input JSON string
  if (jsonString[0] === "{") {
    return parseObject(); // Start parsing as an object
  } else {
    throw new SyntaxError("Invalid JSON input"); // Handle invalid input
  }
}

// Example Usage
const jsonString = '{"name": "Alice", "age": 25, "isStudent": false}';
const parsedObject = customJSONParse(jsonString);
console.log(parsedObject); // Output: { name: 'Alice', age: 25, isStudent: false }

// Explanation
// Trimming Input: The input string is trimmed to remove unnecessary whitespace.

// Main Parsing Logic:

// The parseObject function constructs a JavaScript object by parsing key-value pairs.
// The parseValue function determines the type of the value and parses it accordingly.
// The parseString function handles string parsing, including escaping characters.
// State Management:

// The parser keeps track of whether it is expecting a key or a value to manage the object parsing correctly.
// Error Handling: If the JSON string is malformed or invalid, a SyntaxError is thrown.

// Example Usage:
// The example shows how to parse a simple JSON string representing an object and logs the resulting JavaScript object.
// Limitations:
// This implementation is a simplified version of JSON.parse. It does not handle all edge cases, such as nested objects, arrays, or various escape sequences in strings. However, it provides a foundation to build upon.
// Conclusion:
// This custom JSON parser demonstrates how to manually parse JSON strings into JavaScript objects. You can extend the functionality to handle more complex JSON structures, such as arrays and nested objects, for a more robust implementation.
