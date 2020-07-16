import * as React from 'react';
import CountUp from 'react-countup';

interface WindDirectionProps {
  deg: number;
  speed: number;
}

class WindDirection extends React.Component<WindDirectionProps, {}> {
  render() {
    const { deg, speed } = this.props;

    return (
      <div className="wind-direction" style={{ transform: `rotate(${deg}deg)` }}>
        <p style={{ transform: `rotate(${deg * -1}deg)` }}>
          <CountUp duration={0.5} start={0} end={Math.round(speed)} />
        </p>
      </div>
    );
  }
}

export default WindDirection;