import {LitElement, html} from 'lit-element/lit-element.js';
import {style} from './message-display-styles.js';

/**
 * `lit-challenge`
 * nothing yet
 *
 * ## Styling
 *
 * | Custom property | Description | Default |
 * | --- | --- | --- |
 * | `--custom-property` | What it does | `value` |
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
export class MessageDisplay extends LitElement {
  /**
   * Declare the properties that will
   * trigger calls to `_render`
   */
  static get properties() {
    return {
      message: { type: Array },
    };
  }
  /**
   * Use the constructor to set defaults to your properties.
   */
  constructor() {
    super();
    this.message = {};
  }

  renderImage(imageData, user) {
    if (!imageData) return html``;
    return html`
        <img
          alt="${`Image content from ${user}`}"
          src="${imageData}"
        />
    `;
  }

  renderText(message) {
    if (!message) return html``;
    return html`
        <p>${message}</p>
    `;
  }
  /**
   * Style deffinitions returned as an array of CSSResults can be optomized
   * as constructable style sheets for more performant sharing across an
   * application.
   *
   * @return {CSSResult[]}
   */
  static get styles() {
    return [style];
  }
  /**
   * Use [lit-html syntax](https://lit-html.polymer-project.org/guide/template-reference)
   * to declare the DOM representation of your element.
   *
   * @return {TemplateResult}
   */
  render() {
    return html`
        <em tabindex="-1">${this.message.user}:</em>
        ${this.renderImage(this.message.imageBase64, this.message.user)}
        ${this.renderText(this.message.message)}
    `;
  }
};
