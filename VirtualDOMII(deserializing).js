// Implement Virtual DOM II (deserializing)

// To implement Virtual DOM deserialization, we will convert a serialized Virtual DOM (which is typically represented as a JSON string) back into a usable virtual DOM object structure. This is the reverse of serialization, allowing us to take a stringified Virtual DOM representation and turn it into an in-memory structure that can be used to render the actual DOM.

// Steps:
// Parse the JSON string back into a JavaScript object.
// Traverse the parsed object and recreate the Virtual DOM structure.
// Optionally, convert the Virtual DOM back into real DOM elements.
// Step 1: Parsing JSON
// We start by taking the serialized Virtual DOM string and using JSON.parse to convert it back into an object. This will give us a plain JavaScript object that we can use.

// Step 2: Recreate the Virtual DOM
// Once we have the object structure, we can traverse it to recreate the original Virtual DOM by building a function to handle the deserialization.

// Function to deserialize the JSON string back to a Virtual DOM object
function deserializeVDOM(jsonString) {
  // Parse the JSON string into a JavaScript object
  const vdom = JSON.parse(jsonString);

  // Recreate the virtual DOM from the parsed object
  function createElement(vnode) {
    if (vnode.type === "TEXT_ELEMENT") {
      // Handle text elements by returning the nodeValue directly
      return document.createTextNode(vnode.props.nodeValue);
    }

    // Create the DOM element based on the type
    const element = document.createElement(vnode.type);

    // Set the properties/attributes
    Object.keys(vnode.props).forEach((key) => {
      if (key !== "children") {
        element.setAttribute(key, vnode.props[key]);
      }
    });

    // Recursively create and append child nodes
    vnode.children.forEach((child) => {
      element.appendChild(createElement(child));
    });

    return element;
  }

  // The root element to be returned
  return createElement(vdom);
}

// Example serialized VDOM (from Virtual DOM I serialization)
const serializedVDOM = `
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
`;

// Example usage of deserialization
const realDOM = deserializeVDOM(serializedVDOM);
document.body.appendChild(realDOM);

// deserializeVDOM function:

// Takes a serialized Virtual DOM string (in JSON format) and converts it back into a JavaScript object using JSON.parse.
// createElement function:

// Recursively processes the parsed object:
// If the node is a text element (type: "TEXT_ELEMENT"), it creates a text node using document.createTextNode().
// Otherwise, it creates an actual DOM element using document.createElement(vnode.type).
// Sets the element's properties (like id, class, etc.) using setAttribute.
// Recursively creates and appends children to the parent node.
// Example:

// The deserializeVDOM function is used to recreate a DOM structure from a serialized JSON string, and the resulting DOM tree is appended to the document body.
// Output:
// After deserialization, the following DOM structure will be created and appended to the body:

Explanation: <div id="parent">
  <h1 class="title">Hello World</h1>
  <p>This is a Virtual DOM example</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</div>;

// Conclusion:
// This implementation of Virtual DOM deserialization takes a JSON string (representing a Virtual DOM) and recreates an actual DOM structure that can be inserted into the webpage. This is useful for scenarios where Virtual DOMs are passed between different parts of a system or stored in JSON format and later need to be restored for actual rendering.
