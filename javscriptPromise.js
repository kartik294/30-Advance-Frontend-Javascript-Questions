//  Implement custom javascript promises

// Implementing custom JavaScript promises involves creating a class that mimics the behavior of native Promises. A promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

// Key Features of Promises
// States: A promise can be in one of three states: pending, fulfilled, or rejected.
// Methods: Promises provide then, catch, and finally methods for handling resolved and rejected states.
// Chaining: Promises should support chaining of .then calls.
// Custom Promise Implementation
// Here’s a basic implementation of a custom Promise class:

class CustomPromise {
  constructor(executor) {
    this.state = "pending"; // Initial state
    this.value = undefined; // Holds the resolved value
    this.reason = undefined; // Holds the rejection reason
    this.onFulfilledCallbacks = []; // Callbacks for resolved promises
    this.onRejectedCallbacks = []; // Callbacks for rejected promises

    // The resolve function
    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled"; // Update state
        this.value = value; // Set value
        this.onFulfilledCallbacks.forEach((callback) => callback(value)); // Execute all callbacks
      }
    };

    // The reject function
    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected"; // Update state
        this.reason = reason; // Set reason
        this.onRejectedCallbacks.forEach((callback) => callback(reason)); // Execute all callbacks
      }
    };

    // Execute the executor function
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error); // Reject if an error occurs
    }
  }

  // The then method for chaining promises
  then(onFulfilled, onRejected) {
    // Return a new promise for chaining
    return new CustomPromise((resolve, reject) => {
      const handleFulfilled = () => {
        try {
          const result = onFulfilled(this.value);
          resolve(result); // Resolve the new promise with the result
        } catch (error) {
          reject(error); // Reject if an error occurs
        }
      };

      const handleRejected = () => {
        try {
          const result = onRejected(this.reason);
          resolve(result); // Resolve the new promise with the result
        } catch (error) {
          reject(error); // Reject if an error occurs
        }
      };

      // Handle the current state
      if (this.state === "fulfilled") {
        handleFulfilled(); // Call the fulfilled handler
      } else if (this.state === "rejected") {
        handleRejected(); // Call the rejected handler
      } else {
        // If still pending, add to the callbacks array
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  // The catch method for handling rejections
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // The finally method for cleanup actions
  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally();
        return value; // Return the fulfilled value
      },
      (reason) => {
        onFinally();
        throw reason; // Rethrow the rejected reason
      }
    );
  }
}

// Example Usage
const promise1 = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 resolved!");
  }, 1000);
});

const promise2 = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise 2 rejected!");
  }, 500);
});

promise1
  .then((result) => {
    console.log(result); // Output: 'Promise 1 resolved!'
    return "Next value";
  })
  .then((nextValue) => {
    console.log(nextValue); // Output: 'Next value'
  })
  .catch((error) => {
    console.error(error); // Handle any rejection
  });

promise2
  .then((result) => {
    console.log(result); // This won't run
  })
  .catch((error) => {
    console.error(error); // Output: 'Promise 2 rejected!'
  });

//   Explanation:
// Constructor:

// The constructor accepts an executor function that takes two functions: resolve and reject.
// The state is initially set to pending, and arrays are created to hold the callbacks for fulfillment and rejection.
// Resolve and Reject Functions:

// The resolve function updates the state to fulfilled and calls all registered onFulfilled callbacks.
// The reject function updates the state to rejected and calls all registered onRejected callbacks.
// The then Method:

// The then method allows chaining by returning a new promise.
// It checks the current state and executes the appropriate handler, ensuring proper error handling with try-catch blocks.
// The catch Method:

// The catch method is a shorthand for handling rejected promises by calling then with only the rejection handler.
// The finally Method:

// The finally method allows executing cleanup actions regardless of the promise's outcome.
// Example Usage:
// The example demonstrates how to create and use the custom promise, showing both fulfillment and rejection scenarios.
// Conclusion:
// This custom promise implementation captures the essential features of native JavaScript promises, including state management, chaining, and error handling. You can further extend this implementation to add more features or optimizations as needed.
