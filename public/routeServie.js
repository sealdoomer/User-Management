var module = angular.module("myUserApp", ['angularUtils.directives.dirPagination','ngRoute']);
  module.service('userlist', function ($location, $http) {
        this.getUser = function(){
          return $http.get('/api/iloveoov').then(function(usersResponse){
            return usersResponse.data;
          });
        };
        
        this.get = function(id){
            for(var i in users){
                if(users[i].id == id){
                    return users[i];
                }
            }
        }

        this.list = function(){
            return users;
        }

        this.saveEdit = function(user){
            for( var i in users){
              if(users[i].id == user.id){
                users[i] = user;
        }
      }
          $location.path('/');
    }

        this.create = function(newUser) {
            $http.post('http://localhost:3000/api/iloveoov/', newUser);
    }

    });




    module.controller('homeCtrl', function($scope, userlist, $http, $location){
      userlist.getUser().then(function(response){
        $scope.users = response;
      });
      $scope.sort = function(parameter){
      $scope.sortKey = parameter; 
      $scope.reverse = !$scope.reverse;
    };
      $scope.edit = true;
      $scope.hideform = true;
      $scope.deleteUser = function(id){
        console.log('clicked');
        console.log(id);
        $http.delete('http://localhost:3000/api/iloveoov/' + id).then(function(response){
          response.data;
        });
        $location.path('http://localhost:3000');
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

    module.controller("editCtrl", function($scope, $location, $routeParams, $http, userlist){
         $scope.passid = $routeParams.passid;
            $scope.edit = false; 
        userlist.getUser().then(function(response){
        $scope.users = response;
              var user_present;
              for( var i = 0; i < $scope.users.length; i++){
                if( $scope.users[i]._id == $scope.passid){
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

            $scope.updateNow = function(){
              console.log($scope.users);
            for( var i in $scope.users){
              if( $scope.users[i]._id == $scope.passid) 
              {
                
          $scope.users[i].Pwd = $scope.passw1;
          $scope.users[i].age = $scope.age;
          $scope.users[i].fName = $scope.fName;
          $scope.users[i].lName = $scope.lName;
          $scope.users[i].sex = $scope.sex;
          $scope.users[i].title = $scope.title;
          console.log($scope.users[i]._id);
          console.log($scope.users[i]);
          $http.put('http://localhost:3000/api/iloveoov/' + $scope.users[i]._id, $scope.users[i]).then(function(response){
            // $location.path('http://localhost:3000');   
        });
        }
      }
          $location.path('/');
    }
});

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

    module.controller("createCtrl", function($scope, $location, userlist, $http) {
            userlist.getUser().then(function(response){
              $scope.users = response;
            // });
        $scope.createNewUser = function() {
        // console.log($scope.user);
        console.log("I am creating a new user!");
        var maxLength = $scope.users.length;
        userlist.create({ id : maxLength, 
                fName : $scope.fName,
                lName : $scope.lName, 
                age : $scope.age, 
                title: $scope.title,
                sex : $scope.sex,  
                Pwd : $scope.passw1 
              })
        $http.post('/api/iloveoov', $scope.users[$scope.users.length - 1]).then(function(response){
          console.log(response);
        // });
        });
            $location.path('/');
    }
    });
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

            $scope.fName = '';
            $scope.lName = '';
            $scope.title = '';
            $scope.sex = '';
            $scope.age = '';
            $scope.passw1 = '';
            $scope.passw2 = '';
            $scope.edit = true;
            $scope.incomplete = false;
            });


