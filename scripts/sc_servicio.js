
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroServicio;
var _btnConsultaServicio;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroServicio;
var _formConsultaServicio;
var accionUsuario;

function iniciar_contexto_servicio(){
   
     
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroServicio="btnCrearServicio";
     _btnConsultaServicio="btnBuscarServicio";

    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroServicio="formRegistrarServicio";
     _formConsultaServicio="formBuscarServicio";
    
    
   agregarEvento(_btnRegistroServicio,"click",registrarContextoServicio);
   agregarEvento(_btnConsultaServicio,"click",consultarContextoServicio);
   
   //Elemento del sub menu
   agregarEvento("buscarSer","click",cambiarAccion);
   agregarEvento("editarSer","click",cambiarAccion);
   agregarEvento("eliminarSer","click",cambiarAccion);
   agregarEvento("ser","click",iniciar_contexto);
}

/* INSERTAR CONTEXTO*/    
function registrarContextoServicio(){
    //1-Obtengo los datos del formulario
    var vf=obtener_valores_formulario(_formRegistroServicio);   
    if(vf){
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={
           codigo:vf.Texto[0],
           nombre:vf.Texto[1],
           descripcion:vf.Texto[2],
           imagen:"null",
           precio:vf.Texto[3],
           id_categoria:vf.Select[0]
                     
        };
        //Invoco mi funcion 
        registrarDato(_contexto,"crear",datos,mostrarMensaje,_formRegistroServicio);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}

/* CONSULTAR CONTEXTO */    
function consultarContextoServicio(){
    
    var vf=obtener_valores_formulario(_formConsultaServicio);
    if(vf){
        if(vf.Texto[0]=="*"){
         var dat={valor:vf.Texto[0]};
        consultarDatos(_contexto,"consultar",dat,dibujar_tabla_resultado_servicio);      
        }else{
            var dat={valor:vf.Texto[0]};
        consultarDatos(_contexto,"consultarPorValor",dat,dibujar_tabla_resultado_servicio);   
        }
        
    }else{
        mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
function dibujar_tabla_resultado_servicio(datos){
        //$('#divRespuestaConsultaServicio').fadeIn(500);
        //$('#mascara').fadeOut('fast');
    
     var d=eval(datos.valores_consultados);
     console.log(d);
     if(datos.respuesta){
         $('#resultadoSer').css({"visibility":"visible"});
     var tabla=document.getElementById("tblRespuestaServicio");
     if(tabla!=null){
         tabla.innerHTML="";
         var fila=document.createElement("tr");
         
         var celda=document.createElement("td");
         celda.innerHTML="Codigo Servicio"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Nombre Servicio"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Descripcion Servicio"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Valor"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Categoria"; 
         fila.appendChild(celda);
         
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id","ser_"+d[e].IdServicio);        
             
                        
             switch(accionUsuario){
                 case "editar":
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].CodigoServicio);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreServicio);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].DescripcionServicio);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ValorServicio);
                    celda.appendChild(inp);       
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");           
                    var sel=document.createElement("select");
                    
                    var opt=document.createElement("option");
                    if(d[e].IdCategoriaServicio=="1"){
                        opt.setAttribute("selected",true);
                    }
                    opt.setAttribute("value","1");
                    opt.innerHTML="Arriendo";
                    var opt=document.createElement("option");
                    if(d[e].IdCategoriaServicio=="2"){
                        opt.setAttribute("selected",true);
                    }
                    opt.setAttribute("value","2");
                    opt.innerHTML="Servicio Tecnico";
                    var opt=document.createElement("option");
                    if(d[e].IdCategoriaServicio=="3"){
                        opt.setAttribute("selected",true);
                    }
                    opt.setAttribute("value","3");
                    opt.innerHTML="Capacitacion";
                    sel.appendChild(opt);
                    celda.appendChild(sel);
                    fila.appendChild(celda);
                      
                      var celda=document.createElement("td");
                      var inpEditar=document.createElement("input");
                      inpEditar.setAttribute("type","button");
                      inpEditar.setAttribute("value","Editar");
                      inpEditar.setAttribute("onclick","editarContextoServicio('"+d[e].IdServicio+"')");
                      celda.appendChild(inpEditar);         
                      fila.appendChild(celda);
                      
                     break;
                 case "eliminar":
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].CodigoServicio);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreServicio);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].DescripcionServicio);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ValorServicio);
                    celda.appendChild(inp);       
                    fila.appendChild(celda);
                    
                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreCategoria);
                    celda.appendChild(inp);       
                    fila.appendChild(celda);
                    
                      var celda=document.createElement("td");
                      var inpEliminar=document.createElement("input");
                      inpEliminar.setAttribute("type","button");
                      console.log(d[e].EstadoServicio);
                      if(d[e].EstadoServicio=="0"){
                          inpEliminar.setAttribute("value","Habilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoServicio('"+d[e].IdServicio+"')");
                      }else{
                          inpEliminar.setAttribute("value","Deshabilitar");
                          inpEliminar.setAttribute("onclick","eliminarContextoServicio('"+d[e].IdServicio+"')");
                      }
                      
                      celda.appendChild(inpEliminar);         
                      fila.appendChild(celda);
                   break;
               default :
                    var celda=document.createElement("td");  
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].CodigoServicio);
                    celda.appendChild(inp);         
                    fila.appendChild(celda);
                    

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].NombreServicio);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].DescripcionServicio);
                    celda.appendChild(inp);
                    fila.appendChild(celda);

                    var celda=document.createElement("td");           
                    var inp=document.createElement("input");
                    inp.setAttribute("type","text");
                    inp.setAttribute("value",d[e].ValorServicio);
                    celda.appendChild(inp);       
                    fila.appendChild(celda);
                    
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

/*EDITAR CONTEXTO*/
function editarContextoServicio(id){
    //Consulta las filas
    var val=obtener_valores_filas_tabla("ser_"+id);
     console.log(val); 
    if(val.length > 0){
        
        
        var datos={
            id_servicio:id,
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
function eliminarContextoServicio(id){
    
    if(id){
        eliminarDato(_contexto,"eliminar",{id_servicio:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
