import generateStyles from "./title-component.styles.js";

export function generateTemplate(level, text = "") {
  const div = document.createElement("div");
  div.innerHTML = text;
  const processedNode = (nodes) => {
    nodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === "SPAN" || node.tagName === "B") {
          node.classList.add("title__secondary");
        }
        processedNode(node.childNodes);
      }
    });
  };
  processedNode(div.childNodes);
  return `
          ${generateStyles()}
          <h${level} class="title">${div.innerHTML}</h${level}>
        `;
}
