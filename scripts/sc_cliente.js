
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroCliente;
var _btnConsultaCliente;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroCliente;
var _formConsultaCliente;
var accionUsuario;

function iniciar_contexto_cliente(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroCliente="btnCrearCliente";
     _btnConsultaCliente="btnBuscarCliente";

    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroCliente="formRegistrarCliente";
     _formConsultaCliente="formBuscarCliente";
    
    
   agregarEvento(_btnRegistroCliente,"click",registrarContextoCliente);
   agregarEvento(_btnConsultaCliente,"click",consultarContextoCliente);
   
   //Elemento del sub menu
   agregarEvento("buscarCli","click",cambiarAccion);
   agregarEvento("editarCli","click",cambiarAccion);
   agregarEvento("eliminarCli","click",cambiarAccion);
   agregarEvento("cli","click",iniciar_contexto);//menu principal
}

/* INSERTAR CONTEXTO*/    
function registrarContextoCliente(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroCliente);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
            documento:vf.Texto[0],
             correo:vf.Texto[3],
             nombre:vf.Texto[1],
             apellido:vf.Texto[2],
             tipo:vf.Select[0],
             nombre_contacto:vf.Texto[4],
             telefono:vf.Texto[5],
             direccion:vf.Texto[6],
             coordenadas:vf.Texto[7]
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crear",datos,mostrarMensaje,_formRegistroCliente);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoCliente(){
    
    var vf=obtener_valores_formulario(_formConsultaCliente);
    if(vf){
        if(vf.Texto[0]=="*"){
            
           consultarDatos(_contexto,"consultarTodosLosClientes",{},dibujar_tabla_resultado_cliente);   
        }else{
            var dat={valor:vf.Texto[0]};
            consultarDatos(_contexto,"consultarPorValor",dat,dibujar_tabla_resultado_cliente);   
        }
        
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function dibujar_tabla_resultado_cliente(datos){
    $('#mascara').fadeOut('fast');
    $('#resultadoCliente').css({visibility:'visible'});
     var d=eval(datos.valores_consultados);
     if(datos.respuesta){
         
     var tabla=document.getElementById("tblRespuestaCliente");
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
         celda.innerHTML="Telefono contacto"; 
         fila.appendChild(celda);
         tabla.appendChild(fila);
         
         var celda=document.createElement("td");
         celda.innerHTML="Direccion contacto"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Nombre contacto"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Tipo cliente"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Coordenadas"; 
         fila.appendChild(celda);
         
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id","cli_"+d[e].IdUsuario);        
             
                        
             switch(accionUsuario){
                 case "editar":
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ApellidoCliente);
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
                    inp.setAttribute("value",d[e].TelefonoContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].DireccionContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    
                    var celda=document.createElement("td");  
                    var sel=document.createElement("select");
                    var op=document.createElement("option");
                    op.setAttribute("value","EMPRENDEDOR");
                    op.innerHTML="EMPRENDEDOR";
                    if(d[e].TipoCliente=="EMPRENDEDOR"){
                        op.setAttribute("selected",true);
                    }
                    sel.appendChild(op);
                    var op=document.createElement("option");
                    op.setAttribute("value","EMPRESA");
                    op.innerHTML="EMPRESA";
                    if(d[e].TipoCliente=="EMPRESA"){
                        op.setAttribute("selected",true);
                    }
                    sel.appendChild(op);
                    celda.appendChild(sel);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].CoordenadasCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                      var celda=document.createElement("td");
                      var inpEditar=document.createElement("input");
                      inpEditar.setAttribute("type","button");
                      inpEditar.setAttribute("value","Editar");
                      inpEditar.setAttribute("onclick","editarContextoCliente('"+d[e].IdUsuario+"')");
                      celda.appendChild(inpEditar);         
                      fila.appendChild(celda);
                      
                     break;
                 case "eliminar":
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    inp.setAttribute("value",d[e].NombreCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    inp.setAttribute("value",d[e].ApellidoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    inp.setAttribute("value",d[e].DocumentoUsuario);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    inp.setAttribute("value",d[e].CorreoUsuario);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    inp.setAttribute("value",d[e].TelefonoContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    inp.setAttribute("value",d[e].DireccionContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");  
                    var sel=document.createElement("select");
                    sel.setAttribute("readonly",true);
                    var op=document.createElement("option");
                    op.setAttribute("value","EMPRENDEDOR");
                    op.innerHTML="EMPRENDEDOR";
                    if(d[e].TipoCliente=="EMPRENDEDOR"){
                        op.setAttribute("selected",true);
                    }
                    sel.appendChild(op);
                    var op=document.createElement("option");                    
                    op.setAttribute("readonly",true);
                    op.innerHTML="EMPRESA";
                    if(d[e].TipoCliente=="EMPRESA"){
                        op.setAttribute("selected",true);
                    }
                    sel.appendChild(op);
                    celda.appendChild(sel);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].CoordenadasCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                             
                      var celda=document.createElement("td");
                      var inpEliminar=document.createElement("input");
                      inpEliminar.setAttribute("type","button");
                      console.log(d[e].EstadoCliente);
                      if(d[e].EstadoCliente=="0"){
                          inpEliminar.setAttribute("value","Habilitar");
                          inpEliminar.setAttribute("onclick","");
                      }else{
                          inpEliminar.setAttribute("value","Deshabilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoCliente('"+d[e].IdCliente+"')");
                      }
                      
                      celda.appendChild(inpEliminar);         
                      fila.appendChild(celda);
                   break;
               default :
                   
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    
                    inp.setAttribute("value",d[e].NombreCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    inp.setAttribute("value",d[e].ApellidoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    inp.setAttribute("value",d[e].DocumentoUsuario);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    inp.setAttribute("value",d[e].CorreoUsuario);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    inp.setAttribute("value",d[e].TelefonoContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("readonly",true);
                    inp.setAttribute("value",d[e].DireccionContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreContactoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    
                    var celda=document.createElement("td");  
                    var sel=document.createElement("select");
                    var op=document.createElement("option");
                    op.setAttribute("value","EMPRENDEDOR");
                    op.setAttribute("readonly",true);
                    op.innerHTML="EMPRENDEDOR";
                    if(d[e].TipoCliente=="EMPRENDEDOR"){
                        op.setAttribute("selected",true);
                    }
                    sel.appendChild(op);
                    var op=document.createElement("option");
                    op.setAttribute("value","EMPRESA");
                    op.innerHTML="EMPRESA";
                    if(d[e].TipoCliente=="EMPRESA"){
                        op.setAttribute("selected",true);
                    }
                    sel.appendChild(op);
                    celda.appendChild(sel);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].CoordenadasCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                   
                   break;
             }
             
             tabla.appendChild(fila);
         }
     }
     else{
         console.log("tblRespuestaCliente");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);
}

/*EDITAR CONTEXTO*/
function editarContextoCliente(id){
    //Consulta las filas
    console.log(id);
    var val=obtener_valores_filas_tabla("cli_"+id);
     console.log(val); 
    if(val.length > 0){
        var datos={
            nombre:val[0],
            apellido:val[1],
            documento:val[2],
            correo:val[3],
            telefono:val[4],
            direccion:val[5],
            tipo:val[7],
            id_cliente:id,
            nombre_contacto:val[6],
            coordenadas:val[8]
            
        };
        editarDato(_contexto,"actualizar",datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/
function eliminarContextoCliente(id){
    
    if(id){
        eliminarDato(_contexto,"eliminar",{id_cliente:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
