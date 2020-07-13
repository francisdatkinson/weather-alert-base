import * as React from 'react';

import Location from '../interfaces/Location';
import LocationItem from './LocationItem';

interface LocationItemProps {
  item: Location;
  index: number;
  removeLocation: (index: number) => void;
}

class LocationItemSentinel extends LocationItem {
  constructor(props: any) {
    super(props);

    this.handleRemoval = this.handleRemoval.bind(this);
  }

  handleRemoval(index: number) {
    const { removeLocation } = this.props;

    removeLocation(index);
  }

  render() {
    const { item, index } = this.props;

    // return location name and error message
    return (
      <div className="sentinel">
        <h2>{item.name}</h2>
        <h3>Monday 17:00</h3>
        <div
          className="button remove"
          color="secondary"
          onClick={() => {
            this.handleRemoval(index);
          }}
        >
          Remove
        </div>
      </div>
    );
  }
}

export default LocationItemSentinel;