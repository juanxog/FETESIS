app.service('User', function(servers,$http,$q) {

    var userdata = { };
    var cursosdata = { };


    var login = function(user){

        var deferred = $q.defer();

        $http({
            method: 'POST',
            url:  servers.api + '/api/auth',
            data : user,
            cache: false
        }).success(function(resp) { 

            userdata = resp.info;

            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }


    var buscarcursos = function(id){

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url:  servers.api + '/api/cursos/',
            cache: false

        }).success(function(resp) { 


            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }

    var buscaractividades = function(id){

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url:  servers.api + '/api/cursos/actividad/' + id,
            cache: false

        }).success(function(resp) { 


            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }
    
    var buscaractividadese = function(id){

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url:  servers.api + '/api/cursos/actividad-e/' + id,
            cache: false

        }).success(function(resp) { 


            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }

    var buscaractividad = function(id){

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url:  servers.api + '/api/cursos/actividad/ver/' + id,
            cache: false

        }).success(function(resp) { 


            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }


    var crearcursos = function(curso){

        var deferred = $q.defer();

        $http({
            method: 'POST',
            url:  servers.api + '/api/crear/curso',
            data: curso,
            cache: false

        }).success(function(resp) { 

            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }

    var updategrupos  = function(actividad){

        var deferred = $q.defer();

        $http({
            method: 'POST',
            url:  servers.api + '/api/update/grupo',
            data: actividad,
            cache: false

        }).success(function(resp) { 

            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }

    var crearactividad = function(grupo){

        var deferred = $q.defer();


        $http({
            method: 'POST',
            url:  servers.api + '/api/crear/actividad',
            data: grupo,
            cache: false

        }).success(function(resp) { 

            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }

    var verificarestudiantes = function(estudiantes){

        var deferred = $q.defer();
        var datax = $.param({estudiantes : estudiantes});
        console.log(estudiantes); 
        $http({
            method: 'POST',
            url:  servers.api + '/api/estudiantes/disponibles',
            data: datax,
            cache: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).success(function(resp) { 

            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }

    var generarposibles = function(curso){

        var deferred = $q.defer();
        $http({
            method: 'POST',
            url:  servers.api + '/api/estudiantes/generarposibles',
            data: {curso:curso},
            cache: false
        }).success(function(resp) { 

            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }
    
    var profile = function(){

        var deferred = $q.defer();
        $http({
            method: 'POST',
            url:  servers.api + '/api/profile/',
            cache: false
        }).success(function(resp) { 

            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }
    
     var signup = function(user){

        var deferred = $q.defer();
        $http({
            method: 'POST',
            url:  servers.api + '/api/signup/',
            data: {user:user},
            cache: false
        }).success(function(resp) { 

            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }


     var generargrafica = function(curso,option){

        var deferred = $q.defer();
        $http({
            method: 'POST',
            url:  servers.api + '/api/generargrafica',
            data: {curso:curso,option:option},
            cache: false
        }).success(function(resp) { 

            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }
     
     var individualgrafica = function(type,posibilidadtype){

        var deferred = $q.defer();
        $http({
            method: 'POST',
            url:  servers.api + '/api/individualgrafica',
            data: {type: type, posibilidadtype: posibilidadtype},
            cache: false
        }).success(function(resp) { 

            deferred.resolve(resp);

        }).error(function(msg) {


            deferred.reject(msg);

        });

        return deferred.promise;
    }
     
     

    return {
        user : function() {

            return userdata;
        },
        login: login,
        updategrupos : updategrupos ,
        generarposibles: generarposibles,
        buscarcursos: buscarcursos ,
        crearactividad: crearactividad,
        buscaractividad: buscaractividad,
        buscaractividades : buscaractividades,
        crearcursos: crearcursos,
        verificarestudiantes:verificarestudiantes,
        setUserAll : function(user)
        {
            this.userdata = user;
        },
        setCursosAll : function(curso)
        {
            this.cursosdata = curso;
        },
        signup: signup,
        profile: profile,
        buscaractividadese: buscaractividadese,
        generargrafica: generargrafica,
        individualgrafica: individualgrafica

    };

});

app.factory('authInterceptorService', ['$q','$location', function ($q, $location){
    var responseError = function (rejection) {
        if (rejection.status === 403) {
            $location.path('/app/login');
        }
        return $q.reject(rejection);
    };

    return {
        responseError: responseError
    };
}]);


app.service('APIInterceptor', [function() {
    var service = this;

    service.request = function(config) {
        config.headers.auth= window.localStorage.getItem("token");
        return config;
    };
}]);

app.config([ '$httpProvider',   function($httpProvider) {
    $httpProvider.interceptors.push('APIInterceptor');
    $httpProvider.interceptors.push('authInterceptorService');
} ]);
