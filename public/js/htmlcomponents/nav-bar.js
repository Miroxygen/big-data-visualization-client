/**
 * The navbar of the application.
 *
 * @author // Miranda Holmlund <mh225wi@lnu.se>
 * @version 1.0.0
 */

const template = document.createElement('template')

template.innerHTML = `
<style>
.hidden {
  display: none;
}
header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
<header>
  <slot></slot>
  </slot></slot>
  <slot></slot>
</header>
`

customElements.define('nav-bar',
  /**
   * Custom HTML element.
   */
  class extends HTMLElement {
    /**
     * Constructor for class.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }
  }
)
