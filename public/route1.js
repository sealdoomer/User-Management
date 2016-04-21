var module = angular.module("myUserApp", ['angularUtils.directives.dirPagination','ngRoute']).run(function($rootScope){
  $rootScope.users =[
        {id:1, fName:'Hege', lName:"Pege" , title:"Software Engineer", sex:"female", age:"25" },
        {id:2, fName:'Kim',  lName:"Pim" ,title:"Staff Engineer", sex:"female", age:"52" },
        {id:3, fName:'Sal',  lName:"Smith", title:"UI Designer", sex:"male", age:"26" },
        {id:4, fName:'Jack', lName:"Jones", title:"Backend Engineer", sex:"male", age:"31" },
        {id:5, fName:'John', lName:"Doe", title:"Accountant", sex:"male", age:"35" },
        {id:6, fName:'Peter',lName:"Pan", title:"Free lancer", sex:"female", age:"28" }
        ];
});

    module.controller('homeCtrl', function($rootScope, $http){
            $rootScope.fName = '';
            $rootScope.lName = '';
            $rootScope.title = '';
            $rootScope.sex = '';
            $rootScope.age = '';
            $rootScope.passw1 = '';
            $rootScope.passw2 = '';        
        
            $rootScope.edit = true;
            $rootScope.hideform = true;
            $rootScope.sort = function(parameter){
            $rootScope.sortKey = parameter; 
            $rootScope.reverse = !$rootScope.reverse;
    }
        $rootScope.deleteUser = function(id){
            for( var i = 0; i < $rootScope.users.length; i++){
                if( $rootScope.users[i].id == id){
                    $rootScope.users.splice(i, 1);
      }
    }
  }
    });

    module.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                templateUrl: 'home.html',
                controller: 'homeCtrl'
                }).
                when('/createnewuser', {
                    templateUrl: 'CreateNewUser.html',
                    controller: 'createCtrl'
                }).
                when('/edittheuser/:passid', {
                    templateUrl: 'Edit.html',
                    controller: 'editCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);

    module.controller("createCtrl", function($scope, $location) {
            $scope.test = function() {
            if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
            } else {
            $scope.error = false;
            }
            $scope.incomplete = false;
            if ($scope.edit && (!$scope.fName.length ||
            !$scope.lName.length ||
            !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
  }
}
            $scope.error = false;
            $scope.incomplete = true;
            $scope.$watch('passw1',function() {$scope.test();});
            $scope.$watch('passw2',function() {$scope.test();});
            $scope.$watch('fName', function() {$scope.test();});
            $scope.$watch('lName', function() {$scope.test();});
            $scope.$watch('title', function() {$scope.test();});
            $scope.$watch('sex', function() {$scope.test();});
            $scope.$watch('age', function() {$scope.test();});

      $scope.createNewUser = function() {
      var maxLength = $scope.users[$scope.users.length - 1].id + 1;
      var newUser = { id : maxLength, 
              fName : $scope.fName,
              lName : $scope.lName, 
              title : $scope.title,
              age : $scope.age, 
              sex : $scope.sex,  
              Pwd : $scope.passw1 
            };
      $scope.users.push(newUser);
            $scope.fName = '';
            $scope.lName = '';
            $scope.title = '';
            $scope.sex = '';
            $scope.age = '';
            $scope.passw1 = '';
            $scope.passw2 = '';
            $location.path('/');
    }
});

        module.controller("editCtrl", function($scope, $routeParams, $location){
            $scope.passid = $routeParams.passid;
            $scope.edit = false;
              var user_present;
              for( var i = 0; i < $scope.users.length; i++){
                if( $scope.users[i].id == $scope.passid){
                  user_present = $scope.users[i];
                } 
              }
              $scope.fName = user_present.fName;
              $scope.lName = user_present.lName; 
              $scope.title = user_present.title;
              $scope.sex = user_present.sex;
              $scope.age = user_present.age;
              $scope.passw1 = '';
              $scope.passw2 = '';

            $scope.error = false;
            $scope.incomplete = true; 
            $scope.$watch('passw1',function() {$scope.test();});
            $scope.$watch('passw2',function() {$scope.test();});
            $scope.$watch('fName', function() {$scope.test();});
            $scope.$watch('lName', function() {$scope.test();});
            $scope.$watch('title', function() {$scope.test();});
            $scope.$watch('sex', function() {$scope.test();});
            $scope.$watch('age', function() {$scope.test();});
            $scope.save = function(){
            for( var i in $scope.users){
              if( $scope.users[i].id == $scope.passid) 
              {
          $scope.users[i].Pwd = $scope.passw1;
          $scope.users[i].age = $scope.age;
          $scope.users[i].fName = $scope.fName;
          $scope.users[i].lName = $scope.lName;
          $scope.users[i].sex = $scope.sex;
          $scope.users[i].title = $scope.title;
        }
      }
          $location.path('/');
    }

  $scope.test = function() {
  if ($scope.passw1 !== $scope.passw2) {
    $scope.error = true;
    } else {
    $scope.error = false;
  }
  $scope.incomplete = false;
  if ($scope.edit && (!$scope.fName.length ||
  !$scope.lName.length ||
  !$scope.passw1.length || !$scope.passw2.length)) {
     $scope.incomplete = true;
  }
};    
  });