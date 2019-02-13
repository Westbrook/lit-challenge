import {LitElement, html} from 'lit-element/lit-element.js';
import './message-display.js';
import './message-write.js';
import {worker} from './worker-client.js';
import {style} from './chat-interface-styles.js';

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
export class ChatInterface extends LitElement {
  /**
   * Declare the properties that will
   * trigger calls to `_render`
   */
  static get properties() {
    return {
      user: { type: String },
      messages: { type: Array },
    };
  }
  /**
   * Use the constructor to set defaults to your properties.
   */
  constructor() {
    super();
    this.user = '';
    this.messages = [];
    this.handleWorkerMessage = this.handleWorkerMessage.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    worker.addEventListener('message',this.handleWorkerMessage)
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    worker.removeEventListener('message',this.handleWorkerMessage)
  }
  handleWorkerMessage(e) {
    this.messages = e.data.messages;
  }
  /**
   * Style definitions returned as an array of CSSResults can be optomized
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
        <h1>Hi, ${this.user}!</h1>
        <div class="messages">
          ${this.messages
            .filter(message => message.type !== 'announcement' || message.user !== this.user)
            .map(message => html`
              <message-display .message="${message}" tabindex="-1"></message-display>
            `)
          }
        </div>
        <message-write user="${this.user}"></message-write>
    `;
  }

  firstUpdated() {
    this._messageWriteEl = this.shadowRoot.querySelector('message-write');
  }

  updated(changedProperties) {
    // Keep turned off while displaying both chatters on the same page.
    // if (
    //   changedProperties.has('messages') &&
    //   !this._messageWriteEl.focused &&
    //   this.messages.length &&
    //   this.messages[this.messages.length - 1].user !== this.user &&
    //   this.user === 'Rob'
    // ) {
    //   let mostRecentMessage =
    //     this.shadowRoot.querySelector('message-display:last-of-type');
    //   if (mostRecentMessage) {
    //     mostRecentMessage.focus();
    //   }
    // }
  }
};
