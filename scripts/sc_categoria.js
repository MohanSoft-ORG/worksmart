//Aqui nombre del contexto ejemplo => _contexto='_producto';En este caso se usara el valor producto como nombre del contexto
//ejemplo => _
/*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
var _btnRegistroCategoria;
var _btnConsultaCategoria;
var _btnActualizarCategoria;
var _btnSeleccionarActualizarCategoria;
var _btnBuscarCategoriaEliminar;
var _btnEliminarCategoria;
/*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
var _formRegistroCategoria;
var _formConsultaCategoria;
var _formActualizarCategoria;
var _formEliminarCategoria;


function iniciar_contexto_categoria(){
   
        
    //ejemplo => _
    /*AQUI EL NOMBRE DE LOS BOTONES QUE PERTENECEN A ESTE CONTEXTO*/
     _btnRegistroCategoria="btnCrearCategoria";
     _btnConsultaCategoria="btnBuscarCategoria";
     /*AQUI EL NOMBRE DE LOS FORMULARIOS QUE PERTENECEN A ESTE CONTEXTO*/
     _formRegistroCategoria="formRegistrarCategoria";
     _formConsultaCategoria="formBuscarCategoria";
   
    
    
   agregarEvento(_btnRegistroCategoria,"click",registrarContextoCategoria);
   agregarEvento(_btnConsultaCategoria,"click",consultarContextoCategoria);
   
   agregarEvento("buscarCat","click",cambiarAccion);
   agregarEvento("editarCat","click",cambiarAccion);
   agregarEvento("eliminarCat","click",cambiarAccion);
   agregarEvento("cat","click",iniciar_contexto);
   
   
   
}
/* INSERTAR CONTEXTO*/    
function registrarContextoCategoria(){
    //1-Obtengo los datos del formulario
    var valores_formulario=obtener_valores_formulario(_formRegistroCategoria);   
    if(valores_formulario){
        var nombre;
        if(valores_formulario.Archivo[0]!=undefined){
            var archivo=valores_formulario.Archivo[0];
            

            if(archivo.length>0){
                nombre=archivo[0].name;
            }else{
                nombre="default.png";
            }
        }else{
            nombre="default.png";
        }
        
         
        //  console.log(f[0]);    
        //Creo el objeto que voy a enviar con datos a la peticion
        var datos={nombre_categoria:valores_formulario.Texto[0],
        descripcion_categoria :valores_formulario.Texto[1],
        imagen_categoria:nombre};
        //Invoco mi funcion 
        
        //registrarDatoArchivo(_contexto,"crear",datos,archivo[0],mostrarMensaje);
        registrarDato(_contexto,"crear",datos,mostrarMensaje);
    }else{
       mostrarMensaje({mensaje:"por favor ingresa valores"});
    }
    
}
/* CONSULTAR CONTEXTO */    
function consultarContextoCategoria(){
    var d=obtener_valores_formulario(_formConsultaCategoria);
    if(d){
        consultarDatos(_contexto,"consultarPorValor",{valor:d.Texto[0]},dibujar_tabla_resultado_categoria);   
    }else{
        mostrarMensaje({mensaje:"por favor ingresa datos"});
    }
    
}
function dibujar_tabla_resultado_categoria(datos){
    //$('#formBuscarCat').fadeOut(500);
    //$('#resultadoCat').fadeOut('fast');
     $('#resultadoCat').css({"visibility":"visible"});
    var d=eval(datos.valores_consultados);
    console.log(d);
    if(datos.respuesta){
        var tabla=document.getElementById("tblRespuestaCat");
        if(tabla!=null){
            tabla.innerHTML="";
            var fila=document.createElement("tr");
            
            var celda=document.createElement("td");
            celda.innerHTML="Nombre"; 
            fila.appendChild(celda);
         
            var celda=document.createElement("td");
            celda.innerHTML="Descripción";            
            fila.appendChild(celda);
            
            
            tabla.appendChild(fila);
            
            for(var c in d){
                console.log(d[c]);
                var fila=document.createElement("tr");
                fila.setAttribute("id",d[c].IdCategoriaProducto);
                switch(accionUsuario){
                    case "consulta":
                        var celda=document.createElement("td");
                        celda.innerHTML=d[c].NombreCategoria; 
                        fila.appendChild(celda);

                        var celda=document.createElement("td");
                        celda.innerHTML=d[c].DescripcionCategoria;            
                        fila.appendChild(celda);
                        break;
                    case "editar":
                        var celda=document.createElement("td");
                        var inp=document.createElement("input");
                        inp.setAttribute("type","text");
                        inp.setAttribute("value",d[c].NombreCategoria);
                        celda.appendChild(inp);
                        fila.appendChild(celda);

                        var celda=document.createElement("td");
                        var inp=document.createElement("input");
                        inp.setAttribute("type","text");
                        inp.setAttribute("value",d[c].DescripcionCategoria);
                        celda.appendChild(inp);
                        fila.appendChild(celda);
                        
                        
                        var celda=document.createElement("td");
                        var inp=document.createElement("input");
                        inp.setAttribute("type","button");
                        inp.setAttribute("value","Editar");
                        inp.setAttribute("onclick","editarContextoCategoria('"+d[c].IdCategoriaProducto+"');");
                        celda.appendChild(inp);            
                        fila.appendChild(celda);
                        break;
                    case "eliminar":
                        var celda=document.createElement("td");
                        celda.innerHTML=d[c].NombreCategoria; 
                        fila.appendChild(celda);

                        var celda=document.createElement("td");
                        celda.innerHTML=d[c].DescripcionCategoria;            
                        fila.appendChild(celda);
                        var celda=document.createElement("td");
                        var inp=document.createElement("input");
                        inp.setAttribute("type","button");
                        
                               
                        
                        if(d[c].EstadoCategoria=="1"){
                            inp.setAttribute("value","Deshabilitar");
                            inp.setAttribute("onclick","eliminarContextoCategoria('"+d[c].IdCategoriaProducto+"');");
                        }else{
                            inp.setAttribute("value","Habilitar");
                            inp.setAttribute("onclick","eliminarContextoCategoria('"+d[c].IdCategoriaProducto+"');");
                        }
                        
                        celda.appendChild(inp);
                        fila.appendChild(celda)
                        
                        break;
                    default:
                        mostrarMensaje({mensaje:"No hay una accion definida para el usuario"});
                        break;   
                }
                tabla.appendChild(fila);
                console.log(tabla);
            }
            
            
        }else{
            console.log("No iniciado tabla resultado categoria");
        }
    }else{
        mostrarMensaje({mensaje:"No hay resultados con la palabra que usas"});
    }
    
    
}
/*EDITAR CONTEXTO*/
function editarContextoCategoria(id){
    console.log(id);
    var vf=obtener_valores_filas_tabla(id);
    if(vf.length > 0){
        var datos={
            id_categoria:id,
            nombre_categoria:vf[0],
            descripcion_categoria:vf[1],
            imagen_categoria:"N/A"
        };
        editarDato(_contexto,"actualizar",datos,mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
/* ELIMINAR CONTEXTO*/
function eliminarContextoCategoria(id){
    
    if(id!=undefined){
        eliminarDato(_contexto,"eliminar",{id_categoria:id},mostrarMensaje);
    }else{
        mostrarMensaje({mensaje:"por favor ingrese los valores requeridos"});
    }
}
