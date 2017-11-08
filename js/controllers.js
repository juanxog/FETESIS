app

    .controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup, User, $ionicLoading,$state) {

    $scope.show = function() {
        $ionicLoading.show({
            template: 'Cargando...',
            duration: 3000
        });
    };



    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.login = function(user) {

        $scope.show();

        User.login(user).then(function(resp){

            if(resp.success){

                window.localStorage.setItem("token", resp.token); 
                $scope.hide();
                User.setUserAll(resp.info);

                if(resp.esprofesor){
                    $state.go('app.dashboard');
                }else{
                    $state.go('app.dashboarde');
                }



            }else{

                $scope.hide();

                var alertPopup = $ionicPopup.alert({
                    title: 'Credenciales Invalidas',
                    template: 'Vuelva a Intentar'
                });

                alertPopup.then(function(res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });


            }


        }).catch(function(err){

            $scope.hide();

        })
    };

    $scope.logout = function() {   
        window.localStorage.removeItem("token"); 
        $location.path('/app/login');   

    };
    $scope.showAlert = function(msg) {
        var alertPopup = $ionicPopup.alert({
            title: 'Warning Message',
            template: msg
        });
    };
    //--------------------------------------------
})

    .controller('ActCtrl', function($scope, $stateParams, User, $ionicLoading, $ionicPopup) {


    $scope.show = function() {
        $ionicLoading.show({
            template: 'Cargando...',
            duration: 3000
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.buscaractividades = function() {

        $scope.show();

        User.buscaractividades($stateParams.curso).then(function(resp){

            if(resp.success){

                $scope.hide();

                $scope.activities = resp.info;

            }else{

                $scope.hide();

                var alertPopup = $ionicPopup.alert({
                    title: 'error al cargar los cursos',
                    template: 'Vuelva a Intentar'
                });

                alertPopup.then(function(res) {
                    //console.log('Thank you for not eating my delicious ice cream cone');
                });

            }

        }).catch(function(err){

            $scope.hide();

        })
    };

    $scope.buscaractividades();

})

    .controller('ActeCtrl', function($scope, $stateParams, User, $ionicLoading, $ionicPopup) {


    $scope.show = function() {
        $ionicLoading.show({
            template: 'Cargando...',
            duration: 3000
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.buscaractividadese = function() {

        $scope.show();

        User.buscaractividadese($stateParams.curso).then(function(resp){

            console.log(resp);

            if(resp.success){

                $scope.hide();

                $scope.activities = resp.info;

            }else{

                $scope.hide();

                var alertPopup = $ionicPopup.alert({
                    title: 'error al cargar los cursos',
                    template: 'Vuelva a Intentar'
                });

                alertPopup.then(function(res) {
                    //console.log('Thank you for not eating my delicious ice cream cone');
                });


            }


        }).catch(function(err){

            $scope.hide();

        })
    };

    $scope.buscaractividadese();

})

    .controller('veract', function($scope, $stateParams, User, $ionicLoading , $ionicPopup) {


    $scope.show = function() {
        $ionicLoading.show({
            template: 'Cargando...',
            duration: 3000
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.buscaractividad = function() {

        $scope.show();

        User.buscaractividad($stateParams.actividad).then(function(resp){

            if(resp.success){

                $scope.hide();

                $scope.actividad = resp.info;

            }else{

                $scope.hide();

                var alertPopup = $ionicPopup.alert({
                    title: 'error al cargar los cursos',
                    template: 'Vuelva a Intentar'
                });

                alertPopup.then(function(res) {
                    //console.log('Thank you for not eating my delicious ice cream cone');
                });


            }


        }).catch(function(err){

            $scope.hide();

        })
    };

    $scope.submit = function(actividad) {


        $scope.show();

        User.updategrupos(actividad.grupo).then(function(resp){

            $scope.hide();

            console.log(actividad);

        }).catch(function(err){

            $scope.hide();

        })


    };

    $scope.buscaractividad();

})

    .controller('DashCtrl', function($scope, $stateParams, User, $ionicLoading, $ionicPopup,$state ) {

    $scope.user = User.user();
    $scope.courses = [];


    $scope.show = function() {
        $ionicLoading.show({
            template: 'Cargando...',
            duration: 3000
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.buscarcursos = function() {

        $scope.show();

        User.buscarcursos($scope.user._id).then(function(resp){

            if(!resp.esprofesor){
                $state.go("app.dashboarde")
            }

            if(resp.esprofesor){
                $state.go("app.dashboard")
            }

            if(resp.success){

                $scope.hide();
                $scope.courses = resp.info;

            }else{

                $scope.hide();
                var alertPopup = $ionicPopup.alert({
                    title: 'error al cargar los cursos',
                    template: 'Vuelva a Intentar'
                });

                alertPopup.then(function(res) {

                });


            }


        }).catch(function(err){

            $scope.hide();

        })
    };


    $scope.buscarcursos();
})

    .controller('CursosCtrl', function($scope, $stateParams, User, $ionicLoading, $ionicModal, $state ) {

    $scope.user = User.user();
    $scope.curso = {estudiantes:[],profesor: $scope.user._id };
    $scope.estudiantes = [];
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;



    $scope.delete = function(item){

        if($scope.curso.estudiantes.length > 0)
            $scope.curso.estudiantes.splice(item, 1);  

    }

    $scope.show = function() {
        $ionicLoading.show({
            template: 'Cargando...',
            duration: 3000
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.submit = function(curso) {

        $scope.show();

        User.crearcursos(curso).then(function(resp){

            $scope.show();
            $state.go("app.dashboard");

        }).catch(function(err){

            $scope.hide();

        })
    };

    $ionicModal.fromTemplateUrl('templates/estudiantes.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {

        User.verificarestudiantes($scope.curso.estudiantes).then(function(resp){

            $scope.estudiantes = resp.info;
            $scope.modal.show();

        }).catch(function(err){

            $scope.hide();

        })

    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

})

    .controller('ActividadCtrl', function($scope, $stateParams, User, $ionicLoading, $ionicModal, $state ) {

    $scope.user = User.user();
    $scope.actividad = {grupo:[],  curso: $stateParams.curso};

    $scope.show = function() {
        $ionicLoading.show({
            template: 'Cargando...',
            duration: 3000
        });
    };

    $scope.hide = function(){
        $ionicLoading.hide();
    };

    $scope.generar = function(curso) {

        $scope.show();

        User.generarposibles(curso).then(function(resp){

            $scope.show();
            $scope.actividad.grupo = resp.info;


            $scope.hide();

        }).catch(function(err){

            $scope.hide();

        })
    };


    $scope.submit = function(actividad) {

        $scope.show();

        User.crearactividad(actividad).then(function(resp){

            $scope.hide();
            $state.go("app.dashboard");


        }).catch(function(err){

            $scope.hide();

        })
    };


})

    .controller('ProfileCtrl', function($scope, $stateParams, User, $ionicLoading, $ionicModal ) {

    $scope.profile = { };

    User.profile().then(function(data){

        $scope.profile = data.user ;
        $scope.profile.face = "img/perfil.png";

    },function(err){

        console.log(err);
    })

})

    .controller('SignupCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup, User, $ionicLoading,$state) {

    $scope.required = true; 
    $scope.user = {esprofesor: false};

    $ionicModal.fromTemplateUrl('templates/error.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.register = function(user){

        User.signup(user).then(function(data){

            if(data.success){
                $state.go("app.dashboard");
            }else{
                $scope.modal.show();
            }

        },function(err){

            console.log(err);

        })
    }


})


    .controller('graphCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,  $location, $ionicPopup, User, $ionicLoading, $state, $stateParams) {

    $scope.typep = "ISFJ";

    User.generargrafica($stateParams.curso,1).then(function(data){

        $scope.labels = data.labels;
        $scope.data = data.data_l;
        $scope.typex = data.type;
        
        User.individualgrafica($scope.typep, data.type).then(function(data){

            $scope.labels_3 = data.labels;
            $scope.data_3 = data.data_l;
            console.log(data);

        },function(err){

        })


    },function(err){

        console.log(err);
    })

    User.generargrafica($stateParams.curso,2).then(function(data){

        $scope.labels_2 = data.labels;
        $scope.data_2 = data.data_l;
        console.log(data);

    },function(err){

        console.log(err);
    })


    $scope.change = function(){

        User.individualgrafica($("#tipologia").val(),$scope.typex).then(function(data){

            $scope.labels_3 = data.labels;
            $scope.data_3 = data.data_l;
            console.log(data);

        },function(err){

        })

    }






})


