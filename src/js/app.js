import angular from 'angular';
import uirouter from 'angular-ui-router';

import '../scss/main.scss';

class HelloController {
    constructor() {
        this.helloText = 'Howdy';
    }
}

angular
    .module('StarterApp', [uirouter])
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
    .controller('HelloController', HelloController);
