
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroSalidaVenta;
var _btnConsultaSalida;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroSalidaVenta;
var _formConsultaSalida;
var accionUsuario;

function iniciar_contexto_salida(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroSalidaVenta="btnCrearSalidaVenta";
     _btnConsultaSalida="btnBuscarSalida";

    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroSalidaVenta="formRegistrarSalidaVenta";
     _formConsultaSalida="formBuscarSalida";
    
    
   agregarEvento(_btnRegistroSalidaVenta,"click",registrarContextoSalidaVenta);
   agregarEvento(_btnConsultaSalida,"click",consultarContextoSalida);
   
   //Elemento del sub menu
   /*agregarEvento("elementoBuscarSubMenu","click",cambiarAccion);
   agregarEvento("elementoEditarSubMenu","click",cambiarAccion);
   agregarEvento("elementoeliminarSubMenu","click",cambiarAccion);*/
   agregarEvento("sal","click",iniciar_contexto);//menu principal
   consultarFacturasSP();
}

/* INSERTAR CONTEXTO*/    
function registrarContextoSalidaVenta(){
    //1-O
    //btengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroSalidaVenta);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
            id_factura:vf.Select[0],
            id_empleado:obtener_id_usuario()
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crearSalidaVenta",datos,mostrarMensaje);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function registrarContextoSalidaBodega(){
    //1-O
    //btengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroSalida);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
            codigo_salida:vf.Texto[0],
            id_empleado:obtener_id_usuario()
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crearSalidaBodega",datos,mostrarMensaje);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function registrarContextoSalidaObsequio(){
    //1-O
    //btengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroSalida);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crearSalidaObsequio",datos,mostrarMensaje);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoSalida(){
    
    var vf=obtener_valores_formulario(_formConsultaSalida);
    if(vf){
        var dat={valor:vf.Texto[0]};
            consultarDatos(_contexto,"consultarPorValor",dat,dibujar_tabla_resultado);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function dibujar_tabla_resultado(datos){
    $('#divRespuestaConsultaSalida').fadeIn(500);
    $('#mascara').fadeOut('fast');
    
     var d=eval(datos.valores_consultados);
     if(datos.respuesta){
         
     var tabla=document.getElementById("tblRespuestaSalida");
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
             fila.setAttribute("id",d[e].IdSalida);        
             
                        
             switch(accionUsuario){
                 case "editar":
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreEmpleado);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                      var celda=document.createElement("td");
                      var inpEditar=document.createElement("input");
                      inpEditar.setAttribute("type","button");
                      inpEditar.setAttribute("value","Editar");
                      inpEditar.setAttribute("onclick","editarContextoSalida('"+d[e].IdSalida+"')");
                      celda.appendChild(inpEditar);         
                      fila.appendChild(celda);
                      
                     break;
                 case "eliminar":
                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].NombreEmpleado;         
                    fila.appendChild(celda);

                    
                    
                      var celda=document.createElement("td");
                      var inpEliminar=document.createElement("input");
                      inpEliminar.setAttribute("type","button");
                      console.log(d[e].EstadoSalida);
                      if(d[e].EstadoSalida=="0"){
                          inpEliminar.setAttribute("value","Habilitar");
                          inpEliminar.setAttribute("onclick","");
                      }else{
                          inpEliminar.setAttribute("value","Deshabilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoSalida('"+d[e].IdSalida+"')");
                      }
                      
                      celda.appendChild(inpEliminar);         
                      fila.appendChild(celda);
                   break;
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
         console.log("tblRespuestaSalida");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);
}

/*EDITAR CONTEXTO*/
function editarContextoSalida(id){
    //Consulta las filas
    var val=obtener_valores_filas_tabla(id);
     console.log(val); 
    if(val.length > 0){
        var datos={
            id_salida:id,
            codigo_salida:val[0],
            id_empleado:obtener_id_usuario()
        };
        editarDato(_contexto,"actualizar",datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/
function eliminarContextoSalida(id){
    
    if(id!=undefined){
        eliminarDato(_contexto,"eliminar",{id_proveedor:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}

function consultarFacturasSP(){
    consultarDatos("factura","consultar",{},dibujar_select_resultado_factura);   
    
}

function dibujar_select_resultado_factura(dat){
    if(dat.respuesta){
        var datos=eval(dat.valores_consultados);
        console.log(datos);
       //console.log(colorActivo);
       //console.log(colorInactivo);
       var select=document.getElementById("selFacturasSP");
       select.innerHTML="";
       var opt=document.createElement("option");
       opt.innerHTML="--Seleccione una factura--";
       opt.value="0";  
       select.appendChild(opt);
       for(var d in datos){
          console.log(datos[d]); 
          
           if(datos[d].Estadofactura=="Sin pagar"){
                console.log(datos[d]);
                console.log(datos[d].Estadofactura);
               var opt=document.createElement("option");
               opt.innerHTML=datos[d].NumeroFactura;
               opt.value=datos[d].IdFactura;
               select.appendChild(opt);      
           }    


       }
    }else{
        var select=document.getElementById("selFacturasSP");
       select.innerHTML="";
       var opt=document.createElement("option");
       opt.innerHTML="--No hay facturas sin pagar--";
       opt.value="0";  
       select.appendChild(opt);       
    }
    
}