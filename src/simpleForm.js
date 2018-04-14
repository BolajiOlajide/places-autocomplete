import React, { Component } from 'react';

import withScript from './withScript';
import RenderSuggestion from './suggestion';


class SimpleForm extends Component {
    state = {
      address: '',
      predictions: [],
      validAddress: ''
    };

    componentDidMount() {
      this.service = new window.google.maps.places.AutocompleteService();
      this.serviceStatus = window.google.maps.places.PlacesServiceStatus.OK;
    }

    onChange = (event) => {
      const { value } = event.target;

      if (value.length > 2) {
        this.service.getPlacePredictions({
          input: value
        }, (predictions, status) => {
          this.setState({ predictions, address: value });
        })
      } else {
        this.setState({
          address: value,
          predictions: []
        });
      }
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
