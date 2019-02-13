import {css} from 'lit-element/lit-element.js';

export const style = css`
  :host {
    box-sizing: border-box;
    contain: content;
    position: relative;
    flex-direction: column;
    border: 1px solid;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
  }

  :host([hidden]) {
    display: none;
  }

  h1 {
    background: #fff;
    padding: 10px;
    position: sticky;
    top: 0;
    left: 0;
    margin: 0;
    z-index: 1;
  }

  .messages {
    flex-grow: 1;
  }

  message-display {
    padding: 5px 10px;
  }

  message-write {
    background: #fff;
    padding: 10px;
    display: flex;
    position: sticky;
    bottom: 0;
    left: 0;
    flex-shrink: 0;
  }
`;
