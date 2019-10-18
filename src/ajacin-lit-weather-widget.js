import { LitElement, html, css, unsafeCSS } from 'lit-element';
import 'lit-element-bootstrap';

export class AjacinLitWeatherWidget extends LitElement {
  // var self=this;
  /**
   * Properties.
   */
  static get properties() {
    return {
      message: { type: String },
      pie: { type: Boolean },
      city:{ type: String,reflect: true },
      data:{ type: Object,reflect: true },
    };
  }

  static get styles() {
    const mainColor = 'LightSkyBlue'
    return css`
    :host { display: block;
      font-family: "Times New Roman", Times, serif;
    }
    :host([hidden]) {
      display: none;
    }
    #ajacin-lit-weather-widget-wrapper{
      width:300px;
      height:320px;
      -webkit-box-shadow:0px 0px 5px 3px #878787 ;
      -moz-box-shadow:0px 0px 5px 3px #878787 ;
      box-shadow:0px 0px 5px 3px #878787 ;
      background:url("./src/sunny.jpg") no-repeat 50% 50% rgb(255, 255, 255);
      padding:15px;
    }
    #ajacin-lit-weather-widget-transparent-container{
      background-color: #000;
      width: 300px;
      height: 320px;      
      opacity: 0.50;
      font-family: Verdana, Geneva, sans-serif;
      color: #FFF;
      z-index: 1;
    }
    #ajacin-lit-weather-widget-header{
      width:300px;
      height:50px;
      border:1px solid transparent;
      text-align: center;
      vertical-align: middle;
      font-size:35px;

    }
    #ajacin-lit-weather-widget-header-sub{
      width:300px;
      height:50px;
      border:1px solid transparent;
      text-align: center;
      vertical-align: middle;
    }
    #ajacin-lit-weather-widget-weather{
      padding-left:5px;
      width:300px;
      height:25px;
      border:1px solid transparent;
    }
    .ajacin-lit-weather-widget-main{
      background-color:rgba(255, 255, 255, 0.38);
      text-align: center;
      width:90px;
      margin:5px;
      height:50px;
      float:left;
      display:block;
    }
    .ajacin-lit-weather-widget-main-desc{
      border:1px solid transparent;
      font-size:10px;
      text-align: center;
      float:left;
      width:90px;
    }
    .ajacin-lit-weather-widget-main-value{
      border:1px solid transparent;
      font-size:16px;
      text-align: center;
      float:left;
      width:90px;
      font-weight:bold;
    }
    #ajacin-lit-weather-widget-weather-icon{
      width:50px;
      height:50px;
    }
    #ajacin-lit-weather-widget-weather-updatedtime{
      font-size:8px;
      padding-left:5px;
    }
    `
  }
  /**  
   * Element constructor
   */
  constructor() {
    super();

    // Initializing
    this.data = {weather:[{description:""}],main:{},wind:{},sys:{}};
    this.city=""
    this.loadComplete = false;
    this.message = 'Hello World from LitElement';
    this.pie = false;
    this.fetchData = this.fetchData.bind(this);
  }

  /**
   * Template
   */
  render() {
    return html`
    <div  id="ajacin-lit-weather-widget-wrapper">
      <div id="ajacin-lit-weather-widget-transparent-container">
        <div id="ajacin-lit-weather-widget-header">
        ${this.data.name}<br><img id="ajacin-lit-weather-widget-weather-icon" src="http://openweathermap.org/img/wn/${this.data.weather[0].icon}@2x.png">
        </div>
        <div id="ajacin-lit-weather-widget-header-sub">
        </div>
        <div id="ajacin-lit-weather-widget-weather">
        ${this.data.weather[0].main} : ${this.data.weather[0].description}
        </div>
        
        <div class="ajacin-lit-weather-widget-main">
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Temperature</span>
        <span id="ajacin-lit-weather-widget-main-temperature" class="ajacin-lit-weather-widget-main-value">${this.data.main.temp}</span>
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Fahrenheit</span>
        </div>
        <div class="ajacin-lit-weather-widget-main">
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Min temperature</span>
        <span id="ajacin-lit-weather-widget-main-temperature" class="ajacin-lit-weather-widget-main-value">${this.data.main.temp_min}</span>
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Fahrenheit</span>
        </div>
        <div class="ajacin-lit-weather-widget-main">
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Max temperature</span>
        <span id="ajacin-lit-weather-widget-main-temperature" class="ajacin-lit-weather-widget-main-value">${this.data.main.temp_max}</span>
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Fahrenheit</span>
        </div>
        <div class="ajacin-lit-weather-widget-main">
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Pressure</span>
        <span id="ajacin-lit-weather-widget-main-temperature" class="ajacin-lit-weather-widget-main-value">${this.data.main.pressure}</span>
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Pascal</span>
        </div>
        <div class="ajacin-lit-weather-widget-main">
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Humidity</span>
        <span id="ajacin-lit-weather-widget-main-temperature" class="ajacin-lit-weather-widget-main-value">${this.data.main.humidity}</span>
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">gm<sup>-3</sup></span>
        </div>
        <div class="ajacin-lit-weather-widget-main">
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Wind Speed</span>
        <span id="ajacin-lit-weather-widget-main-temperature" class="ajacin-lit-weather-widget-main-value">${this.data.wind.speed}</span>
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">km/h</span>
        </div>
        <div class="ajacin-lit-weather-widget-main">
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Wind Direction</span>
        <span id="ajacin-lit-weather-widget-main-temperature" class="ajacin-lit-weather-widget-main-value">${this.data.wind.deg}</span>
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">degrees</span>
        </div>

        <div class="ajacin-lit-weather-widget-main">
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Sunrise</span>
        <span id="ajacin-lit-weather-widget-main-temperature" class="ajacin-lit-weather-widget-main-value">${this.timeConverter("time",this.data.sys.sunrise)}</span>
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">AM</span>
        </div>
        <div class="ajacin-lit-weather-widget-main">
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">Sunset</span>
        <span id="ajacin-lit-weather-widget-main-temperature" class="ajacin-lit-weather-widget-main-value">${this.timeConverter("time",this.data.sys.sunset)}</span>
        <span id="ajacin-lit-weather-widget-main-temperature-desc" class="ajacin-lit-weather-widget-main-desc">PM</span>
        </div>
        <div id="ajacin-lit-weather-widget-weather-updatedtime">
        ${this.timeConverter("datetime",this.data.dt)}
        </div>
      </div>
    </div>
    `;
  }

  /**
   * Implement firstUpdated to perform one-time work on first update:
   * - Call a method to load the lazy element if necessary
   * - Focus the checkbox
   */
  timeConverter(mode,UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    if (mode ==='time'){
    var time =  hour + ':' + min + ':' + sec ;}
    else if(mode ==='datetime'){
    var time =  a}
    return time;
  }

  fetchData() {
    var xhr = new XMLHttpRequest();
    let parent= this;
    xhr.onload = function () {

      if (xhr.status >= 200 && xhr.status < 300) {
        var weatherdata = JSON.parse(xhr.response);
        console.log('success!', weatherdata);
        parent.data = weatherdata;
        // this.clouds = data.weather[0].description + " are observed in " + data.name + " and humidity is " + data.main.humidity;
        console.log(parent.data)
      } else {
        console.log('The request failed!');
        parent.data = {}
        // parent.cloud('Failed to fetch data')
      }

      console.log('This always runs...');
    };
    xhr.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${parent.city}&appid=d90499fcc8ce95a8d23741f6b20229c5`);
    //openmap account is created to obtain key
    xhr.send();

  }

  connectedCallback() {
    super.connectedCallback()
    this.fetchData();
  }

}

// Register
customElements.define('ajacin-lit-weather-widget', AjacinLitWeatherWidget);
