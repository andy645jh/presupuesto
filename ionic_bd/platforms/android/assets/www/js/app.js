var example = angular.module('starter', ['ionic','ngCordova'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }         
        });
    });

example.controller("ExampleController", function($scope, $ionicPopup, $cordovaFile, $ionicLoading, dataFactory) {
    $scope.datos=[];   
    //console.log("Funcion: " + test);
    
    dataFactory.init(function()
    {        
        console.log("inicializao");  
        $scope.refreshData();
        $scope.hide();
    });
    
    $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    $scope.hide = function(){
        $ionicLoading.hide();
    };      
 
    
     // An alert dialog
    $scope.msg = function(txt) {
        var alertPopup = $ionicPopup.alert({
            title: 'Message',
            template: txt
    })};   
    
   $scope.load = function()
   {
       $scope.read();       
   };
   
   $scope.save = function()
   {      
       console.log("Save");
       var item = { "fecha":"04/04/2015","valor":300400,"razon":"modificado" };
       dataFactory.add(item);
       $scope.refreshData();
       /*$scope.index++;
       console.log("Index: "+$scope.index);
        $scope.datos.push({id:$scope.index,fecha:"04/04/2015",valor:300400, razon:"test"});
        console.log("Cantidad: " + $scope.datos);
        var valores = {"registros":$scope.datos};
       
        $cordovaFile.writeFile(cordova.file.dataDirectory, "test.json", valores,true)
          .then(function (success) {
            console.log("Parece que guardo");
            $scope.read();
//            $scope.msg("Parece que guardo");
          }, function (error) {
            //$scope.msg("Se toteo esta mierda: "+error[0]);
            console.log("Se toteo esta mierda: "+error[0]);
          });
           */
       
   };
    
   $scope.read= function()
   {
        $scope.refreshData();      
   };  
    
    $scope.refreshData = function()
    {
        dataFactory.getAllJSON(function(data)
        {              
            console.log("Tipo: "+typeof(data));
            //$scope.datos = JSON.parse(data);
            $scope.datos = data;
            console.log("Tipo: "+typeof($scope.datos));
            console.log("Datos: " + $scope.datos.length);
            for (i = 0; i < $scope.datos.length; i++)
            { 
                console.log("Elemento: "+$scope.datos[i]);
            }
        });     
    };
 
});

