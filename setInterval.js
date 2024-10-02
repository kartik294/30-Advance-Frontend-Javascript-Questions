// Implement custom setInterval

// A custom setInterval function can be implemented using setTimeout recursively. In this approach, the setTimeout function calls itself repeatedly to simulate the behavior of setInterval.

// Steps to Implement:
// Recursive Timeout: Use setTimeout to simulate periodic execution of a function.
// Handle Timer Clearing: Allow the interval to be cleared, similar to how clearInterval works with the native setInterval.
// Custom setInterval Implementation

function customSetInterval(callback, delay) {
  let timerId;

  // Recursive function to mimic interval behavior using setTimeout
  function intervalFunction() {
    // Execute the callback function
    callback();

    // Schedule the next execution
    timerId = setTimeout(intervalFunction, delay);
  }

  // Start the first timeout
  timerId = setTimeout(intervalFunction, delay);

  // Return an object with a method to clear the interval
  return {
    clear: function () {
      clearTimeout(timerId); // Clear the scheduled timeout
    },
  };
}

// Custom clearInterval is implemented in the returned object itself
// No need for a separate function

// Explanation:
// Recursive setTimeout:

// The key to simulating setInterval with setTimeout is to call setTimeout recursively inside the callback. Once the callback is executed, a new timeout is set for the next execution.
// Callback Execution:

// The callback function is executed after the specified delay, and it continues to execute periodically due to the recursive setTimeout calls.
// Timer Clearing:

// The returned object contains a clear method that, when invoked, calls clearTimeout to stop the recursion and cancel the interval.
// Manual Clearing:

// Since the interval is managed by setTimeout, clearing it can be done by stopping the recursion with clearTimeout.
// Test Example:

// In this example, the function will print "Executed every 1 second" every second, and after 5 seconds, it will stop and print "Interval cleared".

// Key Differences from Native setInterval:
// Accuracy: Using setTimeout recursively might provide better accuracy than setInterval, as the native setInterval may accumulate drift over time.
// Flexibility: You have more control over the timing and can introduce dynamic intervals (i.e., intervals that change after each execution).
// This approach provides a custom implementation of setInterval that behaves similarly to the native version while offering manual control over clearing the interval.
