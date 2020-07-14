import * as React from 'react';

import Location from '../interfaces/Location';
import { Transform } from 'stream';

interface LocationItemProps {
  item: Location;
  index: number;
  removeLocation: (index: number) => void;
}

class LocationItem extends React.Component<LocationItemProps, {}> {
  constructor(props: any) {
    super(props);

    this.handleRemoval = this.handleRemoval.bind(this);
  }

  handleRemoval(index: number) {
    const { removeLocation } = this.props;

    removeLocation(index);
  }

  render() {
    const { item, index } = this.props;

    let sentinel = {
      "coord": {
        "lon":-0.13,
        "lat":51.51
      },
      "weather": [
        {
          "id": 300,
          "main": "Drizzle",
          "description": "light intensity drizzle",
          "icon": "09d"
        }
      ],
      "base": "stations",
      "main": {
        "temp":280.32,
        "pressure": 1012,
        "humidity": 81,
        "temp_min": 279.15,
        "temp_max":281.15
      },
      "visibility": 10000,
      "wind": {
        "deg": Math.ceil(Math.random() * 360),
        "speed": Math.ceil(Math.random() * 100)
      },
      "clouds": {
        "all": 90
      },
      "dt": 1485789600,
      "sys": {
        "type": 1,
        "id":5091,
        "message": 0.0103,
        "country": "GB",
        "sunrise": 1485762037,
        "sunset": 1485794875
      },
      "id": 2643743,
      "name": "London",
      "cod": 200
    }

    // return location name and error message
    return (
      <div className="location-item">
        <h3>{item.name}</h3>
        <h4>Monday 17:00</h4>
        <h4>Wind</h4>
        <div className="wind-data">
        <div className="wind-direction" style={{ transform: `rotate(${sentinel.wind.deg}deg)` }}><p style={{transform: `rotate(${sentinel.wind.deg * -1}deg)`}}>{sentinel.wind.speed}</p></div>
        </div>
        <hr />
        <div className="fiveDay">

        </div>
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
