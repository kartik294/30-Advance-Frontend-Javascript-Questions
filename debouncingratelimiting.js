// Implement debouncing rate limiting

// Implementing debouncing and rate limiting in JavaScript involves controlling the rate at which a function is executed. Debouncing ensures that a function is only executed after a specified delay period has passed since its last invocation, while rate limiting restricts how many times a function can be executed within a certain timeframe.

// Here's how you can implement both debouncing and rate limiting:

// Debouncing Function
// The debouncing function will only execute the provided callback after a specified delay when no new events occur.

function debounce(func, delay) {
  let timeoutId; // Holds the timeout ID

  return function (...args) {
    // Clear the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args); // Call the original function with the given context and arguments
    }, delay);
  };
}

// Example usage
const log = () => {
  console.log("Function executed!");
};

const debouncedLog = debounce(log, 1000);

debouncedLog(); // Will not execute immediately
debouncedLog(); // Will not execute immediately
setTimeout(debouncedLog, 500); // Will not execute immediately
setTimeout(debouncedLog, 1500); // Will execute after 1000 ms

// Rate Limiting Function
// The rate limiting function restricts how many times a function can be executed in a specified timeframe.

function rateLimit(func, limit, interval) {
  let count = 0; // Count of how many times the function has been called
  let startTime = Date.now(); // Track the start time

  return function (...args) {
    const now = Date.now();

    // Reset the count and start time if the interval has passed
    if (now - startTime >= interval) {
      count = 0;
      startTime = now;
    }

    // If the limit hasn't been reached, call the function
    if (count < limit) {
      count++;
      func.apply(this, args); // Call the original function with the given context and arguments
    } else {
      console.log(
        `Rate limit exceeded. Try again in ${interval - (now - startTime)} ms.`
      );
    }
  };
}

// Example usage
const logRateLimited = () => {
  console.log("Function executed under rate limit!");
};

const rateLimitedLog = rateLimit(logRateLimited, 2, 3000);

rateLimitedLog(); // Executes immediately
rateLimitedLog(); // Executes immediately
rateLimitedLog(); // Will not execute, exceeds the limit
setTimeout(rateLimitedLog, 1000); // Will not execute, still in the same interval
setTimeout(rateLimitedLog, 4000); // Executes, interval has passed

// Combining Debouncing and Rate Limiting
// You can combine both debouncing and rate limiting for more control. Here’s an example:

function debounceRateLimit(func, delay, limit, interval) {
  let timeoutId; // Holds the timeout ID
  let count = 0; // Count of how many times the function has been called
  let startTime = Date.now(); // Track the start time

  return function (...args) {
    const now = Date.now();

    // Reset the count and start time if the interval has passed
    if (now - startTime >= interval) {
      count = 0;
      startTime = now;
    }

    // Clear the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      // If the limit hasn't been reached, call the function
      if (count < limit) {
        count++;
        func.apply(this, args); // Call the original function with the given context and arguments
      } else {
        console.log(
          `Rate limit exceeded. Try again in ${
            interval - (now - startTime)
          } ms.`
        );
      }
    }, delay);
  };
}

// Example usage
const logDebouncedRateLimited = () => {
  console.log("Function executed with debounce and rate limit!");
};

const combinedFunction = debounceRateLimit(
  logDebouncedRateLimited,
  1000,
  2,
  3000
);

// Test calls
combinedFunction(); // Executes immediately
combinedFunction(); // Executes immediately
combinedFunction(); // Will not execute, exceeds the limit
setTimeout(combinedFunction, 500); // Will not execute, still within delay
setTimeout(combinedFunction, 1500); // Executes after delay, interval check applies
setTimeout(combinedFunction, 4000); // Executes, interval has passed

// Explanation
// Debounce:

// The debounce function clears any previous timeout, ensuring that the callback is only called once after the specified delay.
// Rate Limit:

// The rateLimit function checks how many times the function has been called in the specified interval. If the count exceeds the limit, it logs a message indicating that the rate limit has been exceeded.
// Combined Function:

// The debounceRateLimit function combines both functionalities, ensuring that the function can be called only a specified number of times within a certain timeframe, while also delaying the execution until there’s a pause in invocations.
// Use Cases
// Debouncing is often used in scenarios like window resizing, text input in search fields, or scrolling events to avoid executing the function too frequently.
// Rate Limiting is useful for APIs where you need to limit the number of requests made in a given timeframe to prevent abuse or overloading the server.
// By using these techniques, you can enhance the performance of your JavaScript applications by managing how functions are called based on user interactions or events
