/* global View, Showdown, shapeArray, markdownit */

var angular = angular || {};



angular.module('plutonium', ['ui.router', 'ngResource']);
angular.module('plutonium');

var drawHexagon = (function $drawHexagon() {
  var drawn = false;
  var svg;
  return function(el) {
    if (!drawn) {
      var v = View({ target: el });
      shapeArray(v, { radius: 60, pad: -35, range: [3, 6]  });
      svg = el.children[0];
      drawn = true;
    } else {
      el.appendChild(svg);
    }
  };
})();

angular.module('plutonium').filter('markdown', function() {
  var md = markdownit();
  return function(text) {
    console.log(text);
    return md.render(text);
  };
});

angular.module('plutonium').directive('plHexagon', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'dir.hexagon.html',
    controller: [
      '$scope', '$state', '$element',
      function($scope, $state, $element) {
        drawHexagon($element.children()[0]);
      }
    ]
  };
});

angular.module('plutonium').factory('markdown', [
  '$sce',
  function($sce) {
    var converter = new Showdown.converter(); 
    return function(str) {
      if (str) {
        return $sce.trustAsHtml(converter.makeHtml(str));
      } else {
        return '';
      }
    };
  }
]);

angular.module('plutonium').directive('plBlogTeaser', function() {
  return {
    retrict: 'E',
    scope: false,
    templateUrl: 'dir.blog-teaser.html',
    controller: [
      '$scope', 'models',
      function($scope, models) {
      }
    ]
  };
});

angular.module('plutonium').directive('plBlogItems', function() {
  return {
    retrict: 'E',
    scope: false,
    templateUrl: 'dir.blog-items.html',
    controller: [
      '$scope', 'models',
      function($scope, models) {
        $scope.blogs = models.BlogTeaser.query();
      }
    ]
  };
});

angular.module('plutonium').directive('plBlogItem', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'dir.blog-item.html',
    controller: [
      '$scope', '$state', 'models', 'markdown',
      function($scope, $state, models, markdown) {
        $scope.markdown = markdown;
      }
    ]
  };
});

angular.module('plutonium').directive('plBlog', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'dir.blog.html',
    controller: [
      '$scope', '$state', '$stateParams', 'models',
      function($scope, $state, $stateParams, models) {
        if ($stateParams.slug) {
          $scope.blog = models.Blog.get({
            slug: $stateParams.slug
          });
          
          $scope.blog.$promise.catch(function(e) {
            $state.go('root.404');
          });


        } else {
          $scope.blogs = models.BlogTeaser.query();
        }

        window.s = $scope;
      }
    ]
  };
});

angular.module('plutonium').directive('plProjectTeaser', function() {
  return {
    retrict: 'E',
    scope: false,
    templateUrl: 'dir.project-teaser.html',
    controller: [
      '$scope', 'models',
      function($scope, models) {
      }
    ]
  };
});

angular.module('plutonium').directive('plProjectItems', function() {
  return {
    retrict: 'E',
    scope: false,
    templateUrl: 'dir.project-items.html',
    controller: [
      '$scope', 'models',
      function($scope, models) {
        $scope.projects = models.ProjectTeaser.query();
      }
    ]
  };
});

angular.module('plutonium').directive('plProjectItem', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'dir.project-item.html',
    controller: [
      '$scope', '$state', 'models', 'markdown',
      function($scope, $state, models, markdown) {
        $scope.markdown = markdown;
      }
    ]
  };
});

angular.module('plutonium').directive('plProject', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'dir.project.html',
    controller: [
      '$scope', '$state', '$stateParams', 'models',
      function($scope, $state, $stateParams, models) {
        if ($stateParams.slug) {
          $scope.project = models.Project.get({
            slug: $stateParams.slug
          });
          
          $scope.project.$promise.catch(function(e) {
            $state.go('root.404');
          });


        } else {
          $scope.projects = models.ProjectTeaser.query();
        }

        window.s = $scope;
      }
    ]
  };
});

angular.module('plutonium').factory('models', [
  '$resource',
  function($resource) {
    var models = {};

    models.Blog = 
      $resource('http://127.0.0.1:3300/api/blogs/:slug');
    models.BlogTeaser = 
      $resource('http://127.0.0.1:3300/api/blog_teaser/');
    models.Project = 
      $resource('http://127.0.0.1:3300/api/projects/:slug');
    models.ProjectTeaser = 
      $resource('http://127.0.0.1:3300/api/project_teaser/');

    return models;
  }
]);

angular.module('plutonium').directive('plTitle', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'dir.title.html',
    controller: [
      '$scope', '$state',
      function($scope, $state) {
        $scope.$state = $state;
      }
    ]

  };
});

angular.module('plutonium').directive('plNav', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'dir.nav.html',
    controller: [
      '$scope', '$state',
      function($scope, $state) {
      }
    ]

  };
});

angular.module('plutonium').controller('PlCtrl', [
  '$scope', '$rootScope', '$state',
  function($scope, $rootScope, $state) {
    $scope.$state = $state;
    
    $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams) {
      $scope.location = $state.href(toState.name, toParams);
      if (!$scope.location) {
        $scope.location = window.location.href.toString().replace(
                            window.location.origin + '/', ''
                          );
      }
    });
  }
]);

angular.module('plutonium').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({enabled: true, requireBase: false});

    $urlRouterProvider.rule(function ($injector, $location) {
      var path, normalized;

      path = $location.path();

      if (path && path !== '/' && path.slice(-1) === '/') {
        normalized = path.slice(0, -1);
      } else {
        normalized = path;
      }

      normalized = normalized.toLowerCase();

      if (path !== normalized) {
        $location.replace().path(normalized);
      }
    });

    $stateProvider
      .state('root', {
        url: null,
        templateUrl: 'view.root.html'
      })
      .state('root.home-empty', {
        url: '',
        templateUrl: 'view.home.html'
      })
      .state('root.home', {
        url: '/',
        templateUrl: 'view.home.html'
      })
      .state('root.blog_teaser', {
        url: '/blog',
        templateUrl: 'view.blog.html'
      })
      .state('root.blog', {
        url: '/blog/:slug',
        templateUrl: 'view.blog.html'
      })
      .state('root.projects', {
        url: '/projects/:slug',
        templateUrl: 'view.projects.html'
      })
      .state('root.projects_teaser', {
        url: '/projects',
        templateUrl: 'view.projects.html'
      })
      .state('root.404', {
        templateUrl: 'view.404.html'
      })
    ;

    console.log('asdfasdasasdasasd')

    

    $urlRouterProvider.otherwise(function($injector, $location) {
      $injector.invoke(['$state', function($state) {
        $state.go('root.404');
        console.log($location);
        $state.location = $location;
      }]);
    });
  }
]);
