import * as React from 'react';

interface LocationItemProps {
  item: Location;
  index: number;
  removeLocation: (index: number) => void;
}

class LocationItem extends React.Component<LocationItemProps, {}> {
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
      <div className="addLocation"></div>
    );
  }
}

export default LocationItem;
