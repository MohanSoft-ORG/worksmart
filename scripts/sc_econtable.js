var _contextoEContable;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroEContable;
var _btnRegistroTipoEContable;
var _btnConsultaEContable;

/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroTipoEContable;
var _formRegistroEContable;
var _formConsultaEContable;



function iniciar_contexto_econtable(){
   
     _contexto="econtable";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroEContable="btnCrearEntradaContable";
     _btnRegistroTipoEContable="btnCrearTipoEntradaContable";
     _btnConsultaEContable;    
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroEContable="formRegistrarEntradaContable";
     _formRegistroTipoEContable="formRegistrarTipoEntradaContable";
     _formConsultaEContable;
     
    
    
   agregarEvento(_btnRegistroTipoEContable,"click",registrarContextoTipoEContable);
   agregarEvento(_btnRegistroEContable,"click",registrarContextoEContable);
  
   /*
    * EVENTOS DEL MENU 
    */
   agregarEvento("","click",cambiarAccion);
   agregarEvento("","click",cambiarAccion);
   agregarEvento("crearETipoContable","click",iniciar_contexto);
   agregarEvento("crearEContable","click",iniciar_contexto);
   agregarEvento("crearEContable","click",consultarContextoTipoEContable);
}

/* INSERTAR CONTEXTO*/    
function registrarContextoEContable(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroEContable);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
         id_tipo:vf.Select[0],
         id_usuario:usuario.id_empleado,
         valor:vf.Texto[0]
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crear",datos,mostrarMensaje,_formRegistroEContable);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
/* INSERTAR CONTEXTO*/    
function registrarContextoTipoEContable(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroTipoEContable);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
            nombre:vf.Texto[0],
            descripcion:vf.Texto[1]
            
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crearTipoEntrada",datos,mostrarMensaje,_formRegistroTipoEContable);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContexto(){
    consultarDatos(_contexto,"consultar",null,imprimir);   
}
/* CONSULTAR CONTEXTO */    
function consultarContextoTipoEContable(){
    consultarDatos(_contexto,"consultarTipoEntrada",null,dibujar_select_tipo_entradas);   
}
function dibujar_select_tipo_entradas(d){
    if(d.respuesta){
        var datos=d.valores_consultados;
        var s=document.getElementById("selTipoEContable");
        for(var dt in datos){
           console.log(datos[dt]);
           var op=document.createElement("option");
           op.setAttribute("value",datos[dt].IdTipoEntradaContable);
           op.innerHTML=datos[dt].NombreTipoEntradaContable;
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
