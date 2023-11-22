class PGShape extends HTMLElement {
  static observedAttributes = ["color", "size", "shape"];

  /** @type {ShadowRoot} */
  shadow = null;

  /** @type {SVGElement} */
  svg = null;

  constructor() {
    super();
  }

  connectedCallback() {
    // The custom element itself is the shadow host
    this.shadow = this.attachShadow({ mode: "open" });

    // create the internal implementation
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.setAttribute("width", "50px");
    this.svg.setAttribute("height", "50px");

    this.shadow.appendChild(this.svg);
  }

  disconnectedCallback() {
    this.shadow.removeChild(this.svg);
    this.shadow = null;
    this.svg = null;
  }

  /**
   * @param {"color" | "size" | "shape"} name
   * @param {string} oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "color":
        this.svg.setAttribute("fill", newValue);
        break;
      case "size":
        this.svg.setAttribute("width", newValue);
        this.svg.setAttribute("height", newValue);
        break;
      case "shape":
        this.svg.firstChild && this.svg.removeChild(this.svg.firstChild);
        switch (newValue) {
          case "circle":
            const circle = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "circle"
            );
            circle.setAttribute("cx", "50%");
            circle.setAttribute("cy", "50%");
            circle.setAttribute("r", "50%");
            this.svg.appendChild(circle);
            break;
          case "square":
            const rect = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "rect"
            );
            rect.setAttribute("x", "0");
            rect.setAttribute("y", "0");
            rect.setAttribute("width", "100%");
            rect.setAttribute("height", "100%");
            this.svg.appendChild(rect);
            break;
        }
        break;
    }
  }
}

customElements.define("pg-shape", PGShape);
