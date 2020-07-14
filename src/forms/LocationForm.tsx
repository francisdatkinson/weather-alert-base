import * as React from 'react';
// import cities from '../assets/citylist.json';

interface LocationFormProps {
  onSubmit: (location: any) => void;
}

class LocationForm extends React.Component<LocationFormProps> {
  state = {
    name: '',
    cities: []
  };

  constructor(props: any) {
    super(props);
    this.state = { name: '', cities: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({ name: event.target.value });

    
  }

  handleSubmit(event: any) {
    const { onSubmit } = this.props;
    event.preventDefault();

    onSubmit(this.state);

    this.setState({
      name: '',
    });
  }

  render() {
    return (
      <form
        className="search-bar"
        onSubmit={this.handleSubmit}
        noValidate
        autoCapitalize="on"
        autoComplete="off"
      >
        <br />
        <input
          placeholder="Enter a location"
          id="name"
          name="name"
          onChange={this.handleChange}
          type="text"
          value={this.state.name}
        />
        <p>e.g. Newcastle upon Tyne, UK</p>
      </form>
    );
  }
}

export default LocationForm;
