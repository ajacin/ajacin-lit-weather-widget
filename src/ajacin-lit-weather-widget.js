/**
 * @license
 *
 */


import { LitElement, html } from 'lit-element';

export class AjacinLitWeatherWidget extends LitElement {
  /**
   * Properties.
   */
  static get properties() {
    return {
      message: { type: String },
      pie: { type: Boolean }
    };
  }

  /**  
   * Element constructor
   */
  constructor() {
    super();

    // Initializing
    this.loadComplete = false;
    this.message = 'Hello World from LitElement';
    this.pie = false;
  }

  /**
   * Template
   */
  render() {
    return html`
      <style>
        :host { display: block; }
        :host([hidden]) { display: none; }
      </style>

      <h1>Start LitElement!</h1>
      <p>${this.message}</p>

      <input name="myinput" id="myinput" 
        type="checkbox"
        ?checked="${this.pie}"
        @change="${this.togglePie}">

      <label for="myinput">I like pie.</label>
      
      ${this.pie ? html`<lazy-element></lazy-element>` : html``}
    `;
  }

  /**
   * Implement firstUpdated to perform one-time work on first update:
   * - Call a method to load the lazy element if necessary
   * - Focus the checkbox
   */
  firstUpdated() {
   
  }

}

// Register
customElements.define('ajacin-lit-weather-widget', AjacinLitWeatherWidget);
