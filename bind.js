//  Implement custom bind method

// The bind() method in JavaScript creates a new function that, when called, has its this value set to the provided context and can optionally accept a set of arguments that are prepended to any arguments provided when the function is called.

// To implement a custom version of bind(), you need to:

// Bind a specific this value to the function.
// Optionally bind some initial arguments (partial application).
// Return a new function that can be invoked with the bound context and arguments.
// Key Steps:
// Store the context (this): The provided this value must be fixed for the returned function.
// Partial Application: Optionally allow some arguments to be preset when binding the function.
// Return a New Function: This new function, when invoked, will call the original function with the bound this value and arguments.

// Custom bind Implementation

Function.prototype.customBind = function (context, ...boundArgs) {
  const fn = this; // Store the original function reference

  return function (...args) {
    // Combine bound arguments (from bind call) with new arguments (from function call)
    return fn.apply(context, [...boundArgs, ...args]);
  };
};

// Example function
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

// Test case
const person = { name: "John" };
const boundGreet = greet.customBind(person, "Hello");
console.log(boundGreet("!")); // Output: "Hello, John!"

// Explanation:
// Handling Context (this):

// The this value for the function is captured and stored in fn using const fn = this. When calling the bound function, this stored function is invoked with the appropriate context.
// Partial Application (Arguments Binding):

// The arguments passed during the bind() call (boundArgs) are stored. These arguments are prepended to any arguments provided when the bound function is invoked.
// Function Execution:

// When the returned function is invoked, it calls the original function (fn) using apply() to ensure the correct this context and arguments are used.
// The combined array of arguments ([...boundArgs, ...args]) merges the preset arguments with any new arguments passed when the function is called.
// Returning a New Function:

// The customBind() method returns a new function, which when invoked, executes the original function with the bound this value and arguments.

// Test Example:

function multiply(a, b) {
  return a * b;
}

const double = multiply.customBind(null, 2);
console.log(double(5)); // Output: 10

// In this case, multiply.customBind(null, 2) returns a new function double, which always multiplies its argument by 2.

// Bonus: Handling Constructor Behavior
// To fully replicate the native bind() behavior, you would also need to handle the scenario where the bound function is used as a constructor. Here's an enhanced version that handles this:

Function.prototype.customBind = function (context, ...boundArgs) {
  const fn = this;

  return function boundFunction(...args) {
    // Check if the function is called as a constructor (with new)
    if (this instanceof boundFunction) {
      // If so, ignore the provided context and bind to `this`
      return new fn(...boundArgs, ...args);
    }
    // Otherwise, apply the function with the provided context
    return fn.apply(context, [...boundArgs, ...args]);
  };
};

// This enhanced version checks if the bound function is being called with new (indicating it's being used as a constructor). If so, it ignores the bound context and binds to the newly created instance (this).

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const BoundPerson = Person.customBind(null, "John");

const personInstance = new BoundPerson("Doe");
console.log(personInstance.firstName); // Output: "John"
console.log(personInstance.lastName); // Output: "Doe"

// This enhanced version checks if the bound function is being called with new (indicating it's being used as a constructor). If so, it ignores the bound context and binds to the newly created instance (this)

Example: function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// const BoundPerson = Person.customBind(null, "John");

// const personInstance = new BoundPerson("Doe");
console.log(personInstance.firstName); // Output: "John"
console.log(personInstance.lastName); // Output: "Doe"
// This fully mimics the behavior of JavaScript's native bind() method, supporting both standard function invocation and constructor behavior.
