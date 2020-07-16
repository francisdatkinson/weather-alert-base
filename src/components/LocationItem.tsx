import * as React from 'react';

import Location from '../interfaces/Location';
import { Transform } from 'stream';
import { resolveMx } from 'dns';

interface LocationItemProps {
  item: Location;
  index: number;
  removeLocation: (index: number) => void;
}

interface LocationItemState {
  location: Location;
  // fiveDay: Location[];
}

class LocationItem extends React.Component<LocationItemProps, LocationItemState, {}> {
  constructor(props: any) {
    super(props);

    this.state = {
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
      }
    };

    this.handleRemoval = this.handleRemoval.bind(this);
  }

  handleRemoval(index: number) {
    const { removeLocation } = this.props;

    removeLocation(index);
  }

  componentDidMount() {
    let query = this.props.item.name;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=f52f54c7903f2276bf1ab68f6b8af2b2`;

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            location: result
          });
          console.log(this.state.location);
        }
      )

      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });

    setInterval(() => {
      fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            location: result
          });
          console.log(this.state.location);
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

  render() {
    const { index } = this.props;
    const date = new Date(new Date().getTime() + (this.state.location.timezone * 1000));

    console.log(new Date(1594883607));

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // return location name and error message
    return (
      <div className="location-item">
        <h3><span>{this.state.location.name}</span><span>{this.state.location.sys.country}</span></h3>
        <h4><span>Local time </span><span>{days[date.getUTCDay()]}, {date.toISOString().substr(11, 5)}</span></h4>
        <h4>Wind</h4>
        <div className="wind-data">
          <div className="wind-direction" style={{ transform: `rotate(${this.state.location.wind.deg}deg)` }}>
            <p style={{transform: `rotate(${this.state.location.wind.deg * -1}deg)`}}>{Math.round(this.state.location.wind.speed)}</p>
          </div>
        </div>
        <hr />
        <h4>Weather</h4>
        <img src={`http://openweathermap.org/img/wn/${this.state.location.weather[0].icon}.png`} alt={this.state.location.weather[0].description}/>
        {/* <div className="fiveDay">
          <div className="day day1"><img src={`http://openweathermap.org/img/wn/${this.state.fiveDay[0].weather[0].icon}.png`} alt={this.state.fiveDay[0].weather[0].description}/></div>
          <div className="day day2"><img src={`http://openweathermap.org/img/wn/${this.state.fiveDay[1].weather[0].icon}.png`} alt={this.state.fiveDay[1].weather[0].description}/></div>
          <div className="day day3"><img src={`http://openweathermap.org/img/wn/${this.state.fiveDay[2].weather[0].icon}.png`} alt={this.state.fiveDay[2].weather[0].description}/></div>
          <div className="day day4"><img src={`http://openweathermap.org/img/wn/${this.state.fiveDay[3].weather[0].icon}.png`} alt={this.state.fiveDay[3].weather[0].description}/></div>
          <div className="day day5"><img src={`http://openweathermap.org/img/wn/${this.state.fiveDay[4].weather[0].icon}.png`} alt={this.state.fiveDay[4].weather[0].description}/></div>
        </div> */}
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
