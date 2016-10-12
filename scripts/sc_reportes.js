var _contexto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroObjeto;
var _btnConsultaObjeto;


/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroObjeto;
var _formConsultaObjeto;



function iniciar_contexto_reportes(){
   
     _contexto;//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroObjeto;
     _btnConsultaObjeto;
    
    /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroObjeto;
     _formConsultaObjeto;
   
    
  
   agregarEvento(_btnConsultaObjeto,"click",consultarContextoObjeto);
   
   agregarEvento("repoEntrada","click",iniciar_contexto);
   agregarEvento("repoEntrada","click",consultarContextoTipoEContableReportes);
   agregarEvento("btnBuscarEContable","click",consultarEntradasContables);
   agregarEvento("repoSalida","click",iniciar_contexto);
   agregarEvento("repoSalida","click",consultarContextoTipoSContableReporte);
   agregarEvento("btnBuscarSContable","click",consultarSalidasContables);
   
}



/* CONSULTAR CONTEXTO */    
function consultarContextoObjeto(){
    consultarDatos(_contexto,"consultar",null,imprimir);   
}
/*CONSULTAR REPORTE ENTRADAS CONTABLES*/
function consultarEntradasContables(){
    var vf=obtener_valores_formulario("formBuscEContable");
    console.log(vf);
    console.log(vf.Fecha);
    console.log(vf.Select.length);
    if(vf!=false){
        if(vf.Fecha[0]!="" && vf.Select.length>0){
            
            consultarDatos(_contexto,"consultar",null,dibujar_tabla_reporte_econtables);   //combiada
        }else {
            if(vf.Fecha[0]!=""){
                consultarDatos(_contexto,"consultarPorFecha",{fecha:vf.Fecha[0]},dibujar_tabla_reporte_econtables);   
            }else if(vf.Select.length > 0){
                consultarDatos(_contexto,"consultarPorTipo",{tipo:vf.Select[0]},dibujar_tabla_reporte_econtables);   
            }else{
                consultarDatos(_contexto,"consultar",null,dibujar_tabla_reporte_econtables);   //combiada
            }
            
            
            
            
            
        }
        
        
        
    }else{
        mostrarMensaje("Por favor ingresa valores para buscar");
    }
    
}
function dibujar_tabla_reporte_econtables(datos){
   
    $('#resultadoBusEContable').fadeIn(500);
    $('#mascara').fadeOut('fast');
    $('#resultadoBusEContable').css({"visibility":"visible"});
    
     var d=eval(datos.valores_consultados);
     if(datos.respuesta){
         
     var tabla=document.getElementById("tblRespuestaEContable");
     if(tabla!=null){
         tabla.innerHTML="";
         var fila=document.createElement("tr");
         
         var celda=document.createElement("td");
         celda.innerHTML="Tipo entrada"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Fecha registro"; 
         fila.appendChild(celda);         
         
         var celda=document.createElement("td");
         celda.innerHTML="Valor registro"; 
         fila.appendChild(celda);
         
         
         
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id","repecon_");        
             var celda=document.createElement("td");  
             var inp=document.createElement("input");
             inp.setAttribute("type","text");
             inp.setAttribute("value",d[e].NombreTipoEntradaContable);
             celda.appendChild(inp);         
             fila.appendChild(celda);
             
             var celda=document.createElement("td");  
             var inp=document.createElement("input");
             inp.setAttribute("type","text");
             inp.setAttribute("value",d[e].FechaEntradaContable);
             celda.appendChild(inp);         
             fila.appendChild(celda);
             
             var celda=document.createElement("td");  
             var inp=document.createElement("input");
             inp.setAttribute("type","text");
             inp.setAttribute("value",d[e].ValorEntradaContable);
             celda.appendChild(inp);         
             fila.appendChild(celda);
           
             
             tabla.appendChild(fila);
         }
     }
     else{
         console.log("resultadoBusEContable");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);

}
function consultarContextoTipoEContableReportes(){
    consultarDatos(_contexto,"consultarTipoEntrada",null,dibujar_select_tipo_entradas_reporte);   
}
function dibujar_select_tipo_entradas_reporte(d){
    if(d.respuesta){
        var datos=d.valores_consultados;
        var s=document.getElementById("selTipoBuscarEContable");
        var op=document.createElement("option");
           op.setAttribute("value","0");
           op.innerHTML="Tipo de entrada";
           s.appendChild(op);
        for(var dt in datos){
           console.log(datos[dt]);
           var op=document.createElement("option");
           op.setAttribute("value",datos[dt].IdTipoEntradaContable);
           op.innerHTML=datos[dt].NombreTipoEntradaContable;
           s.appendChild(op);
        }
        console.log(s);
    }
    
}

/*CONSULTAR REPORTE SALIDAS CONTABLES*/
function consultarSalidasContables(){
    var vf=obtener_valores_formulario("formBuscSContable");
    console.log(vf);
    console.log(vf.Fecha);
    console.log(vf.Select.length);
    if(vf!=false){
        if(vf.Fecha[0]!="" && vf.Select.length>0){
            
            consultarDatos(_contexto,"consultar",null,dibujar_tabla_reporte_scontables);   //combiada
        }else {
            if(vf.Fecha[0]!=""){
                consultarDatos(_contexto,"consultarPorFecha",{fecha:vf.Fecha[0]},dibujar_tabla_reporte_scontables);   
            }else if(vf.Select.length > 0){
                consultarDatos(_contexto,"consultarPorTipo",{tipo:vf.Select[0]},dibujar_tabla_reporte_scontables);   
            }else{
                consultarDatos(_contexto,"consultar",null,dibujar_tabla_reporte_scontables);   //combiada
            }
            
            
            
            
            
        }
        
        
        
    }else{
        mostrarMensaje("Por favor ingresa valores para buscar");
    }
    
}
function dibujar_tabla_reporte_scontables(datos){
   
    $('#resultadoBusSContable').fadeIn(500);
    $('#mascara').fadeOut('fast');
    $('#resultadoBusSContable').css({"visibility":"visible"});
    
     var d=eval(datos.valores_consultados);
     if(datos.respuesta){
         
     var tabla=document.getElementById("tblRespuestaSContable");
     if(tabla!=null){
         tabla.innerHTML="";
         var fila=document.createElement("tr");
         
         var celda=document.createElement("td");
         celda.innerHTML="Tipo salida"; 
         fila.appendChild(celda);
         
         var celda=document.createElement("td");
         celda.innerHTML="Fecha registro"; 
         fila.appendChild(celda);         
         
         var celda=document.createElement("td");
         celda.innerHTML="Valor registro"; 
         fila.appendChild(celda);
         
         
         
         tabla.appendChild(fila);
        for(var e in d){
            console.log(d[e]);
             var fila=document.createElement("tr");
             fila.setAttribute("id","repscon_");        
             var celda=document.createElement("td");  
             var inp=document.createElement("input");
             inp.setAttribute("type","text");
             inp.setAttribute("value",d[e].NombreSalidaContable);
             celda.appendChild(inp);         
             fila.appendChild(celda);
             
             var celda=document.createElement("td");  
             var inp=document.createElement("input");
             inp.setAttribute("type","text");
             inp.setAttribute("value",d[e].FechaSalidaContable);
             celda.appendChild(inp);         
             fila.appendChild(celda);
             
             var celda=document.createElement("td");  
             var inp=document.createElement("input");
             inp.setAttribute("type","text");
             inp.setAttribute("value",d[e].ValorSalidaContable);
             celda.appendChild(inp);         
             fila.appendChild(celda);
           
             
             tabla.appendChild(fila);
         }
     }
     else{
         console.log("resultadoBusSContable");
     }
     }else{
         mostrarMensaje({mensaje:datos.mensaje});
     }
     console.log(tabla);

}
function consultarContextoTipoSContableReporte(){
    consultarDatos(_contexto,"consultarTipoSalida",null,dibujar_select_tipo_salidas_reporte);   
}
function dibujar_select_tipo_salidas_reporte(d){
    if(d.respuesta){
        var datos=d.valores_consultados;
        var s=document.getElementById("selTipoBuscarSContable");
        var op=document.createElement("option");
           op.setAttribute("value","0");
           op.innerHTML="Tipo de salida";
           s.appendChild(op);
        for(var dt in datos){
           console.log(datos[dt]);
           var op=document.createElement("option");
           op.setAttribute("value",datos[dt].IdTipoSalidaContable);
           op.innerHTML=datos[dt].NombreSalidaContable;
           s.appendChild(op);
        }
    }
    
}