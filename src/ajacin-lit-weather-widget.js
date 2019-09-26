/**
 * @license
 *
 */


import { LitElement, html, css, unsafeCSS } from 'lit-element';
import 'lit-element-bootstrap';

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

  static get styles() {
    const mainColor = 'LightSkyBlue'
    return css`
    :host { display: block;
      resize: both;
      overflow: hidden;
      background:#E76339;
      width:250px;
      height:300px;
    }
    :host([hidden]) {
      display: none;
    }
    bs-container{
      padding:1px;
    }
    bs-column{
      border:1px black solid;
    }
    bs-row{
      border:1px green solid;
    }
    `
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
    <bs-container>
    <bs-row>
        <bs-column sm-12 header>Toronto
            <bs-row>
                <bs-column sm-4 >117</bs-column>
                <bs-column sm-4 >Cloudy</bs-column>
            </bs-row>
        </bs-column>
    </bs-row>
</bs-container>
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
