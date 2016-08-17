var _contextoObjeto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroObjeto;
var _btnConsultaObjeto;
var _btnConsultarActualizarObjeto;
var _btnConsultarEliminarObjeto;

/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroObjeto;
var _formConsultaObjeto;
var _formActualizarObjeto;
var _formEliminarObjeto;


function iniciar_contexto_objeto(){
   
     _contexto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistro;
     _btnConsulta;
     _btnActualizar;
     _btnSeleccionarActualizar;
     _btnBuscarEliminar;
     _btnEliminar;
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistro;
     _formConsulta;
     _formActualizar;
     _formEliminar;
    
    
   agregarEvento(_btnRegistro,"click",registrarContexto);
   agregarEvento(_btnConsulta,"click",consultarContexto);
   agregarEvento(_btnActualizar,"click",editarContexto);
   agregarEvento(_btnActualizar,"click",eliminarContexto);
   
}

/* INSERTAR CONTEXTO*/    
function registrarContexto(){
    //1-Obtengo los datos del formulario
    var valores_formulario=obtener_valores_formulario(_formRegistro);   
    if(valores_formulario){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={/*AQUI DATOS DEL FORMULARIO*/};
        //Invoco mi funcion 
        registrarDato(_contexto,"crear",datos,imprimir);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContexto(){
    consultarDatos(_contexto,"consultar",null,imprimir);   
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
