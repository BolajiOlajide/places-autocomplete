import React, { Component } from 'react';

import withScript from './withScript';


class SimpleForm extends Component {
    constructor(props) {
      super(props)
      this.state = { address: '' }
      this.onChange = (address) => this.setState({ address })
    }

    componentDidMount() {
      console.log('mount simple form', window.google);
      // const service = new google.maps.places.AutocompleteService();
    }

    onChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    handleFormSubmit = (event) => {
      event.preventDefault();

      console.log(this.state);
    }
  
    render() {
  
      return (
        <form onSubmit={this.handleFormSubmit} style={{padding: '40px'}}>
          <input type="text" name="address" value={this.state.address} />
        </form>
      )
    }
  }
  
  export default withScript(SimpleForm);
