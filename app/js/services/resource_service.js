var serverUrl = process.env.OMNIFILTERSERVERURL || 'http://localhost:3000'; // testing placeholder while I find where to host server.

var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data);
  };
};

var handleFailure = function(callback) {
  return function(res) {
    callback(res);
  };
};

module.exports = exports = function(app) {
  app.factory('cfResource', ['$http', '$window', 'userAuth', function($http, $window, userAuth) {
    var Resource = function(resourceName) {
      this.resourceName = resourceName;
    };

    Resource.prototype.getAll = function(callback) {
      $http({
        method: 'GET',
        url: serverUrl + this.resourceName + 'getAll',
        headers: {
          token: userAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.create = function(data, callback) {
      $http({
        method: 'POST',
        url: serverUrl + this.resourceName + 'newcontent',
        data: data,
        headers: {
          token: userAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.update = function(data, callback) {
      $http({
        method: 'PUT',
        url: serverUrl + this.resourceName + '/' + data._id,
        data: data,
        headers: {
          token: userAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.delete = function(data, callback) {
      $http({
        method: 'DELETE',
        url: serverUrl + this.resourceName + 'delete/' + data._id,
        headers: {
          token: userAuth.getToken()
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    Resource.prototype.verify = function(callback) {
      $http({
        method: 'GET',
        url: serverUrl + '/verify',
        headers: {
          token: $window.localStorage.token
        }
      })
        .then(handleSuccess(callback), handleFailure(callback));
    };

    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};
