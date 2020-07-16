import * as React from 'react';

interface LocationTitleProps {
  name: string;
  country: string;
}

class LocationTitle extends React.Component<LocationTitleProps, {}> {
  render() {
    const { name, country } = this.props;

    return (
      <h3>
        <span>{name}</span>
        <span>{country}</span>
      </h3>
    );
  }
}

export default LocationTitle;