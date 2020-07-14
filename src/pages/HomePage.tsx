import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as locationsActions from '../actions/locationsActions';
import AppState from '../interfaces/AppState';
import LocationForm from '../forms/LocationForm';
import LocationItem from '../components/LocationItem';
import LocationItemSentinel from '../components/LocationItem';
import LocationsState from '../interfaces/LocationsState';

interface HomePageProps {
  locations: LocationsState;
  actions: any;
}

class HomePage extends React.Component<HomePageProps, {}> {
  constructor(props: any) {
    super(props);

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

    let columns = Math.floor((window.innerWidth - (window.innerWidth * 0.03)) / 540);

    let sentinels = [];

    for (let i = 0; i < columns - 1; i++) {
      sentinels.push('SENTINEL');
    }

    console.log(columns, sentinels);

    return (
      <>
      <header>
        <h1>The Wind Forecast</h1>
        <LocationForm onSubmit={this.handleSubmit} />
        <hr />
      </header>
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

        {sentinels.map((item, i) => (
            <React.Fragment key={i}>
            <LocationItemSentinel
              item={{name: item}}
              index={i}
              removeLocation={this.removeLocation}
            />
          </React.Fragment>
        ))}
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
