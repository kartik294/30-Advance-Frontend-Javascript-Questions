//  Implement Virtual DOM I (serializing)

// To implement a basic Virtual DOM (VDOM) serializer, we need to simulate how a Virtual DOM node can be represented and serialized into a format like JSON. The Virtual DOM is a lightweight JavaScript object representation of a real DOM element. It helps optimize DOM updates in frameworks like React by minimizing direct manipulations to the real DOM.

// Steps:
// Create a Virtual DOM structure using JavaScript objects to represent the nodes.
// Serialize the structure into a JSON format for easier transmission or storage.
// Let’s start by defining the basic structure of a Virtual DOM and then implement a function to serialize it.

// Virtual DOM Node Structure
// We will represent a Virtual DOM node as an object with the following properties:

// type: The type of element (e.g., 'div', 'span', etc.).
// props: The attributes or properties (e.g., id, class, etc.).
// children: An array of children nodes (either more virtual nodes or text content).
// Step 1: Define Virtual DOM Elements

function createElement(type, props = {}, ...children) {
  return {
    type, // The type of the DOM element, like 'div', 'span', etc.
    props, // Properties such as attributes (id, class, etc.)
    children: children.map((child) =>
      typeof child === "object" ? child : createTextElement(child)
    ), // If the child is not an object (e.g., text), wrap it in a text node
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT", // Custom type for text nodes
    props: {
      nodeValue: text, // Store the text content
    },
    children: [],
  };
}

// Example Virtual DOM Node
const vdom = createElement(
  "div",
  { id: "parent" },
  createElement("h1", { class: "title" }, "Hello World"),
  createElement("p", null, "This is a Virtual DOM example"),
  createElement(
    "ul",
    null,
    createElement("li", null, "Item 1"),
    createElement("li", null, "Item 2"),
    createElement("li", null, "Item 3")
  )
);

// Step 2: Serialize Virtual DOM
// Next, we’ll implement a function that serializes the Virtual DOM into a JSON-like format that can be used for transmission or storage.

function serializeVDOM(vdom) {
  // Convert the Virtual DOM node to a serializable structure
  return JSON.stringify(vdom, null, 2);
}

// Example usage:

// Output (Serialized Virtual DOM):

{
  "type": "div",
  "props": {
    "id": "parent"
  },
  "children": [
    {
      "type": "h1",
      "props": {
        "class": "title"
      },
      "children": [
        {
          "type": "TEXT_ELEMENT",
          "props": {
            "nodeValue": "Hello World"
          },
          "children": []
        }
      ]
    },
    {
      "type": "p",
      "props": {},
      "children": [
        {
          "type": "TEXT_ELEMENT",
          "props": {
            "nodeValue": "This is a Virtual DOM example"
          },
          "children": []
        }
      ]
    },
    {
      "type": "ul",
      "props": {},
      "children": [
        {
          "type": "li",
          "props": {},
          "children": [
            {
              "type": "TEXT_ELEMENT",
              "props": {
                "nodeValue": "Item 1"
              },
              "children": []
            }
          ]
        },
        {
          "type": "li",
          "props": {},
          "children": [
            {
              "type": "TEXT_ELEMENT",
              "props": {
                "nodeValue": "Item 2"
              },
              "children": []
            }
          ]
        },
        {
          "type": "li",
          "props": {},
          "children": [
            {
              "type": "TEXT_ELEMENT",
              "props": {
                "nodeValue": "Item 3"
              },
              "children": []
            }
          ]
        }
      ]
    }
  ]
}


// Explanation:
// createElement function:

// This function creates a virtual DOM node with a type, props, and children.
// Text nodes are handled specially by wrapping them into objects with type: "TEXT_ELEMENT".
// serializeVDOM function:

// Converts the virtual DOM object into a JSON string using JSON.stringify for easy serialization.
// The null, 2 parameters in JSON.stringify provide pretty formatting with 2-space indentation.
// Conclusion:
// This implementation of the Virtual DOM serializer allows you to represent a DOM structure in memory as a set of lightweight JavaScript objects and serialize it to JSON for inspection, transmission, or storage. The serialized structure can be easily deserialized back into the virtual DOM format.