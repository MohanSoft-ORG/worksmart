
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroArriendo;
var _btnConsultaArriendo;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroArriendo;
var _formConsultaArriendo;
var accionUsuario;

function iniciar_contexto_arriendo(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroArriendo="btnCrearArriendo";
     _btnConsultaArriendo="btnBuscarArriendo";

    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroArriendo="formRegistrarArriendo";
     _formConsultaArriendo="formBuscarArriendo";
    
    
   agregarEvento(_btnRegistroArriendo,"click",registrarContextoArriendo);
   agregarEvento(_btnConsultaArriendo,"click",consultarContextoArriendo);
   agregarEvento("txtDocumentoClienteArriendo","change",consultarClienteArriendo);
   agregarEvento("txtSerialEquipo","change",consultarProductoArriendo);
   agregarEvento("dtFechaInicio","change",validarFecha);
   agregarEvento("dtFechaFinal","change",validarFecha);
   //Elemento del sub menu
   agregarEvento("buscarArr","click",cambiarAccion);
   agregarEvento("editarArr","click",cambiarAccion);
   agregarEvento("eliminarArr","click",cambiarAccion);
   agregarEvento("finalizarArr","click",cambiarAccion);
   agregarEvento("arr","click",iniciar_contexto);//menu principal
}

/* INSERTAR CONTEXTO*/    
function registrarContextoArriendo(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroArriendo);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
         id_equipo:vf.Hidden[1],
         id_cliente:vf.Hidden[0],
         id_servicio:vf.Select[0],
         fecha_inicial:vf.Fecha[0],
         fecha_final:vf.Fecha[1],
         comentario:vf.Texto[3]
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crear",datos,validarCreacionArriendo);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function validarCreacionArriendo(d){
    if(d.respuesta){
        mostrarMensaje(d);
        limpiarFormulario(_formRegistroArriendo);
    }else{
        mostrarMensaje(d);
    }
}
/* CONSULTAR CONTEXTO */    
function consultarContextoArriendo(){
    
    var vf=obtener_valores_formulario(_formConsultaArriendo);
    if(vf){
        
        var dat={cedula:vf.Texto[0],serial:vf.Texto[1],estado:vf.Select[0]};
            consultarDatos(_contexto,"consultarArriendo",dat,dibujar_tabla_resultado);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function dibujar_tabla_resultado(datos){
    $('#mascara').fadeOut('fast');
    $('#resultadoArriendo').css({visibility:'visible'});
    
    
     var d=eval(datos.valores_consultados);
     if(datos.respuesta){
         
     var tabla=document.getElementById("tblRespuestaArriendo");
     if(tabla!=null){
         tabla.innerHTML="";
         var fila=document.createElement("tr");
         
         var celda=document.createElement("td");
         celda.innerHTML="Nombre Cliente"; 
         fila.appendChild(celda);
         
          
         var celda=document.createElement("td");
         celda.innerHTML="Serial Equipo"; 
         fila.appendChild(celda);      
         
         
         var celda=document.createElement("td");
         celda.innerHTML="Fecha Inicio Arriendo"; 
         fila.appendChild(celda);
         
         
         var celda=document.createElement("td");
         celda.innerHTML="Fecha final Arriendo"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Comentario"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Estado Arriendo"; 
         fila.appendChild(celda);
         
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id","arr_"+d[e].IdArriendo);        
             
                        
             switch(accionUsuario){
                 case "editar":
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreCliente+" "+d[e].ApellidoCliente);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("id","txtSerialArriendo");
                    inp.setAttribute("value",d[e].Serial);
                    inp.setAttribute("onChange","consultarProductoArriendo();");
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    var inp=document.createElement("input");
                    inp.setAttribute("type","hidden");
                    inp.setAttribute("id","hdSerialArriendo");
                    inp.setAttribute("value",d[e].Fk_Id_Equipo);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaInicioAlquiler);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaFinAlquiler);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ComentarioInicial);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");  
                    var select=document.createElement("select");
                    var op=document.createElement("option");
                    op.setAttribute("value","Activo");
                    if(d[e].EstadoArriendo=="Activo"){
                        op.setAttribute("selected",true);
                    }
                    
                    op.innerHTML="Activo";
                    select.appendChild(op);
                    var op=document.createElement("option");
                    op.setAttribute("value","Cancelado");
                    if(d[e].EstadoArriendo=="Cancelado"){
                        op.setAttribute("selected",true);
                    }
                    op.innerHTML="Cancelado";
                    select.appendChild(op);
                    var op=document.createElement("option");
                    op.setAttribute("value","Finalizado");
                    if(d[e].EstadoArriendo=="Finalizado"){
                        op.setAttribute("selected",true);
                    }
                    op.innerHTML="Finalizado";
                    select.appendChild(op);
                    celda.appendChild(select);
                    fila.appendChild(celda);
                    
                    
                    var celda=document.createElement("td");
                    var inpEditar=document.createElement("input");
                    inpEditar.setAttribute("type","button");
                    inpEditar.setAttribute("value","Editar");
                    inpEditar.setAttribute("onclick","editarContextoArriendo('"+d[e].IdArriendo+"')");
                    celda.appendChild(inpEditar);         
                    fila.appendChild(celda);
                      
                     break;
                 case "eliminar":
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreCliente+" "+d[e].ApellidoCliente);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Serial);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaInicioAlquiler);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaFinAlquiler);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ComentarioInicial);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);    
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].EstadoArriendo);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);    
                    
                    
                      var celda=document.createElement("td");
                      var inpEliminar=document.createElement("input");
                      inpEliminar.setAttribute("type","button");
                      console.log(d[e].EstadoArriendo);
                      if(d[e].EstadoArriendo=="Cancelado"){
                          inpEliminar.setAttribute("value","Habilitar");
                          inpEliminar.setAttribute("onclick","");
                      }else{
                          inpEliminar.setAttribute("value","Deshabilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoArriendo('"+d[e].IdArriendo+"')");
                      }
                      
                      celda.appendChild(inpEliminar);         
                      fila.appendChild(celda);
                   break;
                   
                   
                case "finalizar":
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreCliente+" "+d[e].ApellidoCliente);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Serial);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaInicioAlquiler);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaFinAlquiler);                    
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("placeholder","comentario final");
                    inp.setAttribute("value","");
                    
                    celda.appendChild(inp);         
                    fila.appendChild(celda);    
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].EstadoArriendo);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);    
                    
                    
                      var celda=document.createElement("td");
                      var inpEliminar=document.createElement("input");
                      inpEliminar.setAttribute("type","button");
                      console.log(d[e].EstadoArriendo);
                      inpEliminar.setAttribute("value","Finalizar");
                      inpEliminar.setAttribute("onclick","finalizarArriendo('"+d[e].IdArriendo+"')");
                      celda.appendChild(inpEliminar);         
                      fila.appendChild(celda);
                    
                    
                    break;
                   
               default :
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreCliente+" "+d[e].ApellidoCliente);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);

                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].Serial);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaInicioAlquiler);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].FechaFinAlquiler);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    
                     var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ComentarioInicial);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda); 
                    
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].EstadoArriendo);
                    inp.setAttribute("readonly",true);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);    
                    
                   break;
             }
             
             tabla.appendChild(fila);
         }
     }
     else{
         console.log("tblRespuestaArriendo");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);
}

/*EDITAR CONTEXTO*/
function editarContextoArriendo(id){
    //Consulta las filas
    if(document.getElementById("hdSerialArriendo").value!="0"){
        var val=obtener_valores_filas_tabla("arr_"+id);
        console.log(val); 
       if(val.length > 0){
           var datos={
               id_arriendo:id,
               id_equipo:document.getElementById("hdSerialArriendo").value,
               fecha_inicial:val[2],
               fecha_final:val[3],
               comentario:val[4]
           };
           editarDato(_contexto,"actualizar",datos,mostrarMensaje);
       }else{
           mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
       }
        
        
    }else{
        mostrarMensaje("por favor selecciona un producto valido");
    }
}
/* ELIMINAR CONTEXTO*/
function eliminarContextoArriendo(id){
    
    if(id){
        eliminarDato(_contexto,"eliminar",{id_arriendo:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}

function consultarClienteArriendo(){
    
    var dat={valor:this.value};
    consultarDatos("cliente","consultarPorValor",dat,mostrar_datos_cliente_arriendo);   
    
}
function mostrar_datos_cliente_arriendo(datos){
    if(datos.respuesta){
        var d=eval(datos.valores_consultados);
         var hdIdClienteArriendo=document.getElementById("hdIdClienteArriendo");
         var txtNombreClienteArriendo=document.getElementById("txtNombreClienteArriendo");
        hdIdClienteArriendo.value=d[0].IdCliente;
        txtNombreClienteArriendo.value=d[0].NombreCliente+" "+d[0].ApellidoCliente;
    }else{
        mostrarMensaje(datos);
    }
    
}
function consultarProductoArriendo(){
   if(this.id!=undefined){
       var dat={serial:this.value};
       consultarDatos("producto","consultarHojaVida",dat,mostrar_datos_producto_arriendo);  
   }else{
       var dat={serial:document.getElementById("txtSerialArriendo").value};
       consultarDatos("producto","consultarHojaVida",dat,cambiar_valor_id_equipo);  
   }
    
     
    
}
function cambiar_valor_id_equipo(datos){
     if(datos.respuesta){
         var hdSerialArriendo= document.getElementById("hdSerialArriendo");
         var d=eval(datos.valores_consultados);
         hdSerialArriendo.value=d[0].IdHojaVida;
     }else{
         var hdSerialArriendo= document.getElementById("hdSerialArriendo");
         
         hdSerialArriendo.value="0";
     }   
     
}


function mostrar_datos_producto_arriendo(datos){
    var hdIdEquipoArriendo=document.getElementById("hdIdEquipoArriendo");
    if(datos.respuesta){
        var d=eval(datos.valores_consultados);
        hdIdEquipoArriendo.value=d[0].IdHojaVida;
    }else{
        mostrarMensaje(datos);
    }
}
function validarFecha(){
    
    var dtFechaAgenda;
    var selEmpleadoAgenda;
}
function finalizarArriendo(id){
    var val=obtener_valores_filas_tabla("arr_"+id);
    
     if(val.length>0){
        eliminarDato(_contexto,"finalizar",{id_arriendo:id,comentario:val[4],fecha:val[3]},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"Ha ocurriod un error al seleciona la fila"});
    }
}