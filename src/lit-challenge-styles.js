import {css} from 'lit-element/lit-element.js';

export const style = css`
  :host {
    display: block;
    box-sizing: border-box;
    contain: content;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  :host([hidden]) {
    display: none;
  }

  chat-interface {
    width: 33%;
    height: 50vh;
  }
`;
