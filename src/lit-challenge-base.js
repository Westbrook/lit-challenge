import {LitElement, html} from 'lit-element/lit-element.js';
import './chat-interface.js';
import {style} from './lit-challenge-styles.js';

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
export class LitChallenge extends LitElement {
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
        <chat-interface user="Laura"></chat-interface>
        <chat-interface user="Rob"></chat-interface>
    `;
  }
};
