// Implement custom setTimeout


// A custom setTimeout function can be implemented using JavaScript's setInterval() or by leveraging Date to simulate a delay. Here's how we can create a custom version of setTimeout using setInterval.

// Steps to Implement:
// Delay Simulation: Keep track of the elapsed time using setInterval and execute the callback after the specified delay.
// Clear Timeout: Ensure the timer can be cleared, just like the native setTimeout, using a clear mechanism.
// Custom setTimeout Implementation Using setInterval

function customSetTimeout(callback, delay) {
  let start = Date.now(); // Store the start time
  let timerId;

  // Function to track time and execute the callback when enough time has passed
  const checkTime = () => {
    if (Date.now() - start >= delay) {
      clearInterval(timerId); // Clear the interval once the delay has passed
      callback(); // Execute the callback
    }
  };

  // Use setInterval to check time periodically
  timerId = setInterval(checkTime, 1);

  // Return a handle for the interval so it can be cleared
  return timerId;
}

// Custom clearTimeout to clear the timer
function customClearTimeout(timerId) {
  clearInterval(timerId); // Clear the interval using the ID
}

// Example usage
const timerId = customSetTimeout(() => {
  console.log('Executed after 2 seconds');
}, 2000);

// If needed, you can clear the timeout like this:
// customClearTimeout(timerId);


Explanation:
// Track Start Time:

// We store the current time using Date.now() when the customSetTimeout is called.
// Simulate the Delay:

// We use setInterval() to repeatedly check the elapsed time by subtracting the start time from the current time (Date.now()).
// Once the elapsed time is greater than or equal to the delay, the callback is executed.
// Clear Timer:

// The interval is cleared using clearInterval() after the callback has been invoked to stop the timer.
// Additionally, a customClearTimeout function is provided, which allows manually clearing the interval.
// Callback Execution:

// The callback function is executed once the delay is met.

// Test Example:

const timerId = customSetTimeout(() => {
  console.log('This will run after 1 second');
}, 1000);

// If you want to stop it before it executes, call:
// customClearTimeout(timerId);


// Alternative: Using requestAnimationFrame
// You can also implement a setTimeout using requestAnimationFrame, which gives better performance in certain cases because it synchronizes with the browser's repaint cycle. Here's an alternative implementation:

function customSetTimeoutRAF(callback, delay) {
  let start = Date.now();

  function checkTime() {
    if (Date.now() - start >= delay) {
      callback();
    } else {
      requestAnimationFrame(checkTime);
    }
  }

  requestAnimationFrame(checkTime);
}

// Usage example
customSetTimeoutRAF(() => {
  console.log('Executed after 1 second using RAF');
}, 1000);


// This version uses requestAnimationFrame to check the time on each frame and invokes the callback when the delay is reached. This approach is generally better for smooth animations or UI updates.

// Conclusion:
// This custom implementation of setTimeout mimics the functionality of the native setTimeout, allowing you to simulate delays and clear timers. You can choose the method based on whether you prefer using setInterval for more accurate timing or requestAnimationFrame for smoother UI interactions.