// Implement custom Event Emitter

// Implementing a custom Event EEmitter in JavaScript involves creating a class that can register event listeners, emit events, and allow for removing listeners. This is commonly used in many JavaScript libraries and frameworks for handling events in a decoupled manner.

// Steps to Implement an Event Emitter:
// Store Event Listeners: Use an object to hold arrays of listeners for different event types.
// Register Event Listeners: Allow listeners to be added for specific events.
// Emit Events: Trigger all listeners for a given event type and pass data to them.
// Remove Event Listeners: Allow listeners to be removed if they are no longer needed.
// Custom Event Emitter Implementation
// Here's how you can create a simple Event Emitter class:

class EventEmitter {
  constructor() {
    this.events = {}; // Object to hold event listeners
  }

  // Method to register an event listener
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []; // Initialize an array for the event
    }
    this.events[event].push(listener); // Add the listener to the event
  }

  // Method to emit an event
  emit(event, ...args) {
    if (this.events[event]) {
      // Call each listener for the event with the provided arguments
      this.events[event].forEach((listener) => listener(...args));
    }
  }

  // Method to remove a specific event listener
  off(event, listener) {
    if (!this.events[event]) return; // Exit if no listeners for the event

    // Filter out the listener that we want to remove
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  // Method to remove all listeners for a specific event
  removeAllListeners(event) {
    if (this.events[event]) {
      delete this.events[event]; // Delete the array of listeners for the event
    }
  }
}

// Example Usage
const emitter = new EventEmitter();

function onResponse(data) {
  console.log("Received response:", data);
}

// Registering an event listener
emitter.on("response", onResponse);

// Emitting the event with some data
emitter.emit("response", { message: "Hello, World!" }); // Output: Received response: { message: 'Hello, World!' }

// Removing the event listener
emitter.off("response", onResponse);

// Trying to emit the event again (no output because listener has been removed)
emitter.emit("response", { message: "This will not be logged" });

// Registering again
emitter.on("response", onResponse);

// Emitting again (will log the message)
emitter.emit("response", { message: "Hello again!" }); // Output: Received response: { message: 'Hello again!' }

// Explanation:
// Constructor:

// The constructor initializes an empty object, events, which will store arrays of listeners for each event type.
// on Method:

// The on method allows adding listeners for specific events. It checks if the event already exists in events and initializes it if it doesn't. Then, it pushes the listener into the array for that event.
// emit Method:

// The emit method triggers the event, calling all associated listeners with any provided arguments. It checks if any listeners exist for the event before attempting to call them.
// off Method:

// The off method allows removing a specific listener from an event. It filters out the listener that needs to be removed.
// removeAllListeners Method:

// This method can remove all listeners associated with a specific event type, effectively clearing the event's listeners.
// Conclusion:
// This implementation provides a straightforward and flexible way to handle events in your JavaScript applications. You can extend this class further with more features, such as support for once-only listeners (listeners that are automatically removed after being called once) or asynchronous event handling, depending on your needs.
