db=null;
var app = angular.module('starter', ['ionic','ngCordova','chart.js']);    
app.controller('PresupuestoController',function($scope,$ionicModal,$http,$ionicPopup,depositService)
{
    $scope.title="";
    $scope.registro = {};       
    $scope.datos = depositService.getonly();  
    $scope.hideBar=true;
    $scope.idSelected = null;
        
    // An alert dialog
    $scope.showError = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Please, try again!'
    })};   
        
    $ionicModal.fromTemplateUrl('modals/modal_add.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal
    });  

    $scope.openModalAdd = function() {  
        $scope.hideBar=true;
        $scope.registro={};
        $scope.idSelected=-1;
        $scope.title="Add";
        $scope.modal.show();
    };

    $scope.openModalEdit = function() {   
        $scope.title="Edit";        
        $scope.modal.show();
    };
        
    $scope.closeModal = function(canSave) {
        
        if(canSave){         
            console.log($scope.registro.valor);
            if(isValid())depositService.update($scope.registro);  
            else if(isIdEmpty()) depositService.add($scope.registro);             
            else if(!isValid()) $scope.showError();   
            refreshData();
        } 

        $scope.resetPage();           
        $scope.modal.hide();                
    };  
        
    isIdEmpty = function()
    {        
        return ($scope.registro.id===undefined && $scope.registro.valor!==undefined && $scope.registro.razon!==undefined);                  
    };
       
    isValid = function()
    {      
        console.log("Id: "+$scope.registro.id);
        console.log("Valor: "+$scope.registro.valor);
        console.log("Razon: "+$scope.registro.razon);
        return ($scope.registro.id!==undefined && $scope.registro.valor!==undefined && $scope.registro.razon!==undefined);                  
    };
        
    $scope.resetPage = function()
    {
        $scope.registro={};    
        $scope.idSelected =-1;        
        $scope.hideBar=true;
    };
    
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });   
    
        
    $scope.selectItem = function(item)
    {     
        $scope.idSelected =item.id;  
        var value = depositService.find($scope.idSelected);
        var newValue = { id:value.id,fecha:new Date(value.fecha),valor:value.valor,razon:value.razon};
        $scope.registro =newValue;             
        $scope.hideBar=false;
    };      
    
    refreshData = function()
    {
        $scope.datos= depositService.getAll();
    };
        
    // A confirm dialog
    $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Delete Register',
            template: 'Are you sure you want to delete this register?'
        });

        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
                depositService.delete($scope.registro.id);
                refreshData();
            } else {
                console.log('You are not sure');
                $scope.resetPage();
            }
        });
    };
});    
    
app.run(function($ionicPlatform, $cordovaSQLite)
{
    $ionicPlatform.ready(function()
    {
        if(window.cordova && window.cordova.plugins.Keyboard)
        {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);    
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        //db = $cordovaSQLite.openDB("my.db");
        //$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
        
        
        db = $cordovaSQLite.openDB({ name: "my.db" });
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS registros (id integer primary key autoincrement, fecha date, valor integer, razon text)");
    });
});