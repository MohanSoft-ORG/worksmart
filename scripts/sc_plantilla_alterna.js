
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroObjeto;
var _btnConsultaObjeto;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroObjeto;
var _formConsultaObjeto;
var accionUsuario;

function iniciar_contexto_objeto(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroObjeto="btnCrearObjeto";
     _btnConsultaObjeto="btnBuscarObjeto";

    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroObjeto="formRegistrarObjeto";
     _formConsultaObjeto="formBuscarObjeto";
    
    
   agregarEvento(_btnRegistroObjeto,"click",registrarContextoObjeto);
   agregarEvento(_btnConsultaObjeto,"click",consultarContextoObjeto);
   
   //Elemento del sub menu
   agregarEvento("elementoBuscarSubMenu","click",cambiarAccion);
   agregarEvento("elementoEditarSubMenu","click",cambiarAccion);
   agregarEvento("elementoeliminarSubMenu","click",cambiarAccion);
   agregarEvento("elementoMenuPrincipal","click",iniciar_contexto);//menu principal
}

/* INSERTAR CONTEXTO*/    
function registrarContextoObjeto(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroObjeto);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crear",datos,mostrarMensaje);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoObjeto(){
    
    var vf=obtener_valores_formulario(_formConsultaObjeto);
    if(vf){
        var dat={valor:vf.Texto[0]};
            consultarDatos(_contexto,"consultarPorValor",dat,dibujar_tabla_resultado);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function dibujar_tabla_resultado(datos){
    $('#divRespuestaConsultaObjeto').fadeIn(500);
    $('#mascara').fadeOut('fast');
    
     var d=eval(datos.valores_consultados);
     if(datos.respuesta){
         
     var tabla=document.getElementById("tblRespuestaObjeto");
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
             fila.setAttribute("id",d[e].IdObjeto);        
             
                        
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
                      inpEditar.setAttribute("onclick","editarContextoObjeto('"+d[e].IdObjeto+"')");
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
                      console.log(d[e].EstadoObjeto);
                      if(d[e].EstadoObjeto=="0"){
                          inpEliminar.setAttribute("value","Habilitar");
                          inpEliminar.setAttribute("onclick","");
                      }else{
                          inpEliminar.setAttribute("value","Deshabilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoObjeto('"+d[e].IdObjeto+"')");
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
         console.log("tblRespuestaObjeto");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);
}

/*EDITAR CONTEXTO*/
function editarContextoObjeto(id){
    //Consulta las filas
    var val=obtener_valores_filas_tabla(id);
     console.log(val); 
    if(val.length > 0){
        var datos={
            
        };
        editarDato(_contexto,"actualizar",datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/
function eliminarContextoObjeto(id){
    
    if(id){
        eliminarDato(_contexto,"eliminar",{id_proveedor:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
