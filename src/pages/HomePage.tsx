import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as locationsActions from '../actions/locationsActions';
import AppState from '../interfaces/AppState';
import LocationForm from '../forms/LocationForm';
import LocationItem from '../components/LocationItem';
import LocationsState from '../interfaces/LocationsState';

interface HomePageProps {
  locations: LocationsState;
  actions: any;
  updateDate: Date;
}

interface HomePageState {
  date: Date;
  updateDate: Date;
}

class HomePage extends React.Component<HomePageProps, HomePageState, {}> {
  constructor(props: any) {
    super(props);

    this.state = {
      date: new Date(),
      updateDate: new Date()
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
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
    
  }

  removeLocation(index: number) {
    const { actions } = this.props;

    actions.removeLocations(index);
    actions.getLocations();
  }

  render() {
    const { locations } = this.props;

    // Don't display initial data until it's loaded or if it doesn't exist
    if (locations.initialLoad === true || locations.locations === undefined) {
      return <LocationForm onSubmit={this.handleSubmit} />;
    }

    
    let updateDate: Date = new Date("July 14, 2020, 12:15");
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

    return (
      <>
      <header>
        <h1>The Wind Forecast</h1>
        <LocationForm onSubmit={this.handleSubmit} />
      </header>
      <div className="meta-info">
        <p className="date"><span>{date}, {time}</span></p>
        <p className="last-updated">Last updated: <span>{days > 0 ? days + 'd ' : ''}{hours > 0 ? hours + 'h ' : ''}{mins > 0 ? mins + 'm ' : ''}{secs > 0 ? secs + 's ' : ''}</span></p>
      </div>
      <h2>Your Locations</h2>
      <div className="location-list">
        {locations.locations.map((item, i) => (
          <React.Fragment key={i}>
            <LocationItem
              item={item}
              index={i}
              removeLocation={this.removeLocation}
            />
          </React.Fragment>
        ))}
        {locations.locations.length < 1 ? <p>Locations you add will appear in this list</p> : null}
      </div>
      </>
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
