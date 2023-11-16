import { LinkComponent } from '../link/link-component.js';

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

export const mapToLinkElement = node => node.querySelector(LinkComponent.name);

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
  return target.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

export function checkUnitOfMeasurement(value) {
  const regExp = /^\d+rem$|^\d+%$/gi;

  if (!/\d/.test(value)) {
    return null;
  }
  return regExp.test(value) ? value : value.replace(/[^\d]/gi, '') + 'rem';
}

export async function compressImage(url) {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      const crossOrigin = 'Anonymous';
      const PNG_TYPE = 'image/png';

      img.crossOrigin = crossOrigin;
      img.onload = loadedImage.bind(null, img, resolve, PNG_TYPE);
      img.onerror = () => {
        reject(new Error('ошибка при загрузке изображения'));
      };

      img.src = url;
    } catch (error) {
      reject(new Error('Ошибка при выполнении сжатия'));
    }
  });
}

export function loadedImage(img, resolveCallback, typeOfImage) {
  const QUALITY_ARGUMENT = 1;
  const [newWidth, newHeight] = setSizes(img);
  const canvas = createCanvas(newWidth, newHeight);
  const resolver = resolvedBlob.bind(null, resolveCallback);

  drawCanvasImage(canvas, img, newWidth, newHeight).toBlob(
    resolver,
    typeOfImage,
    QUALITY_ARGUMENT
  );
}

export function resolvedBlob(resolveCallback, blob) {
  const reader = new FileReader();

  reader.onloadend = function () {
    const base64data = reader.result;

    resolveCallback(base64data);
  };
  reader.readAsDataURL(blob);
}

export function createCanvas(newWidth, newHeight) {
  const canvas = document.createElement('canvas');

  canvas.width = newWidth;
  canvas.height = newHeight;
  return canvas;
}

export function drawCanvasImage(canvas, img, newWidth, newHeight) {
  const canvasContext = canvas.getContext('2d');

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

export function scrollFunctionHeader(attributesConfig, event) {
  const scrolledElement = document.querySelector('._scrollable');

  const isScrolled =
    scrolledElement.scrollTop > attributesConfig.scrollFunction.valueToChange;

  if (isScrolled) {
    this.style.width = attributesConfig.scrollFunction.cutWidth;
    this.classList.add(attributesConfig.scrollFunction.classModificatorFixed);
  } else {
    this.classList.remove(
      attributesConfig.scrollFunction.classModificatorFixed
    );
    this.style.width = attributesConfig.scrollFunction.fullWidth;
  }
}
