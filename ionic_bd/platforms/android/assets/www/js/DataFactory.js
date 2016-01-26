example.factory('dataFactory', function($cordovaFile) { 
    
    var key="registros";
    var self={};   
    var index=0;
    var datos = [];
    
    self.init = function(test)
    {
        document.addEventListener('deviceready', function () {    
            $cordovaFile.createFile(cordova.file.dataDirectory, "test.json", false).then(function (success) {          
                console.log("Parece que creo");
                
                save(key);
                datos = get(key); 
                test();
            }, function (error) {
                test();
                console.log("Parece que ya existe: "+error);         
            });
        });
    };
    
    self.getAllJSON= function(finished)
    {           
        $cordovaFile.readAsText(cordova.file.dataDirectory, "test.json")
        .then(function (success) {
            //$scope.msg("Parece que leyo esto: " +success);
            console.log("Parece que leyo esto: " +success);
            if(success!="") datos = JSON.parse(success);    
            finished(datos===[] ? null:datos);
        }, function (error) {
            //$scope.msg("Se toteo leyendo: "+error[0]);
            console.log("Se toteo leyendo");
            finished(datos);
        });

    };
    
    self.saveJSON = function(valores)
    { 
        $cordovaFile.writeFile(cordova.file.dataDirectory, "test.json", JSON.stringify(valores),true)
        .then(function (success) {
            console.log("Parece que guardo");        
            
        }, function (error) {            
            console.log("Se toteo esta mierda: "+error[0]);
        });
    };
    
        
    self.getAll= function()
    {           
        return get(key);
    }

    self.add= function(item)
    {
        console.log("Add");
        item.id=datos.length+1;
        datos.push(item);
        save(key);
    }
    
    self.delete= function(id)
    {
        for(var i=0; i<datos.length; i++)
        {  
            if(datos[i].id==id) 
            {                
                datos.splice(i,1);                
                save(key);
                break;
            }
        }
        return null;
    }
    
    self.find= function(id)
    {            
        for(var i=0; i<datos.length; i++)
        {                        
            if(datos[i].id==id) return datos[i];
        }
        return null;
    }

    self.update= function(item)
    {     
        for(var i=0; i<datos.length; i++)
        {  
            if(datos[i].id==item.id) 
            {            
                console.log("Update");
                datos.splice(i,1,item); 
                save(key);               
                break;
            }
        }          
    }
    
    function save(keyname)
    {
        var dataCod = JSON.stringify(datos);
        window.localStorage.setItem(keyname, dataCod);
        self.saveJSON(dataCod);
    }   
      
    
    function get(keyname)
    {
        //var datosTemp = JSON.parse(window.localStorage.getItem(keyname));
        var datosTemp = self.getAllJSON();
        return datosTemp;
    }
    return self;
});