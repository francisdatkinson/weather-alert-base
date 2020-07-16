import * as React from 'react';
import CountUp from 'react-countup';

interface WeatherDetailProps {
  icon: string;
  temperature: number;
  description: string;
  unit: string;
  expanded: boolean;
}

class WeatherDetail extends React.Component<WeatherDetailProps, {}> {
  render() {
    const { icon, temperature, description, unit, expanded } = this.props;

    return (
      <div className="current current-weather">
        <img className="weather-icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
        <p>{expanded ? temperature : <CountUp start={0} duration={2} end={temperature} />}&deg;{unit}</p>
      </div>
    );
  }
}

export default WeatherDetail;