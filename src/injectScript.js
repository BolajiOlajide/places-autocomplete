const { REACT_APP_API_KEY } = process.env;


const injectScript = () => {
    return new Promise(function(resolve, reject) {
      (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
          return;
          }
          js = d.createElement(s);
          js.id = id;
          js.src = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_API_KEY}&libraries=places`;
          fjs.parentNode.insertBefore(js, fjs);
          js.onload = function() { 
              console.log('before');
              console.log(window.google);
              console.log('after');
              resolve(window.google);
          }
          js.onerror = function(error) {
              reject(error);
          }
          })(document, 'script', 'google-maps');
    });
};

export default injectScript;
