import React from 'react';
import dotenv from 'dotenv';

import injectScript from './injectScript';
import Loader from './Loader';


dotenv.config();
const { REACT_APP_API_KEY } = process.env;

export const withScript = ComposedComponent => {
  class HOC extends React.Component {
    state = {
      isLoading: true
    };

    componentDidMount() {
      // inject google places script
      injectScript(`https://maps.googleapis.com/maps/api/js?key=${REACT_APP_API_KEY}&libraries=places`)
        .then(data => this.setState({ isLoading: false }));
    }
    
    render() {
      const { isLoading } = this.state;

      return (
        <div>
          {
            isLoading ? <Loader /> : <ComposedComponent {...this.props} />
          }
        </div>
      )
    }
  }

  return HOC;
};

export default withScript;