import { LinkComponent } from "../link/link-component.js";
import { classes } from "./classes.js";

export function compose(...innerFunctions) {
  return function (value) {
    return innerFunctions.reduce((acc, func) => func(acc), value);
  };
}

export function addListeners([node, event, listener]) {
  node()?.addEventListener(event, listener);
}

export function removeListeners([node, event, listener]) {
  node()?.removeEventListener(event, listener);
}

export function select(className, context) {
  const root = context ?? this.shadowRoot;
  const node = className ? root.querySelector(className) : null;
  return node ?? root;
}

export const mapToLinkElement = (node) =>
  node.querySelector(LinkComponent.name);

export function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function debounce(func, delay) {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

export function doOverlap(baseRect, overlapRect, bottomPadding = 0) {
  return !(
    baseRect.right < overlapRect.left ||
    baseRect.left > overlapRect.right ||
    baseRect.bottom < overlapRect.top + bottomPadding ||
    baseRect.top + bottomPadding > overlapRect.bottom
  );
}

export function installingTheClass(node, flag, ourClass) {
  if (flag) {
    node.classList.add(ourClass);
  } else {
    node.classList.remove(ourClass);
  }
}

export function cleanNodes(node) {
  while (node.hasChildNodes()) {
    cleanNodes(node.lastChild);
    node.removeChild(node.lastChild);
  }
  return node;
}

export function replaceUnicode(target) {
  return target.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

export function checkUnitOfMeasurement(value) {
  const regExp = /\d+rem$|\d+%$/gi;

  if (regExp.test(value)) {
    console.log(value.match(regExp)[0]);
    return value.match(regExp)[0];
  } else if (value === "") {
    return "";
  } else {
    console.log(`${value.match(/\d+/)}rem`);
    return `${value.match(/\d+/)}rem`;
  }
}

export async function compressImage(url) {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      const crossOrigin = "Anonymous";

      img.crossOrigin = crossOrigin;
      img.onload = function () {
        const [newWidth, newHeight] = setSizes(img);
        const canvas = createCanvas(newWidth, newHeight);

        drawCanvasImage(canvas, img, newWidth, newHeight).toBlob(
          (blob) => {
            resolvdesBlob(resolve, blob);
          },
          "image/png",
          1
        );
      };
      img.onerror = function () {
        rejectedBlob(reject);
      };
      img.src = url;
    } catch (error) {
      reject(new Error("Ошибка при выполнении сжатия"));
    }
  });
}

export function rejectedBlob(rejectedCallback) {
  rejectedCallback(new Error("Ошибка при загрузки изображения"));
}

export function resolvdesBlob(resolveCallback, blob) {
  const reader = new FileReader();

  reader.onloadend = function () {
    const base64data = reader.result;

    resolveCallback(base64data);
  };
  reader.readAsDataURL(blob);
}

export function createCanvas(newWidth, newHeight) {
  const canvas = document.createElement("canvas");

  canvas.width = newWidth;
  canvas.height = newHeight;
  return canvas;
}

export function drawCanvasImage(canvas, img, newWidth, newHeight) {
  const canvasContext = canvas.getContext("2d");

  canvasContext.drawImage(img, 0, 0, newWidth, newHeight);
  return canvas;
}

export function setSizes(img) {
  const maxWidth = img.width;
  const maxHeight = img.height;
  let newWidth = maxWidth;
  let newHeight = maxHeight;

  if (newWidth > newHeight) {
    if (newWidth > maxWidth) {
      newHeight *= maxWidth / newWidth;
      newWidth = maxWidth;
    }
  } else {
    if (newHeight > maxHeight) {
      newWidth *= maxHeight / newHeight;
      newHeight = maxHeight;
    }
  }
  return [newWidth, newHeight];
}
