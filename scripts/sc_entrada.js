
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroEntradaPedido;
var _btnBuscarProductoListaEntrada;
var _btnRegistroEntradaOtros;
var _btnRegistroEntradaDevolucion;
var _btnConsultaEntrada;
var _btnAgregarProductoListaEntrada;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroEntradaPedido;
var _formRegistroEntradaDevolucion;
var _formRegistroEntradaOtros;

var accionUsuario;

function iniciar_contexto_entrada(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroEntradaPedido="btnCrearEntradaPedido";
     _btnBuscarProductoListaEntrada="btnBuscarProductoListaEntrada";
     _btnRegistroEntradaOtros="btnCrearEntradaOtros";
     _btnRegistroEntradaDevolucion="btnCrearEntradaDevolucion";
     _btnAgregarProductoListaEntrada="btnAgregarProductoListaEntrada";
     _btnConsultaEntrada="btnBuscarEntrada";
     _btnBuscarProductoListaEntrada="btnBuscarProductoListaEntrada";
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroEntradaPedido="formRegistrarEntradaPedido";
     _formRegistroEntradaDevolucion="formRegistrarEntradaDevolucion";
     _formRegistroEntradaOtros="formRegistrarEntradaOtros";
     
     
    
   agregarEvento(_btnRegistroEntradaPedido,"click",registrarContextoEntradaPedido);
   agregarEvento(_btnRegistroEntradaDevolucion,"click",registrarContextoEntradaDevolucion);
   agregarEvento(_btnRegistroEntradaOtros,"click",registrarContextoEntradaOtros);
   agregarEvento(_btnConsultaEntrada,"click",consultarContextoEntrada);
   agregarEvento(_btnBuscarProductoListaEntrada,"click",consultarContextoEntradaPedido);
   agregarEvento(_btnAgregarProductoListaEntrada,"click",agregarProductoListaEntrada);
   
   
   //Elemento del sub menu
   //agregarEvento("crearEnt","click",cambiarAccion);
   //agregarEvento("crearEntObs","click",cambiarAccion);
   //agregarEvento("crearEntOtr","click",cambiarAccion);
   agregarEvento("ent","click",iniciar_contexto);//menu principal
   
   consultarProveedores();
}

/* INSERTAR CONTEXTO*/    
function registrarContextoEntradaPedido(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroEntradaPedido);   
    
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
            id_proveedor:vf.Select[0],
            lista_pedido:lista_productos_entrada_pedido,
            id_empleado:obtener_id_usuario(),
            codigo_entrada:""
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crearPedido",datos,validarEntradaPedido);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function validarEntradaPedido(datos){
    
    if(datos.respuesta){
        lista_productos_entrada_pedido=[];
        limpiarFormulario(_formRegistroEntradaPedido);
        mostrarMensaje(datos.mensaje);
    }else{
        mostrarMensaje(datos.mensaje);
    }
}
/* INSERTAR CONTEXTO*/    
function registrarContextoEntradaDevolucion(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroEntrada);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crearDevolucion",datos,mostrarMensaje);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* INSERTAR CONTEXTO*/    
function registrarContextoEntradaOtros(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroEntrada);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crearOtros",datos,mostrarMensaje);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}


/* CONSULTAR CONTEXTO */    
function consultarContextoEntrada(){
    
    var vf=obtener_valores_formulario(_formConsultaEntrada);
    if(vf){
        var dat={valor:vf.Texto[0],tipo:vf.Select[0]};
            consultarDatos(_contexto,"consultarPorValor",dat,dibujar_tabla_resultado_entrada);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function consultarContextoEntradaPedido(){
    
    var vf=obtener_valores_formulario(_formRegistroEntradaPedido);
    if(vf){
        var dat={valor:vf.Texto[0]};
            consultarDatos("producto","consultarPorValor",dat,mostrar_datos_producto);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

function mostrar_datos_producto(datos){
    var d=eval(datos.valores_consultados);
    var h4Nombreproducto=document.getElementById("h4Nombreproducto");
    h4Nombreproducto.innerHTML=d[0].NombreProducto;
    var hdIdProductoEntradaPedido=document.getElementById("hdIdProductoEntradaPedido");
    hdIdProductoEntradaPedido.value=d[0].IdProducto;
}
function dibujar_tabla_resultado_entrada(datos){
    $('#divRespuestaConsultaEntrada').fadeIn(500);
    $('#mascara').fadeOut('fast');
    
     var d=eval(datos.valores_consultados);
     if(datos.respuesta){
         
     var tabla=document.getElementById("tblRespuestaEntrada");
     if(tabla!=null){
         tabla.innerHTML="";
         var fila=document.createElement("tr");
         
         var celda=document.createElement("td");
         celda.innerHTML="Nombre"; 
         fila.appendChild(celda);
         
                  
         
         
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id",d[e].IdEntrada);        
             
                        
             switch(accionUsuario){
                default :
                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].NombreEmpleado;         
                    fila.appendChild(celda);

                    
                   
                   break;
             }
             
             tabla.appendChild(fila);
         }
     }
     else{
         console.log("tblRespuestaEntrada");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);
}
var lista_productos_entrada_pedido=[];
function agregarProductoListaEntrada(){
    
    var h4Nombreproducto=document.getElementById("h4Nombreproducto");
    var hdIdProductoEntradaPedido=document.getElementById("hdIdProductoEntradaPedido");
    var txtCantidadEntradaPedido=document.getElementById("txtCantidadEntradaPedido");
    var txtComentarioEntradaPedido=document.getElementById("txtComentarioEntradaPedido");
    var p={
        id_producto:hdIdProductoEntradaPedido.value,
        cantidad:txtCantidadEntradaPedido.value,
        nombre:h4Nombreproducto.innerHTML,
        comentario:txtComentarioEntradaPedido.value
    };
    
    lista_productos_entrada_pedido.push(p);
    dibujar_lista_entrada_pedido();
    
    hdIdProductoEntradaPedido.value="";
    txtCantidadEntradaPedido.value="";
    h4Nombreproducto.innerHTML="";
    txtComentarioEntradaPedido.value="";
    
    
}

function dibujar_lista_entrada_pedido(){
     var lista=document.getElementById("liMisListaEntrada");
     lista.innerHTML="";
    for(var l in lista_productos_entrada_pedido){
        var li=document.createElement("li");
        li.innerHTML=lista_productos_entrada_pedido[l].nombre;
        lista.appendChild(li);
    }
}

function consultarProveedores(){
   
        
    consultarDatos("proveedor","consultar",{},crearSelectProveedorEntradaPedido);   
    
}

function crearSelectProveedorEntradaPedido(dat){
    var datos=eval(dat.valores_consultados);
     console.log(datos);
    //console.log(colorActivo);
    //console.log(colorInactivo);
    var select=document.getElementById("selProveedoresEntrada");
    select.innerHTML="";
    var opt=document.createElement("option");
    opt.innerHTML="--Seleccione un proveedor--";
    opt.value="0";  
    select.appendChild(opt);
    for(var d in datos){
            
        var opt=document.createElement("option");
        opt.innerHTML=datos[d].NombreProveedor;
        opt.value=datos[d].IdProveedor;
        select.appendChild(opt);
        
        
        
    }
}
