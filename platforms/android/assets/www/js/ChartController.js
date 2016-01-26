app.controller('ChartController',function($scope)
{
    var fecha = new Date();
    var day = fecha.getDate();
    var dayIndex = fecha.getDay();
    var monthIndex = fecha.getMonth();
    var year = fecha.getFullYear();
    console.log("fecha: "+fecha.getDay());
    
    $scope.labelsMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    $scope.series = ['Movements'];
    //$scope.data = new Array($scope.datos.length);
    
    $scope.labelsWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"];
    $scope.data = [ ];
    
    var test = [];
    
    for(var i=0; i < $scope.datos.length;i++)
    {
        var item = $scope.datos[i];        
        var valor = parseInt(item.valor)/10000;
        console.log("Valor: " + i);
        test[i] = valor;
    }
    
    $scope.data[0] = test;
});