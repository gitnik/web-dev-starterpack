import angular from 'angular';
import uirouter from 'angular-ui-router';
import analytics from 'angular-google-analytics';

import '../scss/main.scss';

class HelloController {
    constructor() {
        this.helloText = 'Howdy';
    }
}

angular
    .module('StarterApp', [uirouter, analytics])
    .config(/*ngInject*/($stateProvider, $urlRouterProvider, $locationProvider) => {
        $stateProvider
            .state('home', {
                url: '/',
                template: '<div class="welcomeText">{{ vm.helloText }}</div>',
                controller: 'HelloController',
                controllerAs: 'vm'
            });

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    })
    .config(/*ngInject*/(AnalyticsProvider) => {
        AnalyticsProvider
            .setAccount(GOOGLE_ANALYTICS_CONFIG)
            .logAllCalls(true)
            .setPageEvent('$stateChangeSuccess'); // event fired by ui-router
    })
    .controller('HelloController', HelloController);
