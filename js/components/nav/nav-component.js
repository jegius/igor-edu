import template from "../nav/nav-component.template.js";
import {
  addListeners,
  compose,
  mapToLinkElement,
  removeListeners,
  select,
  doOverlap,
  debounce,
} from "../api/helpers.js";
import events from "../api/events.js";
import { LinkComponent } from "../link/link-component.js";

export class NavComponent extends HTMLElement {
  #slot;
  #list;
  #listeners = [
    [
      select.bind(this),
      events.LINK_CLICKED,
      this.#subscribeOnLinkClick.bind(this),
    ],
    [
      select.bind(this, "slot"),
      events.ON_SLOT_CHANGE,
      this.#onSlotChange.bind(this),
    ],
    [
      select.bind(this, "._scrollable", window.document),
      events.SCROLL,
      debounce(this.#compareSectionPosition.bind(this), 100),
    ],
  ];
  #linksToSections;

  static get name() {
    return "nav-element";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.#render();

    this.#listeners.forEach(addListeners);
  }

  #compareSectionPosition() {
    const BOTTOM_PADDING = 10;
    const mapToRect = ([key, section]) => [
      key,
      section?.getBoundingClientRect(),
    ];
    const findOverlap = ([, rect]) => doOverlap(rect, rootRect, BOTTOM_PADDING);

    const root = document.querySelector("._scrollable") ?? window;
    const rootRect = root.getBoundingClientRect();
    const rects = [...this.#linksToSections.entries()]
      .map(mapToRect)
      .filter(Boolean);
    const [id] = rects?.find(findOverlap) ?? [];

    if (id) {
      const convertToLink = (element) =>
        element.querySelector(LinkComponent.name);
      const findActive = (element) => element.getAttribute("href") === `#${id}`;

      const nodes = this.shadowRoot.querySelectorAll("li");
      const activeLink = [...nodes].map(convertToLink).find(findActive);
      const linkId = activeLink.closest("li").getAttribute("index");
      activeLink.setAttribute("is-active", "true");

      this.#makeAllLinksInActiveExcludeIndex(linkId);
    }
  }

  #detectSection() {
    const nodes = this.shadowRoot.querySelectorAll("li");

    function findTargetAnchorIdes(nodes) {
      const FIND_ID_REGEXP = /#[a-zA-Z]+/i;
      return nodes
        .map((node) => node.querySelector(LinkComponent.name))
        .filter(Boolean)
        .map((node) => node.getAttribute("href"))
        .filter(Boolean)
        .filter((href) => FIND_ID_REGEXP.test(href));
    }

    function findSections(hrefs) {
      return hrefs.map((id) => document.querySelector(id)).filter(Boolean);
    }

    function convertToMap(sections) {
      return sections.reduce((result, section) => {
        const sectionId = section.getAttribute("id");
        if (!result.has(sectionId)) {
          result.set(sectionId, section);
        }
        return result;
      }, new Map());
    }

    return compose(
      findTargetAnchorIdes,
      findSections,
      convertToMap
    )([...nodes]);
  }

  #subscribeOnLinkClick(event) {
    event.stopImmediatePropagation();
    const { target } = event;

    target.setAttribute("is-active", "true");
    const parentLiIndex = target.closest("li").getAttribute("index");

    this.#makeAllLinksInActiveExcludeIndex(parentLiIndex);
  }

  #makeAllLinksInActiveExcludeIndex(index) {
    const allNodes = this.shadowRoot.querySelectorAll("li");
    const nodeFilter = (node) => node.getAttribute("index") !== index;
    const setActive = (node) => node.setAttribute("is-active", "false");

    [...allNodes].filter(nodeFilter).map(mapToLinkElement).forEach(setActive);
  }

  #onSlotChange({ target }) {
    function createListContainer(providedNodes) {
      const listNode = document.createElement("ul");
      listNode.classList.add("nav__list");
      return { providedNodes, listNode };
    }

    function createList({ providedNodes, listNode }) {
      return providedNodes.reduce((list, node, index) => {
        const li = document.createElement("li");
        li.appendChild(node);
        li.setAttribute("index", index);
        list.appendChild(li);
        return list;
      }, listNode);
    }

    function carriedClearSlot(slot) {
      return (providedListNode) => {
        slot.innerHTML = "";
        return providedListNode;
      };
    }

    function carriedAppendList(root) {
      return (providedListNode) => root.appendChild(providedListNode);
    }

    const clearSlot = carriedClearSlot(this.#slot);
    const appendList = carriedAppendList(this.#list);
    const nodeFilter = (node) => node.nodeType === Node.ELEMENT_NODE;
    const assignedNodes = target.assignedNodes().filter(nodeFilter);

    compose(
      createListContainer,
      createList,
      clearSlot,
      appendList
    )(assignedNodes);

    if (!this.#linksToSections) {
      this.#linksToSections = this.#detectSection();
    }
  }

  disconnectedCallback() {
    this.#listeners.forEach(removeListeners);
  }

  #render() {
    const templateElem = document.createElement("template");
    templateElem.innerHTML = template;

    this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
    this.#slot = this.shadowRoot.querySelector("slot");
    this.#list = this.shadowRoot.querySelector(".nav");
  }
}
