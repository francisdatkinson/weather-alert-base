import * as React from 'react';
import CountUp from 'react-countup';
import f from '../helpers/helpers';
import WeatherDetail from '../components/WeatherDetail';

interface WeatherDisplayProps {
  icon: string;
  description: string;
  expanded: boolean;
  temperature: number;
  unit: string;
}

class WindDisplay extends React.Component<WeatherDisplayProps,{}> {

  render() {
    const { icon, description, expanded, temperature, unit } = this.props;

    return (
      <div className="weather-display">
        <div className="weather-data">
          <WeatherDetail unit={unit} temperature={temperature} expanded={expanded} icon={icon} description={description}/>
          <div className="future">
            <div className="day day1">
              <img
                src={`http://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
              />
              <p>{expanded ? temperature : Math.round(temperature)}&deg;{unit}</p>
            </div>
            <div className="day day2">
              <img
                src={`http://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
              />
              <p>{expanded ? temperature : Math.round(temperature)}&deg;{unit}</p>
            </div>
            <div className="day day3">
              <img
                src={`http://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
              />
              <p>{expanded ? temperature : Math.round(temperature)}&deg;{unit}</p>
            </div>
            <div className="day day4">
              <img
                src={`http://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
              />
              <p>{expanded ? temperature : Math.round(temperature)}&deg;{unit}</p>
            </div>
          </div>
        </div>
        {expanded ? (
          <div className="expanded-weather">
            <div className="current">
              <p>{description}</p>
            </div>
            <div className="future">
              <div className="day day1">
                <div className="wind-data">
                <p>{description}</p>
                </div>
              </div>
              <div className="day day2">
                <div className="wind-data">
                <p>{description}</p>
                </div>
              </div>
              <div className="day day3">
                <div className="wind-data">
                <p>{description}</p>
                </div>
              </div>
              <div className="day day4">
                <div className="wind-data">
                <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default WindDisplay;
