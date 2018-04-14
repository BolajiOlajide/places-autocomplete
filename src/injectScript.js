const injectScript = (url) => {
  return new Promise(function (resolve, reject) {
    var js, fjs = document.getElementsByTagName(s)[0];
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
      reject(error);
    }
  });
};

export default injectScript;
