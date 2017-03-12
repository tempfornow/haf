app.service('updateService', function($http, $interval) {

  //Convert seconds to miliseconds
  this.seconds = function(seconds){
    return seconds * 1000
  }

  this.period = this.seconds(10)

  this.addListener = function(fn) {
    return $interval(fn, this.period)
  }

  this.removeListener = function(updatePromise) {
    $interval.cancel(updatePromise)
  }
})
