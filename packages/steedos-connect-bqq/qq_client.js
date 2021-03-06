BQQ = {};
// Request QQ credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
BQQ.requestCredential = function (options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'bqq'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }
  var credentialToken = Random.secret();
  var loginStyle = OAuth._loginStyle('bqq', config, options);
  var scope = (options && options.requestPermissions) || ['get_user_info'];
  var flatScope = _.map(scope, encodeURIComponent).join('+');

  var loginUrl =
    'https://openapi.b.qq.com/oauth2/authorize' +
      '?app_id=' + config.clientId +
      '&oauth_version=2&response_type=code&ui=web' +
      '&redirect_uri=' + OAuth._redirectUri('bqq', config) +
      '&state=' + OAuth._stateParam(loginStyle, credentialToken);

  OAuth.launchLogin({
    loginService: "bqq"
    , loginStyle: loginStyle
    , loginUrl: loginUrl
    , credentialRequestCompleteCallback: credentialRequestCompleteCallback
    , credentialToken: credentialToken
  });
};
