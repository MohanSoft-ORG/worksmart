var _contextoCategoria;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroCategoria;
var _btnConsultaCategoria;
var _btnActualizarCategoria;
var _btnSeleccionarActualizarCategoria;
var _btnBuscarCategoriaEliminar;
var _btnEliminarCategoria;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroCategoria;
var _formConsultaCategoria;
var _formActualizarCategoria;
var _formEliminarCategoria;


function iniciar_contexto_categoria(){
   
     _contextoCategoria="categoria";//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroCategoria="btnPrueba";
     _btnConsultaCategoria="btnPruebaConsulta";
     _btnActualizarCategoria;
     _btnSeleccionarActualizarCategoria;
     _btnBuscarCategoriaEliminar;
     _btnEliminarCategoria;
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroCategoria="formPrueba";
     _formConsultaCategoria="formPruebaConsulta";
     _formActualizarCategoria;
     _formEliminarCategoria;
    
    
   agregarEvento(_btnRegistroCategoria,"click",registrarContextoCategoria);
   agregarEvento(_btnConsultaCategoria,"click",consultarContextoCategoria);
   agregarEvento(_btnActualizarCategoria,"click",editarContextoCategoria);
   agregarEvento(_btnActualizarCategoria,"click",eliminarContextoCategoria);
   
}
/* INSERTAR CONTEXTO*/    
function registrarContextoCategoria(){
    //1-Obtengo los datos del formulario
    var valores_formulario=obtener_valores_formulario(_formRegistroCategoria);   
    if(valores_formulario){
        var archivo=valores_formulario.Archivo[0];
        var nombre;
        
        if(archivo.length>0){
            nombre=archivo[0].name;
        }else{
            nombre="default.png";
        }
         
        //  console.log(f[0]);    
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={nombre_categoria:valores_formulario.Texto[0],
        descripcion_categoria :valores_formulario.Texto[1],
        imagen_categoria:nombre};
        //Invoco mi funcion 
        
        registrarDatoArchivo(_contextoCategoria,"crear",datos,archivo[0],mostrarMensaje);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
/* CONSULTAR CONTEXTO */    
function consultarContextoCategoria(){
    var d=obtener_valores_formulario(_formConsultaCategoria);
    if(d){
        consultarDatos(_contextoCategoria,"consultar",null,imprimir_en_documento);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa datos"});
    }
    
}
/*EDITAR CONTEXTO*/
function editarContextoCategoria(){
    var valores_formulario=obtener_valores_formulario(_formActualizarCategoria);
    if(valores_formulario){
        var datos={/*AQUI DATOS DEL FORMULARIO*/};
        editarDato("actualizar"+_contextoCategoria,datos,imprimir);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/
function eliminarContextoCategoria(){
    var valores_formulario=obtener_valores_formulario(_formEliminarCategoria);
    if(valores_formulario){
        eliminarDato(_contextoCategoria,"eliminar",{/*AQUI DATOS DEL FORMULARIO*/},imprimir);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
