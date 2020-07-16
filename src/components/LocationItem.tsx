import * as React from 'react';

import Location from '../interfaces/Location';
import { Transform } from 'stream';
import { resolveMx } from 'dns';
import CountUp from 'react-countup';

interface LocationItemProps {
  item: Location;
  index: number;
  removeLocation: (index: number) => void;
}

interface LocationItemState {
  location: Location;
  days: string[];
  windExpanded: boolean;
  weatherExpanded: boolean;
  // fiveDay: Location[];
}

class LocationItem extends React.Component<LocationItemProps, LocationItemState, {}> {
  constructor(props: any) {
    super(props);

    this.state = {
      windExpanded: false,
      weatherExpanded: false,
      location: {
        "coord": {
          "lon": 0,
          "lat": 0,
        },
        "weather": [
          {
            "id": 0,
            "main": "Drizzle",
            "description": "light intensity drizzle",
            "icon": "09d"
          }
        ],
        "base": "stations",
        "main": {
          "temp":0,
          "pressure": 0,
          "humidity": 0,
          "temp_min": 0,
          "temp_max": 0
        },
        "visibility": 0,
        "wind": {
          "deg": 0,
          "speed": 0
        },
        "clouds": {
          "all": 0
        },
        "dt": 0,
        "timezone": 0,
        "sys": {
          "type": 0,
          "id": 0,
          "message": 0,
          "country": "N/A",
          "sunrise": 0,
          "sunset": 0
        },
        "id": 2643743,
        "name": "London",
        "cod": 200
      },

      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    };

    this.expandWeather = this.expandWeather.bind(this);
    this.expandWind = this.expandWind.bind(this);

    this.handleRemoval = this.handleRemoval.bind(this);
  }

  handleRemoval(index: number) {
    const { removeLocation } = this.props;

    removeLocation(index);
  }

  componentDidMount() {
    let query: string = this.props.item.name;
    let currentUrl: string = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=f52f54c7903f2276bf1ab68f6b8af2b2`;
    let forecastUrl: string = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&APPID=f52f54c7903f2276bf1ab68f6b8af2b2`;

    fetch(currentUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            location: result
          });
        }
      )

      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });

    setInterval(() => {
      fetch(currentUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            location: result
          });
        }
      )

      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }, 900000); // update every 15 minutes

    // url = `http://api.openweathermap.org/data/2.5/forecast?q=Newcastle&units=metric&APPID=f52f54c7903f2276bf1ab68f6b8af2b2`;

    // fetch(url)
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         fiveDay: result
    //       });
    //       console.log(this.state.location);
    //     }
    //   )

    //   .catch(function(err) {
    //     console.log('Fetch Error :-S', err);
    //   });

    
    

    // console.log(this.state.report);
  }

  getDayLetter(date: Date, offset: number): string {
      let index: number = date.getDay() + offset;
      if (index > 6) {
        index -= 7;
      }
      return this.state.days[index].substr(0, 1);
  }

  expandWind() {
    this.setState({ windExpanded: !this.state.windExpanded });
  }

  expandWeather() {
    this.setState({ weatherExpanded: !this.state.weatherExpanded });
  }

  getBearing(deg: number): string {
    let bearings: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    return `${deg + String.fromCharCode(176) + bearings[Math.round(deg / 45)]}`;
  }

  render() {
    const { index } = this.props;
    const date = new Date(new Date().getTime() + (this.state.location.timezone * 1000));

    // return location name and error message
    return (
      <div className="location-item">
        <h3><span>{this.state.location.name}</span><span>{this.state.location.sys.country}</span></h3>
        <h4><span>Local time </span><span>{this.state.days[date.getUTCDay()]}, {date.toISOString().substr(11, 5)}</span></h4>
        {/* <h4>Wind</h4> */}
        <div onClick={this.expandWind} className="wind-data">
          <div className="current">
          <div className="wind-direction" style={{ transform: `rotate(${this.state.location.wind.deg}deg)` }}>
            <p style={{transform: `rotate(${this.state.location.wind.deg * -1}deg)`}}><CountUp duration={0.5} start={0} end={Math.round(this.state.location.wind.speed)} /></p>
          </div>
          </div>
          <div className="future">
            <div className="day day1">
              <p>{this.getDayLetter(date, 1)}</p>
              <div className="wind-direction" style={{ transform: `rotate(${this.state.location.wind.deg}deg)` }}>
                <p style={{transform: `rotate(${this.state.location.wind.deg * -1}deg)`}}><CountUp duration={0.5} start={0} end={Math.round(this.state.location.wind.speed)} /></p>
              </div>
            </div>
            <div className="day day2">
              <p>{this.getDayLetter(date, 2)}</p>
              <div className="wind-direction" style={{ transform: `rotate(${this.state.location.wind.deg}deg)` }}>
                <p style={{transform: `rotate(${this.state.location.wind.deg * -1}deg)`}}><CountUp duration={0.5} start={0} end={Math.round(this.state.location.wind.speed)} /></p>
              </div>
            </div>
            <div className="day day3">
              <p>{this.getDayLetter(date, 3)}</p>
              <div className="wind-direction" style={{ transform: `rotate(${this.state.location.wind.deg}deg)` }}>
                <p style={{transform: `rotate(${this.state.location.wind.deg * -1}deg)`}}><CountUp duration={0.5} start={0} end={Math.round(this.state.location.wind.speed)} /></p>
              </div>
            </div>
            <div className="day day4">
              <p>{this.getDayLetter(date, 4)}</p>
              <div className="wind-direction" style={{ transform: `rotate(${this.state.location.wind.deg}deg)` }}>
                <p style={{transform: `rotate(${this.state.location.wind.deg * -1}deg)`}}><CountUp duration={0.5} start={0} end={Math.round(this.state.location.wind.speed)} /></p>
              </div>
            </div>
          </div>
        </div>

        {/* expanded wind data */}
        {this.state.windExpanded ? <div className="wind-data expanded-wind">
          <div className="current">
            <p>{this.state.location.wind.speed}mph<br />{this.getBearing(this.state.location.wind.deg)}</p>
          </div>
          <div className="future">
            <div className="day day1">
              <p>{this.getDayLetter(date, 1)}</p>
              <div className="wind-direction" style={{ transform: `rotate(${this.state.location.wind.deg}deg)` }}>
                <p style={{transform: `rotate(${this.state.location.wind.deg * -1}deg)`}}><CountUp duration={0.5} start={0} end={Math.round(this.state.location.wind.speed)} /></p>
              </div>
            </div>
            <div className="day day2">
              <p>{this.getDayLetter(date, 2)}</p>
              <div className="wind-direction" style={{ transform: `rotate(${this.state.location.wind.deg}deg)` }}>
                <p style={{transform: `rotate(${this.state.location.wind.deg * -1}deg)`}}><CountUp duration={0.5} start={0} end={Math.round(this.state.location.wind.speed)} /></p>
              </div>
            </div>
            <div className="day day3">
              <p>{this.getDayLetter(date, 3)}</p>
              <div className="wind-direction" style={{ transform: `rotate(${this.state.location.wind.deg}deg)` }}>
                <p style={{transform: `rotate(${this.state.location.wind.deg * -1}deg)`}}><CountUp duration={0.5} start={0} end={Math.round(this.state.location.wind.speed)} /></p>
              </div>
            </div>
            <div className="day day4">
              <p>{this.getDayLetter(date, 4)}</p>
              <div className="wind-direction" style={{ transform: `rotate(${this.state.location.wind.deg}deg)` }}>
                <p style={{transform: `rotate(${this.state.location.wind.deg * -1}deg)`}}><CountUp duration={0.5} start={0} end={Math.round(this.state.location.wind.speed)} /></p>
              </div>
            </div>
          </div>
        </div> : null}
        
        <hr />
        {/* <h4>Weather</h4> */}
        <div className="weather-data" onClick={this.expandWeather}>
          <div className="current">
            <img src={`http://openweathermap.org/img/wn/${this.state.location.weather[0].icon}.png`} alt={this.state.location.weather[0].description}/>
          </div>
          <div className="future">
            <div className="day day1">
              <img src={`http://openweathermap.org/img/wn/${this.state.location.weather[0].icon}.png`} alt={this.state.location.weather[0].description}/>
            </div>
            <div className="day day2">
              <img src={`http://openweathermap.org/img/wn/${this.state.location.weather[0].icon}.png`} alt={this.state.location.weather[0].description}/>
            </div>
            <div className="day day3">
              <img src={`http://openweathermap.org/img/wn/${this.state.location.weather[0].icon}.png`} alt={this.state.location.weather[0].description}/>
            </div>
            <div className="day day4">
              <img src={`http://openweathermap.org/img/wn/${this.state.location.weather[0].icon}.png`} alt={this.state.location.weather[0].description}/>
            </div>
          </div>
        </div>
        {this.state.weatherExpanded ? <div className="expanded-weather"></div> : null}
        <div
          className="button remove"
          color="secondary"
          onClick={() => {
            this.handleRemoval(index);
          }}
        >
          Remove
        </div>
      </div>
    );
  }
}

export default LocationItem;
