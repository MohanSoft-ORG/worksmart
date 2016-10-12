/*Funcion para consultar session storage*/
function obtener_session_storage(nombreSession){
    if(sessionStorage[nombreSession]!=undefined){
       var sesion=JSON.parse(sessionStorage[nombreSession]);
    
       return sesion;
    }else{  
        return false;
    }
}
function agregar_session_storage(nombre,datos){
     sessionStorage.setItem(nombre,JSON.stringify(datos));
}

function obtener_id_usuario(){
    var s= obtener_session_storage("ssUsuario");
    return s.id_usuario;
}
function eliminar_session_storage(nombre){
    if(nombre!=undefined){
        sessionStorage.removeItem(nombre);
    }else{
        sessionStorage.clear();
    }
}