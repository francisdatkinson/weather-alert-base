import * as React from 'react';
import CountUp from 'react-countup';
import f from '../helpers/helpers';
import WindDirection from '../components/WindDirection';

interface WindDisplayProps {
  deg: number;
  speed: number;
  timezone: number;
  expanded: boolean;
  unit: string;
}

interface WindDisplayState {
  windExpanded: boolean;
}

class WindDisplay extends React.Component<WindDisplayProps, WindDisplayState, {}> {
  constructor(props: any) {
    super(props);

    this.state = {
      windExpanded: false
    }
  }

  render() {
    const { deg, speed, timezone } = this.props;

    return (
      <>
        <div className="wind-data">
          <div className="current">
          <WindDirection deg={deg} speed={speed}/>
          </div>
          <div className="future">
            <div className="day day1">
              <p>{f.getDay(f.getLocalTime(new Date(), timezone), 1).substr(0, 1)}</p>
              <WindDirection deg={deg} speed={speed}/>
            </div>
            <div className="day day2">
              <p>{f.getDay(f.getLocalTime(new Date(), timezone), 2).substr(0, 1)}</p>
              <WindDirection deg={deg} speed={speed}/>
            </div>
            <div className="day day3">
              <p>{f.getDay(f.getLocalTime(new Date(), timezone), 3).substr(0, 1)}</p>
              <WindDirection deg={deg} speed={speed}/>
            </div>
            <div className="day day4">
              <p>{f.getDay(f.getLocalTime(new Date(), timezone), 4).substr(0, 1)}</p>
              <WindDirection deg={deg} speed={speed}/>
            </div>
          </div>
        </div>
        {/* expanded wind data */}
        {this.props.expanded ? <div className="wind-data expanded-wind">
        <div className="current">
          <p>{speed}mph<br />{f.getBearing(deg)}</p>
        </div>
        <div className="future">
          <div className="day day1">
            <div className="extended-wind-data">
              <div className="up"><p>{speed}mph</p></div>
              <div className="down"><p>{speed}mph</p></div>
            </div>
          </div>
          <div className="day day2">
            <div className="extended-wind-data">
              <div className="up"><p>{speed}mph</p></div>
              <div className="down"><p>{speed}mph</p></div>
            </div>
          </div>
          <div className="day day3">
            <div className="extended-wind-data">
              <div className="up"><p>{speed}mph</p></div>
              <div className="down"><p>{speed}mph</p></div>
            </div>
          </div>
          <div className="day day4">
            <div className="extended-wind-data">
              <div className="up"><p>{speed}mph</p></div>
              <div className="down"><p>{speed}mph</p></div>
            </div>
          </div>
        </div>
      </div> : null}
    </>
    );
  }
}

export default WindDisplay;