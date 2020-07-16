import * as React from 'react';

import Location from '../interfaces/Location';
import LocationTitle from './LocationTitle';
import LocalTime from './LocalTime';
import WindDisplay from '../containers/WindDisplay';
import WeatherDisplay from '../containers/WeatherDisplay';
import main from '../main';
import f from '../helpers/helpers';

interface LocationItemProps {
  item: Location;
  index: number;
  removeable: boolean;
  removeLocation: (index: number) => void;
  tempUnit: string
  speedUnit: string
}

interface LocationItemState {
  location: Location;
  days: string[];
  weatherExpanded: boolean;
  windExpanded: boolean;
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

    this.handleRemoval = this.handleRemoval.bind(this);
  }

  handleRemoval(index: number) {
    const { removeLocation } = this.props;

    removeLocation(index);
  }

  componentDidMount() {
    let query: string = this.props.item.name;
    let currentUrl: string = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=f52f54c7903f2276bf1ab68f6b8af2b2`;

    fetch(currentUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            location: result
          });
          this.setTemp();
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
          this.setTemp();
        }
      )

      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    }, 900000); // update every 15 minutes
  }

  getDayLetter(date: Date, offset: number): string {
      let index: number = date.getDay() + offset;
      if (index > 6) {
        index -= 7;
      }
      return this.state.days[index].substr(0, 1);
  }

  getBearing(deg: number): string {
    let bearings: string[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    return `${deg + String.fromCharCode(176) + bearings[Math.round(deg / 45)]}`;
  }

  expandWind() {
    this.setState({ windExpanded: !this.state.windExpanded });
  }

  expandWeather() {
    this.setState({ weatherExpanded: !this.state.weatherExpanded });
  }

  setTemp() {
    let temp = this.state.location;

    temp.main.temp = f.cToX(temp.main.temp, this.props.tempUnit);
    temp.main.temp_max = f.cToX(temp.main.temp_max, this.props.tempUnit);
    temp.main.temp_min = f.cToX(temp.main.temp_min, this.props.tempUnit);

    console.log(temp);

    this.setState({ location: temp });
  }

  setSpeed() {
    let temp = this.state.location;

    temp.wind.speed = f.mphToX(temp.wind.speed, this.props.speedUnit);

    console.log(temp);

    this.setState({ location: temp });
  }

  render() {
    const { index, speedUnit, tempUnit } = this.props;
    const { name, sys, timezone, wind, weather, main } = this.state.location;

    // return location name and error message
    return (
      <div className="location-item">
        <div className={this.props.removeable ? 'wind-display jiggle' : 'wind-display'} onClick={() => this.expandWind()}>
          <LocationTitle name={name} country={sys.country} />
          <LocalTime time={new Date()} timezone={timezone} />
          <WindDisplay unit={speedUnit} deg={wind.deg} speed={wind.speed} timezone={timezone} expanded={this.state.windExpanded}/>
        </div>
        {/* <hr /> */}
        <div className={this.props.removeable ? "jiggleReverse" : ''} onClick={() => this.expandWeather()}>
          <WeatherDisplay unit={tempUnit} temperature={main.temp} description={weather[0].description} icon={weather[0].icon} expanded={this.state.weatherExpanded} />
        </div>
        {this.props.removeable ?
          <div
            className="button remove"
            onClick={() => {
              this.handleRemoval(index);
            }}
          >
          </div> : null}
      </div>
    );
  }
}

export default LocationItem;
