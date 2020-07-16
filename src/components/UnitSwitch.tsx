import * as React from 'react';

interface UnitSwitchProps {
  unit: string;
  units: string[];
  handleTempChange: (item: string) => void;
}

class UnitSwitch extends React.Component<UnitSwitchProps, {}> {
  constructor(props: any) {
    super(props);

    this.state = {
      unit: 'C'
    }
  }

  render() {
    const { units, unit } = this.props;

    // return location name and error message
    return (
      <div className="unit-switch">
        <p>Temperature unit: 
        {units.map((item, i) => (
            <React.Fragment key={i}>
              <span className={item === this.props.unit ? 'active' : ''} onClick={() => this.props.handleTempChange(units[i])}>{item}</span>
            </React.Fragment>
          ))}
        </p>
      </div>
    );
  }
}

export default UnitSwitch;
