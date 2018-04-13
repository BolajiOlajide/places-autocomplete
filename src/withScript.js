import React from 'react';
import injectScript from './injectScript';


export const withScript = ComposedComponent => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      console.log('constructors loading...')
      injectScript();
    }
    
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return HOC;
};

export default withScript;