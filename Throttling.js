// Throttling is a rate-limiting technique that restricts the number of times a function can be executed over a specific time interval. Unlike debouncing, which executes a function after a delay, throttling ensures that a function is executed at most once in a specified timeframe.

// Throttling Implementation
// Here’s how you can implement a basic throttling function in JavaScript:

function throttle(func, limit) {
  let lastFunc;
  let lastRan;

  return function (...args) {
    const context = this; // Save the context

    if (!lastRan) {
      // If the function has never run, run it immediately
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      // If the function has run, check the time since the last run
      const timeSinceLastRun = Date.now() - lastRan;

      // If the time since the last run is greater than the limit
      if (timeSinceLastRun >= limit) {
        func.apply(context, args); // Call the function
        lastRan = Date.now(); // Update the last ran time
      } else {
        // If it's too soon to call the function, we can set a timeout to call it later
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args); // Call the function
            lastRan = Date.now(); // Update the last ran time
          }
        }, limit - timeSinceLastRun);
      }
    }
  };
}

// Example usage
const log = () => {
  console.log("Throttled function executed!");
};

const throttledLog = throttle(log, 2000); // Throttle the log function to execute at most every 2000 ms

// Test calls
throttledLog(); // Executes immediately
throttledLog(); // Will be ignored
throttledLog(); // Will be ignored

setTimeout(throttledLog, 1000); // Will be ignored
setTimeout(throttledLog, 2500); // Executes after 2500 ms
setTimeout(throttledLog, 3000); // Executes after 3000 ms

Explanation;
// Parameters:

// func: The function you want to throttle.
// limit: The time in milliseconds that must pass before the function can be called again.
// Variables:

// lastFunc: Holds the timeout ID for the last scheduled function execution.
// lastRan: Tracks the last time the function was executed.
// Execution Logic:

// When the throttled function is called, it checks if it has run before. If it hasn’t, it executes immediately.
// If it has run before, it checks the time since it last ran:
// If the time is greater than the specified limit, it executes the function again and updates the lastRan timestamp.
// If it’s still within the limit, it sets a timeout to potentially call the function again after enough time has passed.

// Use Cases
// Throttling is often used in scenarios where events occur rapidly, such as scrolling, resizing the window, or handling input events. For example, if you want to track the position of the mouse during a scroll event without overwhelming your application, throttling ensures that the event handler is not called more often than necessary.
// Conclusion
// This implementation of a throttling function allows you to manage how often a function can be invoked over time. By adjusting the limit, you can control the frequency of function calls, enhancing performance and user experience in applications.
