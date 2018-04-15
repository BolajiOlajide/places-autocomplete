const injectScript = (url) => {
  return new Promise(function (resolve, reject) {
    var id = 'google-map';
    var js, fjs = document.getElementsByTagName('script')[0];
    if (document.getElementById(id)) {
      return;
    }
    js = document.createElement('script');
    js.id = id;
    js.src = url;
    fjs.parentNode.insertBefore(js, fjs);
    js.onload = function () {
      resolve(window.google);
    }
    js.onerror = function (error) {
      console.log('something went wrong');
      console.log(error.message);
      reject(error);
    }
  });
};

export default injectScript;
