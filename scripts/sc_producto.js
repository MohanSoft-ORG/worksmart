var _contextoProducto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroProducto;
var _btnConsultaProducto;
var _btnActualizarProducto;
var _btnSeleccionarActualizarProducto;
var _btnBuscarEliminarProducto;
var _btnEliminarProducto;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroProducto;
var _formConsultaProducto;
var _formActualizarProducto;
var _formEliminarProducto;


function iniciar_contexto_producto(){
   
     _contextoProducto="producto";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroProducto;
     _btnConsultaProducto="btnPruebaConsultaProducto";
     _btnActualizarProducto;
     _btnSeleccionarActualizarProducto;
     _btnBuscarEliminarProducto;
     _btnEliminarProducto;
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroProducto;
     _formConsultaProducto="formPruebaConsultaProducto";
     _formActualizarProducto;
     _formEliminarProducto;
    
    
   agregarEvento(_btnRegistroProducto,"click",registrarContextoProducto);
   agregarEvento(_btnConsultaProducto,"click",consultarContextoProducto);
   agregarEvento(_btnActualizarProducto,"click",editarContextoProducto);
   agregarEvento(_btnActualizarProducto,"click",eliminarContextoProducto);
   
}

/* INSERTAR CONTEXTO*/    
function registrarContextoProducto(){
    //1-Obtengo los datos del formulario
    var valores_formulario=obtener_valores_formulario(_formRegistroProducto);   
    if(valores_formulario){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={/*AQUI DATOS DEL FORMULARIO*/};
        //Invoco mi funcion 
        registrarDato(_contextoProducto,"crear",datos,imprimir);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoProducto(){
    var vf=obtener_valores_formulario(_formConsultaProducto);
    if(vf){
        consultarDatos(_contextoProducto,"consultarPorValor",{valor:vf.Texto[0]},imprimir_en_documento,_formConsultaProducto);   
    }else{
        mostrarMensaje({mensaje:"Por favor ingresa valores"});
    }
    
}
/*EDITAR CONTEXTO*/
function editarContextoProducto(){
    var valores_formulario=obtener_valores_formulario(_formActualizarProducto);
    if(valores_formulario){
        var datos={/*AQUI DATOS DEL FORMULARIO*/};
        editarDato(_contextoProducto,"actualizar",datos,imprimir);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/
function eliminarContextoProducto(){
    var valores_formulario=obtener_valores_formulario(_formEliminarProducto);
    if(valores_formulario){
        eliminarDato(_contextoProducto,"eliminar",{/*AQUI DATOS DEL FORMULARIO*/},imprimir);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
