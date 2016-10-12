
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/

var _btnConsultaSolicitud;
var _btnConsultarContactoWeb;
var _btnConsultarSuscripciones;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroSolicitud;
var _formConsultaSolicitud;
var _formConsultaConWeb;
var _formConsultaSus;
var accionUsuario;

function iniciar_contexto_solicitud(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/

     _btnConsultaSolicitud="btnBuscarSolicitud";
    _btnConsultarContactoWeb="btnBuscarContactoWeb";
    _btnConsultarSuscripciones="btnBuscarSuscripcion";
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/

     _formConsultaSolicitud="formBuscarSolicitudes";
     _formConsultaConWeb="formBuscarConWeb";
    

   agregarEvento(_btnConsultaSolicitud,"click",consultarContextoSolicitud);
   agregarEvento(_btnConsultarContactoWeb,"click",consultarContactoWeb);
   agregarEvento(_btnConsultarSuscripciones,"click",consultarSuscripcion);
   //Elemento del sub menu
   agregarEvento("buscarSol","click",cambiarAccion);
   agregarEvento("contactoWeb","click",cambiarAccion);
   agregarEvento("sol","click",iniciar_contexto);
}


/* CONSULTAR CONTEXTO */    
function consultarContextoSolicitud(){
    
    var vf=obtener_valores_formulario(_formConsultaSolicitud);
    if(vf){
        var dat={valor:vf.Select[0]};
        consultarDatos(_contexto,"consultarPorValor",dat,dibujar_tabla_resultado_solicitud_lista);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function dibujar_tabla_resultado_solicitud_tabla(datos){
        //$('#divRespuestaConsultaSolicitud').fadeIn(500);
        //$('#mascara').fadeOut('fast');
    
     var d=eval(datos.valores_consultados);
     console.log(d);
     if(datos.respuesta){
         
     var tabla=document.getElementById("tblRespuestaSolicitud");
     if(tabla!=null){
         tabla.innerHTML="";
         var fila=document.createElement("tr");
         
         var celda=document.createElement("td");
         celda.innerHTML="Numero Solicitud"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Nombre Cliente"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Correo Cliente"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Telefono Cliente"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Fecha Solicitud"; 
         fila.appendChild(celda);
         
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id","sol_"+d[e].IdSolicitud);        
             
                        
             switch(accionUsuario){
                 case "editar":
                      
                      var celda=document.createElement("td");
                      var inpEditar=document.createElement("input");
                      inpEditar.setAttribute("type","button");
                      inpEditar.setAttribute("value","Editar");
                      inpEditar.setAttribute("onclick","editarContextoSolicitud('"+d[e].IdServicio+"')");
                      celda.appendChild(inpEditar);         
                      fila.appendChild(celda);
                      
                     break;
                 case "eliminar":
                    
                      var celda=document.createElement("td");
                      var inpEliminar=document.createElement("input");
                      inpEliminar.setAttribute("type","button");
                      console.log(d[e].EstadoServicio);
                      if(d[e].EstadoServicio=="0"){
                          inpEliminar.setAttribute("value","Habilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoSolicitud('"+d[e].IdServicio+"')");
                      }else{
                          inpEliminar.setAttribute("value","Deshabilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoSolicitud('"+d[e].IdServicio+"')");
                      }
                      
                      celda.appendChild(inpEliminar);         
                      fila.appendChild(celda);
                   break;
               case "consulta" :
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NumeroSolicitud);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreCliente);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].CorreoCliente);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].TelefonoCliente);
                    celda.appendChild(inp);       
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaSolicitud);
                    celda.appendChild(inp);       
                    fila.appendChild(celda);
                    tabla.appendChild(fila);
                    
                    
                   break;
             }
             
             tabla.appendChild(fila);
         }
     }
     else{
         mostrarMensaje("tblRespuestaServicio");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);
}
function dibujar_tabla_resultado_solicitud_lista(datos){
        //$('#divRespuestaConsultaSolicitud').fadeIn(500);
        //$('#mascara').fadeOut('fast');
    
     var d=eval(datos.valores_consultados);
     console.log(d);
     if(datos.respuesta){
         
     var lista=document.getElementById("liRespuestaSolicitud");
        if(lista!=null){
            lista.innerHTML="";
           for(var e in d){
               console.log(d[e]);
                console.log(d[e].NumeroSolicitud);
                var li=document.createElement("li");
                var h=document.createElement("h2");
                h.innerHTML="Numero Solicitud: "+d[e].NumeroSolicitud; 
                li.appendChild(h);
                lista.appendChild(li);

                var li=document.createElement("li");
                 var h=document.createElement("h2");
                h.innerHTML="Nombre Cliente: "+d[e].NombreCliente; 
                li.appendChild(h);
                lista.appendChild(li);

                var li=document.createElement("li");
                 var h=document.createElement("h2");
                h.innerHTML="Correo Cliente: "+d[e].CorreoCliente; 
                li.appendChild(h);
                lista.appendChild(li);
                
                var li=document.createElement("li");
                 var h=document.createElement("h2");
                h.innerHTML="Telefono Cliente: "+d[e].TelefonoCliente; 
                li.appendChild(h);
                lista.appendChild(li);

                var li=document.createElement("li");
                 var h=document.createElement("h2");
                h.innerHTML="Fecha Solicitud: "+d[e].FechaSolicitud; 
                li.appendChild(h);
                lista.appendChild(li);
                console.log(d[e].detalle_solicitud);    
                for(var dt in d[e].detalle_solicitud){
                    var li=document.createElement("li");
                     var h=document.createElement("h2");
                    h.innerHTML="Codigo Producto Solicitud: "+d[e].detalle_solicitud[dt].CodigoProducto; 
                    li.appendChild(h);
                    lista.appendChild(li);
                    
                    var li=document.createElement("li");
                     var h=document.createElement("h2");
                    h.innerHTML="Nombre Producto Solicitud: "+d[e].detalle_solicitud[dt].NombreProducto; 
                    li.appendChild(h);
                    lista.appendChild(li);
                    
                    var li=document.createElement("li");
                     var h=document.createElement("h2");
                    h.innerHTML="Cantidad Solicitada: "+d[e].detalle_solicitud[dt].CantidadSolicitada; 
                    li.appendChild(h);
                    lista.appendChild(li);

                    
                }
                var li=document.createElement("li");
                     var h=document.createElement("h2");
                    h.innerHTML="==============="; 
                    li.appendChild(h);
                    lista.appendChild(li);

                
                
            }
        }
        else{
            mostrarMensaje("tblRespuestaServicio");
        }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(lista);
}
/*EDITAR CONTEXTO*/
function editarContextoSolicitud(id){
    //Consulta las filas
    var val=obtener_valores_filas_tabla("sol_"+id);
     console.log(val); 
    if(val.length > 0){
        
        
        var datos={
            id_solicitud:id,
           codigo:val[0],
           nombre:val[1],
           descripcion:val[2],
           imagen:"null",
           precio:val[3],
           id_categoria:val[4]
                     
        };
        editarDato(_contexto,"actualizar",datos,mostrarMensaje,_formConsultaServicio);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/
function eliminarContextoSolicitud(id){
    
    if(id){
        eliminarDato(_contexto,"eliminar",{id_solicitud:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}

function consultarContactoWeb(){
        
        consultarDatos(_contexto,"consultarContactoWeb",{},dibujar_tabla_resultado_contacto_web);   
    
}
function dibujar_tabla_resultado_contacto_web(datos){
    var d=eval(datos.valores_consultados);
     console.log(d);
     if(datos.respuesta){
      $('#resultadoConWeb').css({"visibility":"visible"});
     var tabla=document.getElementById("tblRespuestaConWeb");
     if(tabla!=null){
         tabla.innerHTML="";
         var fila=document.createElement("tr");
         
         var celda=document.createElement("td");
         celda.innerHTML="Fecha Contacto"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Nombre Contacto"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Telefono Contacto"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Email Contacto"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Observaciones"; 
         fila.appendChild(celda);
         
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id","con_"+d[e].IdContacto);        
             
                        
             switch(accionUsuario){
                 case "editar":
                      
                      var celda=document.createElement("td");
                      var inpEditar=document.createElement("input");
                      inpEditar.setAttribute("type","button");
                      inpEditar.setAttribute("value","Editar");
                      inpEditar.setAttribute("onclick","editarContextoSolicitud('"+d[e].IdServicio+"')");
                      celda.appendChild(inpEditar);         
                      fila.appendChild(celda);
                      
                     break;
                 case "eliminar":
                    
                      var celda=document.createElement("td");
                      var inpEliminar=document.createElement("input");
                      inpEliminar.setAttribute("type","button");
                      console.log(d[e].EstadoServicio);
                      if(d[e].EstadoServicio=="0"){
                          inpEliminar.setAttribute("value","Habilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoSolicitud('"+d[e].IdServicio+"')");
                      }else{
                          inpEliminar.setAttribute("value","Deshabilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoSolicitud('"+d[e].IdServicio+"')");
                      }
                      
                      celda.appendChild(inpEliminar);         
                      fila.appendChild(celda);
                   break;
               case "consulta" :
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaContacto);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreContacto);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].TelefonoContacto);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Email);
                    celda.appendChild(inp);       
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Observaciones);
                    celda.appendChild(inp);       
                    fila.appendChild(celda);
                    tabla.appendChild(fila);
                    
                    
                   break;
             }
             
             tabla.appendChild(fila);
         }
     }
     else{
         mostrarMensaje("tblRespuestaServicio");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);
}


function consultarSuscripcion(){
        
        consultarDatos(_contexto,"consultarSuscripciones",{},dibujar_tabla_resultado_suscripciones);   
    
}
function dibujar_tabla_resultado_suscripciones(datos){
    var d=eval(datos.valores_consultados);
     console.log(d);
     if(datos.respuesta){
      $('#resultadoSus').css({"visibility":"visible"});
     var tabla=document.getElementById("tblRespuestaSus");
     if(tabla!=null){
         tabla.innerHTML="";
         var fila=document.createElement("tr");
         
         var celda=document.createElement("td");
         celda.innerHTML="Fecha Suscripcion"; 
         fila.appendChild(celda);
         
        
         
         var celda=document.createElement("td");
         celda.innerHTML="Email"; 
         fila.appendChild(celda);
         
         
         
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id","con_"+d[e].Id_Suscripcion);        
             
                        
             switch(accionUsuario){
                 case "editar":
                      
                      var celda=document.createElement("td");
                      var inpEditar=document.createElement("input");
                      inpEditar.setAttribute("type","button");
                      inpEditar.setAttribute("value","Editar");
                      inpEditar.setAttribute("onclick","editarContextoSolicitud('"+d[e].IdServicio+"')");
                      celda.appendChild(inpEditar);         
                      fila.appendChild(celda);
                      
                     break;
                 case "eliminar":
                    
                      var celda=document.createElement("td");
                      var inpEliminar=document.createElement("input");
                      inpEliminar.setAttribute("type","button");
                      console.log(d[e].EstadoServicio);
                      if(d[e].EstadoServicio=="0"){
                          inpEliminar.setAttribute("value","Habilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoSolicitud('"+d[e].IdServicio+"')");
                      }else{
                          inpEliminar.setAttribute("value","Deshabilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoSolicitud('"+d[e].IdServicio+"')");
                      }
                      
                      celda.appendChild(inpEliminar);         
                      fila.appendChild(celda);
                   break;
               default :
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaSuscripcion);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    

                    

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Correo);
                    celda.appendChild(inp);       
                    fila.appendChild(celda);
                    
                    
                    
                    
                   break;
             }
             
             tabla.appendChild(fila);
         }
     }
     else{
         mostrarMensaje("tblRespuestaSus");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);
}
