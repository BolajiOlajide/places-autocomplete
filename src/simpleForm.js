import React, { Component } from 'react';

import withScript from './withScript';
import RenderSuggestion from './suggestion';
import debounce from './debounce';


class SimpleForm extends Component {
  state = {
    address: '',
    predictions: [],
    validAddress: ''
  };

  componentDidMount() {
    if (!window.google) {
      throw new Error('Cannot access the google object - confirm that youre connected to the internet');
    }
    this.serviceStatus = window.google.maps.places.PlacesServiceStatus.OK;
    if (this.serviceStatus !== 'OK') {
      throw new Error('Error loading google API');
    }
    this.service = new window.google.maps.places.AutocompleteService();
  }

  onChange = (event) => {
    const { value } = event.target;

    if (value.length > 2) {
      debounce(this.service.getPlacePredictions({
        input: value
      }, (predictions, status) => {
        this.setState({ predictions, address: value });
      }), 500);
      return true;
    }
    debounce(this.setState({
      address: value,
      predictions: [],
      validAddress: ''
    }), 500);
  }

  onSelectAddress = (address) => {
    this.setState({
      validAddress: address,
      predictions: [],
      address
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    console.log(this.state);
  }

  render() {
    const { predictions } = this.state;

    return (
      <form className="places-form" onSubmit={this.handleFormSubmit}>
        <input type="text" name="address"
          value={this.state.address} onChange={this.onChange} />
        <section className="suggestion-container">
          {
            predictions.map(prediction => (
              <RenderSuggestion
                key={prediction.id}
                prediction={prediction}
                onSelectAddress={this.onSelectAddress}
              />
            ))
          }
        </section>
        <button>SUBMIT</button>
      </form>
    )
  }
}

export default withScript(SimpleForm);
