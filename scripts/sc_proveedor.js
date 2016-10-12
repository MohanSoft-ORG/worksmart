
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroProveedor;
var _btnConsultaProveedor;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroProveedor;
var _formConsultaProveedor;
var accionUsuario;

function iniciar_contexto_proveedor(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroProveedor="btnCrearProveedor";
     _btnConsultaProveedor="btnBuscarProveedor";

    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroProveedor="formRegistrarProveedor";
     _formConsultaProveedor="formBuscarProveedor";
    
    
   agregarEvento(_btnRegistroProveedor,"click",registrarContextoProveedor);
   agregarEvento(_btnConsultaProveedor,"click",consultarContextoProveedor);
   
   //Elemento del sub menu
   agregarEvento("buscarProv","click",cambiarAccion);
   agregarEvento("editarProv","click",cambiarAccion);
   agregarEvento("eliminarProv","click",cambiarAccion);
   agregarEvento("prov","click",iniciar_contexto);//menu principal
   
}

/* INSERTAR CONTEXTO*/    
function registrarContextoProveedor(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroProveedor);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
         var datos={
            documento_proveedor:vf.Texto[0],
            nombre_proveedor:vf.Texto[1],
            nombre_contacto_proveedor:vf.Texto[2],
            correo_contacto_proveedor:vf.Texto[3],
            telefono_contacto_proveedor:vf.Texto[4]
        
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crear",datos,mostrarMensaje,_formRegistroProveedor);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoProveedor(){
    
    var vf=obtener_valores_formulario(_formConsultaProveedor);
    if(vf){
        if(vf.Texto[0]=="*"){
            
            consultarDatos(_contexto,"consultar",{},dibujar_tabla_resultado_proveedor);   
        }else{
            var dat={valor:vf.Texto[0]};
            consultarDatos(_contexto,"consultarPorValor",dat,dibujar_tabla_resultado_proveedor);   
            
            
        }
        
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function dibujar_tabla_resultado_proveedor(datos){
    //$('#divRespuestaConsultaProveedor').fadeIn(500);
    //$('#mascara').fadeOut('fast');
    $('#resultadoProv').css({"visibility":"visible"});
     var d=eval(datos.valores_consultados);
     if(datos.respuesta){
         
     var tabla=document.getElementById("tblRespuestaProv");
     if(tabla!=null){
         tabla.innerHTML="";
         var fila=document.createElement("tr");
         
         var celda=document.createElement("td");
         celda.innerHTML="Documento"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Nombre"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Nombre Contacto"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Telefono contacto"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Correo contacto"; 
         fila.appendChild(celda);
         
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id","prov_"+d[e].IdProveedor);        
             
                        
             switch(accionUsuario){
                 case "editar":
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].DocumentoProveedor);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
         
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreProveedor);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);    
                        
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreContactoProveedor);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);    
                     
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].TelefonoContactoProveedor);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);    
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].CorreoContactoProveedor);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);    
                    
                        
                        
                      var celda=document.createElement("td");
                      var inpEditar=document.createElement("input");
                      inpEditar.setAttribute("type","button");
                      inpEditar.setAttribute("value","Editar");
                      inpEditar.setAttribute("onclick","editarContextoProveedor('"+d[e].IdProveedor+"')");
                      celda.appendChild(inpEditar);         
                      fila.appendChild(celda);
                      
                     break;
                 case "eliminar":
                        var celda=document.createElement("td");           
                        celda.innerHTML=d[e].DocumentoProveedor;         
                        fila.appendChild(celda);

                        var celda=document.createElement("td");           
                        celda.innerHTML=d[e].NombreProveedor;         
                        fila.appendChild(celda);

                        var celda=document.createElement("td");           
                        celda.innerHTML=d[e].NombreContactoProveedor;         
                        fila.appendChild(celda);

                        var celda=document.createElement("td");           
                        celda.innerHTML=d[e].TelefonoContactoProveedor;         
                        fila.appendChild(celda);

                        var celda=document.createElement("td");           
                        celda.innerHTML=d[e].CorreoContactoProveedor;         
                        fila.appendChild(celda);
                    
                    
                      var celda=document.createElement("td");
                      var inpEliminar=document.createElement("input");
                      inpEliminar.setAttribute("type","button");
                      console.log(d[e].EstadoProveedor);
                      if(d[e].EstadoProveedor=="0"){
                          inpEliminar.setAttribute("value","Habilitar");
                          
                      }else{
                          inpEliminar.setAttribute("value","Deshabilitar");
                          
                      }
                      inpEliminar.setAttribute("onclick","eliminarContextoProveedor('"+d[e].IdProveedor+"')");
                      celda.appendChild(inpEliminar);         
                      fila.appendChild(celda);
                   break;
               case "consulta":
                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].DocumentoProveedor;         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].NombreProveedor;         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].NombreContactoProveedor;         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].TelefonoContactoProveedor;         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].CorreoContactoProveedor;         
                    fila.appendChild(celda);
                   
                   
                   break;
               default:
                   mostrarMensaje("defina un accion para el usuario");
                   break;
              
                   
             }
             
             tabla.appendChild(fila);
         }
     }
     else{
         console.log("tblRespuestaUsuario");
     }
     }
     else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);
}

/*EDITAR CONTEXTO*/
function editarContextoProveedor(id){
    //Consulta las filas
    var val=obtener_valores_filas_tabla("prov_"+id);
     console.log(val); 
    if(val.length > 0){
        var datos={
            id_proveedor:id,
            documento_proveedor:val[0],
            nombre_proveedor:val[1],
            nombre_contacto_proveedor:val[2],
            correo_contacto_proveedor:val[3],
            telefono_contacto_proveedor:val[4]
        
        };
        editarDato(_contexto,"actualizar",datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/
function eliminarContextoProveedor(id){
    
    if(id){
        eliminarDato(_contexto,"eliminar",{id_proveedor:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
