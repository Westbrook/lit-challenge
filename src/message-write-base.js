import {LitElement, html} from 'lit-element/lit-element.js';
import {messageEvents, messageTransition} from './machines-message.js';
import {workerEvents} from './interface-server.js';
import {worker} from './worker-client.js';
import {style} from './message-write-styles.js';

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
export class MessageWrite extends LitElement {
  /**
   * Declare the properties that will
   * trigger calls to `_render`
   */
  static get properties() {
    return {
      user: { type: String },
      state: { type: String },
    };
  }
  /**
   * Use the constructor to set defaults to your properties.
   */
  constructor() {
    super();
    this.user = '';
    this.state = messageEvents.WAIT;
    this.typingTimeout = 2000;
    this.focused = false;
  }

  get state() {
    return this._state;
  }

  set state(transition) {
    let state = messageTransition(this.state, transition);
    if (this.state === state) return;
    this._state = state;
    worker.postMessage({
      data: {
        cmd: workerEvents[this.state.toUpperCase()],
        user: this.user
      }
    });
  }

  postMessage(cmd, message) {
    this.state = messageEvents.WAIT;
    worker.postMessage({data: {cmd, message}});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (e.target.checkValidity()) {
      this.postMessage(workerEvents.MESSAGE, Array.from(new FormData(e.target)));
      this.shadowRoot.querySelector('#message').value = '';
    }
  }

  handleTyping() {
    clearTimeout(this._typingTimer);
    this.state = messageEvents.TYPE;
    this._typingTimer = setTimeout(
      transition => this.state = transition,
      this.typingTimeout,
      messageEvents.WAIT
    );
  }

  handleFocus() {
    this.focused = true;
  }

  handleBlur() {
    clearTimeout(this._typingTimer);
    this.state = messageEvents.WAIT;
    this.focused = false;
  }

  handleImageSelected(e) {
    let fileReader = new FileReader();
    fileReader.onloadend = _ => this.postImage(fileReader.result);
    fileReader.readAsDataURL(e.target.files[0]);
  }

  postImage(imageBase64) {
    this.postMessage(workerEvents.IMAGE, {
      imageBase64,
      user: this.user,
    });
    this.shadowRoot.querySelector('#image').value = '';
  }

  selectImage() {
    this.shadowRoot.querySelector('#image').click();
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
        <form @submit="${this.handleSubmit}">
          <input type="hidden" name="user" value="${this.user}" />
          <label for="message">Type your messge...</label>
          <input
            placeholder="Type your message..."
            name="message"
            required
            id="message"
            name="message"
            @keydown="${this.handleTyping}"
            @blur="${this.handleBlur}"
            @focus="${this.handleFocus}"
          />
          <label for="image">Select an image to attach.</label>
          <input
            tabindex="-1"
            name="image"
            id="image"
            class="input__file"
            type="file"
            accept="image/png"
            @change="${this.handleImageSelected}"
          />
          <button
            id="file"
            type="button"
            @click="${this.selectImage}"
          >File</button>
          <button
            id="submit"
            type="submit"
          >Send</button>
        </form>
    `;
  }
};
