class PExtended extends HTMLParagraphElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("extended Paragraph");
    this.style.color = "green";
  }
}

customElements.define("p-extended", PExtended, { extends: "p" });
