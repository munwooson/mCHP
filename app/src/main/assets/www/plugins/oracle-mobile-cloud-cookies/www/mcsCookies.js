cordova.define("oracle-mobile-cloud-cookies.MCSCookies", function(require, exports, module) {
/* global cordova:false */

/*!
 * Module dependencies.
 */

var exec = cordova.require('cordova/exec');

/*!
 * MCS Cookies Plugin.
 */
var MCSCookies = function(){};

/**
 * Remove cookies.
 *
 * This method will remove cookies by name
 *
 * @param {String} domain of cookie to remove
 * @param {String} regExPattern of cookie to remove
 * @param {Function} successCallback triggered on the successful configuration retrieve, and return as {PushNotification} instance parameter.
 * @param {Function} errorCallback triggered on the error
 */
MCSCookies.prototype.remove = function(domain, regExPattern, successCallback, errorCallback) {

  errorCallback = errorCallback || function(error) {
      console.error("MCSCookies.remove failure with error message: ", error);
    };

  if (typeof successCallback != "function") {
    console.error("MCSCookies.remove failure: success callback parameter must be a function");
    return;
  }

  exec(successCallback, errorCallback, "MCSCookies", "remove", [domain, regExPattern]);
};

/**
 * Set cookie.
 *
 * This method will set cookies by name
 *
 * @param {String} domain of cookie to set
 * @param {String} name of cookie to set
 * @param {String} value of cookie to set
 * @param {Function} successCallback triggered on the successful configuration retrieve, and return as {PushNotification} instance parameter.
 * @param {Function} errorCallback triggered on the error
 */
MCSCookies.prototype.set = function(domain, name, value, successCallback, errorCallback) {

  errorCallback = errorCallback || function(error) {
      console.error("MCSCookies.set failure with error message: ", error);
    };

  if (typeof successCallback != "function") {
    console.error("MCSCookies.set failure: success callback parameter must be a function");
    return;
  }

  exec(successCallback, errorCallback, "MCSCookies", "set", [domain, name, value]);
};

module.exports = new MCSCookies();


});
