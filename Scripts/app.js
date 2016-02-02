var angularApp = angular.module('angular', ['ngAnimate', 'ngRoute', 'LocalStorageModule', 'ngMaterial'])

angularApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: "homeController"
    })
    .when('/about', {
        templateUrl: "views/about.html",
        controller: "mainController"
    })
    .when('/projects', {
        templateUrl: "views/projects.html",
        controller: "mainController"
    })
    .when('/contact', {
        templateUrl: "views/contact.html",
        controller: 'mainController'
    })
    .otherwise('/404', {
        templateUrl: 'views/404.html'
    })

    $locationProvider.hashPrefix('!')

}])
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('localStorage')
}])

angularApp.controller('homeController', ['$scope', 'localStorageService', function($scope, localStorageService){
    localStorageService.set('view', 'home');
    $scope.currentPage = localStorageService.get('view')

}])

angularApp.controller('mainController', ['$scope', '$routeParams', 'localStorageService', '$mdBottomSheet', '$mdDialog', function($scope, $routeParams, localStorageService, $mdBottomSheet, $mdDialog){

    $scope.currentPage = localStorageService.get('view') ? localStorageService.get('view') : localStorageService.set('view', 'about');
    console.log('view:', localStorageService.get('view'))
    console.log('currentPage:', $scope.currentPage)
    $scope.changePage = function(view){
        switch(view){
            case "home":
                localStorageService.set('view', 'home');
                $scope.currentPage = localStorageService.get('view');
                break;
            case "about":
                localStorageService.set('view', 'about');
                $scope.currentPage = localStorageService.get('view');
                break;
            case "projects":
                localStorageService.set('view', 'projects');
                $scope.currentPage = localStorageService.get('view');
                break;
            case "contact":
                localStorageService.set('view', 'contact');
                $scope.currentPage = localStorageService.get('view');
                break;
        }
        console.log($scope.currentPage)
    }
    $scope.activeView = function(view){
        if(localStorageService.get('view') == view) return 'active'
        }
    $scope.openBottomSheet = function(){
        $mdBottomSheet.show({
            templateUrl: '../views/partials/languages.html',
            controller: 'mainController'

        })
    }
    $scope.openDialog = function(){
        $mdDialog.show({
            template: '<md-dialog><md-card><md-card-content>here is th informations</md-card-content></md-card></md-dialog>',
            controller: 'otherController',
            clickOutsideToClose: true,
            escapeToClose: true
        })
    }


}])
angularApp.controller('otherController', ['$scope', function($scope){

}])