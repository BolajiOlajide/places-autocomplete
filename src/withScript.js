import React from 'react';
import injectScript from './injectScript';


export const withScript = ComposedComponent => {
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
    }

    componentWillMount() {
      injectScript()
        .then(data => this.setState({ isLoading: false }));
    }
    
    render() {
      const { isLoading } = this.state;

      return (
        <div>
          {
            isLoading ? <span>Loading....</span> : <ComposedComponent {...this.props} />
          }
        </div>
      )
    }
  }

  return HOC;
};

export default withScript;