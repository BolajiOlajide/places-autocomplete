import React, { Component } from 'react';

import withScript from './withScript';
import RenderSuggestion from './suggestion';


class SimpleForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        address: '',
        predictions: [],
        validAddress: ''
      };

      this.onChange = this.onChange.bind(this);
      this.onSelectAddress = this.onSelectAddress.bind(this);
    }

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

    onSelectAddress(address) {
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
        <form onSubmit={this.handleFormSubmit} style={{padding: '40px', position: 'relative'}}>
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
