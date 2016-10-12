var _contextoSContable;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroSContable;
var _btnRegistroTipoSContable;
var _btnConsultaSContable;

/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroTipoSContable;
var _formRegistroSContable;
var _formConsultaSContable;



function iniciar_contexto_scontable(){
   
     _contexto="scontable";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroSContable="btnCrearSalidaContable";
     _btnRegistroTipoSContable="btnCrearTipoSalidaContable";
     _btnConsultaSContable;    
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroSContable="formRegistrarSalidaContable";
     _formRegistroTipoSContable="formRegistrarTipoSalidaContable";
     _formConsultaSContable;
     
    
    
   agregarEvento(_btnRegistroTipoSContable,"click",registrarContextoTipoSContable);
   agregarEvento(_btnRegistroSContable,"click",registrarContextoSContable);
  
   /*
    * EVENTOS DEL MENU 
    */
   agregarEvento("","click",cambiarAccion);
   agregarEvento("","click",cambiarAccion);
   agregarEvento("crearSTipoContable","click",iniciar_contexto);
   agregarEvento("crearSContable","click",iniciar_contexto);
   agregarEvento("crearSContable","click",consultarContextoTipoSContable);
}

/* INSERTAR CONTEXTO*/    
function registrarContextoSContable(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroSContable);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
         id_tipo:vf.Select[0],
         id_usuario:usuario.id_empleado,
         valor:vf.Texto[0]
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crear",datos,mostrarMensaje,_formRegistroSContable);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
/* INSERTAR CONTEXTO*/    
function registrarContextoTipoSContable(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroTipoSContable);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
            nombre:vf.Texto[0],
            descripcion:vf.Texto[1]
            
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crearTipoSalida",datos,mostrarMensaje,_formRegistroTipoSContable);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContexto(){
    consultarDatos(_contexto,"consultar",null,imprimir);   
}
/* CONSULTAR CONTEXTO */    
function consultarContextoTipoSContable(){
    consultarDatos(_contexto,"consultarTipoSalida",null,dibujar_select_tipo_salida);   
}
function dibujar_select_tipo_salida(d){
    if(d.respuesta){
        var datos=d.valores_consultados;
        var s=document.getElementById("selTipoSContable");
        for(var dt in datos){
           console.log(datos[dt]);
           var op=document.createElement("option");
           op.setAttribute("value",datos[dt].IdTipoSalidaContable);
           op.innerHTML=datos[dt].NombreSalidaContable;
           s.appendChild(op);
        }
    }
    
}
/*EDITAR CONTEXTO*/
function editarContexto(){
    var valores_formulario=obtener_valores_formulario(_formActualizar);
    if(valores_formulario){
        var datos={/*AQUI DATOS DEL FORMULARIO*/};
        editarDato(_contexto,"actualizar",datos,imprimir);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/
function eliminarContexto(){
    var valores_formulario=obtener_valores_formulario(_formEliminar);
    if(valores_formulario){
        eliminarDato(_contexto,"eliminar",{/*AQUI DATOS DEL FORMULARIO*/},imprimir);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
