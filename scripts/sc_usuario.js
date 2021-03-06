
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroUsuario;
var _btnConsultaUsuario;
var _btnGuardarPerfil;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroUsuario;
var _formConsultaUsuario;
var _formPerfilUsuario;
var accionUsuario;

function iniciar_contexto_usuario(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroUsuario="btnCrearUsuario";
     _btnConsultaUsuario="btnBuscarUsuario";
     _btnGuardarPerfil="btnActualizarUsuario";
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroUsuario="formRegistrarUsuario";
     _formConsultaUsuario="formBuscarUsuario";
     _formPerfilUsuario="formPerfil";
    
    
   agregarEvento(_btnRegistroUsuario,"click",registrarContextoUsuario);
   agregarEvento(_btnConsultaUsuario,"click",consultarContextoUsuario);
   agregarEvento(_btnGuardarPerfil,"click",editarPerfilUsuario);
   agregarEvento("miPerfil","click",mostrarDatosPerfil);
   //Elemento del sub menu
   agregarEvento("buscarUsu","click",cambiarAccion);
   agregarEvento("editarUsu","click",cambiarAccion);
   agregarEvento("eliminarUsu","click",cambiarAccion);
   agregarEvento("usu","click",iniciar_contexto);
}

/* INSERTAR CONTEXTO*/    
function registrarContextoUsuario(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroUsuario);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
            nombre:vf.Texto[0],
            apellido:vf.Texto[1],
            documento:vf.Texto[2],
            correo:vf.Texto[4],
            telefono:vf.Texto[3],
            rol:vf.Select[0],
            clave:vf.Clave
                     
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crearEmpleado",datos,mostrarMensaje,_formRegistroUsuario);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoUsuario(){
    
    var vf=obtener_valores_formulario(_formConsultaUsuario);
    if(vf){
        if(vf.Texto[0]=="*"){
            var dat={valor:vf.Texto[0]};
            consultarDatos(_contexto,"consultarTodosLosEmpleados",dat,dibujar_tabla_resultado_usuario);   
        }else{
            var dat={valor:vf.Texto[0]};
            consultarDatos(_contexto,"consultarEmpleadoPorValor",dat,dibujar_tabla_resultado_usuario);   
        }
        
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function dibujar_tabla_resultado_usuario(datos){
        //$('#divRespuestaConsultaUsuario').fadeIn(500);
        //$('#mascara').fadeOut('fast');
    var roles=[{
        IdRol:"1",
        NombreRol:"Administrador"
    },{
        IdRol:"2",
        NombreRol:"Empleado"
    }]
     var d=eval(datos.valores_consultados);
     console.log(d);
     if(datos.respuesta){
     $('#resultadoUsu').css({"visibility":"visible"});    
     var tabla=document.getElementById("tblRespuestaUsuario");
     if(tabla!=null){
         tabla.innerHTML="";
         var fila=document.createElement("tr");
         
         var celda=document.createElement("td");
         celda.innerHTML="Nombre"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Apellido"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Documento"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Correo"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Telefono"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Rol"; 
         
         
         fila.appendChild(celda);
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id","us_"+d[e].IdUsuario);        
             
                        
             switch(accionUsuario){
                 case "editar":
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreEmpleado);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ApellidoEmpleado);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].DocumentoUsuario);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].CorreoUsuario);
                    celda.appendChild(inp);       
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Telefono);
                    celda.appendChild(inp);       
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    
                    
                    var sel=document.createElement("select");
                    
                    for(var r in roles){
                        var o=document.createElement("option");
                        if(d[e].IdRol==roles[r].IdRol){
                            o.setAttribute("selected",true);
                        }
                        o.value=roles[r].IdRol;
                        o.innerHTML=roles[r].NombreRol;
                        sel.appendChild(o);
                    }
                    
                    celda.appendChild(sel);
                    
                    fila.appendChild(celda);
                    
                      var celda=document.createElement("td");
                      var inpEditar=document.createElement("input");
                      inpEditar.setAttribute("type","button");
                      inpEditar.setAttribute("value","Editar");
                      inpEditar.setAttribute("onclick","editarContextoUsuario('"+d[e].IdUsuario+"')");
                      celda.appendChild(inpEditar);         
                      fila.appendChild(celda);
                      
                     break;
                 case "eliminar":
                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].NombreEmpleado;         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].ApellidoEmpleado;         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].DocumentoUsuario;         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].CorreoUsuario;         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].Telefono;         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].NombreRol;         
                    fila.appendChild(celda);      
                    
                    
                      var celda=document.createElement("td");
                      var inpEliminar=document.createElement("input");
                      inpEliminar.setAttribute("type","button");
                      console.log(d[e].EstadoUsuario);
                      if(d[e].EstadoUsuario=="0"){
                          inpEliminar.setAttribute("value","Habilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoUsuario('"+d[e].IdUsuario+"')");
                      }else{
                          inpEliminar.setAttribute("value","Deshabilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoUsuario('"+d[e].IdUsuario+"')");
                      }
                      
                      celda.appendChild(inpEliminar);         
                      fila.appendChild(celda);
                   break;
               default :
                     var celda=document.createElement("td");           
                    celda.innerHTML=d[e].NombreEmpleado;         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].ApellidoEmpleado;         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].DocumentoUsuario;         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].CorreoUsuario;         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].Telefono;         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    celda.innerHTML=d[e].NombreRol;         
                    fila.appendChild(celda);      
                   
                   break;
             }
             
             tabla.appendChild(fila);
         }
     }
     else{
         mostrarMensaje("tblRespuestaUsuario");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);
}

/*EDITAR CONTEXTO*/
function editarContextoUsuario(id){
    //Consulta las filas
    var val=obtener_valores_filas_tabla("us_"+id);
     console.log(val); 
    if(val.length > 0){
        var datos={
            id_usuario:id,
            nombre:val[0],
            apellido:val[1],
            documento:val[2],
            correo:val[3],
            telefono:val[4],
            rol:val[5]
        
        };
        editarDato(_contexto,"actualizarEmpleado",datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/
function eliminarContextoUsuario(id){
    
    if(id){
        eliminarDato(_contexto,"eliminar",{id_usuario:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}

/*EDITAR CONTEXTO*/
function editarPerfilUsuario(){
    //Consulta las filas
    var val=obtener_valores_formulario(_formPerfilUsuario);
     console.log(val); 
     
        if(val){
            var clave="";
            var valido=true;
            if(document.getElementById("pssClaveUsuario").value!=""){
                console.log(document.getElementById("pssClaveUsuario").value);
                console.log(document.getElementById("pssRepClaveUsuario").value);
                if(document.getElementById("pssClaveUsuario").value==document.getElementById("pssRepClaveUsuario").value){

                    clave=val.Clave;   

                }else{
                    valido=false;
                }



                
            }    
            
            
            if(valido){
                        var datos={
                        id_usuario:usuario.id_usuario,
                        nombre:val.Texto[0],
                        apellido:val.Texto[1],
                        documento:val.Texto[2],
                        correo:val.Texto[4],
                        telefono:val.Texto[3],
                        rol:val.Select[0],
                        clave:clave

                    };
                    editarDato(_contexto,"actualizarPerfilUsuario",datos,mostrarMensaje);
                }
                else{
                    mostrarMensaje({mensaje:"La contraseña no coincide"});
                }
        }
        else{
            mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
        }
    
}


function mostrarDatosPerfil(){
    
    var dat={valor:usuario.documento} 
    consultarDatos(_contexto,"consultarEmpleadoPorValor",dat,dibujar_info_perfil_usuario);   
}
function dibujar_info_perfil_usuario(d){
    var v=d.valores_consultados[0];
    console.log(d.valores_consultados);
    var txtNombreUsuario=document.getElementById("txtNombreUsuario");
    var txtApellidoUsuario=document.getElementById("txtApellidoUsuario");
    var txtDocumentoUsuario=document.getElementById("txtDocumentoUsuario");
    var txtTelefonoUsuario=document.getElementById("txtTelefonoUsuario");
    var txtEmailUsuario=document.getElementById("txtEmailUsuario");
    var selRolMp=document.getElementById("selRolMp");
    
    
    txtNombreUsuario.value=v.NombreEmpleado;
    txtApellidoUsuario.value=v.ApellidoEmpleado;
    txtDocumentoUsuario.value=v.DocumentoUsuario;
    txtTelefonoUsuario.value=v.Telefono;
    txtEmailUsuario.value=v.CorreoUsuario;
    selRolMp.value=v.IdRol;
}