class Emoji extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("the prefix is mandatory 😍");
  }
}

customElements.define("prefix-😍", Emoji);
