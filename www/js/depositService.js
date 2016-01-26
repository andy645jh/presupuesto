app.factory('depositService',function($cordovaSQLite){
    
    
    var key="registros";
    var self={};
    var datos = 
             [
                 {id: 0, fecha: '01/02/2015', valor: 100000, razon: 'Esta es la razon'},
                 {id: 1, fecha: '02/03/2015', valor: 200000, razon: 'Esta es la segunda razon'},
                 {id: 3, fecha: '03/08/2009', valor: 900000, razon: 'Esta es la razon 9'},
                 {id: 4, fecha: '04/09/2009', valor: 800000, razon: 'Esta es la razon 8'},
                 {id: 5, fecha: '05/10/2009', valor: 700000, razon: 'Esta es la razon 7'},
                 {id: 6, fecha: '06/11/2012', valor: 600000, razon: 'Esta es la razon 6'},
             ];  
    
    save(key);
    datos = get(key);       
    
        
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
        window.localStorage.setItem(keyname, JSON.stringify(datos));
    }
    
    self.getonly = function ()
    {
        return JSON.parse(window.localStorage.getItem(key));
    }
    
    self.insert = function(fecha,valor,razon)
    {
        var query = "INSERT INTO registros (fecha, valor, razon) VALUES (?,?,?)";
        $cordovaSQLite.execute(db.query,[fecha,valor,razon]).then(function(res)
         {
             console.log("Inesrt ID-> "+res.insertId);
         },function(err){
             console.error(err);
         });
    }
    
    function get(keyname)
    {
        var datosTemp = JSON.parse(window.localStorage.getItem(keyname));      
        return datosTemp;
    }
    
    return self;
});