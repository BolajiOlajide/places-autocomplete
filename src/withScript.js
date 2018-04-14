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
      console.log('constructors loading...')
      injectScript()
        .then(data => this.setState({ isLoading: false }));
      console.log('done loading script')
    }
    
    render() {
      const { isLoading } = this.state;
      console.log(window.google);

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