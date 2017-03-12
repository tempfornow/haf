var controller = function($rootScope) {

  this.updatePeriodically = $rootScope.updatePeriodically

  this.onClick = function() {
    $rootScope.updatePeriodically = !$rootScope.updatePeriodically
    this.updatePeriodically = $rootScope.updatePeriodically
  }

}


app.component('updateButton', {
  templateUrl: './src/templates/update-button.html',
  controller
});
