import * as React from 'react';
// import cities from '../assets/citylist.json';

interface LocationFormProps {
  onSubmit: (location: any) => void;
}

class LocationForm extends React.Component<LocationFormProps> {
  state = {
    name: '',
  };

  constructor(props: any) {
    super(props);
    this.state = { name: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  useCurrentLocation() {
    let url = '';
    let valid = false;
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      url = `http://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=f52f54c7903f2276bf1ab68f6b8af2b2`;
    

    fetch(url)
      .then(
        function(response) {
          if (response.status != 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            alert('Please enter a valid city');
            return;
          } else {
            valid = true;
          }

          if (valid) {
            response.json().then(function(data) {
              console.log(valid);
              console.log(data);
              const { onSubmit } = data;
              onSubmit(data);
            });
          }
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
        // valid = false;
      });
    });
    
  }

  handleChange(event: any) {
    this.setState({name: event.target.value});
    console.log(this.state.name);
  }

  handleSubmit(event: any) {

    console.log(this.state);

    let valid = false;
    let url= `http://api.openweathermap.org/data/2.5/weather?q=${this.state.name}&units=metric&APPID=f52f54c7903f2276bf1ab68f6b8af2b2`;

    fetch(url)
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            alert('Please enter a valid city');
            return;
          } else {
            valid = true;
          }

          if (valid) {
            response.json().then(function(data) {
              console.log(valid);
              console.log(data);
            });
          }
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
        // valid = false;
      });

      console.log(valid);
        const { onSubmit } = this.props;
        event.preventDefault();
        onSubmit(this.state);
        this.setState({name:''});   
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
        {"geolocation" in navigator ? <div className="button" onClick={this.useCurrentLocation}>Use my current location</div> : null}
      </form>
    );
  }
}

export default LocationForm;
