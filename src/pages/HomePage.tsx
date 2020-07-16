import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as locationsActions from '../actions/locationsActions';
import AppState from '../interfaces/AppState';
import LocationForm from '../forms/LocationForm';
import LocationItem from '../components/LocationItem';
import LocationsState from '../interfaces/LocationsState';
import UnitSwitch from '../components/UnitSwitch';

interface HomePageProps {
  locations: LocationsState;
  actions: any;
  updateDate: Date;
}

interface HomePageState {
  date: Date;
  updateDate: Date;
  locationsRemoveable: boolean;
  tempUnit: string
  speedUnit: string
}

class HomePage extends React.Component<HomePageProps, HomePageState, {}> {
  constructor(props: any) {
    super(props);

    this.state = {
      date: new Date(),
      updateDate: new Date(),
      locationsRemoveable: false,
      tempUnit: 'C',
      speedUnit: 'mph'
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
  }

  makeLocationsRemoveable() {
    this.setState({ locationsRemoveable: !this.state.locationsRemoveable });
    console.log(this.state.locationsRemoveable);
    this.forceUpdate();
  }

  handleSubmit(data: any) {
    const { actions, locations } = this.props;
    const locationToAdd = { ...data };

    // If the location already exists don't add it again
    if (locations.locations !== undefined) {
      const exists = locations.locations.some((el) => {
 
        return el.name === locationToAdd.name;
      });

      if (exists) {
        alert(`You've already favourited this location!`);

        return null;
      }
    }

    actions.updateLocations(locationToAdd);
    actions.getLocations();
  }

  componentDidMount() {
    if (!this.state.updateDate) {
      this.setState({ updateDate: new Date() });
    }

    setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
    
    setInterval(() => {
      this.setState({ updateDate: new Date() });
    }, 900000);
    
  }

  removeLocation(index: number) {
    const { actions } = this.props;

    actions.removeLocations(index);
    actions.getLocations();
  }

  handleTempChange(unit: string) {
    this.setState({ tempUnit: unit });
  }

  handleSpeedChange(unit: string) {
    this.setState({ speedUnit: unit });
  }

  render() {
    const { locations } = this.props;

    // Don't display initial data until it's loaded or if it doesn't exist
    if (locations.initialLoad === true || locations.locations === undefined) {
      return <LocationForm onSubmit={this.handleSubmit} />;
    }

    let now: Date = new Date();
    setInterval(function() {
      now = new Date();
    }, 1000);
    

    let date: string = `${(now.getDate())}/${(now.getMonth() + 1)}/${(now.getFullYear())}`;
    let time: string = now.toString().substr(16, 8);

    let ONE_SEC: number = 1000;
    let ONE_MIN: number = 60 * 1000;
    let ONE_HOUR: number = 60 * 60 * 1000;
    let ONE_DAY: number = 24 * 60 * 60 * 1000;

    let difference: number  = now.getTime() - this.state.updateDate.getTime();

    let days: number = Math.floor(difference / ONE_DAY);
    let hours: number = Math.floor((difference - (days * ONE_DAY)) / ONE_HOUR);
    let mins: number = Math.floor((difference - ((days * ONE_DAY) + (hours * ONE_HOUR))) / ONE_MIN);
    let secs: number = Math.floor((difference - ((days * ONE_DAY) + (hours * ONE_HOUR) + (mins * ONE_MIN))) / ONE_SEC);

    const tempUnits: string[] = ['C', 'F', 'K'];
    const speedUnits: string[] = ['mph', 'kph', 'kn'];

    return (
      <div className="wrapper">
        <header>
          <h1>The Wind Forecast</h1>
          <LocationForm onSubmit={this.handleSubmit} />
          {/* <UnitSwitch handleTempChange={() => this.handleTempChange.bind(this)} unit={this.state.unit} units={['C', 'F', 'K']}/> */}
          <div className="unit-switchers">
            <div className="unit-switch">
              <p>Speed unit: 
              {speedUnits.map((item, i) => (
                  <React.Fragment key={i}>
                    <span className={item === this.state.speedUnit ? 'active' : ''} onClick={() => this.handleSpeedChange(speedUnits[i])}>{item}</span>
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div className="unit-switch">
              <p>Temperature unit: 
              {tempUnits.map((item, i) => (
                  <React.Fragment key={i}>
                    <span className={item === this.state.tempUnit ? 'active' : ''} onClick={() => this.handleTempChange(tempUnits[i])}>{item}</span>
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </header>
        <div className="meta-info">
          <p className="date"><span>{date}, {time}</span></p>
          <p className="last-updated">Last updated: <span>{days > 0 ? days + 'd ' : ''}{hours > 0 ? hours + 'h ' : ''}{mins > 0 ? mins + 'm ' : ''}{secs > 0 ? secs + 's ' : ''}</span></p>
        </div>
        <div className="location-list">
          {locations.locations.map((item, i) => (
            <React.Fragment key={i}>
              <LocationItem
                item={item}
                index={i}
                removeable={this.state.locationsRemoveable}
                removeLocation={this.removeLocation}
                speedUnit={this.state.speedUnit}
                tempUnit={this.state.tempUnit}
              />
            </React.Fragment>
          ))}
          {locations.locations.length < 1 ? <p>Locations you add will appear in this list</p> : null}
        </div>
          <div className="button" onClick={() => this.makeLocationsRemoveable()}>{this.state.locationsRemoveable ? 'Stop removing locations' : 'Remove locations'}</div>
      </div>
    );
  }
}

export function mapStateToProps(state: AppState) {
  return {
    locations: state.locations,
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(locationsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
