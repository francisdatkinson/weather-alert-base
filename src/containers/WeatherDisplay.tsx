import * as React from 'react';
import CountUp from 'react-countup';
import f from '../helpers/helpers';
import WindDirection from '../components/WindDirection';

interface WeatherDisplayProps {
  icon: string;
  description: string;
}

interface WeatherDisplayState {
  weatherExpanded: boolean;
}

class WindDisplay extends React.Component<
  WeatherDisplayProps,
  WeatherDisplayState,
  {}
> {
  constructor(props: any) {
    super(props);

    this.state = {
      weatherExpanded: false,
    };

    this.expandWeather = this.expandWeather.bind(this);
  }

  expandWeather() {
    this.setState({ weatherExpanded: !this.state.weatherExpanded });
  }

  render() {
    const { icon, description } = this.props;

    return (
      <div className="weather-display">
        <div className="weather-data" onClick={this.expandWeather}>
          <div className="current">
            <img
              src={`http://openweathermap.org/img/wn/${icon}.png`}
              alt={description}
            />
          </div>
          <div className="future">
            <div className="day day1">
              <img
                src={`http://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
              />
            </div>
            <div className="day day2">
              <img
                src={`http://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
              />
            </div>
            <div className="day day3">
              <img
                src={`http://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
              />
            </div>
            <div className="day day4">
              <img
                src={`http://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
              />
            </div>
          </div>
        </div>
        {this.state.weatherExpanded ? (
          <div className="expanded-weather"></div>
        ) : null}
      </div>
    );
  }
}

export default WindDisplay;
