import {css} from 'lit-element/lit-element.js';

export const style = css`
  :host {
    display: block;
    box-sizing: border-box;
    contain: content;
    position: sticky;
    bottom: 0;
    left: 0;
  }

  :host([hidden]) {
    display: none;
  }

  form {
    background: #fff;
    display: flex;
    width: 100%;
  }

  label {
    position: absolute;
  }

  input {
    flex-grow: 1;
    border: 1px solid;
    z-index: 1;
  }

  button {
    margin-left: 10px;
    border: 1px solid;
    border-radius: 0;
  }

  .input__file {
    position: absolute;
    left: -9999em;
  }
`;
