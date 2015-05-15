/* jshint node: true */

var angular = require('angular');

var marked = require('marked');

var mobile = require('./mobile');

var shapes = require('./shapes');

var shapeArray = require('./shape_array');

angular.module('plutonium', [
  require('angular-ui-router'),
  require('angular-resource')
]);

var drawHexagon = (function $drawHexagon() {
  var drawn = false;
  var svg;
  return function(el) {
    if (!drawn) {
      var draw = function draw() {
        var w, v;
        w = Math.max(
          document.documentElement.clientWidth, window.innerWidth || 0
        );

        if ( mobile || w < 600 ) {
          v = shapes.View({ target: el, mouseoverEverywhere: true });
          shapeArray({ view: v, radius: 100, pad: -60, range: [3, 6]  });
        } else {
          v = shapes.View({ target: el });
          shapeArray({ view: v, radius: 80, pad: -50, range: [3, 6]  });
        }
      };

      draw();

      svg = el.children[0];
      drawn = true;

      window.addEventListener('resize', function(e){
        if (el.hasChildNodes(svg)) {
          el.removeChild(svg);
          draw();
          svg = el.children[0];
        } else {
          svg = undefined;
          drawn = false;
        }
      });

    } else {
      el.appendChild(svg);
    }
  };
})();

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
    return function(str) {
      if (str) {
        return $sce.trustAsHtml(marked(str));
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
      '$scope', 'markdown',
      function($scope, markdown) {
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
      '$scope', '$rootScope', '$state', '$stateParams', 'models',
      function($scope, $rootScope, $state, $stateParams, models) {
        if ($stateParams.slug) {
          
          $scope.blog = models.Blog.get({
            slug: $stateParams.slug
          });
      
          $scope.blog.$promise.then(function(b) {
            $rootScope.title = b.title;
          });

          $scope.blog.$promise.catch(function(e) {
            $state.go('root.404');
          });

        } else {
          $scope.blogs = models.BlogTeaser.query();
        }
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
      '$scope', 'markdown',
      function($scope, markdown) {
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
      '$scope', '$rootScope', '$state', '$stateParams', 'models',
      function($scope, $rootScope, $state, $stateParams, models) {
        if ($stateParams.slug) {
          
          $scope.project = models.Project.get({
            slug: $stateParams.slug
          });
         
          $scope.project.$promise.then(function(p) {
            $rootScope.title = p.title;
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

    models.Blog           = $resource('/api/blogs/:slug');
    models.BlogTeaser     = $resource('/api/blog_teaser/');
    
    models.Project        = $resource('/api/projects/:slug');
    models.ProjectTeaser  = $resource('/api/project_teaser/');

    return models;
  }
]);

angular.module('plutonium').directive('plTitle', function() {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'dir.title.html',
    controller: [
      '$scope',
      function($scope) {
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
      '$scope',
      function($scope) {
      }
    ]

  };
});

angular.module('plutonium').controller('PlCtrl', [
  '$scope', '$rootScope', '$state',
  function($scope, $rootScope, $state) {
    $scope.$state = $state;
    
    window.foo = $state;

    $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams) {
      $scope.location = $state.href(toState.name, toParams);
      console.log(toState);
      $rootScope.title = toState.title;
      if (!$scope.location) {
        $scope.location = window.location.href.toString().replace(
                            window.location.origin, ''
                          );
      }
    });
  }
]);

angular.module('plutonium').config([
  '$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    // shit's broken in ie9 / ff
    $locationProvider.html5Mode({enabled: true, requireBase: true});

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
        templateUrl: 'view.root.html',
        title: 'Home'
      })
      .state('root.home-empty', {
        url: '',
        templateUrl: 'view.home.html',
        title: 'Home'
      })
      .state('root.home', {
        url: '/',
        templateUrl: 'view.home.html',
        title: 'Home'
      })
      .state('root.blog_teaser', {
        url: '/blog',
        templateUrl: 'view.blog.html',
        title: 'Blogs'
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
        templateUrl: 'view.projects.html',
        title: 'Projects'
      })
      .state('root.404', {
        templateUrl: 'view.404.html',
        title: '404'
      })
    ;

    $urlRouterProvider.otherwise(function($injector, $location) {
      $injector.invoke(['$state', function($state) {
        $state.go('root.404');
        console.log($location);
        $state.location = $location;
      }]);
    });
  }
]);
