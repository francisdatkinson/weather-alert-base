import * as React from 'react';
import CountUp from 'react-countup';
import f from '../helpers/helpers';

interface LocalTimeProps {
  time: Date;
  timezone: number;
}

class LocalTime extends React.Component<LocalTimeProps, {}> {
  render() {
    const { time, timezone } = this.props;
    const days: string[] =  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    let localTime: Date = f.getLocalTime(time, timezone);   

    return (
      <h4>
        <span>Local time </span>
        <span>{f.getDay(localTime, 0)}, {f.getLocalTime(time, timezone).toISOString().substr(11, 5)}</span>
      </h4>
    );
  }
}

export default LocalTime;